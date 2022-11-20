import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowClockwise, Funnel } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getToken } from '../auth';
import { Button } from '../components/Button';
import { Combobox } from '../components/Combobox';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { NewTransactionForm } from '../components/NewTransactionForm';
import { Sidebar } from '../components/Sidebar';
import { TransactionList } from '../components/TransactionList';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Home.module.scss';
import { TransactionListType } from '../types/core';

export default function Home() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<TransactionListType>();

  const [isTransactionModalOpened, setIsTransactionModalOpened] = useState(false);
  const [isFilterModalOpened, setIsFilterModalOpened] = useState(false);

  const [filterType, setFilterType] = useState('');
  const [filterInitialDate, setFilterInitialDate] = useState('');
  const [filterFinalDate, setFilterFinalDate] = useState('');

  const { isUserLoading, error, user } = useAuth();

  if (!isUserLoading && (error || !user)) {
    router.push('/login');
  }

  const formatTransactionQueryParams = useCallback(() => {
    let queryParams = '?';

    if (filterType && parseInt(filterType) > 0) {
      queryParams += `transactionType=${filterType}&`;
    }

    if (filterInitialDate) {
      queryParams += `initialDate=${filterInitialDate}&`;
    }

    if (filterFinalDate) {
      queryParams += `finalDate=${filterFinalDate}&`;
    }

    queryParams = queryParams.substring(0, queryParams.length - 1);
    return queryParams;
  }, [filterType, filterInitialDate, filterFinalDate]);

  const fetchTransactions = useCallback(async () => {
    const queryParams = formatTransactionQueryParams();
    console.log('queryparams', queryParams)

    const response = await fetch(`http://localhost:3333/transaction${queryParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      },
    });

    const result = await response.json();

    if (result.error) {
      alert('Erro ao buscar transações: ' + result.error);
      return;
    }

    setTransactions(old => result.transactions as TransactionListType);
  }, [formatTransactionQueryParams]);

  useEffect(() => {
    if (user)
      fetchTransactions();
  }, [user, fetchTransactions]);

  function onCloseTransactionModal() {
    setIsTransactionModalOpened(false);
    fetchTransactions();
  }

  function onCloseFilterModal() {
    setIsFilterModalOpened(false);
    fetchTransactions();
  }

  function handleOnClickResetFilters() {
    setFilterType('');
    setFilterInitialDate('');
    setFilterFinalDate('');
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Homepage do mini app fincanceiro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      {isTransactionModalOpened &&
        <Modal onClose={onCloseTransactionModal}>
          <NewTransactionForm />
        </Modal>
      }

      {isFilterModalOpened &&
        <Modal onClose={onCloseFilterModal}>
          <form className={styles.filters}>
            <h3>Filtros</h3>

            <div className={styles.filterRow}>
              <label>Tipo de transação</label>
              <Combobox id="transactionType" name="transactionType" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value=''>Todas</option>
                <option value='1'>Somente cash-in</option>
                <option value='2'>Somente cash-out</option>
              </Combobox>
            </div>

            <div className={styles.filterRow}>
              <label>Data inicial</label>
              <Input
                type="date"
                id="initialDate"
                name="initialDate"
                value={filterInitialDate}
                onChange={e => setFilterInitialDate(e.target.value)}
              />
            </div>

            <div className={styles.filterRow}>
              <label>Data final</label>
              <Input
                type="date"
                id="finalDate"
                name="finalDate"
                value={filterFinalDate}
                onChange={e => setFilterFinalDate(e.target.value)}
              />
            </div>

            <Button type="button" onClick={handleOnClickResetFilters}>Resetar Filtros</Button>

          </form>
        </Modal>
      }

      <main className={styles.main}>
        <section className={styles.userInfoContainer}>
          <h2>Olá, {user?.username}!</h2>

          <div className={styles.balanceContainer}>
            <span>
              <h3>Seu saldo</h3>
              <button type="button" onClick={fetchTransactions}>
                <ArrowClockwise size={24} weight='bold' />   
              </button>         
            </span>
            <b>{transactions?.balance.toLocaleString('pt-br', { style: 'currency', 'currency': 'BRL' })}</b>
          </div>

          <Button onClick={() => setIsTransactionModalOpened(true)}>Nova transação</Button>
        </section>

        <section className={styles.transactionsContainer}>
          <div className={styles.transactionListHeader}>
            <h3>Histórico de Transações</h3>
            <button type="button" className={styles.filterIcon} onClick={() => setIsFilterModalOpened(true)}><Funnel size={30} weight='bold'/></button>
          </div>
          {transactions && <TransactionList transactions={transactions} />}
        </section>
      </main>
    </div>
  )
}
