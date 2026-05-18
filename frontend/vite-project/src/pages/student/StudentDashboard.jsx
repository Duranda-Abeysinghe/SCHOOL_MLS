import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: t('viewAttendance'), value: '92%', icon: '✅', color: 'green'  },
    { label: t('overallGrade'),   value: 'A',   icon: '📝', color: 'blue'   },
    { label: t('subjects'),       value: 6,     icon: '📚', color: 'purple' },
    { label: t('pendingRequests'),value: 2,     icon: '📨', color: 'yellow' },
  ];

  const myMarks = [
    { subject: 'Mathematics', mark: 85, grade: 'A'  },
    { subject: 'Science',     mark: 72, grade: 'B'  },
    { subject: 'English',     mark: 90, grade: 'A+' },
    { subject: 'History',     mark: 68, grade: 'C'  },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>🎓 {t('dashboard')}</h1>
        <span className="badge badge-purple">{t('welcome')}, {user?.name}</span>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.label}</h3><p>{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>📝 {t('recentMarks')}</h3>
          {myMarks.map(m => (
            <div key={m.subject} style={{ marginBottom: '14px' }}>
              <div className="flex-between" style={{ marginBottom: '5px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{m.subject}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{m.mark}%</span>
                  <span className={`badge ${m.grade.startsWith('A') ? 'badge-green' : m.grade === 'B' ? 'badge-blue' : 'badge-yellow'}`}>
                    {m.grade}
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${m.mark >= 80 ? 'progress-green' : m.mark >= 60 ? 'progress-blue' : 'progress-yellow'}`}
                  style={{ width: `${m.mark}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>⚡ {t('quickActions')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/student/attendance" className="btn btn-success">✅ {t('viewAttendance')}</Link>
            <Link to="/student/marks"      className="btn btn-primary">📝 {t('viewMyMarks')}</Link>
            <Link to="/student/schedule"   className="btn btn-purple">📅 {t('classSchedule')}</Link>
            <Link to="/student/requests"   className="btn btn-warning">📨 {t('submitRequest')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}