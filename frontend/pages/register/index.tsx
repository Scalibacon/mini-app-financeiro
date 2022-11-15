import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import styles from '../../styles/Register.module.scss';

export default function Register() {
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

          <form className={styles.form}>
            <label htmlFor="username">
              <span>Username</span>
              <Input id="username" placeholder='Digite seu nome de usuário' />
            </label>

            <label htmlFor="password">
              <span>Password</span>
              <Input id="password" type="password" placeholder='Digite sua senha' />
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