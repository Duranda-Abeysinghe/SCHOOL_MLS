import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const students = [
  { id: 1, name: 'Amal Perera',     admNo: 'S001' },
  { id: 2, name: 'Nimal Silva',     admNo: 'S002' },
  { id: 3, name: 'Kamala Fernando', admNo: 'S003' },
  { id: 4, name: 'Saman Kumara',    admNo: 'S004' },
];

const getGrade = (mark) => {
  if (mark >= 90) return { grade: 'A+', color: 'badge-green'  };
  if (mark >= 80) return { grade: 'A',  color: 'badge-green'  };
  if (mark >= 70) return { grade: 'B',  color: 'badge-blue'   };
  if (mark >= 60) return { grade: 'C',  color: 'badge-yellow' };
  if (mark >= 50) return { grade: 'D',  color: 'badge-yellow' };
  return { grade: 'F', color: 'badge-red' };
};

export default function Marks() {
  const { t } = useLanguage();
  const [marks, setMarks]     = useState(Object.fromEntries(students.map(s => [s.id, ''])));
  const [examType, setExamType] = useState('Term Test 1');
  const [subject, setSubject]   = useState('Mathematics');
  const [saved, setSaved]       = useState(false);

  return (
    <div>
      <div className="page-header">
        <h1>📝 {t('enterMarks')}</h1>
      </div>

      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="grid-3">
          <div className="form-group">
            <label>{t('subject')}</label>
            <select value={subject} onChange={e => setSubject(e.target.value)}>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
            </select>
          </div>
          <div className="form-group">
            <label>Exam Type</label>
            <select value={examType} onChange={e => setExamType(e.target.value)}>
              <option>Term Test 1</option>
              <option>Term Test 2</option>
              <option>Mid Term</option>
              <option>Final Exam</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('className')}</label>
            <select>
              <option>Grade 10A</option>
              <option>Grade 11B</option>
              <option>Grade 9C</option>
            </select>
          </div>
        </div>
      </div>

      {saved && <div className="alert alert-success">✅ {t('success')}!</div>}

      <div className="card">
        <h3>📝 {subject} — {examType}</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('admNo')}</th>
              <th>{t('name')}</th>
              <th>{t('score')} (out of 100)</th>
              <th>{t('grade')}</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const mark = parseInt(marks[s.id]) || 0;
              const { grade, color } = marks[s.id] !== '' ? getGrade(mark) : { grade: '-', color: 'badge-gray' };
              return (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td><span className="badge badge-gray">{s.admNo}</span></td>
                  <td><strong>{s.name}</strong></td>
                  <td>
                    <input
                      type="number" min="0" max="100"
                      placeholder="0 - 100"
                      value={marks[s.id]}
                      onChange={e => { setMarks(p => ({ ...p, [s.id]: e.target.value })); setSaved(false); }}
                      style={{ width: '100px', padding: '8px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '0.93rem' }}
                    />
                  </td>
                  <td><span className={`badge ${color}`}>{grade}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setSaved(true)}>
            💾 {t('save')} {t('score')}
          </button>
        </div>
      </div>
    </div>
  );
}