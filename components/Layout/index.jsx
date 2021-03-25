import styles from './Layout.module.scss';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Head from 'next/head';

const Layout = ({ children }) => (
  <>
      <Head>
        <title>ExtraResto</title>
        <link rel='icon' type='image/svg' href='images/icons/food-pin-svgrepo-com.svg' />
      </Head>
        <div className={styles.Layout}>
      <Navbar />
        {children}
      <Footer />
  </div>
  </>
)

export default Layout;
