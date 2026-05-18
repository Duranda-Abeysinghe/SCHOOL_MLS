import { useLanguage } from '../../../context/LanguageContext';

export default function ClassList() {
  const { t } = useLanguage();

  const classes = [
    { id: 1, name: 'Grade 9A',  section: 'A', teacher: 'Mr. Kamal',  students: 32 },
    { id: 2, name: 'Grade 9B',  section: 'B', teacher: 'Ms. Dilani', students: 28 },
    { id: 3, name: 'Grade 10A', section: 'A', teacher: 'Mr. Sunil',  students: 35 },
    { id: 4, name: 'Grade 10B', section: 'B', teacher: 'Mr. Kamal',  students: 30 },
    { id: 5, name: 'Grade 11A', section: 'A', teacher: 'Ms. Dilani', students: 27 },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>🏫 {t('classes')}</h1>
        <button className="btn btn-primary">➕ {t('save')}</button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('className')}</th>
              <th>Section</th>
              <th>{t('teachers')}</th>
              <th>{t('students')}</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td><strong>{c.name}</strong></td>
                <td><span className="badge badge-blue">Section {c.section}</span></td>
                <td>{c.teacher}</td>
                <td><span className="badge badge-green">{c.students}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}