import { useState } from 'react';
import { useMatrixContext } from '../context/useMatrixContext';

export const useNearestCells = () => {
  const { getNearestCells } = useMatrixContext();
  const [nearestCells, setNearestCells] = useState<number[]>([]);

  const handleMouseEnter = (cellValue: number) => {
    const nearest = getNearestCells(cellValue);
    setNearestCells(nearest.map(cell => cell.id));
  };

  const handleMouseLeave = () => {
    setNearestCells([]);
  };

  return {
    nearestCells,
    handleMouseEnter,
    handleMouseLeave,
  };
};
