import styles from './TransactionList.module.scss';

interface TransactionListItemProps {
  isReceiving: boolean;
  amount: number;
  peerName: string;
  data?: Date;
}

export const TransactionListItem = ({
  isReceiving, amount, peerName
}: TransactionListItemProps) => {
  return (
    <div className={styles.transactionListItem}>
      <span className={styles.header}>
        {isReceiving ? 'Transferência recebida' : 'Transferência realizada'}
        <small>03 NOV</small>
      </span>
      <span>{peerName}</span>
      <span 
        className={isReceiving ? styles.earn : styles.loss}
      >
        {amount.toLocaleString('pt-br', { style: 'currency', 'currency': 'BRL' })}
      </span>
    </div>
  )
}