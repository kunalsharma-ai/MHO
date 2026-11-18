// Sound on/off preference and the description of each language's sound signature.
// Kept separate from sounds.js so the synthesiser (a larger file) can be lazy-loaded.
const STORE = 'mho.sound';

export function isSoundEnabled() {
  try {
    return localStorage.getItem(STORE) !== 'off';
  } catch {
    return true;
  }
}
export function setSoundEnabled(on) {
  try {
    localStorage.setItem(STORE, on ? 'on' : 'off');
  } catch {
    /* storage blocked: setting lasts for this page only */
  }
  // One switch for every sound on the site (header toggle, language picker, chat): tell the others.
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('mho-sound-change', { detail: !!on }));
}
/** Subscribe to sound on/off changes made anywhere on the page. Returns an unsubscribe function. */
export function onSoundChange(fn) {
  if (typeof window === 'undefined') return () => {};
  const h = (e) => fn(!!e.detail);
  window.addEventListener('mho-sound-change', h);
  return () => window.removeEventListener('mho-sound-change', h);
}

/** Short description of each sound (shown as the tooltip in the picker). */
export const SOUND_NAMES = {
  en: 'Bright synth sparkle', 'zh-CN': 'Guzheng glissando & gong', 'zh-TW': 'Erhu glide over pipa', ja: 'Koto & wind chimes', ko: 'Gayageum & janggu',
  hi: 'Sitar, tanpura & tabla', bn: 'Bansuri flute & ektara', ta: 'Veena & mridangam', te: 'Nadaswaram & thavil', mr: 'Dhol-tasha & harmonium',
  gu: 'Dandiya sticks & shehnai', pa: 'Bhangra dhol & tumbi', kn: 'Veena & ghatam', ml: 'Chenda roll & temple bell', ur: 'Qawwali harmonium & claps',
  ar: 'Oud in maqam Rast & darbuka', fa: 'Santur in dastgah Shur', he: 'Clarinet in freygish', tr: 'Bağlama & bendir', es: 'Flamenco guitar & castanets',
  pt: 'Bossa nova guitar', fr: 'Accordion musette', it: 'Mandolin tremolo', de: 'Brass fanfare & timpani', nl: 'Carillon bells',
  ru: 'Balalaika tremolo', uk: 'Bandura cascade', pl: 'Mazurka fiddle', sv: 'Nyckelharpa shimmer', nb: 'Lur horn & ice chimes',
  da: 'Music-box celesta', fi: 'Kantele cascade', el: 'Bouzouki tremolo', cs: 'Polka brass & clarinet', hu: 'Cimbalom run',
  ro: 'Nai pan flute doina', id: 'Gamelan & gong', ms: 'Kompang & rebab', th: 'Ranat xylophone & ching', vi: 'Đàn bầu monochord',
  fil: 'Kulintang gongs', sw: 'Kalimba & djembe',
};

