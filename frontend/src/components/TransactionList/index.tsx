import { useEffect, useState } from 'react';
import { TransactionListType, TransactionType } from '../../types/core';
import styles from './TransactionList.module.scss';
import { TransactionListItem } from './TransactionListItem';

interface TransactionListProps {
  transactions: TransactionListType
}

export const TransactionList = ({
  transactions
}: TransactionListProps) => {  
  const [mergedTransactions, setMergedTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    function mergeTransactions() {
      let mergedTransactions: TransactionType[] = [];

      if(!transactions.creditedTransactions) transactions.creditedTransactions = [];
      if(!transactions.debitedTransactions) transactions.debitedTransactions = [];

      mergedTransactions = [...transactions.creditedTransactions, ...transactions.debitedTransactions];
      mergedTransactions = mergedTransactions.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateA.getTime() >= dateB.getTime()) {
          return -1;
        } else {
          return 1;
        }
      });

      setMergedTransactions(mergedTransactions);
    }

    mergeTransactions();
  }, [transactions]);

  return (
    <>
      <div className={styles.wrapper}>        
        {mergedTransactions.map(transaction => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </>
  )
};