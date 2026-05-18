import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const dummy = [
  { id: '1', fullName: 'Amal Perera',     email: 'amal@mail.com',   phone: '071 111 1111', gender: 'Male',   className: 'Grade 10A', status: 'Active'   },
  { id: '2', fullName: 'Nimal Silva',     email: 'nimal@mail.com',  phone: '072 222 2222', gender: 'Male',   className: 'Grade 11B', status: 'Active'   },
  { id: '3', fullName: 'Kamala Fernando', email: 'kamala@mail.com', phone: '073 333 3333', gender: 'Female', className: 'Grade 9C',  status: 'Inactive' },
];

export default function StudentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const found = dummy.find(s => s.id === id) || dummy[0];
  const [form, setForm]     = useState(found);
  const [success, setSuccess] = useState(false);

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => navigate('/admin/students'), 1500);
  };

  return (
    <div>
      <div className="page-header">
        <h1>✏️ {t('edit')} {t('students')}</h1>
        <button className="btn btn-outline" onClick={() => navigate('/admin/students')}>← {t('back')}</button>
      </div>
      {success && <div className="alert alert-success">✅ {t('success')}!</div>}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid-3">
            <div className="form-group">
              <label>{t('fullName')}</label>
              <input required value={form.fullName}
                onChange={e => update('fullName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('email')}</label>
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
              <select value={form.gender} onChange={e => update('gender', e.target.value)}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('className')}</label>
              <select value={form.className} onChange={e => update('className', e.target.value)}>
                <option>Grade 9A</option><option>Grade 9B</option>
                <option>Grade 10A</option><option>Grade 10B</option>
                <option>Grade 11A</option><option>Grade 11B</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('status')}</label>
              <select value={form.status} onChange={e => update('status', e.target.value)}>
                <option value="Active">{t('active')}</option>
                <option value="Inactive">{t('inactive')}</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary btn-lg">
              💾 {t('update')}
            </button>
            <button type="button" className="btn btn-outline"
              onClick={() => navigate('/admin/students')}>{t('cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}