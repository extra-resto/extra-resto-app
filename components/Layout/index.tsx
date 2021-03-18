import styles from './Layout.module.scss';
import Navbar from '../Navbar';

const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <Navbar />
    {children}
  </div>
)

export default Layout;
