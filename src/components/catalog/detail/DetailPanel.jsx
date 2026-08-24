import React from 'react';
import { X, CalendarDays, MapPin, PlaneTakeoff, ExternalLink, Star, CheckCircle2 } from 'lucide-react';
import { formatMoney, getHotelStandard, t } from '../constants';
import ListBlock from '../ui/ListBlock';
import SmallInfoCard from '../ui/SmallInfoCard';
import ItineraryTable from './ItineraryTable';
import PricePreview from './PricePreview';

export default function DetailPanel({
  tour,
  onClose,
  onSave,
  onOpenLanding,
  currency,
  language,
  containerRef,
  hidePrice,
  hideMeals,
  hidePdf
}) {
  const inclusions = language === 'TH' && tour.inclusionsTh ? tour.inclusionsTh : tour.inclusions;
  const exclusions = language === 'TH' && tour.exclusionsTh ? tour.exclusionsTh : tour.exclusions;
  const childRates = language === 'TH' && tour.childRatesTh ? tour.childRatesTh : tour.childRates;
  const paymentRows = language === 'TH' && tour.paymentTermsTh ? tour.paymentTermsTh : tour.paymentTermsRows;
  const cancellationRows = language === 'TH' && tour.cancellationPolicyTh ? tour.cancellationPolicyTh : tour.cancellationRows;

  return (
    <section className="detail-panel" ref={containerRef} id="detail-panel">
      <button className="close-button" type="button" aria-label="Close detail" onClick={onClose}>
        <X size={22} />
      </button>

      <div className="detail-header">
        <div className="detail-title">
          <div className="detail-code">
            <strong>{tour.code}</strong>
            <span className={`package-chip ${tour.packageType.toLowerCase()}`}>{tour.packageType}</span>
          </div>
          <h1>{tour.title}</h1>
          <div className="detail-meta">
            <span>
              <CalendarDays size={15} />
              {tour.duration} {t('days', language)} / {Math.max(tour.duration - 1, 1)} {t('nights', language)}
            </span>
            <span>
              <MapPin size={15} />
              {tour.route}
            </span>
            <span>
              <PlaneTakeoff size={15} />
              {t('dailyDeparture', language)}
            </span>
          </div>
          <div className="detail-facts-line">
            <span>
              <strong>{t('groupSize', language)}</strong> {tour.groupRange}
            </span>
            <span>
              <strong>{t('hotelStandard', language)}</strong> {getHotelStandard(tour)}
            </span>
          </div>
        </div>

        {!hidePrice && (
          <div className="detail-price">
            <span>{t('from', language)}</span>
            <strong>{formatMoney(tour.priceFrom, currency)}</strong>
            <small>{t('perPerson', language)}</small>
          </div>
        )}
      </div>

      <div className="detail-actions">
        {tour.id?.toLowerCase() === 'fitdad01' && (
          <a
            href="/?tour=fitdad01&mode=landing#pricing-terminal"
            className="reactbits-landing-btn"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenLanding) {
                onOpenLanding('fitdad01');
              } else {
                window.location.href = '/?tour=fitdad01&mode=landing#pricing-terminal';
              }
            }}
          >
            <span>Landing Page</span>
          </a>
        )}
        {!hidePdf && (
          <a className="primary-button" href={tour.individualPdfLink || tour.assets.pdf} target="_blank" rel="noreferrer">
            <ExternalLink size={17} />
            {t('viewPdf', language)}
          </a>
        )}
        <button className="star-button" type="button" aria-label="Save tour" onClick={onSave}>
          <Star size={18} />
        </button>
      </div>

      <div className="detail-divider" />

      {/* Itinerary Section */}
      <section className="detail-section">
        <h3>{t('itineraryOverview', language)}</h3>
        <ItineraryTable tour={tour} language={language} hideMeals={hideMeals} />
      </section>

      {/* Price Grid Preview */}
      {!hidePrice && (
        <section className="detail-section">
          <PricePreview tour={tour} currency={currency} language={language} />
        </section>
      )}

      {/* Inclusions & Exclusions */}
      <section className="detail-section inclusion-grid">
        <ListBlock icon={CheckCircle2} title={t('inclusions', language)} items={inclusions} tone="include" />
        <ListBlock icon={X} title={t('exclusions', language)} items={exclusions} tone="exclude" />
      </section>

      {/* Policies & Terms Grid */}
      <section className="bottom-grid">
        {!hidePrice && childRates?.length > 0 && (
          <SmallInfoCard title={t('childRates', language)} rows={childRates.map((item) => [item, ''])} />
        )}
        {!hidePrice && (
          <SmallInfoCard
            title={t('paymentTerms', language)}
            rows={paymentRows || [
              [t('bookingDeposit', language), '30%'],
              [t('finalPayment', language), '7-14 days prior'],
              [t('paymentMethods', language), t('bankTransfer', language)],
            ]}
          />
        )}
        {!hidePrice && (
          <SmallInfoCard
            title={t('cancellationPolicy', language)}
            rows={cancellationRows || [
              ['21+ days prior', t('noCharge', language)],
              ['20 - 7 days prior', '50%'],
              ['0 - 6 days prior', '90%'],
            ]}
          />
        )}
        {!hidePrice && !tour.pdfPriceLayout && tour.remarksTh && (tour.remarksTh.left?.length > 0 || tour.remarksTh.right?.length > 0) && (
          <div className="remarks-card">
            <h3>{language === 'TH' ? 'นโยบายหัวหน้าทัวร์' : 'Tour Leader Policy'}</h3>
            <div className="remarks-grid">
              {tour.remarksTh.left && tour.remarksTh.left.length > 0 && (
                <div className="remarks-col">
                  <span className="remarks-col-title">{tour.remarksTh.left[0]}</span>
                  <ul className="remarks-list">
                    {tour.remarksTh.left.slice(1).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.remarksTh.right && tour.remarksTh.right.length > 0 && (
                <div className="remarks-col">
                  <span className="remarks-col-title">{tour.remarksTh.right[0]}</span>
                  <ul className="remarks-list">
                    {tour.remarksTh.right.slice(1).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Consultant Contacts */}
      <div className="direct-contacts-grid">
        {/* Ms. Kim */}
        <a
          href="https://line.me/ti/p/BSLZR5dyBa"
          target="_blank"
          rel="noopener noreferrer"
          className="direct-qr-card"
        >
          <img
            src="/assets/qr-kim.png"
            alt="Ms. Kim LINE QR"
            className="direct-qr-img"
          />
          <div className="direct-qr-name">Ms. Kim</div>
        </a>

        {/* Mr. Khanh */}
        <a
          href="https://line.me/ti/p/U1vOdylKTL"
          target="_blank"
          rel="noopener noreferrer"
          className="direct-qr-card"
        >
          <img
            src="/assets/qr-khanh.png"
            alt="Mr. Khanh LINE QR"
            className="direct-qr-img"
          />
          <div className="direct-qr-name">Mr. Khanh</div>
        </a>
      </div>
    </section>
  );
}
