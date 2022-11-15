import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import styles from '../../styles/Login.module.scss';

export default function Login() {
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

          <form className={styles.form}>
            <label htmlFor="username">
              <span>Username</span>
              <Input id="username" placeholder='Digite seu nome de usuário' />
            </label>

            <label htmlFor="password">
              <span>Password</span>
              <Input id="password" type="password" placeholder='Digite sua senha' />
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