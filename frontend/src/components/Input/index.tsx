import { InputHTMLAttributes } from "react";
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input type="text" {...props}/>
    </div>
  )
}

export { Input }