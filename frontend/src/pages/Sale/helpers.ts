import { SalesByGenderAndStore } from 'types';

export const buildSalesByGenderAndStore = (sales: SalesByGenderAndStore[]) => {
  const labels = sales.map((sale) => sale.gender);
  const series = sales.map((sale) => sale.sum);
  labels[0] = 'Feminino';
  labels[1] = 'Masculino';
  labels[2] = 'Outros';
  return {
    labels,
    series,
  };
};
