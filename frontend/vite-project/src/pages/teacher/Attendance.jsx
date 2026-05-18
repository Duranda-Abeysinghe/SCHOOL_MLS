import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const students = [
  { id: 1, name: 'Amal Perera',     admNo: 'S001' },
  { id: 2, name: 'Nimal Silva',     admNo: 'S002' },
  { id: 3, name: 'Kamala Fernando', admNo: 'S003' },
  { id: 4, name: 'Saman Kumara',    admNo: 'S004' },
  { id: 5, name: 'Dilini Perera',   admNo: 'S005' },
];

export default function Attendance() {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [attendance, setAttendance] = useState(
    Object.fromEntries(students.map(s => [s.id, 'Present']))
  );
  const [saved, setSaved] = useState(false);

  const toggle = (id, status) => { setAttendance(p => ({ ...p, [id]: status })); setSaved(false); };
  const markAll = (status) => { setAttendance(Object.fromEntries(students.map(s => [s.id, status]))); setSaved(false); };
  const presentCount = Object.values(attendance).filter(v => v === 'Present').length;

  return (
    <div>
      <div className="page-header">
        <h1>✅ {t('markAttendance')}</h1>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="grid-3">
          <div className="form-group">
            <label>{t('className')}</label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              <option>Grade 10A</option><option>Grade 11B</option><option>Grade 9C</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('date')}</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('quickActions')}</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
              <button className="btn btn-success btn-sm" onClick={() => markAll('Present')}>{t('allPresent')}</button>
              <button className="btn btn-danger btn-sm"  onClick={() => markAll('Absent')}>{t('allAbsent')}</button>
            </div>
          </div>
        </div>
      </div>

      {saved && <div className="alert alert-success">✅ {t('success')}!</div>}

      <div className="card">
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <h3>👥 {selectedClass}</h3>
          <span className="badge badge-green">{presentCount}/{students.length} {t('present')}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('admNo')}</th>
              <th>{t('name')}</th>
              <th>{t('present')}</th>
              <th>{t('absent')}</th>
              <th>{t('late')}</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td><span className="badge badge-gray">{s.admNo}</span></td>
                <td><strong>{s.name}</strong></td>
                {['Present', 'Absent', 'Late'].map(status => (
                  <td key={status}>
                    <input
                      type="radio"
                      name={`att-${s.id}`}
                      checked={attendance[s.id] === status}
                      onChange={() => toggle(s.id, status)}
                      style={{
                        accentColor: status === 'Present' ? '#16a34a' : status === 'Absent' ? '#dc2626' : '#d97706',
                        width: '18px', height: '18px', cursor: 'pointer'
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-success btn-lg" onClick={() => setSaved(true)}>
            💾 {t('saveAttendance')}
          </button>
        </div>
      </div>
    </div>
  );
}