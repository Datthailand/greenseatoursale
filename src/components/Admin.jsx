import React, { useState, useEffect } from 'react';
import { 
  Search, Sliders, Database, ArrowLeft, LogOut, Plus, Trash2, 
  Save, AlertCircle, CheckCircle2, ChevronRight, Eye, RefreshCw,
  Globe2, Menu, Info, ListPlus, ShieldCheck, MapPin, DollarSign, Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { tours as initialTours, config as initialConfig } from '../data/tours.js';

export default function Admin({ onBack }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Config & State
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('greensea_admin_config');
    return saved ? JSON.parse(saved) : {
      spreadsheetId: initialConfig?.spreadsheetId || '',
      googleAppsScriptUrl: initialConfig?.googleAppsScriptUrl || ''
    };
  });

  const [tours, setTours] = useState(() => {
    try {
      const savedImages = JSON.parse(localStorage.getItem('greensea_tour_images') || '{}');
      return initialTours.map(t => {
        const cloned = JSON.parse(JSON.stringify(t));
        if (savedImages[t.id]) {
          cloned.image = savedImages[t.id];
          cloned.thumb = savedImages[t.id];
        }
        return cloned;
      });
    } catch (e) {
      return JSON.parse(JSON.stringify(initialTours));
    }
  });

  const [selectedTourId, setSelectedTourId] = useState(initialTours[0]?.id || '');
  const [activeTab, setActiveTab] = useState('general'); // general, pricing, itinerary, sync
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [packageFilter, setPackageFilter] = useState('All');

  // Sync status
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);

  // Active tour object
  const activeTour = tours.find(t => t.id === selectedTourId) || tours[0];

  useEffect(() => {
    localStorage.setItem('greensea_admin_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    setSelectedDayIdx(0);
  }, [selectedTourId]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'greensea2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Mật khẩu không chính xác!');
    }
  };

  // Helper to update active tour fields
  const updateActiveTour = (updater) => {
    setTours(prev => prev.map(t => {
      if (t.id === selectedTourId) {
        const cloned = JSON.parse(JSON.stringify(t));
        updater(cloned);
        return cloned;
      }
      return t;
    }));
  };

  const day = activeTour?.itinerary?.[selectedDayIdx] || activeTour?.itinerary?.[0];
  const safeSelectedDayIdx = activeTour?.itinerary?.[selectedDayIdx] ? selectedDayIdx : 0;

  const updateActiveDay = (updater) => {
    updateActiveTour(t => {
      if (t.itinerary && t.itinerary[safeSelectedDayIdx]) {
        updater(t.itinerary[safeSelectedDayIdx]);
      }
    });
  };

  // Serialize to Sheet JSON
  const handleSync = async () => {
    if (!config.googleAppsScriptUrl) {
      setSyncResult({ success: false, message: 'Vui lòng cấu hình URL Google Apps Script trước!' });
      return;
    }

    setSyncing(true);
    setSyncResult(null);

    try {
      const payload = serializeStateToSheets(tours);
      const response = await fetch(config.googleAppsScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // standard for GAS web apps to prevent CORS errors on redirect
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Since mode is 'no-cors', we won't be able to read response body, 
      // but if it doesn't throw, it successfully sent!
      setSyncResult({ 
        success: true, 
        message: 'Đã gửi yêu cầu đồng bộ thành công! Hãy đợi khoảng 5-10 giây để Google Sheets cập nhật.' 
      });
    } catch (err) {
      setSyncResult({ success: false, message: `Lỗi đồng bộ: ${err.message}` });
    } finally {
      setSyncing(false);
    }
  };

  const serializeStateToSheets = (toursList) => {
    const toursRows = [];
    const itinerariesRows = [];
    const pricingRows = [];

    toursList.forEach(t => {
      // 1. Tours
      toursRows.push({
        id: t.id,
        code: t.code,
        packageType: t.packageType,
        region: t.region,
        title: t.title,
        route: t.route,
        duration: t.duration,
        nights: t.nights || '',
        hotel: t.hotel || '',
        groupRange: t.groupRange || '',
        vehicle: t.vehicle || '',
        tip: t.tip || '',
        image: t.image || t.thumb || '',
        surcharges: t.surcharges || [],
        highlights: t.highlights || [],
        inclusionsTh: t.inclusionsTh || [],
        exclusionsTh: t.exclusionsTh || [],
        childRatesTh: t.childRatesTh || [],
        remarksThLeft: t.remarksTh?.left || [],
        remarksThRight: t.remarksTh?.right || [],
        remarksLeftSpan: t.remarksLeftSpan || '',
        remarksRightSpan: t.remarksRightSpan || '',
        paymentTermsTh: (t.paymentTermsTh || []).map(p => p.join(' | ')),
        cancellationPolicyTh: (t.cancellationPolicyTh || []).map(p => p.join(' | '))
      });

      // 2. Itineraries
      if (t.itinerary) {
        t.itinerary.forEach(day => {
          itinerariesRows.push({
            tour_id: t.id,
            day: day.day,
            title: day.title || '',
            titleTh: day.titleTh || '',
            notes: (day.notes || []).join('\n'),
            notesTh: (day.notesTh || []).join('\n'),
            lunch: day.lunch || '',
            lunchMenuTh: (day.lunchMenuTh || []).join(','),
            dinner: day.dinner || '',
            dinnerMenuTh: (day.dinnerMenuTh || []).join(','),
            overnightTh: day.overnightTh || ''
          });
        });
      }

      // 3. Pricing
      // Standard rows
      if (t.priceRows) {
        t.priceRows.forEach(row => {
          let singleVal = row.single || '';
          if (typeof singleVal === 'string' && (singleVal.startsWith('+') || singleVal.startsWith('='))) {
            singleVal = "'" + singleVal;
          }
          pricingRows.push({
            tour_id: t.id,
            row_type: 'standard',
            label: row.season,
            cells: row.cells.map(c => c.value).join(','),
            single: singleVal
          });
        });
      }
      // Extra rows
      if (t.priceExtraRows) {
        t.priceExtraRows.forEach(row => {
          let cellsStr = '';
          if (row.cells) {
            cellsStr = row.cells.map(c => {
              let text = c.text || '';
              if (typeof text === 'string' && (text.startsWith('+') || text.startsWith('='))) {
                return "'" + text + `[${c.colSpan}]`;
              }
              return `${text}[${c.colSpan}]`;
            }).join(',');
          } else if (row.merged) {
            cellsStr = row.merged;
            if (typeof cellsStr === 'string' && (cellsStr.startsWith('+') || cellsStr.startsWith('='))) {
              cellsStr = "'" + cellsStr;
            }
          }
          let singleVal = row.single || '';
          if (typeof singleVal === 'string' && (singleVal.startsWith('+') || singleVal.startsWith('='))) {
            singleVal = "'" + singleVal;
          }
          pricingRows.push({
            tour_id: t.id,
            row_type: 'extra',
            label: row.label,
            cells: cellsStr,
            single: singleVal
          });
        });
      }
      // Vehicle rows
      if (t.vehicleRows) {
        t.vehicleRows.forEach(row => {
          let cellsStr = '';
          if (row.cells) {
            cellsStr = row.cells.map(c => {
              let text = c.text || '';
              if (typeof text === 'string' && (text.startsWith('+') || text.startsWith('='))) {
                return "'" + text + `[${c.colSpan}]`;
              }
              return `${text}[${c.colSpan}]`;
            }).join(',');
          } else if (row.left || row.right) {
            let left = row.left || '';
            let right = row.right || '';
            if (left.startsWith('+') || left.startsWith('=')) left = "'" + left;
            if (right.startsWith('+') || right.startsWith('=')) right = "'" + right;
            cellsStr = `${left},${right}`;
          }
          pricingRows.push({
            tour_id: t.id,
            row_type: 'vehicle',
            label: row.label,
            cells: cellsStr,
            single: ''
          });
        });
      }
    });

    return {
      tours: toursRows,
      itineraries: itinerariesRows,
      pricing: pricingRows
    };
  };

  const handleCreateNewTour = () => {
    const newId = 'tour_' + Date.now();
    const newTour = {
      id: newId,
      code: 'NEW_' + (tours.length + 1),
      packageType: 'GIT',
      region: 'Central Vietnam',
      title: 'Tên Tour Mới',
      route: 'Lộ trình mới',
      duration: 3,
      nights: 2,
      hotel: 'Khách sạn 3-4* tiêu chuẩn',
      groupRange: '8-42 pax',
      vehicle: 'Xe du lịch đời mới',
      tip: '3 USD/pax/ngày',
      surcharges: [],
      highlights: ['Điểm nổi bật 1', 'Điểm nổi bật 2'],
      inclusionsTh: ['โรงแรมที่พัก', 'อาหารตามระบุ'],
      exclusionsTh: ['ค่าใช้จ่ายส่วนตัว'],
      childRatesTh: ['เด็ก 0-2 ปี ฟรี'],
      remarksTh: { left: [], right: [] },
      remarksLeftSpan: '',
      remarksRightSpan: '',
      paymentTermsTh: [['Mốc 1', 'Nội dung 1']],
      cancellationPolicyTh: [['Mốc 1', 'Nội dung 1']],
      itinerary: [
        { day: 1, title: 'Day 1', titleTh: 'วันแรก', notes: ['Chương trình ngày 1'], notesTh: ['โปรแกรมวันแรก'], lunch: '', lunchMenuTh: [], dinner: '', dinnerMenuTh: [], overnightTh: '' }
      ],
      priceRows: [
        { season: 'Low Season', single: '30', cells: [ { band: '8-9', value: 100 }, { band: '10-14', value: 95 }, { band: '15-19', value: 90 }, { band: '20-24', value: 85 }, { band: '25-29', value: 80 }, { band: '30-34', value: 75 }, { band: '35-42', value: 70 } ] }
      ],
      priceExtraRows: [],
      vehicleRows: []
    };

    setTours(prev => [...prev, newTour]);
    setSelectedTourId(newId);
    setActiveTab('general');
  };

  const handleDeleteTour = (tourId) => {
    if (tours.length <= 1) {
      alert('Không thể xóa tour duy nhất còn lại!');
      return;
    }
    if (window.confirm('Anh có chắc chắn muốn xóa tour này không?')) {
      const remainingTours = tours.filter(t => t.id !== tourId);
      setTours(remainingTours);
      setSelectedTourId(remainingTours[0].id);
    }
  };

  const handleDownloadBackup = () => {
    const payload = serializeStateToSheets(tours);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `greensea_tours_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered tours for sidebar
  const filteredTours = tours.filter(t => {
    const matchesSearch = t.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'All' || t.region === regionFilter;
    const matchesPackage = packageFilter === 'All' || t.packageType === packageFilter;
    return matchesSearch && matchesRegion && matchesPackage;
  });

  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <style>{`
          .admin-login-screen {
            display: grid;
            place-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #004b3a 0%, #16201d 100%);
            font-family: Inter, sans-serif;
            color: #fff;
            padding: 20px;
          }
          .login-card {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 24px 48px rgba(0,0,0,0.3);
          }
          .login-header {
            text-align: center;
            margin-bottom: 30px;
          }
          .login-header h2 {
            color: #00d19a;
            font-size: 24px;
            font-weight: 800;
            margin: 0 0 8px 0;
          }
          .login-header p {
            color: #b2c4bf;
            font-size: 13px;
            margin: 0;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-group label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #b2c4bf;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .form-group input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: #fff;
            font-size: 15px;
            outline: none;
            transition: border-color 0.2s;
          }
          .form-group input:focus {
            border-color: #00d19a;
          }
          .login-btn {
            width: 100%;
            padding: 12px;
            background: #006f52;
            color: #fff;
            font-weight: 700;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .login-btn:hover {
            background: #008f6a;
          }
          .error-msg {
            background: rgba(255, 81, 61, 0.15);
            border: 1px solid rgba(255, 81, 61, 0.3);
            color: #ff8b7d;
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 13px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .back-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-top: 20px;
            color: #b2c4bf;
            font-size: 13px;
            text-decoration: none;
            cursor: pointer;
          }
          .back-link:hover {
            color: #fff;
          }
        `}</style>
        <div className="login-card">
          <div className="login-header">
            <h2>GREEN SEA CRM</h2>
            <p>Nhập mật khẩu để truy cập trang quản trị</p>
          </div>
          <form onSubmit={handleLogin}>
            {loginError && (
              <div className="error-msg">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}
            <div className="form-group">
              <label>Mật khẩu quản trị</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="login-btn">Đăng nhập</button>
          </form>
          <div className="back-link" onClick={onBack}>
            <ArrowLeft size={14} />
            <span>Quay lại trang chính</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <style>{`
        .admin-layout {
          display: grid;
          grid-template-rows: 64px 1fr;
          height: 100vh;
          background: #f7faf9;
          font-family: Inter, sans-serif;
          color: #16201d;
        }
        .admin-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border-bottom: 1px solid #dfe8e4;
          padding: 0 20px;
        }
        .topbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .topbar-logo strong {
          color: #006f52;
          font-size: 20px;
          font-weight: 900;
        }
        .topbar-logo span {
          background: #006f52;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .topbar-actions {
          display: flex;
          gap: 12px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid #dfe8e4;
          background: #fff;
          color: #16201d;
          cursor: pointer;
        }
        .btn:hover {
          background: #f7faf9;
        }
        .btn-primary {
          background: #006f52;
          color: #fff;
          border-color: #006f52;
        }
        .btn-primary:hover {
          background: #005a42;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          overflow: hidden;
        }
        
        /* Sidebar */
        .admin-sidebar {
          background: #fff;
          border-right: 1px solid #dfe8e4;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .sidebar-search {
          padding: 16px;
          border-bottom: 1px solid #dfe8e4;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border: 1px solid #dfe8e4;
          border-radius: 8px;
          font-size: 13px;
          outline: none;
        }
        .search-input-wrapper input:focus {
          border-color: #006f52;
        }
        .search-input-wrapper svg {
          position: absolute;
          left: 12px;
          color: #66736f;
        }
        .sidebar-filters {
          padding: 10px 16px;
          border-bottom: 1px solid #dfe8e4;
          background: #f7faf9;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .filter-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-pill {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          background: #fff;
          border: 1px solid #dfe8e4;
          cursor: pointer;
        }
        .filter-pill.active {
          background: #006f52;
          color: #fff;
          border-color: #006f52;
        }
        .tour-list {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tour-item-card {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #dfe8e4;
          background: #fff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
        }
        .tour-item-card:hover {
          border-color: #006f52;
          background: #f7faf9;
        }
        .tour-item-card.active {
          border-color: #006f52;
          background: #edf7f2;
          box-shadow: 0 2px 8px rgba(0, 111, 82, 0.1);
        }
        .tour-item-info strong {
          display: block;
          font-size: 14px;
          color: #006f52;
        }
        .tour-item-info span {
          display: block;
          font-size: 12px;
          color: #66736f;
          margin-top: 4px;
        }
        .tour-item-meta {
          text-align: right;
          font-size: 11px;
          font-weight: 600;
          color: #66736f;
        }
        .tour-badge {
          background: #dfe8e4;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 9px;
        }

        /* Main Workspace */
        .admin-workspace {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #f0f4f2;
        }
        .workspace-header {
          background: #fff;
          border-bottom: 1px solid #dfe8e4;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .workspace-title h2 {
          font-size: 18px;
          font-weight: 800;
          margin: 0;
        }
        .workspace-title p {
          font-size: 13px;
          color: #66736f;
          margin: 4px 0 0 0;
        }
        
        .tab-bar {
          display: flex;
          background: #fff;
          border-bottom: 1px solid #dfe8e4;
          padding: 0 24px;
        }
        .tab-btn {
          padding: 14px 20px;
          font-size: 13px;
          font-weight: 600;
          color: #66736f;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
        }
        .tab-btn.active {
          color: #006f52;
          border-bottom-color: #006f52;
        }
        .workspace-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        
        .editor-card {
          background: #fff;
          border: 1px solid #dfe8e4;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .editor-card h3 {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #004b3a;
          border-bottom: 1px solid #f0f4f2;
          padding-bottom: 12px;
        }
        
        /* Form layouts */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-field label {
          font-size: 12px;
          font-weight: 600;
          color: #66736f;
        }
        .form-field input, 
        .form-field select, 
        .form-field textarea {
          padding: 10px 12px;
          border: 1px solid #dfe8e4;
          border-radius: 6px;
          font-size: 13px;
          background: #fff;
          outline: none;
        }
        .form-field input:focus, 
        .form-field select:focus, 
        .form-field textarea:focus {
          border-color: #006f52;
        }
        .form-field textarea {
          resize: vertical;
          min-height: 80px;
        }
        
        /* List Editor */
        .list-editor-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .list-editor-row input {
          flex: 1;
        }
        
        /* Day list in Itinerary */
        .itinerary-editor-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
          height: 600px;
        }
        .days-nav {
          border-right: 1px solid #dfe8e4;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
          padding-right: 12px;
        }
        .day-nav-item {
          padding: 10px 12px;
          border-radius: 6px;
          background: #fff;
          border: 1px solid #dfe8e4;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .day-nav-item.active {
          background: #006f52;
          color: #fff;
          border-color: #006f52;
        }
        .day-editor-form {
          overflow-y: auto;
          padding-right: 8px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Pricing Editors */
        .pricing-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .pricing-grid-editor {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .price-row-editor {
          background: #f7faf9;
          border: 1px solid #dfe8e4;
          border-radius: 8px;
          padding: 16px;
        }
        .price-row-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .price-row-header strong {
          font-size: 13px;
        }
        .price-cells-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }
        .price-cell-input {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .price-cell-input label {
          font-size: 10px;
          font-weight: 600;
          color: #66736f;
        }
        .price-cell-input input {
          padding: 6px 10px;
          border: 1px solid #dfe8e4;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .span-input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        .span-input-row input {
          flex: 1;
        }
        .span-input-row select {
          width: 80px;
        }

        /* Sync panel */
        .sync-card {
          max-width: 600px;
          margin: 0 auto;
        }
        .sync-instructions {
          font-size: 13px;
          line-height: 1.6;
          color: #66736f;
          margin-bottom: 24px;
        }
        .sync-instructions ol {
          padding-left: 20px;
          margin: 10px 0;
        }
        .sync-instructions li {
          margin-bottom: 8px;
        }
        .status-banner {
          padding: 16px;
          border-radius: 8px;
          margin-top: 20px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          line-height: 1.5;
        }
        .status-banner.success {
          background: #edf7f2;
          border: 1px solid #cbded6;
          color: #006f52;
        }
        .status-banner.error {
          background: #fff0ed;
          border: 1px solid #ff513d;
          color: #ff513d;
        }
      `}</style>
      
      <div className="admin-topbar">
        <div className="topbar-logo">
          <strong>GREEN SEA CRM</strong>
          <span>ADMIN</span>
        </div>
        <div className="topbar-actions">
          <button className="btn" onClick={handleDownloadBackup}>
            <Database size={15} />
            Tải File Backup (JSON)
          </button>
          <button className="btn btn-primary" onClick={onBack}>
            <Eye size={15} />
            Xem trang Web
          </button>
          <button className="btn" onClick={() => setIsAuthenticated(false)}>
            <LogOut size={15} />
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="admin-grid">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-search" style={{ display: 'flex', gap: '8px' }}>
            <div className="search-input-wrapper" style={{ flex: 1 }}>
              <Search size={15} />
              <input 
                type="text" 
                placeholder="Tìm tour theo code, tên..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="btn btn-primary" 
              onClick={handleCreateNewTour} 
              title="Tạo Tour Mới" 
              style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="sidebar-filters">
            <div className="filter-group">
              <span 
                className={`filter-pill ${regionFilter === 'All' ? 'active' : ''}`}
                onClick={() => setRegionFilter('All')}
              >
                Tất cả miền
              </span>
              <span 
                className={`filter-pill ${regionFilter === 'North Vietnam' ? 'active' : ''}`}
                onClick={() => setRegionFilter('North Vietnam')}
              >
                Bắc
              </span>
              <span 
                className={`filter-pill ${regionFilter === 'Central Vietnam' ? 'active' : ''}`}
                onClick={() => setRegionFilter('Central Vietnam')}
              >
                Trung
              </span>
              <span 
                className={`filter-pill ${regionFilter === 'Southern Vietnam' ? 'active' : ''}`}
                onClick={() => setRegionFilter('Southern Vietnam')}
              >
                Nam
              </span>
              <span 
                className={`filter-pill ${regionFilter === 'Phu Quoc' ? 'active' : ''}`}
                onClick={() => setRegionFilter('Phu Quoc')}
              >
                Phú Quốc
              </span>
            </div>
            <div className="filter-group">
              <span 
                className={`filter-pill ${packageFilter === 'All' ? 'active' : ''}`}
                onClick={() => setPackageFilter('All')}
              >
                Tất cả loại
              </span>
              <span 
                className={`filter-pill ${packageFilter === 'FIT' ? 'active' : ''}`}
                onClick={() => setPackageFilter('FIT')}
              >
                FIT (Lẻ)
              </span>
              <span 
                className={`filter-pill ${packageFilter === 'GIT' ? 'active' : ''}`}
                onClick={() => setPackageFilter('GIT')}
              >
                GIT (Đoàn)
              </span>
            </div>
          </div>

          <div className="tour-list">
            {filteredTours.map(t => (
              <div 
                className={`tour-item-card ${selectedTourId === t.id ? 'active' : ''}`}
                key={t.id}
                onClick={() => setSelectedTourId(t.id)}
              >
                <div className="tour-item-info">
                  <strong>{t.code}</strong>
                  <span>{t.title}</span>
                </div>
                <div className="tour-item-meta">
                  <span className="tour-badge">{t.packageType}</span>
                  <div style={{ marginTop: '4px' }}>{t.duration}N</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="admin-workspace">
          <div className="workspace-header">
            <div className="workspace-title">
              <h2>{activeTour.code} - {activeTour.title}</h2>
              <p>Vùng miền: {activeTour.region} | Kiểu tour: {activeTour.packageType}</p>
            </div>
            <button 
              className="btn" 
              style={{ borderColor: '#ff513d', color: '#ff513d', padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => handleDeleteTour(activeTour.id)}
            >
              <Trash2 size={13} />
              Xóa Tour này
            </button>
          </div>

          <div className="tab-bar">
            <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
              1. Thông tin chung & Điều khoản
            </button>
            <button className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`} onClick={() => setActiveTab('pricing')}>
              2. Bảng giá & Xe
            </button>
            <button className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`} onClick={() => setActiveTab('itinerary')}>
              3. Lịch trình ({activeTour.itinerary?.length || 0} Ngày)
            </button>
            <button className={`tab-btn ${activeTab === 'sync' ? 'active' : ''}`} onClick={() => setActiveTab('sync')}>
              4. Cấu hình & Đồng bộ Google Sheets
            </button>
          </div>

          <div className="workspace-body">
            {activeTab === 'general' && (
              <div>
                {/* Meta Card */}
                <div className="editor-card">
                  <h3><Info size={16} /> Thông tin cơ bản</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Mã Tour (Code)</label>
                      <input 
                        type="text" 
                        value={activeTour.code}
                        onChange={e => updateActiveTour(t => t.code = e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Tên Tour (Title)</label>
                      <input 
                        type="text" 
                        value={activeTour.title}
                        onChange={e => updateActiveTour(t => t.title = e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Lộ trình (Route)</label>
                      <input 
                        type="text" 
                        value={activeTour.route}
                        onChange={e => updateActiveTour(t => t.route = e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Vùng miền (Region)</label>
                      <select 
                        value={activeTour.region}
                        onChange={e => updateActiveTour(t => t.region = e.target.value)}
                      >
                        <option value="North Vietnam">Bắc Bộ (North)</option>
                        <option value="Central Vietnam">Trung Bộ (Central)</option>
                        <option value="Southern Vietnam">Nam Bộ (South)</option>
                        <option value="Phu Quoc">Phú Quốc</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Kiểu Tour</label>
                      <select 
                        value={activeTour.packageType}
                        onChange={e => updateActiveTour(t => t.packageType = e.target.value)}
                      >
                        <option value="FIT">FIT (Khách lẻ)</option>
                        <option value="GIT">GIT (Đoàn)</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Số ngày</label>
                      <input 
                        type="number" 
                        value={activeTour.duration}
                        onChange={e => updateActiveTour(t => t.duration = parseInt(e.target.value, 10) || 0)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Khách sạn</label>
                      <input 
                        type="text" 
                        value={activeTour.hotel}
                        onChange={e => updateActiveTour(t => t.hotel = e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Khoảng đoàn khách (Group size)</label>
                      <input 
                        type="text" 
                        value={activeTour.groupRange}
                        onChange={e => updateActiveTour(t => t.groupRange = e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Tiêu chuẩn Xe</label>
                      <input 
                        type="text" 
                        value={activeTour.vehicle}
                        onChange={e => updateActiveTour(t => t.vehicle = e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Quy định TIP</label>
                      <input 
                        type="text" 
                        value={activeTour.tip}
                        onChange={e => updateActiveTour(t => t.tip = e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Tour Thumbnail Image Editor Card */}
                <div className="editor-card">
                  <h3><ImageIcon size={16} /> Hình ảnh đại diện Tour (Thumbnail / Cover Image)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '24px', alignItems: 'start' }}>
                    <div>
                      <div className="form-field">
                        <label>Đường dẫn hình ảnh (URL hoặc đường dẫn file /assets/...)</label>
                        <input 
                          type="text" 
                          placeholder="Ví dụ: /assets/golden-bridge.jpg hoặc link https://..."
                          value={activeTour.image || activeTour.thumb || ''}
                          onChange={e => {
                            const val = e.target.value;
                            updateActiveTour(t => {
                              t.image = val;
                              t.thumb = val;
                            });
                            try {
                              const saved = JSON.parse(localStorage.getItem('greensea_tour_images') || '{}');
                              saved[activeTour.id] = val;
                              localStorage.setItem('greensea_tour_images', JSON.stringify(saved));
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        />
                      </div>

                      <div style={{ marginTop: '14px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#66736f', display: 'block', marginBottom: '8px' }}>
                          ⚡ Hoặc chọn nhanh từ kho ảnh điểm đến có sẵn:
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {[
                            { label: '🌉 Cầu Vàng Bà Nà', src: '/assets/golden-bridge.jpg' },
                            { label: '🏮 Phố cổ Hội An', src: '/assets/hoi-an-night.jpg' },
                            { label: '🚡 Cáp treo Bà Nà', src: '/assets/cable-car-sunrise.jpg' },
                            { label: '🛶 Rừng dừa Bảy Mẫu', src: '/assets/coconut-basket-boat.jpg' },
                            { label: '🛕 Chùa Linh Ứng', src: '/assets/linh-ung-pagoda.jpg' },
                            { label: '🏰 Làng Pháp Mercure', src: '/assets/mercure-french-village.jpg' },
                            { label: '🌊 Vịnh Hạ Long / Bắc Bộ', src: '/assets/thumbs/fit-north-vietnam-2026.jpg' },
                            { label: '🏖️ Mũi Né / Nam Bộ', src: '/assets/thumbs/fit-southern-vietnam-2026.jpg' },
                            { label: '🏝️ Thị trấn Hoàng Hôn Phú Quốc', src: '/assets/phu-quoc-sunset-town.jpg' },
                            { label: '🏛️ Cố Đô Huế (Ngọ Môn)', src: '/assets/hue-citadel.jpg' },
                            { label: '🏰 Lâu đài Tam Đảo', src: '/assets/tam-dao-castle.jpg' },
                            { label: '🏖️ Tháp Trầm Hương Nha Trang', src: '/assets/nha-trang-tram-huong.jpg' },
                            { label: '⛪ Nhà thờ Đức Bà Sài Gòn', src: '/assets/sai-gon-notre-dame.jpg' },
                            { label: '🐉 Cầu Rồng Đà Nẵng', src: '/assets/dragon-bridge-night.jpg' },
                            { label: '🏜️ Đồi cát Mũi Né', src: '/assets/mui-ne-sand-dunes.jpg' },
                            { label: '⛰️ Đỉnh Fansipan Sapa', src: '/assets/sapa-fansipan-peak.jpg' },
                            { label: '🐢 Tháp Rùa Hồ Gươm (Hà Nội)', src: '/assets/hanoi-turtle-tower.jpg' },
                          ].map(preset => {
                            const isSelected = (activeTour.image || activeTour.thumb) === preset.src;
                            return (
                              <button
                                key={preset.src}
                                type="button"
                                onClick={() => {
                                  updateActiveTour(t => {
                                    t.image = preset.src;
                                    t.thumb = preset.src;
                                  });
                                  try {
                                    const saved = JSON.parse(localStorage.getItem('greensea_tour_images') || '{}');
                                    saved[activeTour.id] = preset.src;
                                    localStorage.setItem('greensea_tour_images', JSON.stringify(saved));
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  border: isSelected ? '2px solid #006f52' : '1px solid #dfe8e4',
                                  background: isSelected ? '#edf7f2' : '#f8faf9',
                                  color: isSelected ? '#004b3a' : '#334155',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#66736f', display: 'block', marginBottom: '8px' }}>
                        Xem trước hình ảnh (Preview)
                      </label>
                      <div style={{
                        width: '100%',
                        height: '130px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid #dfe8e4',
                        background: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img 
                          src={activeTour.image || activeTour.thumb || activeTour.assets?.thumb || activeTour.assets?.cover} 
                          alt="Tour Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            if (activeTour.assets?.thumb || activeTour.assets?.cover) {
                              e.target.src = activeTour.assets.thumb || activeTour.assets.cover;
                            }
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', display: 'block' }}>
                        Hiển thị trực tiếp trên Thẻ Tour
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lists Card */}
                <div className="editor-card">
                  <h3><ListPlus size={16} /> Chương trình & Điều khoản (Dịch sang Tiếng Thái)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-field">
                      <label>Bao gồm (Inclusions TH) - Một mục mỗi dòng</label>
                      <textarea 
                        value={activeTour.inclusionsTh?.join('\n')}
                        onChange={e => updateActiveTour(t => t.inclusionsTh = e.target.value.split('\n'))}
                        style={{ height: '150px' }}
                      />
                    </div>
                    <div className="form-field">
                      <label>Không bao gồm (Exclusions TH) - Một mục mỗi dòng</label>
                      <textarea 
                        value={activeTour.exclusionsTh?.join('\n')}
                        onChange={e => updateActiveTour(t => t.exclusionsTh = e.target.value.split('\n'))}
                        style={{ height: '150px' }}
                      />
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 2' }}>
                      <label>Chính sách trẻ em (Child Rates TH) - Một mục mỗi dòng</label>
                      <textarea 
                        value={activeTour.childRatesTh?.join('\n')}
                        onChange={e => updateActiveTour(t => t.childRatesTh = e.target.value.split('\n'))}
                        style={{ height: '100px' }}
                      />
                    </div>
                    <div className="form-field" style={{ gridColumn: 'span 2' }}>
                      <label>Điểm nhấn Tour (Highlights EN) - Một mục mỗi dòng</label>
                      <textarea 
                        value={activeTour.highlights?.join('\n')}
                        onChange={e => updateActiveTour(t => t.highlights = e.target.value.split('\n'))}
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Card */}
                <div className="editor-card">
                  <h3><ShieldCheck size={16} /> Chính sách Thanh toán & Hủy tour (Dạng Cặp: Tiêu chí | Nội dung)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-field">
                      <label>Điều khoản Thanh toán (Payment Terms TH)</label>
                      <textarea 
                        placeholder="Mốc thanh toán | Tỷ lệ % hoặc số tiền"
                        value={(activeTour.paymentTermsTh || []).map(p => p.join(' | ')).join('\n')}
                        onChange={e => updateActiveTour(t => t.paymentTermsTh = e.target.value.split('\n').map(line => line.split('|').map(s=>s.trim())))}
                        style={{ height: '120px' }}
                      />
                    </div>
                    <div className="form-field">
                      <label>Chính sách Hủy phạt (Cancellation Policy TH)</label>
                      <textarea 
                        placeholder="Mốc thời gian | Tỷ lệ phạt %"
                        value={(activeTour.cancellationPolicyTh || []).map(p => p.join(' | ')).join('\n')}
                        onChange={e => updateActiveTour(t => t.cancellationPolicyTh = e.target.value.split('\n').map(line => line.split('|').map(s=>s.trim())))}
                        style={{ height: '120px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div>
                {/* Standard Price Rows */}
                <div className="editor-card">
                  <div className="pricing-section-header">
                    <h3><DollarSign size={16} /> Bảng giá tiêu chuẩn (Standard Price Rows)</h3>
                  </div>
                  
                  <div className="pricing-grid-editor">
                    {activeTour.priceRows?.map((row, rIdx) => (
                      <div className="price-row-editor" key={row.season}>
                        <div className="price-row-header">
                          <strong>Bảng giá: {row.season}</strong>
                          <div className="form-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <label style={{ margin: 0 }}>Phòng đơn:</label>
                            <input 
                              type="text" 
                              style={{ width: '80px', padding: '4px 8px' }} 
                              value={row.single || ''}
                              onChange={e => updateActiveTour(t => t.priceRows[rIdx].single = e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="price-cells-grid">
                          {row.cells.map((cell, cIdx) => (
                            <div className="price-cell-input" key={cell.band}>
                              <label>{cell.band} PAX (USD)</label>
                              <input 
                                type="number" 
                                value={cell.value}
                                onChange={e => updateActiveTour(t => t.priceRows[rIdx].cells[cIdx].value = parseInt(e.target.value, 10) || 0)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Price Rows */}
                <div className="editor-card">
                  <h3><Plus size={16} /> Dòng phụ thu & Bảng xe (Extra Rows / Vehicle Rows)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    
                    {/* Extra Rows */}
                    <div className="form-field">
                      <label>Dòng phụ thu bổ sung (Extra Rows) - Ghi chú ô gộp ví dụ: +$28[2]</label>
                      <textarea
                        placeholder="Tên phụ thu | Nội dung gộp hoặc từng ô tách bằng dấu phẩy"
                        value={activeTour.priceExtraRows?.map(row => {
                          const cellsStr = row.cells ? row.cells.map(c => `${c.text}[${c.colSpan}]`).join(',') : row.merged;
                          return `${row.label} | ${cellsStr} | ${row.single || ''}`;
                        }).join('\n') || ''}
                        onChange={e => {
                          const parsed = e.target.value.split('\n').map(line => {
                            const parts = line.split('|');
                            if (parts.length < 2) return null;
                            const label = parts[0].trim();
                            const cellsVal = parts[1].trim();
                            const single = parts[2] ? parts[2].trim() : '';

                            // Parse cells format e.g. "Text[2],Text2[1]"
                            if (cellsVal.includes('[')) {
                              const cells = cellsVal.split(',').map(part => {
                                const match = part.match(/^([^\[]*)(?:\[(\d+)\])?$/);
                                return {
                                  text: match ? match[1].trim() : part.trim(),
                                  colSpan: match && match[2] ? parseInt(match[2], 10) : 1
                                };
                              });
                              return { label, cells, single };
                            } else {
                              return { label, merged: cellsVal, single };
                            }
                          }).filter(Boolean);
                          updateActiveTour(t => t.priceExtraRows = parsed);
                        }}
                        style={{ height: '150px', fontFamily: 'monospace' }}
                      />
                    </div>

                    {/* Vehicle Rows */}
                    <div className="form-field">
                      <label>Dòng nâng cấp xe (Vehicle Rows) - Định dạng giống ô phụ thu</label>
                      <textarea
                        placeholder="Tên xe | Xe mini[2], Xe lớn[4]"
                        value={activeTour.vehicleRows?.map(row => {
                          const cellsStr = row.cells ? row.cells.map(c => `${c.text}[${c.colSpan}]`).join(',') : `${row.left},${row.right}`;
                          return `${row.label} | ${cellsStr}`;
                        }).join('\n') || ''}
                        onChange={e => {
                          const parsed = e.target.value.split('\n').map(line => {
                            const parts = line.split('|');
                            if (parts.length < 2) return null;
                            const label = parts[0].trim();
                            const cellsVal = parts[1].trim();

                            if (cellsVal.includes('[')) {
                              const cells = cellsVal.split(',').map(part => {
                                const match = part.match(/^([^\[]*)(?:\[(\d+)\])?$/);
                                return {
                                  text: match ? match[1].trim() : part.trim(),
                                  colSpan: match && match[2] ? parseInt(match[2], 10) : 1
                                };
                              });
                              return { label, cells };
                            } else {
                              const split = cellsVal.split(',');
                              return { label, left: split[0]?.trim() || '', right: split[1]?.trim() || '' };
                            }
                          }).filter(Boolean);
                          updateActiveTour(t => t.vehicleRows = parsed);
                        }}
                        style={{ height: '150px', fontFamily: 'monospace' }}
                      />
                    </div>

                  </div>
                </div>

                {/* Remarks Block */}
                <div className="editor-card">
                  <h3><Info size={16} /> Chính sách Tour Leader (Ghi chú dưới chân bảng giá)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                    <div className="form-field">
                      <label>Cột trái (left) - Một dòng mỗi mục</label>
                      <textarea 
                        value={activeTour.remarksTh?.left?.join('\n') || ''}
                        onChange={e => updateActiveTour(t => {
                          if (!t.remarksTh) t.remarksTh = { left: [], right: [] };
                          t.remarksTh.left = e.target.value.split('\n');
                        })}
                        style={{ height: '120px' }}
                      />
                    </div>
                    <div className="form-field">
                      <label>Cột phải (right) - Một dòng mỗi mục</label>
                      <textarea 
                        value={activeTour.remarksTh?.right?.join('\n') || ''}
                        onChange={e => updateActiveTour(t => {
                          if (!t.remarksTh) t.remarksTh = { left: [], right: [] };
                          t.remarksTh.right = e.target.value.split('\n');
                        })}
                        style={{ height: '120px' }}
                      />
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Số cột gộp cột trái (remarksLeftSpan)</label>
                      <input 
                        type="number" 
                        value={activeTour.remarksLeftSpan || ''}
                        onChange={e => updateActiveTour(t => t.remarksLeftSpan = parseInt(e.target.value, 10) || undefined)}
                      />
                    </div>
                    <div className="form-field">
                      <label>Số cột gộp cột phải (remarksRightSpan)</label>
                      <input 
                        type="number" 
                        value={activeTour.remarksRightSpan || ''}
                        onChange={e => updateActiveTour(t => t.remarksRightSpan = parseInt(e.target.value, 10) || undefined)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="editor-card itinerary-editor-grid">
                <div className="days-nav">
                  {activeTour.itinerary?.map((item, idx) => (
                    <div 
                      className={`day-nav-item ${safeSelectedDayIdx === idx ? 'active' : ''}`}
                      key={item.day}
                      onClick={() => setSelectedDayIdx(idx)}
                    >
                      <span>Ngày {item.day}</span>
                      <ChevronRight size={14} />
                    </div>
                  ))}
                </div>
                
                {day ? (
                  <div className="day-editor-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-field">
                        <label>Tiêu đề tiếng Anh (EN Title)</label>
                        <input 
                          type="text" 
                          value={day.title || ''}
                          onChange={e => updateActiveDay(d => d.title = e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Tiêu đề tiếng Thái (TH Title)</label>
                        <input 
                          type="text" 
                          value={day.titleTh || ''}
                          onChange={e => updateActiveDay(d => d.titleTh = e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-field">
                        <label>Chi tiết chương trình EN (notes) - Một mục mỗi dòng</label>
                        <textarea 
                          value={day.notes?.join('\n') || ''}
                          onChange={e => updateActiveDay(d => d.notes = e.target.value.split('\n'))}
                          style={{ height: '120px' }}
                        />
                      </div>
                      <div className="form-field">
                        <label>Chi tiết chương trình TH (notesTh) - Một mục mỗi dòng</label>
                        <textarea 
                          value={day.notesTh?.join('\n') || ''}
                          onChange={e => updateActiveDay(d => d.notesTh = e.target.value.split('\n'))}
                          style={{ height: '120px' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-field">
                        <label>Địa điểm ăn trưa (Lunch place)</label>
                        <input 
                          type="text" 
                          value={day.lunch || ''}
                          onChange={e => updateActiveDay(d => d.lunch = e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Menu ăn trưa tiếng Thái (Lunch Menu TH) - Tách bằng dấu phẩy</label>
                        <input 
                          type="text" 
                          placeholder="Món 1, Món 2, Món 3"
                          value={day.lunchMenuTh?.join(', ') || ''}
                          onChange={e => updateActiveDay(d => d.lunchMenuTh = e.target.value.split(',').map(s=>s.trim()))}
                        />
                      </div>
                      <div className="form-field">
                        <label>Địa điểm ăn tối (Dinner place)</label>
                        <input 
                          type="text" 
                          value={day.dinner || ''}
                          onChange={e => updateActiveDay(d => d.dinner = e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>Menu ăn tối tiếng Thái (Dinner Menu TH) - Tách bằng dấu phẩy</label>
                        <input 
                          type="text" 
                          placeholder="Món 1, Món 2, Món 3"
                          value={day.dinnerMenuTh?.join(', ') || ''}
                          onChange={e => updateActiveDay(d => d.dinnerMenuTh = e.target.value.split(',').map(s=>s.trim()))}
                        />
                      </div>
                      <div className="form-field" style={{ gridColumn: 'span 2' }}>
                        <label>Địa điểm ngủ qua đêm tiếng Thái (Overnight TH)</label>
                        <input 
                          type="text" 
                          value={day.overnightTh || ''}
                          onChange={e => updateActiveDay(d => d.overnightTh = e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
                    Chọn một ngày lịch trình để bắt đầu soạn thảo.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sync' && (
              <div className="editor-card sync-card">
                <h3><RefreshCw size={16} /> Đồng bộ ngược lại Google Sheets</h3>
                <div className="sync-instructions">
                  <p>Hệ thống này sẽ ghi đè trực tiếp toàn bộ dữ liệu mới của 23 tour lên các tab `Tours`, `Itineraries` và `Pricing` trên Google Sheet của anh.</p>
                  <strong>Cách thiết lập (Chỉ làm 1 lần đầu tiên):</strong>
                  <ol>
                    <li>Mở Google Sheet của anh.</li>
                    <li>Vào **Tiện ích mở rộng (Extensions) &gt; Apps Script**.</li>
                    <li>Xóa hết code hiện có, dán đoạn mã Apps Script nhận dữ liệu (ở phần hướng dẫn cài đặt) vào và lưu lại.</li>
                    <li>Nhấn nút **Triển khai (Deploy) &gt; Tùy chọn triển khai mới (New deployment)**.</li>
                    <li>Chọn loại triển khai là **Ứng dụng web (Web app)**.</li>
                    <li>Cấu hình:
                      <ul>
                        <li>Triển khai dưới dạng: **Tôi (Me)**.</li>
                        <li>Ai có quyền truy cập: **Bất kỳ ai (Anyone)**.</li>
                      </ul>
                    </li>
                    <li>Nhấn **Triển khai**, cấp quyền truy cập tài khoản Google nếu được hỏi, và copy lấy **URL ứng dụng web (Web App URL)**.</li>
                  </ol>
                </div>

                <div className="form-grid" style={{ marginBottom: '20px', gridTemplateColumns: '1fr' }}>
                  <div className="form-field">
                    <label>URL Google Apps Script Web App</label>
                    <input 
                      type="text" 
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={config.googleAppsScriptUrl}
                      onChange={e => setConfig(prev => ({ ...prev, googleAppsScriptUrl: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label>Spreadsheet ID (Để tham chiếu hiển thị)</label>
                    <input 
                      type="text" 
                      value={config.spreadsheetId}
                      onChange={e => setConfig(prev => ({ ...prev, spreadsheetId: e.target.value }))}
                    />
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '15px' }}
                  onClick={handleSync}
                  disabled={syncing}
                >
                  <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
                  {syncing ? 'Đang đồng bộ dữ liệu...' : 'Đồng bộ ngay lên Google Sheets'}
                </button>

                {syncResult && (
                  <div className={`status-banner ${syncResult.success ? 'success' : 'error'}`}>
                    {syncResult.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <div>
                      <strong>{syncResult.success ? 'Thành công!' : 'Thất bại!'}</strong>
                      <p style={{ margin: '4px 0 0 0' }}>{syncResult.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
