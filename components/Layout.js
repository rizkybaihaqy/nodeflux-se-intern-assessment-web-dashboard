import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <Head>
          <title>Tokyo 2020 Receptionist Team Web App</title>
          <meta
            name="description"
            content="Nodeflux Software Engineer Intern Assessment Web Dashboard"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>{children}</main>
      </div>
    </div>
  );
}
