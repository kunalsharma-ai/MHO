// Single source of truth for every account action, palette and support status.
// All user-facing text lives here (and in copy.js) so it can be translated in one place.

export const SLA_TEXT = 'Within 7 working days';
export const SLA_SENTENCE = 'Your request will be processed by the MyHealthOpinions Support Team within 7 working days.';

/**
 * Per-option palettes.
 * c1/c2/c3  accent colours        ink     text colour on the filled button
 * b1/b2     filled button gradient strong  accent text in the light theme (AA contrast on pastel)
 * d1/d2     dark-theme card ground l1/l2  light-theme card ground (never white)
 */
export const PALETTES = {
  d30:   { name: 'Mint',     c1: '#10B981', c2: '#6EE7B7', c3: '#0EA5E9', b1: '#10B981', b2: '#5EEAD4', ink: '#03291D', strong: '#047857', d1: '#063B2C', d2: '#0A2236', l1: '#E7FBF3', l2: '#E1F4FC' },
  d60:   { name: 'Lavender', c1: '#8B5CF6', c2: '#C4B5FD', c3: '#6366F1', b1: '#8B5CF6', b2: '#A78BFA', ink: '#FFFFFF', strong: '#6D28D9', d1: '#25164F', d2: '#141B45', l1: '#F3EFFF', l2: '#ECEEFF' },
  d90:   { name: 'Coral',    c1: '#F96F5D', c2: '#FDBA74', c3: '#FB7185', b1: '#F96F5D', b2: '#FDBA74', ink: '#3A0C04', strong: '#C2410C', d1: '#3D1410', d2: '#2A0F24', l1: '#FFF0EC', l2: '#FFF5E6' },
  hold:  { name: 'Ocean',    c1: '#0EA5E9', c2: '#7DD3FC', c3: '#1E40AF', b1: '#0284C7', b2: '#38BDF8', ink: '#FFFFFF', strong: '#0369A1', d1: '#062A44', d2: '#0B1B3F', l1: '#E6F5FE', l2: '#E8EEFF' },
  del:   { name: 'Cardinal', c1: '#E11D48', c2: '#FDA4AF', c3: '#9F1239', b1: '#BE123C', b2: '#E11D48', ink: '#FFFFFF', strong: '#BE123C', d1: '#3F0A18', d2: '#200814', l1: '#FFF0F3', l2: '#FFE6EC' },
  react: { name: 'Pulse',    c1: '#F59E0B', c2: '#FDE68A', c3: '#F97316', b1: '#F59E0B', b2: '#FCD34D', ink: '#3A1F00', strong: '#B45309', d1: '#3A2405', d2: '#2B1408', l1: '#FFF8E6', l2: '#FFF0E0' },
};

/** Background "mood" colours (page colour grading) */
export const MOODS = {
  brand: ['#E53935', '#F08A2C', '#1E7FA6'],
  d30:   ['#10B981', '#0EA5E9', '#6EE7B7'],
  d60:   ['#8B5CF6', '#6366F1', '#C4B5FD'],
  d90:   ['#F96F5D', '#FB7185', '#FDBA74'],
  hold:  ['#0EA5E9', '#1E40AF', '#7DD3FC'],
  del:   ['#E11D48', '#9F1239', '#FDA4AF'],
  react: ['#F59E0B', '#F97316', '#FDE68A'],
};

export const paletteVars = (k) => {
  const p = PALETTES[k];
  return {
    '--c1': p.c1, '--c2': p.c2, '--c3': p.c3, '--b1': p.b1, '--b2': p.b2, '--ink': p.ink,
    '--strong': p.strong, '--d1': p.d1, '--d2': p.d2, '--l1': p.l1, '--l2': p.l2,
  };
};

const TEMP_BULLETS = [
  'Your account will be deactivated.',
  'You will not be able to participate during the deactivation period.',
  'Your account will remain in our system.',
  'Your account can be reactivated according to the applicable reactivation process.',
  'Your request will be reviewed by our Support Team.',
];

