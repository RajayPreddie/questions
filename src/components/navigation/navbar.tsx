import Link from 'next/link';
import React from 'react';
import { BrandInstagram, Home, QuestionMark, User } from 'tabler-icons-react';

import styles from '../../styles/navbar.module.css';
export default function BottomNavbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/" passHref>
        <div className={styles.button}>
          <Home size={30} />
          <span>Home</span>
        </div>
      </Link>
      <Link href="/social" passHref>
        <div className={styles.button}>
          <BrandInstagram size={30} />
          <span>Social</span>
        </div>
      </Link>
      <Link href="/profile" passHref>
        <div className={styles.button}>
          <User size={30} />
          <span>Profile</span>
        </div>
      </Link>
      <Link href="/questions" passHref>
        <div className={styles.button}>
          <QuestionMark size={30} />
          <span>Questions</span>
        </div>
      </Link>
    </div>
  );
}
