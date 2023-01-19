import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from 'types';
import { makeRequest } from 'util/requests';

import './styles.css';

export type FilterData = {
  store: Store | null;
};

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

const StoreFilter = ({ onSubmitFilter }: Props) => {
  const [selectStories, setSelectStories] = useState<Store[]>([]);

  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  const onSubmit = (formData: FilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeStore = (value: Store) => {
    setValue('store', value);
    const obj: FilterData = {
      store: getValues('store'),
    };
    onSubmitFilter(obj);
  };

  useEffect(() => {
    makeRequest.get<Store[]>('/stores').then((response) => {
      setSelectStories(response.data);
    });
  }, []);

  return (
    <div className="base-card filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        <Controller
          name="store"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectStories}
              isClearable
              placeholder="Loja"
              classNamePrefix="filter-select"
              onChange={(value) => handleChangeStore(value as Store)}
              getOptionLabel={(store: Store) => store.name}
              getOptionValue={(store: Store) => String(store.id)}
            />
          )}
        />
      </form>
    </div>
  );
};

export default StoreFilter;