const temp = (n, extra) => ({
  key: `d${n}`,
  apiAction: `deactivate_${n}`,
  label: `Deactivate for ${n} Days`,
  cta: `Deactivate for ${n} Days`,
  internal: `Temporary Deactivation — ${n}`,
  type: 'Temporary Deactivation',
  durationLabel: 'Duration',
  duration: `${n} Days`,
  title: `Deactivate Your Account for ${n} Days?`,
  bullets: TEMP_BULLETS,
  summary: `You have requested to temporarily deactivate your MyHealthOpinions account for ${n} days.`,
  ticketType: 'Account Deactivation',
  ticketRequest: `${n}-Day Temporary Deactivation`,
  emailType: `Temporary Deactivation (${n} days)`,
  completedEmail: {
    heading: 'Your MyHealthOpinions account has been temporarily deactivated.',
    rows: [['Deactivation period', `${n} days`], ['Status', 'Deactivated']],
  },
  result: { status: 'deactivated', days: n },
  chips: [['cal', `${n} days`], ['shield', 'Account stays in our system']],
  ...extra,
});

export const ACTIONS = {
  d30: temp(30, { tag: 'Short rest', tagIcon: 'cal', desc: 'Take a short break from MyHealthOpinions. Your account will be temporarily deactivated for 30 days.' }),
  d60: temp(60, { tag: 'Recharge', tagIcon: 'leaf', desc: 'Take a longer break. Your account will be temporarily deactivated for 60 days.' }),
  d90: temp(90, { tag: 'Long recovery', tagIcon: 'sun', desc: 'Temporarily deactivate your account for 90 days.' }),
  hold: {
    key: 'hold', apiAction: 'hold',
    label: 'Put My Account on Hold', cta: 'Put Account on Hold', tag: 'Open-ended', tagIcon: 'moon',
    desc: "Put your account on hold until you decide to return. You can request reactivation whenever you're ready.",
    internal: 'Indefinite Hold', type: 'Account Hold', durationLabel: 'Duration', duration: 'Until you request reactivation',
    title: 'Put Your Account on Hold?',
    bullets: [
      'Your account will be put on hold.',
      'You will not be able to participate while your account is on hold.',
      'Your account will remain in our system.',
      "You can request reactivation whenever you're ready.",
      'Your request will be reviewed by our Support Team.',
    ],
    summary: 'You have requested to put your MyHealthOpinions account on hold until you decide to return.',
    ticketType: 'Account Hold', ticketRequest: 'Indefinite Hold', emailType: 'Account Hold',
    completedEmail: {
      heading: 'Your MyHealthOpinions account has been put on hold.',
      rows: [['Hold period', 'Until you request reactivation'], ['Status', 'On hold']],
      note: "You can request reactivation whenever you're ready from My Account.",
    },
    result: { status: 'hold' },
    chips: [['pause', 'Until you return'], ['power', 'Reactivate any time'], ['shield', 'Account stays in our system']],
  },
  del: {
    key: 'del', apiAction: 'delete',
    label: 'Permanently Delete My Account', cta: 'Delete My Account', tag: 'Permanent', tagIcon: 'alert',
    desc: 'Permanently delete your MyHealthOpinions account. This request cannot normally be reversed after it has been completed.',
    internal: 'Permanent Deletion Request', type: 'Permanent Account Deletion', durationLabel: 'Duration', duration: 'Permanent',
    title: 'Permanent Account Deletion',
    intro: 'You are requesting permanent deletion of your MyHealthOpinions account.',
    warnings: [
      'You may lose access to your account.',
      'Your account may no longer be recoverable after deletion is completed.',
      'Any applicable rewards/benefits may be affected according to the MyHealthOpinions terms.',
      'Certain information may need to be retained where required by law or for legitimate legal/security purposes.',
      'Your request will be processed by the MyHealthOpinions Support Team.',
    ],
    summary: 'You have requested permanent deletion of your MyHealthOpinions account.',
    ticketType: 'Account Deletion', ticketRequest: 'Permanent Deletion Request', emailType: 'Permanent Account Deletion',
    completedEmail: { heading: 'Your MyHealthOpinions account deletion request has been completed.', rows: [] },
    result: { status: 'deleted' },
    chips: [['alert', 'Extra warning step'], ['lock', 'Password required'], ['headset', 'Processed by Support']],
  },
  react: {
    key: 'react', apiAction: 'reactivate',
    label: 'Reactivate My Account', cta: 'Reactivate My Account', tag: 'Account on hold', tagIcon: 'pause',
    desc: 'Your MyHealthOpinions account is currently on hold. Would you like to reactivate it?',
    internal: 'Reactivation / Unhold', type: 'Reactivation', durationLabel: 'Current status', duration: 'On hold',
    confirmDurationLabel: 'Effective', confirmDuration: 'Once processed by Support',
    title: 'Reactivate Your Account?',
    bullets: [
      'Your account will be taken off hold and reactivated.',
      'You will be able to participate again once reactivation is complete.',
      'Your existing account details stay the same.',
      'Your request will be reviewed by our Support Team.',
    ],
    summary: 'You have requested to reactivate your MyHealthOpinions account.',
    ticketType: 'Account Reactivation', ticketRequest: 'Reactivation / Unhold', emailType: 'Account Reactivation',
    completedEmail: {
      heading: 'Your MyHealthOpinions account has been reactivated.',
      rows: [['Status', 'Active']],
      note: 'Welcome back. You can sign in and take surveys again.',
    },
    result: { status: 'active' },
    chips: [['lock', 'Password required'], ['headset', 'Processed by Support'], ['clock', 'Within 7 working days']],
  },
};

