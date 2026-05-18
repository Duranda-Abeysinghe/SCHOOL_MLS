import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: t('myClasses'),       value: 4,    icon: '🏫', color: 'blue'   },
    { label: t('totalStudents'),   value: 120,  icon: '🎓', color: 'green'  },
    { label: t('pendingRequests'), value: 3,    icon: '📨', color: 'yellow' },
    { label: 'This Week',          value: '18h',icon: '⏰', color: 'purple' },
  ];

  const myClasses = [
    { name: 'Grade 10A', subject: 'Mathematics', students: 35, time: '8:00 AM',  day: 'Mon/Wed/Fri' },
    { name: 'Grade 11B', subject: 'Mathematics', students: 28, time: '10:00 AM', day: 'Tue/Thu'     },
    { name: 'Grade 9C',  subject: 'Mathematics', students: 30, time: '1:00 PM',  day: 'Mon/Wed'     },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>👨‍🏫 {t('dashboard')}</h1>
        <span className="badge badge-green">{t('welcome')}, {user?.name}</span>
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
          <h3>🏫 {t('myClasses')}</h3>
          {myClasses.map(c => (
            <div key={c.name} style={{
              padding: '14px', background: '#f8fafc', borderRadius: '10px',
              marginBottom: '10px', borderLeft: '3px solid #2563eb'
            }}>
              <div className="flex-between">
                <strong>{c.name}</strong>
                <span className="badge badge-purple">{c.subject}</span>
              </div>
              <div style={{ fontSize: '0.83rem', color: '#94a3b8', marginTop: '6px', display: 'flex', gap: '16px' }}>
                <span>👥 {c.students}</span>
                <span>⏰ {c.time}</span>
                <span>📅 {c.day}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>⚡ {t('quickActions')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/teacher/attendance" className="btn btn-success">✅ {t('markAttendance')}</Link>
            <Link to="/teacher/marks"      className="btn btn-primary">📝 {t('enterMarks')}</Link>
            <Link to="/teacher/requests"   className="btn btn-warning">📨 {t('viewRequests')}</Link>
            <Link to="/teacher/schedule"   className="btn btn-purple">📅 {t('mySchedule')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}