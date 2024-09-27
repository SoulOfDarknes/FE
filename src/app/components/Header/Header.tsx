
import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                <Link href="/" className={styles.link}>
                    List of countries
                </Link>
            </h1>
        </header>
    );
};

export default Header;