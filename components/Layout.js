import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Layout({ children }) {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Tokyo 2020 Receptionist Team Web App</title>
          <meta
            name="description"
            content="Nodeflux Software Engineer Intern Assessment Web Dashboard"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
