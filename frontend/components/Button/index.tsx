import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  )
}

export { Button }