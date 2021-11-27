import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import QRCard from "../components/QRCard";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>QR Code Generator</title>
      </Head>

      <main className={styles.main}>
        <QRCard />
      </main>
    </div>
  );
};

export default Home;
