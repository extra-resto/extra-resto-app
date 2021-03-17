import { Navbar } from './Navbar.tsx';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
)

export default Layout;
