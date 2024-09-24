import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange, error }) => {

  return (
    <div className={styles.input}>
      <label htmlFor={name} className={styles.input__label}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input__field} ${error ? styles['input__field_error'] : ''}`}
      />
      {error && <span className={styles.input__error}>{error}</span>}
    </div>
  );
};

export default Input;
