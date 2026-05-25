import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api/axios';
import { useLanguage } from '../../../context/LanguageContext';

export default function TeacherList() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');

  useEffect(() => {
    API.get('/teachers')
      .then(res => setTeachers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this teacher?')) return;
    try {
      await API.delete(`/teachers/${id}`);
      setTeachers(p => p.filter(t => t.id !== id));
    } catch { alert('Delete failed.'); }
  };

  const filtered = teachers.filter(t =>
    t.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    t.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>👨‍🏫 {t('teachers')}</h1>
        <Link to="/admin/teachers/add" className="btn btn-primary">
          ➕ {t('addTeacher')}
        </Link>
      </div>

      <div className="card" style={{ marginBottom: '18px' }}>
        <div className="search-bar">
          <span>🔍</span>
          <input
            placeholder={`${t('search')} ${t('teachers')}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="card text-center"><p>{t('loading')}</p></div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>{t('name')}</th>
                <th>{t('subject')}</th>
                <th>{t('email')}</th>
                <th>{t('phone')}</th>
                <th>{t('status')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((teacher, i) => (
                <tr key={teacher.id}>
                  <td>{i + 1}</td>
                  <td><strong>{teacher.fullName}</strong></td>
                  <td><span className="badge badge-purple">{teacher.subject}</span></td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>
                    <span className={`badge ${teacher.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {teacher.status === 'Active' ? t('active') : t('inactive')}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center" style={{ padding: '30px', color: '#94a3b8' }}>
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="table-footer">
            {filtered.length} / {teachers.length} {t('teachers')}
          </div>
        </div>
      )}
    </div>
  );
}