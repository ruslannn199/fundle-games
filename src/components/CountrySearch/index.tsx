import { Select } from 'antd';
import { countryOptions } from '../../utils';
import { DefaultOptionType } from 'antd/es/select';
import { useWindowDimensions } from '../../hooks';

interface CountrySearchProps {
  onChange: (value: string) => void;
}

const CountrySearch: React.FC<CountrySearchProps> = ({ onChange }) => {
  const { width } = useWindowDimensions();

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const filterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType): number => {
    if (typeof optionA.label === 'string' && typeof optionB.label === 'string')
      return optionA.label.toLowerCase().localeCompare((optionB.label).toLowerCase());
    return -1;
  }

  return (
    <Select
      showSearch
      placeholder="Select country"
      filterOption={filterOption}
      filterSort={filterSort}
      options={countryOptions()}
      onChange={onChange}
      defaultValue="Russia"
      style={{ width: width > 576 ? "40rem" : "100%" }}
    />
  );
}

export default CountrySearch;
