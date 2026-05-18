import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const dummy = [
  { id: 1, name: 'Mr. Sunil Rathnayake',   subject: 'Mathematics', email: 'sunil@school.com',  phone: '071 111 1111', status: 'Active' },
  { id: 2, name: 'Ms. Dilani Jayawardena', subject: 'Science',     email: 'dilani@school.com', phone: '072 222 2222', status: 'Active' },
  { id: 3, name: 'Mr. Kamal Dissanayake',  subject: 'English',     email: 'kamal@school.com',  phone: '073 333 3333', status: 'Active' },
];

export default function TeacherList() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState(dummy);

  const handleDelete = (id) => {
    if (!confirm('Delete this teacher?')) return;
    setTeachers(p => p.filter(t => t.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1>👨‍🏫 {t('teachers')}</h1>
        <Link to="/admin/teachers/add" className="btn btn-primary">➕ {t('addTeacher')}</Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('name')}</th>
              <th>{t('subject')}</th>
              <th>{t('email')}</th>
              <th>{t('phone')}</th>
              <th>{t('status')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, i) => (
              <tr key={teacher.id}>
                <td>{i + 1}</td>
                <td><strong>{teacher.name}</strong></td>
                <td><span className="badge badge-purple">{teacher.subject}</span></td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>
                  <span className="badge badge-green">
                    {t('active')}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleDelete(teacher.id)} className="btn btn-danger btn-sm">
                    🗑️ {t('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}