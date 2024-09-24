import { useState } from 'react';
import { generateMatrix, calculateRowSum, calculate50thPercentile, findNearestCells } from '../services/matrixService';
import { Matrix, CellValue, Cell } from '../types/matrix';

export const useMatrix = (M: number, N: number, X: number) => {
  const [matrix, setMatrix] = useState<Matrix>(() => generateMatrix(M, N));
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const increaseCellValue = (rowIdx: number, colIdx: number) => {
    setMatrix(prev =>
      prev.map((row, rIdx) =>
        rIdx === rowIdx
          ? row.map((cell, cIdx) =>
            cIdx === colIdx ? { ...cell, amount: cell.amount + 1 } : cell
          )
          : row
      )
    );
  };

  const getRowSum = (rowIdx: number) => calculateRowSum(matrix[rowIdx]);

  const get50thPercentile = (colIdx: number) =>
    calculate50thPercentile(matrix.map(row => row[colIdx]));

  const getNearestCells = (value: CellValue): Cell[] => {
    const flatMatrix = matrix.flat();

    return findNearestCells(value, flatMatrix, X);
  };

  const deleteRow = (rowIdx: number) => {
    setMatrix(prev => prev.filter((_, rIdx) => rIdx !== rowIdx));
  };

  const addRow = () => {
    const newRow = generateMatrix(1, N)[0];
    setMatrix(prev => [...prev, newRow]);
  };

  const getRowInPercent = (rowIdx: number) => {
    const row = matrix[rowIdx];
    const sum = calculateRowSum(row);

    return row.map(cell => ({
      ...cell,
      percent: sum > 0 ? (cell.amount / sum) * 100 : 0,
    }));
  };

  const getHeatmapForRow = (rowIdx: number) => {
    const row = matrix[rowIdx];
    const max = Math.max(...row.map(cell => cell.amount));

    return row.map(cell => ({
      ...cell,
      intensity: max > 0 ? (cell.amount / max) * 100 : 0,
    }));
  };

  return {
    matrix,
    increaseCellValue,
    getRowSum,
    get50thPercentile,
    getNearestCells,
    deleteRow,
    addRow,
    hoveredRow,
    setHoveredRow,
    getRowInPercent,
    getHeatmapForRow,
    X,
    M,
    N
  };
};
