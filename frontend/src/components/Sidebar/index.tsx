import { useRouter } from 'next/router';
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
      <a onClick={handleLogout}>Logout</a>
    </nav>
  )
}

export { Sidebar }