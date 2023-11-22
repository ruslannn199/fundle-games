// Types
import type { CurrentUser, ProductURLOptions } from '../types/interfaces';

const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => (
  !!(currentUser && Array.isArray(currentUser.userRoles)
    && currentUser.userRoles.includes('admin'))
);

const makeFetchURL = (str: string): string => (
  import.meta.env.DEV
    ? `http://localhost/fundle-games/api/records/${str}`
    : `https://fundle-games.infinityfreeapp.com/fundle-games/api/records/${str}`
);

const makeComplexProductFetchURL = (
    { pageSize, filters }: ProductURLOptions
  ): string => (
  `${
    filters?.query
      ? makeFetchURL('products?')
      : makeFetchURL('products?order=createdDate,desc')
  }${
    filters?.category
      ? `&filter=category,cs,${filters.category}`
      : ''
  }${
    filters?.query
      ? `&search=${filters.query}`
      : ''
  }${
    filters?.currentPage
      ? `&page=${filters.currentPage},${pageSize}`
      : ''
  }`
);

const convertToMySQLDateTime = (date: Date): string => (
  date.toISOString().slice(0, 19).replace('T', ' ')
);

const convertFromMySQLDateTime = (dateStringified: string): string => (
  new Intl.DateTimeFormat('ru-RU').format(new Date(dateStringified))
);

const convertToURLAddress = (str: string): string => (
  str.toLowerCase().replaceAll(' ', '-')
);

const convertFromURLAddress = (str: string): string => (
  str
    .split('')
    .map((char, index) => {
      if (index === 0) {
        return char.toUpperCase();
      }
      if (char === '-') {
        return ' ';
      }
      return char;
    })
    .join('')
);

const countriesList = new Map<string, string>();
countriesList
  .set('RU', 'Россия').set('FI', 'Финляндия').set('GE', 'Грузия').set('RO', 'Румыния').set('US', 'США')
  .set('KZ', 'Казахстан').set('GB', 'Соединённое королевство').set('DE', 'Германия').set('FR', 'Франция')
  .set('ES', 'Испания').set('PL', 'Польша').set('BY', 'Беларусь').set('EE', 'Эстония').set('LV', 'Латвия')
  .set('LT', 'Литва').set('AM', 'Армения').set('AZ', 'Азербайджан').set('MD', 'Молдавия').set('AT', 'Австрия')
  .set('IT', 'Италия').set('UZ', 'Узбекистан').set('TJ', 'Таджикистан').set('KG', 'Кыргызстан').set('UK', 'Украина');

const countryOptions = (): Record<'label' | 'value', string>[] => {
  const options = [];
  for (const [abb, name] of countriesList) {
    options.push({
      label: name,
      value: abb,
    });
  }
  return options;
}

export {
  checkUserIsAdmin,
  makeFetchURL,
  makeComplexProductFetchURL,
  convertToMySQLDateTime,
  convertFromMySQLDateTime,
  convertToURLAddress,
  convertFromURLAddress,
  countryOptions,
};
