import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useAuth } from '../../app/context/useAuth';
import s from './header.module.scss';
import { CodeXml } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isQuestionsPage = location.pathname.startsWith('/questions');

  const createQuestion = () => {
    navigate(`/questions/create`);
  };

  return (
    <header className={s.header}>
      <Link to="" className={s.logo}>
        <span>
          <CodeXml size={20} />
          CODELANG
        </span>
      </Link>

      <div className={s.controls}>
        {isQuestionsPage && (
          <Button onClick={createQuestion}>Ask Question</Button>
        )}
        {user && <Button onClick={logout}>SIGN OUT</Button>}
        <div className={s.langSwitch}>
          <button>文A</button>
          <button>EN</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
