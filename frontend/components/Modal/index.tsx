import { ReactNode, SyntheticEvent } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  function handleBackgroundClick(e: SyntheticEvent) {
    closeModal();
  }

  function handleChildrenClick(e: SyntheticEvent){
    e.stopPropagation();
  }

  function closeModal() {
    if (props.onClose) props.onClose();
  }

  return (
    <div className={styles.background} onClick={handleBackgroundClick}>
      <main className={styles.wrapper} onClick={handleChildrenClick}>        
        <button className={styles.closeButton} onClick={closeModal}>X</button>
        {props.children}
      </main>
    </div>
  )
}