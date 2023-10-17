import { Select } from 'antd';
import { countryOptions } from '../../utils';
import { DefaultOptionType } from 'antd/es/select';

const CountrySearch: React.FC<Record<'onChange', (value: string) => void>> = ({ onChange }) => {
  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const filterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType): number => {
    if (typeof optionA.label === 'string' && typeof optionB.label === 'string')
      return optionA.label.toLowerCase().localeCompare((optionB.label).toLowerCase());
    return -1;
  }

  return (
    <Select
      style={{ width: 300 }}
      showSearch
      placeholder="Select country"
      filterOption={filterOption}
      filterSort={filterSort}
      options={countryOptions}
      onChange={onChange}
      defaultValue={"Russia"}
    />
  );
}

export default CountrySearch;
