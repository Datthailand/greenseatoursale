import React from 'react';
import { ThailandFlag, UKFlag } from '../ui/Flags';
import { t } from '../constants';

export default function CatalogNavbar({ currency, cycleCurrency, language, cycleLanguage }) {
  return (
    <header className="topbar">
      <div className="brand">
        <img src="/assets/logo-transparent.png" alt="Green Sea Tour Logo" className="brand-logo" style={{ objectFit: 'contain' }} />
        <div>
          <strong>GREEN SEA TOUR</strong>
          <span>{t('tagline', language)}</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="currency-btn" type="button" onClick={cycleCurrency}>
          {currency}
        </button>
        <button className="language-btn" type="button" aria-label="Language" onClick={cycleLanguage}>
          {language === 'TH' ? <ThailandFlag /> : <UKFlag />}
          <span>{language}</span>
        </button>
      </div>
    </header>
  );
}
