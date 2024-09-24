import React from 'react';
import { useMatrixContext } from '../../context/useMatrixContext';
import { useNearestCells } from '../../hooks/useNearestCells';
import { Cell } from '../../types/matrix';
import styles from './MatrixTable.module.css';

const MatrixTable: React.FC = () => {
  const {
    matrix,
    increaseCellValue,
    getRowSum,
    get50thPercentile,
    deleteRow,
    addRow,
    hoveredRow,
    setHoveredRow,
    getRowInPercent,
    getHeatmapForRow,
  } = useMatrixContext();

  const { nearestCells, handleMouseEnter, handleMouseLeave } = useNearestCells();

  const renderRow = (row: Cell[], rowIdx: number) => {
    const rowData = hoveredRow === rowIdx ? getRowInPercent(rowIdx) : row;
    const heatmapData = getHeatmapForRow(rowIdx);

    return (
      <tr key={rowIdx} className={styles.table__row}>
        {rowData.map((cell: Cell, colIdx: number) => (
          <td
            key={cell.id}
            onClick={() => increaseCellValue(rowIdx, colIdx)}
            onMouseEnter={() => handleMouseEnter(cell.amount)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: nearestCells.includes(cell.id)
                ? 'lightblue'
                : `rgba(255, 0, 0, ${heatmapData[colIdx]?.intensity ? heatmapData[colIdx].intensity / 100 : 0})`
            }}
          >
            {hoveredRow === rowIdx ? `${cell.percent?.toFixed(1)}%` : cell.amount}
          </td>
        ))}
        <td onMouseEnter={() => setHoveredRow(rowIdx)} onMouseLeave={() => setHoveredRow(null)}>
          {getRowSum(rowIdx)}
        </td>
        <td>
          <button className={styles.removeRowButton} onClick={() => deleteRow(rowIdx)}>Delete Row</button>
        </td>
      </tr>
    );
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {matrix[0].map((_, colIdx) => (
              <th key={colIdx}>Column {colIdx + 1}</th>
            ))}
            <th>Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIdx) => renderRow(row, rowIdx))}
          <tr>
            {matrix[0].map((_, colIdx) => (
              <td key={colIdx}>{get50thPercentile(colIdx)}</td>
            ))}
            <td className={styles.table__cell_bold}>50th Percentile</td>
            <td>
              <button className={styles.addRowButton} onClick={addRow}>Add Row</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MatrixTable;
