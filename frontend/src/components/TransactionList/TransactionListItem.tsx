import moment from 'moment';
import { TransactionType } from '../../types/core';
import styles from './TransactionList.module.scss';

interface TransactionListItemProps {
  transaction: TransactionType
}

export const TransactionListItem = ({
  transaction
}: TransactionListItemProps) => {
  const isReceiving = transaction.debitedAccount ? true : false;

  return (
    <div className={styles.transactionListItem}>
      <span className={styles.header}>
        {isReceiving ? 'Transferência recebida' : 'Transferência realizada'}
        <small>{ moment(transaction.createdAt).format('DD[/]MMM').toUpperCase() }</small>
      </span>
      <span>{ isReceiving ? transaction.debitedAccount?.user.username : transaction.creditedAccount?.user.username }</span>
      <span 
        className={isReceiving ? styles.earn : styles.loss}
      >
        {transaction.value.toLocaleString('pt-br', { style: 'currency', 'currency': 'BRL' })}
      </span>
    </div>
  )
}