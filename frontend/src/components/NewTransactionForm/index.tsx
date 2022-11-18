import { Button } from '../Button';
import { Input } from '../Input';
import styles from './NewTransactionForm.module.scss';

export const NewTransactionForm = () => {
  return (
    <form className={styles.wrapper}>
      <h2>Nova Transação</h2>

      <div className={styles.formLine}>
        <label>Quem receberá a transferência?</label>
        <Input placeholder='Digite o nome do usuário' />
      </div>

      <div className={styles.formLine}>
        <label>Valor a ser transferido</label>
        <Input placeholder='Digite o valor' />
      </div>

      <Button type="submit">Transferir</Button>
    </form>
  )
}