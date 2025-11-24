import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import tailwindStyles from './index.css?inline';
import resizableStyles from 'react-resizable/css/styles.css?inline';

const ShadowWrapper = ({ children }) => {
  const hostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useEffect(() => {
    if (hostRef.current && !shadowRoot) {
      const shadow = hostRef.current.shadowRoot || hostRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(shadow);
    }
  }, [shadowRoot]);

  return (
    <div ref={hostRef} id="localstorage-viewer-host">
      {shadowRoot &&
        createPortal(
          <>
            <style>{tailwindStyles}</style>
            <style>{resizableStyles}</style>
            <style>{`
              .localstorage-viewer-root {
                all: initial;
                display: block;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                color: #1f2937; /* tailwind gray-800 */
                line-height: 1.5;
                font-size: 16px;
              }
            `}</style>
            <div className="localstorage-viewer-root">
              {children}
            </div>
          </>,
          shadowRoot
        )}
    </div>
  );
};

export default ShadowWrapper;
