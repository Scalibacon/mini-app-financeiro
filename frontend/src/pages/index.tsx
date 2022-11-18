import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { NewTransactionForm } from '../components/NewTransactionForm';
import { Sidebar } from '../components/Sidebar';
import { TransactionList } from '../components/TransactionList';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const router = useRouter();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const { isUserLoading, error, user } = useAuth();

  if(!isUserLoading && (error || !user)){
    router.push('/login');
  }

  function onCloseModal() {
    setIsModalOpened(false);
    // atualizar saldo e histórico
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Homepage do mini app fincanceiro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      {isModalOpened &&
        <Modal onClose={onCloseModal}>
          <NewTransactionForm />

        </Modal>
      }

      <main className={styles.main}>
        <section className={styles.userInfoContainer}>
          <h2>Olá, Matheus!</h2>

          <div className={styles.balanceContainer}>
            <h3>Seu saldo</h3>
            <b>R$14.351,78</b>
          </div>

          <Button onClick={() => setIsModalOpened(true)}>Nova transação</Button>
        </section>

        <section className={styles.transactionsContainer}>
          <h3>Histórico de Transações</h3>
          <TransactionList />
        </section>
      </main>
    </div>
  )
}
