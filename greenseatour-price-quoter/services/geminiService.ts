
import * as XLSX from 'xlsx';
import { TourData, SecondTourData, GroupSizeKey, GROUP_SIZES, DayData, FinalUsdPrices, StandardCostItem, FullTourSaveData } from '../types';

export const tourData: TourData = {
    "exchange_rates": {
      "usd_to_vnd": 25800
    },
    "add_ons": {
      "add_tl": { "name": "Thêm 1 Trưởng đoàn mới (Thêm 1 TL)", "description": "Chi phí cho một trưởng đoàn bổ sung, tính theo các mục đã chọn." },
      "add_tl_single": { "name": "Thêm 1 TL mới & Ngủ đơn", "description": "Tính bằng: (2 * Phụ thu phòng đơn) + (Chi phí TL mới)." }
    }
};

// Data for the final summary table (UI and Excel) - Detailed 7 groups
export const secondTourData: SecondTourData = {
    "date_range": "03/09-30/11/2025",
    "single_supplement": 25,
    "ranges": [
      {"header": "8-9 KHÁCH",   "priceKey": 8},
      {"header": "10-14 KHÁCH", "priceKey": 10},
      {"header": "15-19 KHÁCH", "priceKey": 15},
      {"header": "20-24 KHÁCH", "priceKey": 20},
      {"header": "25-29 KHÁCH", "priceKey": 25},
      {"header": "30-34 KHÁCH", "priceKey": 30},
      {"header": "35-42 KHÁCH", "priceKey": 35}
    ]
};

// Data for the profit settings UI - Simplified 4 groups
export const profitSettingRanges = [
    {"header": "8-9 KHÁCH", "lookup_guest_count": 8 },
    {"header": "10-14 KHÁCH", "lookup_guest_count": 10 },
    {"header": "15-19 KHÁCH", "lookup_guest_count": 15 },
    {"header": "20-40 KHÁCH", "lookup_guest_count": 20 }
];


// --- UTILITY FUNCTIONS ---

export const formatCurrency = (value: number | null | undefined, forExport = false): string => {
    if (value === null || value === undefined) return forExport ? '' : '-';
    if (value === 0 && !forExport) return '-';
    if (typeof value !== 'number') return String(value);
    return value.toLocaleString('vi-VN');
};

