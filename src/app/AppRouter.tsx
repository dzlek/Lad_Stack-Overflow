import { Outlet } from 'react-router-dom';

import Header from '../widgets/header/Header';
import Sidebar from '../widgets/sidebar/Sidebar';

import s from './appRouter.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className={s.wrapper}>
        <Sidebar />
        <main className={s.mainWrapper}>
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default AppLayout;
