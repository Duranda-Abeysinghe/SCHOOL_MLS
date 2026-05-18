import { useLanguage } from '../../context/LanguageContext';

export default function MyMarks() {
  const { t } = useLanguage();

  const exams = [
    { subject: 'Mathematics', termTest1: 78, termTest2: 85, midTerm: 82, final: 88 },
    { subject: 'Science',     termTest1: 65, termTest2: 72, midTerm: 70, final: 75 },
    { subject: 'English',     termTest1: 88, termTest2: 90, midTerm: 85, final: 92 },
    { subject: 'History',     termTest1: 60, termTest2: 68, midTerm: 65, final: 70 },
  ];

  const getGrade = (m) =>
    m >= 90 ? 'A+' : m >= 80 ? 'A' : m >= 70 ? 'B' : m >= 60 ? 'C' : m >= 50 ? 'D' : 'F';

  const getColor = (m) =>
    m >= 80 ? 'badge-green' : m >= 60 ? 'badge-blue' : m >= 50 ? 'badge-yellow' : 'badge-red';

  return (
    <div>
      <div className="page-header"><h1>📝 {t('viewMyMarks')}</h1></div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{t('subject')}</th>
              <th>Term Test 1</th>
              <th>Term Test 2</th>
              <th>Mid Term</th>
              <th>Final</th>
              <th>{t('grade')}</th>
            </tr>
          </thead>
          <tbody>
            {exams.map(e => {
              const avg = Math.round((e.termTest1 + e.termTest2 + e.midTerm + e.final) / 4);
              return (
                <tr key={e.subject}>
                  <td><strong>{e.subject}</strong></td>
                  {[e.termTest1, e.termTest2, e.midTerm, e.final].map((m, i) => (
                    <td key={i}><span className={`badge ${getColor(m)}`}>{m}%</span></td>
                  ))}
                  <td><span className={`badge ${getColor(avg)}`}>{getGrade(avg)}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}