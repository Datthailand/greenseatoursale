import React from 'react';
import PricePreviewDesktop from './PricePreviewDesktop.jsx';
import PricePreviewMobile from './PricePreviewMobile.jsx';

export default function PricePreview(props) {
  return (
    <>
      <div className="price-desktop-only">
        <PricePreviewDesktop {...props} />
      </div>
      <div className="price-mobile-only">
        <PricePreviewMobile {...props} />
      </div>
    </>
  );
}
