import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getToken } from '../auth';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { NewTransactionForm } from '../components/NewTransactionForm';
import { Sidebar } from '../components/Sidebar';
import { TransactionList } from '../components/TransactionList';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Home.module.scss';
import { TransactionListType, TransactionType } from '../types/core';

export default function Home() {
  const router = useRouter();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [transactions, setTransactions] = useState<TransactionListType>();

  const { isUserLoading, error, user } = useAuth();

  if(!isUserLoading && (error || !user)){
    router.push('/login');
  }

  useEffect( () => {
    fetchTransactions();
  }, []);

  function onCloseModal() {
    setIsModalOpened(false);
    // atualizar saldo e histórico
  }

  async function fetchTransactions(){
    const response = await fetch('http://localhost:3333/transaction',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      },
    });

    const result = await response.json();

    if(result.error){
      alert('Erro ao buscar transações: ' + result.error);
      return;
    }

    setTransactions( old => result.transactions as TransactionListType);
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
          <h2>Olá, {user?.username}!</h2>

          <div className={styles.balanceContainer}>
            <h3>Seu saldo</h3>
            <b>{user?.account.balance.toLocaleString('pt-br', { style: 'currency', 'currency': 'BRL' })}</b>
          </div>

          <Button onClick={() => setIsModalOpened(true)}>Nova transação</Button>
        </section>

        <section className={styles.transactionsContainer}>
          <h3>Histórico de Transações</h3>
          { transactions && <TransactionList transactions={ transactions } /> }
        </section>
      </main>
    </div>
  )
}
