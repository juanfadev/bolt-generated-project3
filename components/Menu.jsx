import React from 'react';
    import Link from 'next/link';
    import styles from './Menu.module.css';

    const Menu = () => {
      return (
        <nav className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/">
                <span className={styles.menuLink}>Dashboard</span>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/chapter-scene">
                <span className={styles.menuLink}>Chapter/Scene</span>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/character">
                <span className={styles.menuLink}>Character</span>
              </Link>
            </li>
          </ul>
        </nav>
      );
    };

    export default Menu;
