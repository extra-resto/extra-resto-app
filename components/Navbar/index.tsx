import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <>
      <nav className={styles.Navbar}>
      <Link href='/'>
	      <a>Home </a>
      </Link>
      <Link href='/signup'>
	      <a> SignUp </a>
      </Link>
      <Link href='/login'>
	      <a> Login </a>
      </Link>
      </nav>
    </>
  )
}

export default Navbar;
