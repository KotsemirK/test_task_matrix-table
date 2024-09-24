import React, { useState } from 'react';
import MatrixForm from './components/MatrixForm/MatrixForm';
import { MatrixProvider } from './context/MatrixContext';
import MatrixTable from './components/MatrixTable/MatrixTable';
import styles from './App.module.css';

const App: React.FC = () => {
  const [M, setM] = useState<number | null>(null);
  const [N, setN] = useState<number | null>(null);
  const [X, setX] = useState<number | null>(null);

  const handleFormSubmit = (M: number, N: number, X: number) => {
    setM(M);
    setN(N);
    setX(X);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.app__header}>Matrix Generator</h1>
      <div className={styles.app__content}>
        <MatrixForm onSubmit={handleFormSubmit} />
        {M !== null && N !== null && X !== null && (
          <MatrixProvider M={M} N={N} X={X}>
            <MatrixTable />
          </MatrixProvider>
        )}
      </div>
    </div>
  );
};

export default App;
