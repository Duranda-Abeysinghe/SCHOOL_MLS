import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: t('totalStudents'), value: 248, icon: '🎓', color: 'blue',   trend: '+12 this month' },
    { label: t('totalTeachers'), value: 32,  icon: '👨‍🏫', color: 'green',  trend: '+2 this month'  },
    { label: t('totalClasses'),  value: 16,  icon: '🏫', color: 'yellow', trend: '8 active'       },
    { label: t('totalSubjects'), value: 12,  icon: '📚', color: 'purple', trend: 'Core + Elective' },
  ];

  const recentStudents = [
    { name: 'Amal Perera',     class: 'Grade 10A', status: 'Active'   },
    { name: 'Nimal Silva',     class: 'Grade 11B', status: 'Active'   },
    { name: 'Kamala Fernando', class: 'Grade 9C',  status: 'Inactive' },
    { name: 'Saman Kumara',    class: 'Grade 10B', status: 'Active'   },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>👨‍💼 {t('dashboard')}</h1>
        <span className="badge badge-blue">{new Date().toDateString()}</span>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-info">
              <h3>{s.label}</h3>
              <p>{s.value}</p>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>🎓 {t('recentStudents')}</h3>
          <table>
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('className')}</th>
                <th>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map(s => (
                <tr key={s.name}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.class}</td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {s.status === 'Active' ? t('active') : t('inactive')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>⚡ {t('quickActions')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/admin/students/add" className="btn btn-primary">➕ {t('addStudent')}</Link>
            <Link to="/admin/teachers/add" className="btn btn-success">➕ {t('addTeacher')}</Link>
            <Link to="/admin/announcements" className="btn btn-purple">📢 {t('postAnnouncement')}</Link>
            <Link to="/admin/reports" className="btn btn-warning">📊 {t('viewReports')}</Link>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h3 style={{ marginBottom: '12px' }}>📈 Attendance Overview</h3>
            {[
              { label: 'Grade 10A', pct: 92, color: 'progress-green'  },
              { label: 'Grade 11B', pct: 78, color: 'progress-yellow' },
              { label: 'Grade 9C',  pct: 85, color: 'progress-blue'   },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '12px' }}>
                <div className="flex-between" style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}