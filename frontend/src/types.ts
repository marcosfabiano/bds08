export type Store = {
  id: number;
  name: string;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};

export type SalesByGenderAndStore = {
  gender: string;
  sum: number;
};
