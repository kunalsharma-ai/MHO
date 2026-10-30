import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { cards } from '../lib/cards.js';
import { applyTheme } from '../lib/theme.js';
import ExternalCard from './ExternalCard.jsx';

export default function CardHost() {
  const entries = useSyncExternalStore(cards.subscribe, cards.snapshot);
  useEffect(() => { applyTheme('en', 'light'); }, []);
  return entries.map((e) => createPortal(<ExternalCard item={e.item} />, e.el, e.key));
}
