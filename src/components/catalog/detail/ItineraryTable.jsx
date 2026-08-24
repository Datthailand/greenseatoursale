import React from 'react';
import { t } from '../constants';

export default function ItineraryTable({ tour, language, hideMeals }) {
  return (
    <div className="itinerary-table">
      {tour.itinerary.map((day) => {
        const title = language === 'TH' && day.titleTh ? day.titleTh : day.title;
        const notes = language === 'TH' && day.notesTh ? day.notesTh : day.notes;
        const lunch = language === 'TH' && day.lunchTh ? day.lunchTh : day.lunch;
        const dinner = language === 'TH' && day.dinnerTh ? day.dinnerTh : day.dinner;
        const lunchMenu = language === 'TH' ? (day.lunchMenuTh || day.lunchMenu || []) : (day.lunchMenu || []);
        const dinnerMenu = language === 'TH' ? (day.dinnerMenuTh || day.dinnerMenu || []) : (day.dinnerMenu || []);
        const overnight = language === 'TH' && day.overnightTh
          ? day.overnightTh
          : (day.overnight || (day.day === tour.duration ? t('notAvailable', language) : tour.nights));

        const mealsList = [];
        const hasB = day.day > 1 || (day.notes && day.notes.some(n => n.toLowerCase().includes('breakfast'))) || (day.notesTh && day.notesTh.some(n => n.includes('เช้า')));
        const hasL = !!(lunch && lunch.trim() && lunch.toLowerCase() !== 'n/a');
        const hasD = !!(dinner && dinner.trim() && dinner.toLowerCase() !== 'n/a');

        if (hasB) mealsList.push('B');
        if (hasL) mealsList.push('L');
        if (hasD) mealsList.push('D');

        return (
          <div className="itinerary-row" key={`${tour.id}-${day.day}`}>
            <div className="itinerary-day">{t('day', language)} {day.day}</div>
            <div className="itinerary-main">
              <strong>{title}</strong>
              <ul className="itinerary-notes">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              {overnight && overnight !== t('notAvailable', language) && (
                <div className="itinerary-overnight-pdf">
                  {t('overnight', language)}: {overnight}
                </div>
              )}
            </div>
            <div className="itinerary-side">
              {hideMeals ? (
                mealsList.length > 0 && (
                  <div className="meal-summary-general">
                    {language === 'TH' ? 'มื้ออาหาร' : 'Meals'}: {mealsList.join(', ')}
                  </div>
                )
              ) : (
                (lunch || dinner) && (
                  <div className="meal-venues">
                    {lunch && (
                      <div>
                        <strong>{t('lunch', language)}: {lunch}</strong>
                        {!!lunchMenu?.length && (
                          <ol>
                            {lunchMenu.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ol>
                        )}
                      </div>
                    )}
                    {dinner && (
                      <div>
                        <strong>{t('dinner', language)}: {dinner}</strong>
                        {!!dinnerMenu?.length && (
                          <ol>
                            {dinnerMenu.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ol>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
