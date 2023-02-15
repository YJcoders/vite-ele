export type SaleData = {
  currentSales: number;
  monthSales: number;
  yearSales: number;
  tb: number;
  hb: number;
  yearTb: number;
  yearHb: number;
};

export type LineChartData = {
  yaxisData1: Array<number>;
  yaxisData2: Array<number>;
  tb: Array<number>;
  hb: Array<number>;
};

export type TableData = {
  area: string;
  affect: string;
  number: string;
  rate: string;
  gap: string;
};
