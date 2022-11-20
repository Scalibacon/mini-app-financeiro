import { ReactNode, SelectHTMLAttributes } from "react";
import styles from './Combobox.module.scss';

interface ComboboxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode
}

const Combobox = (props: ComboboxProps) => {
  return (
    <div className={styles.wrapper}>
      <select {...props}>
        { props.children }
      </select>
    </div>
  )
}

export { Combobox }