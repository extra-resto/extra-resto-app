import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import Logout from 'components/Logout';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const token = useSelector(state => state.token);

  return (
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
  	      <a>Le Concept</a>
        </Link>

        {token ? (
          <div>
            <Logout />
          </div>
        ):
        (
          <div>
            <Link href='/login'>
              <a>Se Connecter</a>
            </Link>
          </div>
        )}
      </nav>
  )
}

export default Navbar;
