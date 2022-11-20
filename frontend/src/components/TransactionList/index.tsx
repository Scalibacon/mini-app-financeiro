import { useEffect, useState } from 'react';
import { TransactionListType, TransactionType } from '../../types/core';
import styles from './TransactionList.module.scss';
import { TransactionListItem } from './TransactionListItem';

interface TransactionListProps{
  transactions: TransactionListType
}

export const TransactionList = ({
  transactions
}: TransactionListProps) => {
  const [ mergedTransactions, setMergedTransactions ] = useState<TransactionType[]>([]);

  console.log('transactions', transactions);  

  useEffect( () => {
    function mergeTransactions(){
      let mergedTransactions: TransactionType[] = [];

      mergedTransactions = [...transactions.creditedTransactions, ...transactions.debitedTransactions];
      mergedTransactions = mergedTransactions.sort( (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if(dateA.getTime() >= dateB.getTime()){
          return -1;
        } else {
          return 1;
        }
      });
  
      setMergedTransactions(mergedTransactions);
    }

    mergeTransactions();
  }, [transactions]);

  // juntar credited e debited e dar um sort
  return (
    <div className={styles.wrapper}>
      { mergedTransactions.map( transaction => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  )
};