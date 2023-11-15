// Components
import { ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
// Hooks
import { useCategoriesActions, useLoadingActions } from '../../hooks';
// Images
import NewGamesImg from '../../assets/images/new-games.jpg';
import PopularGamesImg from '../../assets/images/popular-games.webp';
// Styles
import { DirectoryButton, DirectoryItem, DirectoryTitle, DirectoryWrapper } from './Directory.styles';
// Themes
import { blackTheme } from '../../utils/themes';

const Directory: React.FC = () => {
  const { setFakeLoadingStart } = useLoadingActions();
  const { updateCategory } = useCategoriesActions();

  const redirect = (category: string): void => {
    updateCategory(category);
    setFakeLoadingStart();
  }

  return (
    <DirectoryWrapper justify="center" align="center">
      <DirectoryItem vertical align="center" justify="center" image={NewGamesImg}>
        <DirectoryTitle>Новинки</DirectoryTitle>
        <ConfigProvider theme={blackTheme}>
          <Link to="search/?category=new-products&page=1" onClick={() => redirect('New products')}>
            <DirectoryButton type="primary" size="large">
              Перейти
            </DirectoryButton>
          </Link>
        </ConfigProvider>
      </DirectoryItem>
      <DirectoryItem vertical align="center" justify="center" image={PopularGamesImg}>
        <DirectoryTitle color="white">Популярные</DirectoryTitle>
        <ConfigProvider theme={blackTheme}>
          <Link to="search/?category=popular&page=1" onClick={() => redirect('Popular')}>
            <DirectoryButton type="default" size="large">
              Перейти
            </DirectoryButton>
          </Link>
        </ConfigProvider>
      </DirectoryItem>
    </DirectoryWrapper>
  );
};

export default Directory;
