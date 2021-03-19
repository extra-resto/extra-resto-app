import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul>
	      <li><a href="">A propos de nous</a></li> 
	      <li><a href="">Nous contacter</a></li>
      </ul>

  &copy; 2021 THP Team.

    <address>
      Email: <a href="mailto:youform@mail.com">@addresse</a>
    </address>
  </div>
  );
};

export default Footer;

