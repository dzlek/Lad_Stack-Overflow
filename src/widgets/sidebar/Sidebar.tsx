import { NavLink } from 'react-router-dom';

import { Home, User, FileText, Users, HelpCircle } from 'lucide-react';

import s from './sidebar.module.scss';
import { useAuth } from '../../app/context/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside className={s.sidebar}>
      {user && (
        <div className={s.user}>
          <img className={s.avatar} src="/user.jpeg" alt="User avatar" />
          {user.username}
        </div>
      )}
      <nav>
        <ul className={s.navLinksList}>
          <li>
            <NavLink to="/">
              {' '}
              <Home size={18} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-account">
              <User size={18} /> My Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/post-snippet">
              <FileText size={18} /> Post snippet
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-snippets">
              <FileText size={18} /> My snippets
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions">
              <HelpCircle size={18} /> Questions
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <Users size={18} /> Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
