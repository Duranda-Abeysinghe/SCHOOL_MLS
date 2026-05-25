import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../api/axios';
import { useLanguage } from '../../../context/LanguageContext';

export default function TeacherAdd() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    gender: '', subject: '', address: '', status: 'Active'
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
      await API.post('/teachers', {
        fullName: form.fullName,
        email:    form.email,
        phone:    form.phone,
        gender:   form.gender,
        subject:  form.subject,
        address:  form.address,
        status:   form.status,
        userId:   null
      });
      setSuccess(true);
      setTimeout(() => navigate('/admin/teachers'), 1500);
    } catch (err) {
      setError('Failed to add teacher. Email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>➕ {t('addTeacher')}</h1>
        <button className="btn btn-outline" onClick={() => navigate('/admin/teachers')}>
          ← {t('back')}
        </button>
      </div>

      {success && <div className="alert alert-success">✅ Teacher added successfully!</div>}
      {error   && <div className="alert alert-error">❌ {error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid-3">
            <div className="form-group">
              <label>{t('fullName')} *</label>
              <input required placeholder="Mr. John Doe"
                value={form.fullName}
                onChange={e => update('fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('email')} *</label>
              <input required type="email" placeholder="john@school.com"
                value={form.email}
                onChange={e => update('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Subject *</label>
              <select required value={form.subject}
                onChange={e => update('subject', e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Commerce">Commerce</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Physical Education">Physical Education</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('phone')}</label>
              <input placeholder="077 123 4567"
                value={form.phone}
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
              <label>{t('status')}</label>
              <select value={form.status}
                onChange={e => update('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>{t('address')}</label>
            <textarea rows="2" placeholder="No. 12, Main Street..."
              value={form.address}
              onChange={e => update('address', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Saving...' : `💾 ${t('save')} Teacher`}
            </button>
            <button type="button" className="btn btn-outline"
              onClick={() => navigate('/admin/teachers')}>
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}