export const TEMP_KEYS = ['d30', 'd60', 'd90'];

/** Maps API action codes back to UI keys */
export const KEY_BY_API = Object.fromEntries(Object.values(ACTIONS).map((a) => [a.apiAction, a.key]));

export const STATUS = {
  submitted:         { label: 'Request Submitted', desc: 'You have submitted the request.', ticket: 'Pending Support Action', tone: 'amber' },
  under_review:      { label: 'Under Review', desc: 'Our Support Team is reviewing your request.', ticket: 'Under Review', tone: 'blue' },
  in_progress:       { label: 'Action in Progress', desc: 'Support has started processing your request.', ticket: 'Action in Progress', tone: 'violet' },
  completed:         { label: 'Completed', desc: 'The requested action has been completed.', ticket: 'Completed', tone: 'green' },
  unable_to_process: { label: 'Unable to Process', desc: 'Your request cannot be completed right now. Our Support Team will contact you.', ticket: 'Unable to Process', tone: 'red' },
  cancelled:         { label: 'Cancelled', desc: 'You cancelled this request before it was completed. No changes were made.', ticket: 'Cancelled', tone: 'grey' },
};
export const FLOW = ['submitted', 'under_review', 'in_progress', 'completed'];
export const TERMINAL = ['completed', 'unable_to_process', 'cancelled'];
export const CANCELLABLE = ['submitted', 'under_review'];

export const NEXT_STEPS = [
  'Your request has been received.',
  'Your account details will be reviewed by our Support Team.',
  'The requested action will be processed.',
  'The action will be completed within 7 working days.',
  'You will receive an email confirmation once the request has been completed.',
];

export const FLOW_RAIL = [
  { icon: 'sliders', hue: '#10B981', title: 'Choose an action', sub: 'Break, hold or delete' },
  { icon: 'key', hue: '#8B5CF6', title: 'Enter password', sub: 'Confirms it’s you' },
  { icon: 'check', hue: '#0EA5E9', title: 'Final confirmation', sub: 'Review and submit' },
  { icon: 'hash', hue: '#1E7FA6', title: 'Request ID', sub: 'Generated instantly' },
  { icon: 'ticket', hue: '#F08A2C', title: 'Support ticket', sub: 'Sent to our team' },
  { icon: 'headset', hue: '#F96F5D', title: 'Support review', sub: 'Details checked' },
  { icon: 'shield', hue: '#F59E0B', title: 'Action completed', sub: 'Within 7 working days' },
  { icon: 'mail', hue: '#E53935', title: 'Email confirmation', sub: 'Once it’s done' },
];
