import React from 'react';
import { MapPin, CalendarDays, Users, Building2, PlaneTakeoff } from 'lucide-react';
import { formatMoney, getHotelStandard, t } from '../constants';

export default function TourCard({ tour, active, onSelect, currency, language, hidePrice }) {
  return (
    <button className={`tour-card ${active ? 'is-active' : ''}`} type="button" onClick={onSelect}>
      <img src={tour.assets.thumb || tour.assets.cover} alt="" />
      <div className="tour-card-body">
        <div className="tour-card-title-row">
          <div>
            <strong>{tour.code}</strong>
            <h2>{tour.title}</h2>
          </div>
          {!hidePrice && (
            <div className="card-price">
              <span>{t('from', language)}</span>
              <strong>{formatMoney(tour.priceFrom, currency)}</strong>
              <small>{t('perPerson', language)}</small>
            </div>
          )}
        </div>
        <div className="route-line">
          <MapPin size={15} />
          {tour.route}
        </div>
        <div className="card-facts">
          <span>
            <CalendarDays size={14} />
            {tour.duration} {t('days', language)} / {Math.max(tour.duration - 1, 1)} {t('nights', language)}
          </span>
          <span>
            <Users size={14} />
            {tour.groupRange}
          </span>
          <span>
            <Building2 size={14} />
            {getHotelStandard(tour)}
          </span>
          <span>
            <PlaneTakeoff size={14} />
            {t('dailyDeparture', language)}
          </span>
        </div>
      </div>
    </button>
  );
}
