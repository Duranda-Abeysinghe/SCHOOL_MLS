import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api/axios';
import { useLanguage } from '../../../context/LanguageContext';

export default function StudentList() {
  const { t } = useLanguage();
  const [students, setStudents] = useState([]);
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('All');
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    API.get('/students')
      .then(res => setStudents(res.data))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    try {
      await API.delete(`/students/${id}`);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch {
      alert('Delete failed.');
    }
  };

  const filtered = students.filter(s => {
    const matchSearch = s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                        s.admissionNo?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="page-header">
        <h1>🎓 {t('studentList')}</h1>
        <Link to="/admin/students/add" className="btn btn-primary">➕ {t('addNewStudent')}</Link>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="flex-between">
          <div className="search-bar">
            <span>🔍</span>
            <input
              placeholder={t('searchStudents')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Active', 'Inactive'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}>
                {f === 'All' ? t('all') : f === 'Active' ? t('active') : t('inactive')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="card text-center"><p>{t('loading')}</p></div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t('admNo')}</th>
                <th>{t('name')}</th>
                <th>{t('email')}</th>
                <th>{t('phone')}</th>
                <th>{t('status')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td><span className="badge badge-gray">{s.admissionNo}</span></td>
                  <td><strong>{s.fullName}</strong></td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {s.status === 'Active' ? t('active') : t('inactive')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Link to={`/admin/students/edit/${s.id}`} className="btn btn-warning btn-sm">✏️ {t('edit')}</Link>
                      <button onClick={() => handleDelete(s.id)} className="btn btn-danger btn-sm">🗑️ {t('delete')}</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="text-center" style={{ padding: '30px', color: '#94a3b8' }}>
                  {t('noStudents')}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ padding: '14px 18px', color: '#94a3b8', fontSize: '0.85rem' }}>
        {filtered.length} / {students.length}
      </div>
    </div>
  );
}