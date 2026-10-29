import { Link } from 'react-router-dom';

// Renders "text with [label](/path) links" as crawlable anchors.
export default function RichText({ text }) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    if (href.startsWith('/')) parts.push(<Link key={i++} to={href}>{label}</Link>);
    else parts.push(<a key={i++} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
