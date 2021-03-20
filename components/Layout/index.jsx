import styles from './Layout.module.scss';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <Navbar />
    {children}
    <Footer />
  </div>
)

export default Layout;
