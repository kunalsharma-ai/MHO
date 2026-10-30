import { memo } from 'react';

/**
 * Odometer-style number: each digit is a vertical reel 0–9 that rolls to its value (CSS transform only).
 * Grouping separators and other characters come from the formatter, so every language keeps its own digits style.
 */
function RollNumber({ value, format = String, className = '', label }) {
  const text = format(value);
  return (
    <span className={'roll ' + className} role="img" aria-label={label || text}>
      {[...text].map((ch, i, arr) => {
        const d = ch.charCodeAt(0) - 48;
        if (d >= 0 && d <= 9) {
          return (
            <span key={arr.length - i} className="roll-d" aria-hidden="true">
              <span className="roll-reel" style={{ transform: `translateY(${-d * 10}%)`, transitionDelay: `${(arr.length - i) * 40}ms` }}>
                {'0123456789'.split('').map((n) => <i key={n}>{n}</i>)}
              </span>
            </span>
          );
        }
        return <span key={'s' + (arr.length - i)} className="roll-s" aria-hidden="true">{ch}</span>;
      })}
    </span>
  );
}
export default memo(RollNumber);
