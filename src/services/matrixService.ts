import { Cell, CellValue, Matrix } from '../types/matrix';

export const generateMatrix = (M: number, N: number): Matrix => {
  let id = 0;

  return Array.from({ length: M }, () =>
    Array.from({ length: N }, () => ({
      id: id++,
      amount: Math.floor(Math.random() * 900) + 100,
    }))
  );
};

export const calculateRowSum = (row: Cell[]): number =>
  row.reduce((sum, cell) => sum + cell.amount, 0);

export const calculate50thPercentile = (cells: Cell[]): number => {
  const sorted = cells.map(cell => cell.amount).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted[middle];
};

export const findNearestCells = (value: CellValue, cells: Cell[], X: number): Cell[] => {
  const sortedCells = cells
    .filter(cell => cell.amount !== value)
    .sort((a, b) => Math.abs(a.amount - value) - Math.abs(b.amount - value));

  return sortedCells.slice(0, X);
};
