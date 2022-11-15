import styles from './TransactionList.module.scss';
import { TransactionListItem } from './TransactionListItem';

export const TransactionList = () => {
  return (
    <div className={styles.wrapper}>
      <TransactionListItem isReceiving={true} amount={1323.89} peerName={'Carlos de Araújo Lima'}/>
      <TransactionListItem isReceiving={false} amount={541.11} peerName={'Priscila Albuquerque'}/>
    </div>
  )
};