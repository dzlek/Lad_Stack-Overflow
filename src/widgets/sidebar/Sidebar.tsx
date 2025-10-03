import { NavLink } from 'react-router-dom';

import s from './sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
      <div className={s.user}>
        <img className={s.avatar} src="public/user.jpeg" alt="User avatar" />
        denis
      </div>
      <nav>
        <ul className={s.navLinksList}>
          <li>
            <NavLink to="/">🏠 Home</NavLink>
          </li>
          <li>
            <NavLink to="/my-account">👤 My Account</NavLink>
          </li>
          <li>
            <NavLink to="/post-snippet">📰 Post snippet</NavLink>
          </li>
          <li>
            <NavLink to="/my-snippets">📄 My snippets</NavLink>
          </li>
          <li>
            <NavLink to="/questions">👤❓ Questions</NavLink>
          </li>
          <li>
            <NavLink to="/users">👥 Users</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
