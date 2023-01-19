import Header from 'components/Header';
import PieChart from 'components/PieChart';
import StoreFilter, { FilterData } from 'components/StoreFilter';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { PieChartConfig, SalesByGenderAndStore } from 'types';
import { formatSum } from 'util/formatters';
import { makeRequest } from 'util/requests';
import { buildSalesByGenderAndStore } from './helpers';

import './styles.css';

type ControlComponentsData = {
  filterData?: FilterData;
};

const Sale = () => {
  const [saleSummary, setSaleSummary] = useState(0);

  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      filterData: { store: null },
    });

  const handleSubmitFilter = (data: FilterData) => {
    setControlComponentsData({ filterData: data });
  };

  const getSaleSummary = useCallback(() => {
    const params = { storeId: controlComponentsData.filterData?.store?.id };
    makeRequest.get('/sales/summary', { params }).then((response) => {
      setSaleSummary(response.data.sum);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getSaleSummary();
  }, [getSaleSummary]);

  const getSaleByGender = useCallback(() => {
    const params = { storeId: controlComponentsData.filterData?.store?.id };
    makeRequest
      .get<SalesByGenderAndStore[]>('/sales/by-gender', { params })
      .then((response) => {
        const newSalesByGenderAndStore = buildSalesByGenderAndStore(
          response.data
        );
        setSalesByGender(newSalesByGenderAndStore);
      });
  }, [controlComponentsData]);

  useEffect(() => {
    getSaleByGender();
  }, [getSaleByGender]);

  return (
    <header>
      <Header />
      <main>
        <StoreFilter onSubmitFilter={handleSubmitFilter} />
        <div className="base-card sale-container">
          <div className="sale-summary">
            <h1>{formatSum(saleSummary)}</h1>
            <p>Total de vendas</p>
          </div>
          <div className="sale-piechart mr50">
            <PieChart
              name=""
              labels={salesByGender?.labels}
              series={salesByGender?.series}
            />
          </div>
        </div>
      </main>
    </header>
  );
};

export default Sale;
