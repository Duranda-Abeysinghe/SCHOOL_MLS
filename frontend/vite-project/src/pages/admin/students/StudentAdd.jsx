import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../api/axios';
import { useLanguage } from '../../../context/LanguageContext';

export default function StudentAdd() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', gender: '', dateOfBirth: '',
    address: '', className: '', parentName: '', parentContact: '', status: 'Active'
  });
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/students', {
        fullName:      form.fullName,
        email:         form.email,
        phone:         form.phone,
        gender:        form.gender,
        address:       form.address,
        parentName:    form.parentName,
        parentContact: form.parentContact,
        status:        form.status,
        admissionNo:   '',
        dateOfBirth:   form.dateOfBirth || null,
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin/students'), 1500);
    } catch {
      setError('Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>➕ {t('addStudentTitle')}</h1>
        <button className="btn btn-outline" onClick={() => navigate('/admin/students')}>← {t('back')}</button>
      </div>

      {success && <div className="alert alert-success">✅ {t('success')}!</div>}
      {error   && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '18px', color: '#2563eb' }}>👤 {t('personalInfo')}</h3>
          <div className="grid-3">
            <div className="form-group">
              <label>{t('fullName')} *</label>
              <input required placeholder="John Perera"
                value={form.fullName} onChange={e => update('fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('email')} *</label>
              <input required type="email" placeholder="john@mail.com"
                value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('phone')}</label>
              <input placeholder="077 123 4567"
                value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('gender')} *</label>
              <select required value={form.gender} onChange={e => update('gender', e.target.value)}>
                <option value="">{t('selectGender')}</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('dateOfBirth')}</label>
              <input type="date" value={form.dateOfBirth}
                onChange={e => update('dateOfBirth', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('status')}</label>
              <select value={form.status} onChange={e => update('status', e.target.value)}>
                <option value="Active">{t('active')}</option>
                <option value="Inactive">{t('inactive')}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t('address')}</label>
            <textarea rows="2" placeholder="No. 12, Main Street..."
              value={form.address} onChange={e => update('address', e.target.value)} />
          </div>

          <h3 style={{ margin: '20px 0 18px', color: '#2563eb' }}>🏫 {t('academicInfo')}</h3>
          <div className="grid-3">
            <div className="form-group">
              <label>{t('className')}</label>
              <select value={form.className} onChange={e => update('className', e.target.value)}>
                <option value="">{t('selectClass')}</option>
                <option>Grade 9A</option><option>Grade 9B</option>
                <option>Grade 10A</option><option>Grade 10B</option>
                <option>Grade 11A</option><option>Grade 11B</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('parentName')}</label>
              <input placeholder="Mr. Perera"
                value={form.parentName} onChange={e => update('parentName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('parentContact')}</label>
              <input placeholder="077 987 6543"
                value={form.parentContact} onChange={e => update('parentContact', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? t('loading') : `💾 ${t('saveStudent')}`}
            </button>
            <button type="button" className="btn btn-outline"
              onClick={() => navigate('/admin/students')}>{t('cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}