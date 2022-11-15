import Head from 'next/head';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';
import { TransactionList } from '../components/TransactionList';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Homepage do mini app fincanceiro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      <main className={styles.main}>
        <section className={styles.userInfoContainer}>
          <h2>Olá, Matheus!</h2>

          <div className={styles.balanceContainer}>
            <h3>Seu saldo</h3>
            <b>R$14.351,78</b>
          </div>

          <Button>Nova transação</Button>
        </section>

        <section className={styles.transactionsContainer}>
          <h3>Histórico de Transações</h3>
          <TransactionList />
        </section>
      </main>
    </div>
  )
}
