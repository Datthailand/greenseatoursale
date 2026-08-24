import React from 'react';
import { formatMoney, t } from '../constants';

export default function PricePreview({ tour, currency, language }) {
  if (!tour.priceRows || tour.priceRows.length === 0) {
    return <p className="price-note">{t('noPriceData', language) || 'No price data available'}</p>;
  }
  const bands = tour.priceRows[0]?.cells?.map((cell) => cell.band) || [];

  return (
    <>
      <div className="section-title-row">
        <h3>{t('priceGrid', language)} <span>({currency} {t('perPerson', language)})</span></h3>
      </div>
      <div className="table-shell">
        <table className={tour.pdfPriceLayout ? 'pdf-price-table' : ''}>
          <thead>
            {tour.pdfPriceLayout && (
              <tr className="pdf-price-title-row">
                <th colSpan={bands.length + 2}>{tour.code} ราคาสำหรับช่วง 01/04-30/12/2026</th>
              </tr>
            )}
            <tr>
              <th>{tour.pdfPriceLayout ? 'จำนวนลูกค้า' : t('season', language)}</th>
              {bands.map((band) => (
                <th key={band}>{band}</th>
              ))}
              <th>{tour.pdfPriceLayout ? 'นอนเดี่ยว' : t('single', language)}</th>
            </tr>
          </thead>
          <tbody>
            {tour.priceRows.map((row) => (
              <tr className={tour.pdfPriceLayout ? 'pdf-main-price-row' : ''} key={row.season}>
                <td className="multiline-cell">
                  {row.season.includes(' - ') ? row.season.replace(' - ', '\n') : row.season}
                </td>
                {row.cells.map((cell) => (
                  <td key={`${row.season}-${cell.band}`}>{formatMoney(cell.value, currency)}</td>
                ))}
                <td>{row.single?.replace(' USD', '$')}</td>
              </tr>
            ))}
            {tour.pdfPriceLayout && tour.priceExtraRows?.map((row) => (
              <tr className="price-extra-row" key={row.label}>
                <td className="multiline-cell">{row.label}</td>
                {row.cells ? (
                  row.cells.map((c, i) => (
                    <td key={i} colSpan={c.colSpan} className="multiline-cell">{c.text}</td>
                  ))
                ) : (
                  <td colSpan={bands.length}>{row.merged}</td>
                )}
                <td>{row.single?.replace(' USD', '$')}</td>
              </tr>
            ))}
            {!tour.pdfPriceLayout && tour.priceExtraRows?.map((row) => {
              const renderedColSpan = row.cells ? row.cells.reduce((acc, c) => acc + c.colSpan, 0) : 0;
              const remaining = bands.length - renderedColSpan;
              return (
                <tr className="price-extra-row" key={row.label}>
                  <td>{row.label}</td>
                  {row.cells ? (
                    <>
                      {row.cells.map((c, i) => (
                        <td key={i} colSpan={c.colSpan}>{c.text}</td>
                      ))}
                      {remaining > 0 && <td colSpan={remaining}></td>}
                    </>
                  ) : (
                    <td colSpan={bands.length}>{row.merged || ''}</td>
                  )}
                  <td>{row.single?.replace(' USD', '$') || ''}</td>
                </tr>
              );
            })}
            {tour.vehicleRows?.map((row) => (
              <tr className="vehicle-table-row" key={row.label}>
                <td>{row.label}</td>
                {row.cells ? (
                  row.cells.map((c, i) => (
                    <td key={i} colSpan={c.colSpan} className="multiline-cell">{c.text}</td>
                  ))
                ) : (
                  <>
                    <td className="multiline-cell" colSpan={row.leftSpan || Math.floor((bands.length + 1) / 2)}>{row.left}</td>
                    <td className="multiline-cell" colSpan={row.rightSpan || Math.ceil((bands.length + 1) / 2)}>{row.right}</td>
                  </>
                )}
              </tr>
            ))}
            {tour.pdfPriceLayout && tour.remarksTh && (tour.remarksTh.left?.length > 0 || tour.remarksTh.right?.length > 0) && (() => {
              const totalBandCols = bands.length + 1; // +1 for นอนเดียว col
              const vehicleRow = tour.vehicleRows?.[0];
              let defaultLeftSpan = Math.floor(totalBandCols / 2);
              if (vehicleRow && vehicleRow.cells && vehicleRow.cells.length > 1) {
                defaultLeftSpan = vehicleRow.cells.slice(0, -1).reduce((acc, c) => acc + c.colSpan, 0);
              }
              const leftSpan = tour.remarksLeftSpan || defaultLeftSpan;
              const middleSpan = tour.remarksMiddleSpan || 0;
              const rightSpan = tour.remarksRightSpan || (totalBandCols - leftSpan - middleSpan);
              const leftText = tour.remarksTh.left?.join('\n') || '';
              const rightText = tour.remarksTh.right?.join('\n') || '';
              return (
                <tr className="remarks-table-row">
                  <td className="remarks-table-label">หมายเหตุ</td>
                  {leftText && <td colSpan={leftSpan} className="multiline-cell remarks-table-cell">{leftText}</td>}
                  {!!middleSpan && <td colSpan={middleSpan} className="remarks-table-cell-empty"></td>}
                  {rightText && <td colSpan={rightSpan} className="multiline-cell remarks-table-cell">{rightText}</td>}
                </tr>
              );
            })()}
          </tbody>
        </table>
      </div>
      {!!tour.surcharges?.length && !tour.priceExtraRows?.length && (
        <p className="price-note">{t('note', language)}: {tour.surcharges.slice(0, 2).join(' / ')}</p>
      )}
    </>
  );
}
