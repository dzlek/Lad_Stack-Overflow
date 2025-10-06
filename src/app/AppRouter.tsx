import { Outlet } from 'react-router-dom';

import Header from '../widgets/header/Header';
import Sidebar from '../widgets/sidebar/Sidebar';

import s from './appRouter.module.scss';

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className={s.wrapper}>
        <Sidebar />
        <main className={s.mainWrapper}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
