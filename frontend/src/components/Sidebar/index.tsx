import { useRouter } from 'next/router';
import { SignOut } from 'phosphor-react';
import { logout } from '../../auth';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const router = useRouter();

  function handleLogout(){
    logout();
    router.push('/login');
  }

  return (
    <nav className={styles.wrapper}>
      <a onClick={handleLogout} className={styles.logout}>
        <SignOut size={20}/>
        LogOut
      </a>
    </nav>
  )
}

export { Sidebar }