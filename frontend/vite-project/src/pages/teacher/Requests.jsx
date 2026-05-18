import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Requests() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState([
    { id: 1, student: 'Amal Perera',     type: 'Leave Request',      message: 'I need 2 days leave due to family function.', date: '2026-05-09', status: 'Pending'  },
    { id: 2, student: 'Nimal Silva',     type: 'Re-Evaluation',      message: 'Please re-check my Mathematics paper Q5.',   date: '2026-05-08', status: 'Pending'  },
    { id: 3, student: 'Kamala Fernando', type: 'Certificate Request', message: 'I need a character certificate.',            date: '2026-05-07', status: 'Approved' },
  ]);

  const updateStatus = (id, status) => {
    setRequests(p => p.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div>
      <div className="page-header">
        <h1>📨 {t('viewRequests')}</h1>
        <span className="badge badge-yellow">
          {requests.filter(r => r.status === 'Pending').length} {t('pendingRequests')}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {requests.map(r => (
          <div key={r.id} className="card" style={{
            borderLeft: `4px solid ${r.status === 'Pending' ? '#f59e0b' : r.status === 'Approved' ? '#16a34a' : '#dc2626'}`
          }}>
            <div className="flex-between" style={{ marginBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '1rem' }}>{r.student}</strong>
                <span className="badge badge-purple" style={{ marginLeft: '10px' }}>{r.type}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{r.date}</span>
                <span className={`badge ${r.status === 'Pending' ? 'badge-yellow' : r.status === 'Approved' ? 'badge-green' : 'badge-red'}`}>
                  {r.status}
                </span>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.93rem', marginBottom: '14px' }}>{r.message}</p>
            {r.status === 'Pending' && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-success btn-sm" onClick={() => updateStatus(r.id, 'Approved')}>
                  ✅ Approve
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(r.id, 'Rejected')}>
                  ❌ Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}