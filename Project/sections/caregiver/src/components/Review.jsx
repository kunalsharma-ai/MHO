import { answerError } from '../lib/engine.js';
import { useI18n } from '../lib/i18n.js';
import { formatAnswer } from '../lib/format.js';

/** Review screen: every applicable answer with its own Edit button. */
export default function Review({ profile, ctx, seq, onEdit, onDone }) {
  const i18n = useI18n();
  const { t, tc } = i18n;
  return (
    <div className="review">
      <div className="review-head">
        <h3 className="q-label"><span aria-hidden="true">📋</span> {t('rev.title')}</h3>
        <p className="q-hint">{t('rev.sub')}</p>
      </div>
      <ol className="rev-list">
        {seq.map((name, k) => {
          const q = ctx.data.questions[name];
          const ans = ctx.answers[name];
          const bad = answerError(ctx, name, ans);
          const txt = formatAnswer(ctx, name, ans, i18n);
          return (
            <li key={name} className={'rev-row' + (bad ? ' bad' : '')} style={{ '--k': k }}>
              <span className="rev-emoji" aria-hidden="true">{q.emoji}</span>
              <div className="rev-text">
                <span className="rev-q">{tc(q.label)}</span>
                <span className="rev-a">{bad ? '⚠️ ' + t('rev.missing') : txt}</span>
              </div>
              <button className="btn small" type="button" onClick={() => onEdit(name)} aria-label={t('rev.edit') + ': ' + tc(q.label)}>
                ✏️ {t('rev.edit')}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="q-actions sticky">
        <button className="btn primary big" type="button" onClick={onDone}>{t('rev.done')} ✓</button>
      </div>
    </div>
  );
}
