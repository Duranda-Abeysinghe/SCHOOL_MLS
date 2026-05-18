import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Announcements() {
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Term Exam Schedule Released', message: 'Term exams will begin from June 1st.', target: 'All', date: '2026-05-08', priority: 'High'   },
    { id: 2, title: 'Sports Day 2026',              message: 'Annual sports day on May 20th.',       target: 'All', date: '2026-05-06', priority: 'Normal' },
    { id: 3, title: 'Teacher Meeting',              message: 'Staff meeting on May 15th at 2 PM.',   target: 'Teachers', date: '2026-05-05', priority: 'Normal' },
  ]);

  const [form, setForm]         = useState({ title: '', message: '', target: 'All', priority: 'Normal' });
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setAnnouncements(p => [{ id: Date.now(), ...form, date: new Date().toISOString().slice(0, 10) }, ...p]);
    setForm({ title: '', message: '', target: 'All', priority: 'Normal' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete?')) return;
    setAnnouncements(p => p.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1>📢 {t('announcements')}</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? `✕ ${t('cancel')}` : `➕ ${t('postAnnouncement')}`}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '24px', border: '2px solid #2563eb' }}>
          <h3>📝 {t('postAnnouncement')}</h3>
          <form onSubmit={handleAdd}>
            <div className="grid-3">
              <div className="form-group" style={{ gridColumn: '1 / 3' }}>
                <label>Title *</label>
                <input required placeholder="Announcement title..."
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Target</label>
                <select value={form.target} onChange={e => setForm({ ...form, target: e.target.value })}>
                  <option>All</option>
                  <option>Students</option>
                  <option>Teachers</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea required rows="3"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <div className="form-group" style={{ maxWidth: '200px' }}>
              <label>Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option>Normal</option><option>High</option><option>Urgent</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary">📢 {t('save')}</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>{t('cancel')}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.map(a => (
          <div key={a.id} className="card" style={{
            borderLeft: `4px solid ${a.priority === 'High' ? '#dc2626' : a.priority === 'Urgent' ? '#7c3aed' : '#2563eb'}`
          }}>
            <div className="flex-between" style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ margin: 0 }}>{a.title}</h3>
                <span className={`badge ${a.priority === 'High' ? 'badge-red' : a.priority === 'Urgent' ? 'badge-purple' : 'badge-blue'}`}>
                  {a.priority}
                </span>
                <span className="badge badge-gray">📣 {a.target}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{a.date}</span>
                <button onClick={() => handleDelete(a.id)} className="btn btn-danger btn-sm">
                  🗑️ {t('delete')}
                </button>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.93rem' }}>{a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}