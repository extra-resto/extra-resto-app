import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul>
      
	      <li><Link href='/'><a href="">A propos de nous</a></Link></li> 
      </ul>

  &copy; 2021 La Bande

    <address>
      <a href="mailto:hello@extra-resto.fr">hello@extra-resto.fr</a>
    </address>
  </div>
  );
};

export default Footer;

