import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className='Navbar'>
      <Link href='/'>
	      <a>Home</a>
      </Link>
      <Link href='/signup'>
	      <a>SignUp</a>
      </Link>
      </nav>
    </>
  )
}

export default Navbar;
