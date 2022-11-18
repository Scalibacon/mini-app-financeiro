import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import Swal from 'sweetalert2';
import { login } from '../../auth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/Login.module.scss';

export default function Login() {
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

    const response = await fetch('http://localhost:3333/account/login', {
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
        title: 'Erro ao realizar login!',
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
        <title>Fazer login</title>
        <meta name="description" content="Logar no mini app fincanceiro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1 className={styles.title}>Efetue seu login</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="username">
              <span>Username</span>
              <Input id="username" name="username" placeholder='Digite seu nome de usuário' />
            </label>

            <label htmlFor="password">
              <span>Password</span>
              <Input id="password" name="password" type="password" placeholder='Digite sua senha' />
            </label>

            <Button type="submit">Fazer login</Button>

            <small>
              Não possui uma conta?
              <Link href="/register">Crie uma aqui</Link>
            </small>
          </form>
        </main>
      </div>
    </>
  )
}