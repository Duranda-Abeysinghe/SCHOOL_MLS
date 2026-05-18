import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { path: '/admin/dashboard',     label: t('dashboard'),     icon: '🏠' },
    { path: '/admin/students',      label: t('students'),      icon: '🎓' },
    { path: '/admin/teachers',      label: t('teachers'),      icon: '👨‍🏫' },
    { path: '/admin/classes',       label: t('classes'),       icon: '🏫' },
    { path: '/admin/subjects',      label: t('subjects'),      icon: '📚' },
    { path: '/admin/announcements', label: t('announcements'), icon: '📢' },
    { path: '/admin/reports',       label: t('reports'),       icon: '📊' },
  ];

  const teacherLinks = [
    { path: '/teacher/dashboard',  label: t('dashboard'),     icon: '🏠' },
    { path: '/teacher/attendance', label: t('markAttendance'),icon: '✅' },
    { path: '/teacher/marks',      label: t('enterMarks'),    icon: '📝' },
    { path: '/teacher/schedule',   label: t('mySchedule'),    icon: '📅' },
    { path: '/teacher/requests',   label: t('viewRequests'),  icon: '📨' },
  ];

  const studentLinks = [
    { path: '/student/dashboard',  label: t('dashboard'),      icon: '🏠' },
    { path: '/student/attendance', label: t('viewAttendance'), icon: '✅' },
    { path: '/student/marks',      label: t('viewMyMarks'),    icon: '📝' },
    { path: '/student/schedule',   label: t('classSchedule'),  icon: '📅' },
    { path: '/student/requests',   label: t('submitRequest'),  icon: '📨' },
  ];

  const links = user?.role === 'Admin'
    ? adminLinks : user?.role === 'Teacher'
    ? teacherLinks : studentLinks;

  const roleColors = {
    Admin: '#fbbf24', Teacher: '#34d399', Student: '#818cf8'
  };

  const handleLinkClick = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay - mobile only */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">🏫 SchoolMS</div>

        {/* Language Toggle */}
        <button className="lang-btn" onClick={toggleLanguage}>
          {language === 'en' ? '🇱🇰 සිංහල' : '🇬🇧 English'}
        </button>

        <div className="sidebar-role">
          {user?.role} Panel
        </div>

        {/* User Info */}
        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{ background: roleColors[user?.role] || '#fbbf24' }}>
            {user?.name?.[0] || 'A'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'User'}</div>
            <div className="sidebar-user-email">{user?.email || ''}</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={handleLinkClick}
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 {t('logout')}
          </button>
        </div>
      </div>
    </>
  );
}