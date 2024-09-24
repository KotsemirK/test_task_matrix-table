import React, { createContext, ReactNode } from 'react';
import { useMatrix } from '../hooks/useMatrix';
import { Cell } from '../types/matrix';

interface MatrixContextProps {
  matrix: Cell[][];
  increaseCellValue: (rowIdx: number, colIdx: number) => void;
  getRowSum: (rowIdx: number) => number;
  get50thPercentile: (colIdx: number) => number;
  getNearestCells: (value: number) => Cell[];
  deleteRow: (rowIdx: number) => void;
  addRow: () => void;
  hoveredRow: number | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<number | null>>;
  getRowInPercent: (rowIdx: number) => Cell[];
  getHeatmapForRow: (rowIdx: number) => Cell[];
  M: number;
  N: number;
  X: number;
}

const MatrixContext = createContext<MatrixContextProps | undefined>(undefined);

interface MatrixProviderProps {
  M: number;
  N: number;
  X: number;
  children: ReactNode;
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ M, N, X, children }) => {
  const matrixState = useMatrix(M, N, X);
  return <MatrixContext.Provider value={matrixState}>{children}</MatrixContext.Provider>;
};

export default MatrixContext;
