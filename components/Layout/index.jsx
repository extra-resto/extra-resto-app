import styles from './Layout.module.scss';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <Navbar />
      {children}
    <Footer />
  </div>
)

export default Layout;
