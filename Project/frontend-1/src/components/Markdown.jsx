// Tiny, safe Markdown renderer for blog bodies (no dangerouslySetInnerHTML).
// Supports: ## / ### headings, paragraphs, - lists, 1. lists, > quotes, **bold**, *italic*, [links](url).
// Internal links (starting with "/") use the client router; external links open in a new tab.
import { Link } from '../router.jsx';

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function inline(text, keyBase = 'i') {
  const out = [];
  const rx = /(\*\*([^*]+)\*\*|\*([^*\s][^*]*?)\*|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = rx.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2]) out.push(<strong key={keyBase + k++}>{inline(m[2], keyBase + k + 'b')}</strong>);
    else if (m[3]) out.push(<em key={keyBase + k++}>{m[3]}</em>);
    else if (m[4]) {
      const href = m[5];
      if (href.startsWith('/')) out.push(<Link key={keyBase + k++} to={href}>{m[4]}</Link>);
      else if (/^https:\/\//.test(href))
        out.push(
          <a key={keyBase + k++} href={href} target="_blank" rel="noopener noreferrer" className="ext">
            {m[4]}
          </a>
        );
      else out.push(m[4]);
    }
    last = rx.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Parse the body into blocks once (also used for the table of contents). */
export function parseBlocks(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks = [];
  let para = [];
  let list = null;
  const flushPara = () => {
    if (para.length) blocks.push({ t: 'p', text: para.join(' ') });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    let m;
    if ((m = line.match(/^(#{2,3})\s+(.*)$/))) {
      flushPara();
      flushList();
      blocks.push({ t: m[1].length === 2 ? 'h2' : 'h3', text: m[2], id: slugify(m[2]) });
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      if (!list || list.t !== 'ul') { flushList(); list = { t: 'ul', items: [] }; }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      if (!list || list.t !== 'ol') { flushList(); list = { t: 'ol', items: [] }; }
      list.items.push(m[1]);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara();
      flushList();
      blocks.push({ t: 'quote', text: m[1] });
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return blocks;
}

export default function Markdown({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === 'h2') return <h2 key={i} id={b.id}>{inline(b.text, `h${i}`)}</h2>;
        if (b.t === 'h3') return <h3 key={i} id={b.id}>{inline(b.text, `h${i}`)}</h3>;
        if (b.t === 'ul') return <ul key={i}>{b.items.map((it, j) => <li key={j}>{inline(it, `l${i}-${j}`)}</li>)}</ul>;
        if (b.t === 'ol') return <ol key={i}>{b.items.map((it, j) => <li key={j}>{inline(it, `l${i}-${j}`)}</li>)}</ol>;
        if (b.t === 'quote') return <blockquote key={i}><p>{inline(b.text, `q${i}`)}</p></blockquote>;
        return <p key={i}>{inline(b.text, `p${i}`)}</p>;
      })}
    </>
  );
}
