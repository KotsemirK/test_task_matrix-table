import React, { ReactNode } from 'react';
import styles from './Form.module.css';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </div>
  );
};

export default Form;
