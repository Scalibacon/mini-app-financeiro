import { FormEvent } from 'react';
import Swal from 'sweetalert2';
import { getToken } from '../../auth';
import { Button } from '../Button';
import { Input } from '../Input';
import styles from './NewTransactionForm.module.scss';

export const NewTransactionForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const body = {
      creditedUsername: data.get('username'),
      value: data.get('value')
    };

    const response = await fetch('http://localhost:3333/transaction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();

    if(result.error){
      return Swal.fire({
        title: 'Erro ao realizar transferência!',
        text: result.error,
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
    }

    return Swal.fire({
      title: 'Sucesso!',
      text: result.message,
      icon: 'success',
      confirmButtonText: 'Belezinha'
    });
  }

  return (
    <form className={styles.wrapper} onSubmit={ handleSubmit }>
      <h2>Nova Transação</h2>

      <div className={styles.formLine}>
        <label>Quem receberá a transferência?</label>
        <Input name="username" id="username" placeholder='Digite o nome do usuário' required />
      </div>

      <div className={styles.formLine}>
        <label>Valor a ser transferido</label>
        <Input name="value" id="value" placeholder='Digite o valor' required />
      </div>

      <Button type="submit">Transferir</Button>
    </form>
  )
}