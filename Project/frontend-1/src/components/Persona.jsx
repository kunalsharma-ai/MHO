// Illustrated people (pure SVG, no image downloads). Used in heroes, orbits and the chat.
// Replace with licensed photography later if desired — keep descriptive alt/aria labels.
const SKIN = ['#f5d0b5', '#e8b48f', '#c98d65', '#9b6a47', '#6e4a33', '#f0c8a0'];
const HAIR = ['#2b1d16', '#4a2f1f', '#1b1b1f', '#7a4a26', '#b98a4e', '#3a2a22'];

const KINDS = {
  doctor: { bg: '#dfe6ff', outfit: '#ffffff', trim: '#3d5afe', label: 'Doctor' },
  nurse: { bg: '#ffe0ec', outfit: '#5ec5e0', trim: '#ffffff', label: 'Nurse' },
  pharmacist: { bg: '#dcfce7', outfit: '#ffffff', trim: '#16a34a', label: 'Pharmacist' },
  patient: { bg: '#d1fae5', outfit: '#10b981', trim: '#065f46', label: 'Patient' },
  caregiver: { bg: '#fef3c7', outfit: '#f59e0b', trim: '#b45309', label: 'Caregiver' },
  consumer: { bg: '#ede9fe', outfit: '#8b5cf6', trim: '#4c1d95', label: 'Consumer' },
  business: { bg: '#e0f2fe', outfit: '#1e3a8a', trim: '#ffffff', label: 'Business professional' },
  student: { bg: '#fce7f3', outfit: '#ec4899', trim: '#831843', label: 'Student' },
  elder: { bg: '#ffedd5', outfit: '#0ea5e9', trim: '#075985', label: 'Retiree' },
};

import { useId } from 'react';

export default function Persona({ kind = 'consumer', skin = 0, hair = 0, hairStyle = 0, size = 96, className = '', label }) {
  const k = KINDS[kind] || KINDS.consumer;
  const s = SKIN[skin % SKIN.length];
  const h = kind === 'elder' ? '#d6d3d1' : HAIR[hair % HAIR.length];
  const id = 'p' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg className={`persona ${className}`} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={label || k.label}>
      <defs>
        <clipPath id={id}>
          <circle cx="60" cy="60" r="58" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="58" fill={k.bg} />
      <g clipPath={`url(#${id})`}>
        {/* long hair behind */}
        {hairStyle === 1 && <path d="M33 50c0-20 12-31 27-31s27 11 27 31v38H33z" fill={h} />}
        {/* body */}
        <path d="M18 122c0-24 18-38 42-38s42 14 42 38z" fill={k.outfit} />
        {/* collar / outfit details */}
        {(kind === 'doctor' || kind === 'pharmacist') && (
          <>
            <path d="M48 86l12 22 12-22" fill="none" stroke={k.trim} strokeWidth="5" />
            <path d="M60 108V122" stroke="#d6dcef" strokeWidth="2" />
          </>
        )}
        {kind === 'business' && <path d="M52 86l8 10 8-10M60 96l-4 26h8z" fill="#fff" stroke="#fff" strokeWidth="1" />}
        {kind === 'nurse' && <path d="M46 88c4 8 24 8 28 0" fill="none" stroke="#fff" strokeWidth="4" />}
        {/* neck */}
        <path d="M52 72h16v14c0 5-16 5-16 0z" fill={s} />
        {/* head */}
        <ellipse cx="60" cy="54" rx="21" ry="23" fill={s} />
        {/* hair front */}
        {hairStyle === 2 ? (
          <path d="M38 52c-2-18 9-28 22-28s25 9 22 27c-6-9-14-12-22-12-9 0-16 4-22 13z" fill={h} />
        ) : (
          <path d="M39 50c0-16 9-25 21-25s22 8 21 25c-4-6-10-11-21-11-10 0-16 4-21 11z" fill={h} />
        )}
        {/* face */}
        <circle cx="52" cy="56" r="2.2" fill="#2b1d16" />
        <circle cx="68" cy="56" r="2.2" fill="#2b1d16" />
        <path d="M53 65c4 4 10 4 14 0" fill="none" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="47" cy="63" r="3" fill="#f87171" opacity=".25" />
        <circle cx="73" cy="63" r="3" fill="#f87171" opacity=".25" />
        {/* accessories */}
        {(kind === 'business' || kind === 'elder') && (
          <g fill="none" stroke="#1f2937" strokeWidth="1.8">
            <circle cx="52" cy="56" r="5.5" />
            <circle cx="68" cy="56" r="5.5" />
            <path d="M57.5 56h5" />
          </g>
        )}
        {kind === 'doctor' && (
          <g fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round">
            <path d="M44 88c-2 10 4 16 10 16" />
            <path d="M76 88c2 10-2 18-8 20" />
            <circle cx="66" cy="109" r="4" fill="#94a3b8" />
          </g>
        )}
        {kind === 'nurse' && (
          <g>
            <path d="M44 32h32l-4 -10h-24z" fill="#fff" />
            <path d="M60 24v6M57 27h6" stroke="#e8344e" strokeWidth="2" />
          </g>
        )}
        {kind === 'pharmacist' && <rect x="66" y="96" width="12" height="8" rx="2" fill="#16a34a" />}
        {kind === 'caregiver' && <path d="M44 104c6-6 12-6 16 0 4-6 10-6 16 0-6 8-10 10-16 14-6-4-10-6-16-14z" fill="#fff" opacity=".85" />}
        {kind === 'patient' && <path d="M48 100h24" stroke="#fff" strokeWidth="3" strokeLinecap="round" />}
        {kind === 'student' && <path d="M38 34l22-10 22 10-22 10z" fill="#1f2937" />}
      </g>
    </svg>
  );
}