export const exportToXlsx = (
    tourTitle: string,
    costData: { [day: string]: any[] },
    totalsVND: { [key in GroupSizeKey]: number } & { custom: number | null },
    finalUsdPrices: FinalUsdPrices,
    exchangeRate: number,
    showCustomColumn: boolean,
    customGuestCount: number,
    singleSupplementUSD: number,
) => {
    const wb = XLSX.utils.book_new();
    const safeSheetName = "BaoGiaChiTiet";
    
    const aoa: (string | number | null)[][] = [];
    const merges: XLSX.Range[] = [];
    const vndFormat = '#,##0';
    const usdFormat = '"$"#,##0';

    const headers = ["Danh mục", ...GROUP_SIZES.map(s => `${s} khách`)];
    if (showCustomColumn) headers.push(`${customGuestCount} khách (tùy chỉnh)`);
    const colCount = headers.length;

    // --- MAIN TITLES ---
    aoa.push(['GreenSeaTour']);
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } });
    aoa.push([`Bảng Báo Giá Chi Tiết Chương Trình Du Lịch "${tourTitle}"`]);
    merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: colCount - 1 } });
    aoa.push([]); // Spacer

    // --- DETAIL TABLE ---
    aoa.push(headers);
    const detailTableStartRow = aoa.length;

    Object.keys(costData).forEach(day => {
        const dayRowIndex = aoa.length;
        aoa.push([day]);
        merges.push({ s: { r: dayRowIndex, c: 0 }, e: { r: dayRowIndex, c: colCount - 1 } });

        costData[day].forEach(item => {
            const row: (string | number | null)[] = [ `    ${item.current_name || item.category}` ];
            GROUP_SIZES.forEach(size => {
                const value = item.current_prices?.[`${size} khách`];
                row.push(typeof value === 'number' ? value : null);
            });
            if (showCustomColumn) {
                const value = item.current_prices?.['custom_khách'];
                row.push(typeof value === 'number' ? value : null);
            }
            aoa.push(row);
        });
    });

    const detailTableEndRow = aoa.length -1;

    // --- TOTALS ---
    aoa.push([]); // spacer
    
    const totalsVNDRow: (string | number | null)[] = ["Tổng (VNĐ)"];
    GROUP_SIZES.forEach(size => totalsVNDRow.push(totalsVND[size]));
    if(showCustomColumn) totalsVNDRow.push(totalsVND.custom);
    aoa.push(totalsVNDRow);
    const totalVndRowIdx = aoa.length - 1;

    const dollarTotals: ({ [key in GroupSizeKey]: number } & { custom: number | null }) = {} as any;
    GROUP_SIZES.forEach(size => { dollarTotals[size] = Math.round(totalsVND[size] / exchangeRate); });
    dollarTotals.custom = totalsVND.custom !== null ? Math.round(totalsVND.custom / exchangeRate) : null;
    
    const dollarTotalsRow: (string | number | null)[] = ["Giá Dollar"];
    GROUP_SIZES.forEach(size => dollarTotalsRow.push(dollarTotals[size]));
    if(showCustomColumn) dollarTotalsRow.push(dollarTotals.custom);
    aoa.push(dollarTotalsRow);
    const dollarTotalRowIdx = aoa.length - 1;

    const finalPricesRow: (string | number | null)[] = ["Báo giá (USD)"];
    GROUP_SIZES.forEach(size => finalPricesRow.push(Number(finalUsdPrices[size] ?? 0)));
    if(showCustomColumn) finalPricesRow.push(Number(finalUsdPrices.custom ?? 0));
    aoa.push(finalPricesRow);
    const finalPriceRowIdx = aoa.length -1;

    // --- SUMMARY TABLE ---
    aoa.push([]); aoa.push([]); // spacers
    
    const summaryHeadersDef = secondTourData.ranges;
    const summaryColCount = summaryHeadersDef.length + 2; // +2 for 'Thời gian' and 'Ngủ đơn'

    const summaryTitleRowIdx = aoa.length;
    aoa.push([`Giá Tour Theo Số Lượng Khách (${secondTourData.date_range})`]);
    merges.push({ s: { r: summaryTitleRowIdx, c: 0 }, e: { r: summaryTitleRowIdx, c: summaryColCount - 1 } });
    
    aoa.push(['Thời gian', ...summaryHeadersDef.map(h => h.header), 'Ngủ đơn']);

    const summaryDataRow: (string|number)[] = [secondTourData.date_range];
    summaryHeadersDef.forEach(h => summaryDataRow.push(Number(finalUsdPrices[h.priceKey] ?? 0)));
    summaryDataRow.push(`+${singleSupplementUSD}$`);
    aoa.push(summaryDataRow);
    const summaryDataRowIdx = aoa.length - 1;

    aoa.push([]); // spacer

    // Dynamic calculation for notes section merge
    const note1ColSpan = Math.floor((summaryHeadersDef.length - 1) / 2);
    const note2ColSpan = (summaryHeadersDef.length -1) - note1ColSpan;
    const note1StartCol = 1;
    const note1EndCol = note1StartCol + note1ColSpan;
    const note2StartCol = note1EndCol + 1;
    const note2EndCol = note2StartCol + note2ColSpan -1;
    

    const note1Content = ['Ghi chú:', 'Không phí trưởng đoàn tour'];
    const note2Content = ['Phí trưởng đoàn tour 1 người'];

    // Fill with nulls to help merging
    for(let i=0; i < note1ColSpan; i++) note1Content.push(null as any);
    for(let i=0; i < note2ColSpan -1; i++) note2Content.push(null as any);
    
    aoa.push([...note1Content, ...note2Content]);
    let notesRow = aoa.length-1;
    merges.push({ s: { r: notesRow, c: note1StartCol }, e: { r: notesRow, c: note1EndCol } });
    merges.push({ s: { r: notesRow, c: note2StartCol }, e: { r: notesRow, c: note2EndCol } });
    
    const note1SubContent = [null, 'Nếu có trưởng đoàn tour riêng: +100$'];
    const note2SubContent = ['Nếu thêm trưởng đoàn tour khác: +60$'];
    for(let i=0; i < note1ColSpan; i++) note1SubContent.push(null as any);
    for(let i=0; i < note2ColSpan -1; i++) note2SubContent.push(null as any);

    aoa.push([...note1SubContent, ...note2SubContent]);
    notesRow = aoa.length-1;
    merges.push({ s: { r: notesRow, c: note1StartCol }, e: { r: notesRow, c: note1EndCol } });
    merges.push({ s: { r: notesRow, c: note2StartCol }, e: { r: notesRow, c: note2EndCol } });

    const finalNoteLine = [null, null, 'Nếu ngủ riêng: +100$'];
    while(finalNoteLine.length < note1ColSpan + note2ColSpan +2) finalNoteLine.splice(1, 0, null as any);

    aoa.push(finalNoteLine);
    notesRow = aoa.length-1;
    merges.push({ s: { r: notesRow, c: note2StartCol }, e: { r: notesRow, c: note2EndCol } });

    // --- CREATE SHEET and APPLY STYLES ---
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws['!merges'] = merges;
    ws['!cols'] = [ { wch: 40 }, ...Array(colCount - 1).fill({ wch: 15 }) ];

    // Apply number formats by iterating through the sheet
    for (let R = detailTableStartRow; R < aoa.length; ++R) {
        if (!aoa[R] || aoa[R].length === 0) continue; // Skip empty rows

        for (let C = 1; C < colCount; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!ws[cell_ref] || typeof ws[cell_ref].v !== 'number') continue;
            
            // Format detail table items and totals
            if (R >= detailTableStartRow && R <= detailTableEndRow || R === totalVndRowIdx) {
                 ws[cell_ref].z = vndFormat;
            } else if (R === dollarTotalRowIdx || R === finalPriceRowIdx) {
                ws[cell_ref].z = usdFormat;
            }
        }
    }
    
    for (let C = 1; C < summaryColCount - 1; ++C) {
        const cell_address = { c: C, r: summaryDataRowIdx };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (ws[cell_ref] && typeof ws[cell_ref].v === 'number') {
            ws[cell_ref].z = usdFormat;
        }
    }

    // --- WRITE FILE ---
    XLSX.utils.book_append_sheet(wb, ws, safeSheetName);
    const safeTitle = tourTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    XLSX.writeFile(wb, `bao_gia_${safeTitle}.xlsx`);
};


export const saveTourData = (dataToSave: FullTourSaveData) => {
    const jsonString = JSON.stringify(dataToSave, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = dataToSave.tourTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${safeTitle}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
