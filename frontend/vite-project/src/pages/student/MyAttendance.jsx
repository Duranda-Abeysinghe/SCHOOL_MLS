import { useLanguage } from '../../context/LanguageContext';

export default function MyAttendance() {
  const { t } = useLanguage();

  const records = [
    { date: '2026-05-01', subject: 'Mathematics', status: 'Present' },
    { date: '2026-05-01', subject: 'Science',     status: 'Present' },
    { date: '2026-05-02', subject: 'English',     status: 'Absent'  },
    { date: '2026-05-05', subject: 'Mathematics', status: 'Present' },
    { date: '2026-05-06', subject: 'Science',     status: 'Late'    },
    { date: '2026-05-07', subject: 'English',     status: 'Present' },
  ];

  const total   = records.length;
  const present = records.filter(r => r.status === 'Present').length;
  const absent  = records.filter(r => r.status === 'Absent').length;
  const late    = records.filter(r => r.status === 'Late').length;
  const pct     = Math.round((present / total) * 100);

  return (
    <div>
      <div className="page-header"><h1>✅ {t('viewAttendance')}</h1></div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total', value: total,   color: 'blue'   },
          { label: t('present'), value: present, color: 'green'  },
          { label: t('absent'),  value: absent,  color: 'red'    },
          { label: t('late'),    value: late,    color: 'yellow' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>📅</div>
            <div className="stat-info"><h3>{s.label}</h3><p>{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3>📊 {t('viewAttendance')}</h3>
        <div style={{ marginTop: '12px' }}>
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600' }}>{pct}%</span>
            <span className={`badge ${pct >= 80 ? 'badge-green' : 'badge-red'}`}>
              {pct >= 80 ? 'Good' : 'Poor'}
            </span>
          </div>
          <div className="progress-bar" style={{ height: '12px' }}>
            <div className={`progress-fill ${pct >= 80 ? 'progress-green' : 'progress-red'}`}
              style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>#</th><th>{t('date')}</th><th>{t('subject')}</th><th>{t('status')}</th></tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.date}</td>
                <td>{r.subject}</td>
                <td>
                  <span className={`badge ${r.status === 'Present' ? 'badge-green' : r.status === 'Absent' ? 'badge-red' : 'badge-yellow'}`}>
                    {r.status === 'Present' ? t('present') : r.status === 'Absent' ? t('absent') : t('late')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}