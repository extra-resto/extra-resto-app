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
          height={90} 
          width={90} 
          alt="extra-resto logo"
        />
        </a>
      </Link>
      <Link href='/concept'>
	      <a> Le Concept</a>
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
