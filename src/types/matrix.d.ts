export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
  percent?: number;
  intensity?: number;
};

export interface HeatmapData {
  intensity: number;
};

export type Matrix = Cell[][];
