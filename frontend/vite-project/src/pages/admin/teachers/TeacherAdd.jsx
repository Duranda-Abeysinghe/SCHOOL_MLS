import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

export default function TeacherAdd() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', phone: '', gender: '', address: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => navigate('/admin/teachers'), 1500);
  };

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  return (
    <div>
      <div className="page-header">
        <h1>➕ {t('addTeacher')}</h1>
        <button className="btn btn-outline" onClick={() => navigate('/admin/teachers')}>← {t('back')}</button>
      </div>
      {success && <div className="alert alert-success">✅ {t('success')}!</div>}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid-3">
            <div className="form-group">
              <label>{t('fullName')} *</label>
              <input required placeholder="Mr. John Doe"
                value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('email')} *</label>
              <input required type="email" placeholder="john@school.com"
                value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('subject')} *</label>
              <select required value={form.subject} onChange={e => update('subject', e.target.value)}>
                <option value="">Select Subject</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>History</option>
                <option>Geography</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('phone')}</label>
              <input placeholder="077 123 4567"
                value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('gender')}</label>
              <select value={form.gender} onChange={e => update('gender', e.target.value)}>
                <option value="">{t('selectGender')}</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>{t('address')}</label>
            <textarea rows="2" value={form.address}
              onChange={e => update('address', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary btn-lg">
              💾 {t('save')} {t('teachers')}
            </button>
            <button type="button" className="btn btn-outline"
              onClick={() => navigate('/admin/teachers')}>{t('cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}