import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function MyRequests() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState([
    { id: 1, type: 'Leave Request',       message: 'Family function on May 10th.', date: '2026-05-08', status: 'Approved' },
    { id: 2, type: 'Certificate Request', message: 'Need character certificate.',  date: '2026-05-07', status: 'Pending'  },
  ]);
  const [form, setForm]         = useState({ type: 'Leave Request', message: '' });
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests(p => [{ id: Date.now(), ...form, date: new Date().toISOString().slice(0, 10), status: 'Pending' }, ...p]);
    setForm({ type: 'Leave Request', message: '' });
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>📨 {t('submitRequest')}</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : `➕ ${t('submitRequest')}`}
        </button>
      </div>

      {success && <div className="alert alert-success">✅ {t('success')}!</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '24px', border: '2px solid #2563eb' }}>
          <h3>📝 {t('submitRequest')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('subject')}</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option>Leave Request</option>
                <option>Re-Evaluation</option>
                <option>Certificate Request</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea required rows="4"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary">📨 {t('save')}</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>{t('cancel')}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {requests.map(r => (
          <div key={r.id} className="card" style={{
            borderLeft: `4px solid ${r.status === 'Pending' ? '#f59e0b' : r.status === 'Approved' ? '#16a34a' : '#dc2626'}`
          }}>
            <div className="flex-between">
              <div>
                <strong>{r.type}</strong>
                <span className={`badge ${r.status === 'Pending' ? 'badge-yellow' : r.status === 'Approved' ? 'badge-green' : 'badge-red'}`}
                  style={{ marginLeft: '10px' }}>
                  {r.status}
                </span>
              </div>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{r.date}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.93rem', marginTop: '10px' }}>{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}