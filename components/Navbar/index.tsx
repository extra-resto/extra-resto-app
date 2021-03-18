import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <>
      <nav className={styles.Navbar}>
      <Link href='/'>
	      <a>
        <Image 
          src="/images/Navbar/eye.svg"
          height={120} 
          width={120} 
          alt="Your Name"
        />
        </a>
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
