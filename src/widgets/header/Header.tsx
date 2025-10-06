import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import s from './header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <Link to="" className={s.logo}>
        <span>{'</>'}</span> CODELANG
      </Link>

      <div className={s.controls}>
        <Button>SIGN OUT</Button>
        <div className={s.langSwitch}>
          <button>文A</button>
          <button>EN</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
