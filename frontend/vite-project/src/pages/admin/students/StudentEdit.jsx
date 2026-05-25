import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../api/axios';
import { useLanguage } from '../../../context/LanguageContext';

export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', gender: '',
    address: '', parentName: '', parentContact: '',
    status: 'Active', classId: ''
  });
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  useEffect(() => {
    API.get(`/students/${id}`)
      .then(res => {
        const s = res.data;
        setForm({
          fullName:      s.fullName      || '',
          email:         s.email         || '',
          phone:         s.phone         || '',
          gender:        s.gender        || '',
          address:       s.address       || '',
          parentName:    s.parentName    || '',
          parentContact: s.parentContact || '',
          status:        s.status        || 'Active',
          classId:       s.classId       || ''
        });
      })
      .catch(() => setError('Failed to load student.'))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await API.put(`/students/${id}`, {
        ...form,
        classId: form.classId ? parseInt(form.classId) : null
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin/students'), 1500);
    } catch {
      setError('Failed to update student.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card text-center" style={{ padding: '40px' }}><p>⏳ Loading...</p></div>;

  return (
    <div>
      <div className="page-header">
        <h1>✏️ Edit Student</h1>
        <button className="btn btn-outline" onClick={() => navigate('/admin/students')}>
          ← {t('back')}
        </button>
      </div>

      {success && <div className="alert alert-success">✅ Student updated successfully!</div>}
      {error   && <div className="alert alert-error">❌ {error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid-3">
            <div className="form-group">
              <label>{t('fullName')} *</label>
              <input required value={form.fullName}
                onChange={e => update('fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('email')} *</label>
              <input required type="email" value={form.email}
                onChange={e => update('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('phone')}</label>
              <input value={form.phone}
                onChange={e => update('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('gender')}</label>
              <select value={form.gender}
                onChange={e => update('gender', e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class</label>
              <select value={form.classId}
                onChange={e => update('classId', e.target.value)}>
                <option value="">Select Class</option>
                <option value="1">Grade 9A</option>
                <option value="2">Grade 9B</option>
                <option value="3">Grade 10A</option>
                <option value="4">Grade 10B</option>
                <option value="5">Grade 11A</option>
                <option value="6">Grade 11B</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('status')}</label>
              <select value={form.status}
                onChange={e => update('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('parentName')}</label>
              <input value={form.parentName}
                onChange={e => update('parentName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('parentContact')}</label>
              <input value={form.parentContact}
                onChange={e => update('parentContact', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>{t('address')}</label>
            <textarea rows="2" value={form.address}
              onChange={e => update('address', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              {saving ? '⏳ Updating...' : `💾 ${t('update')}`}
            </button>
            <button type="button" className="btn btn-outline"
              onClick={() => navigate('/admin/students')}>
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}