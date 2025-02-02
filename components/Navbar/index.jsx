import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Logout from 'components/Logout';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const { token, role } = useSelector(state => state);
  

  return (
      <nav className={styles.Navbar}>
        <div className={styles.Navbar__left}>
          <Link href='/'>
            <a>
              <Image
                src="/images/Navbar/extra-logo.png"
                height="73px"
                width="189px"
                quality="100"
                alt="extra-resto logo"
              />
            </a>
          </Link>

          {role !== 'employer' && 
            <Link href='/jobs'>
              <a>Les jobs</a>
            </Link>
          }
        </div>

        <div className={styles.Navbar__right}>

          {role === 'employer' && 
            <Link href='/employer_home'>
              <a>Mon espace</a>
            </Link>
          }

          {role === 'candidate' && 
            <Link href='/candidate_home'>
              <a>Mon espace</a>
            </Link>
          }

          {token ? (
            <Logout />
        ) : (

            <Link href='/login'>
              <a>Se Connecter</a>
            </Link>

        )}
        </div>
        

        

        
      </nav>
  )
}

export default Navbar;
