import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import Swal from 'sweetalert2';
import { login } from '../../auth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/Register.module.scss';

export default function Register() {
  const router = useRouter();
  const { isUserLoading, error, user } = useAuth();

  if(!isUserLoading && !error && user){
    router.push('/');
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get('username'),
      password: data.get('password')
    };

    const response = await fetch('http://localhost:3333/account', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();

    if(result.error){
      return Swal.fire({
        title: 'Erro ao criar sua conta!',
        text: result.error,
        icon: 'error',
        confirmButtonText: 'Entendi'
      })
    }

    login(result.token);
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Criar conta</title>
        <meta name="description" content="Criar conta no mini app fincanceiro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1 className={styles.title}>Crie sua conta</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="username">
              <span>Username</span>
              <Input id="username" name="username" placeholder='Digite seu nome de usuário' autoComplete='username' />
            </label>

            <label htmlFor="password">
              <span>Password</span>
              <Input id="password" name="password" type="password" placeholder='Digite sua senha' autoComplete='current-password' />
            </label>

            <Button type="submit">Criar conta</Button>

            <small>
              Já possui uma conta?
              <Link href="/login">Entre aqui</Link>
            </small>
          </form>
        </main>
      </div>
    </>
  )
}