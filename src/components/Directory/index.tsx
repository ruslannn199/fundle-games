// Components
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
// Images
import NewGamesImg from '../../assets/images/new-games.jpg';
import PopularGamesImg from '../../assets/images/popular-games.webp';
// Styles
import { DirectoryButton, DirectoryItem, DirectoryTitle, DirectoryWrapper } from './Directory.styles';
// Themes
import { blackTheme } from '../../utils/themes';
import { useCategoriesActions, useLoadingActions } from '../../hooks';

const Directory: React.FC = () => {
  const { setFakeLoadingStart } = useLoadingActions();
  const { updateCategory } = useCategoriesActions();

  const redirect = (category: string): void => {
    updateCategory(category);
    setFakeLoadingStart();
  }

  return (
    <DirectoryWrapper justify="center" align="center">
      <DirectoryItem vertical align="center" justify="center" backgroundImage={NewGamesImg}>
        <DirectoryTitle>Новинки</DirectoryTitle>
        <ConfigProvider theme={blackTheme}>
          <Link to="search/?category=new-products&page=1" onClick={() => redirect('New products')}>
            <DirectoryButton type="primary" size="large">
              Перейти
            </DirectoryButton>
          </Link>
        </ConfigProvider>
      </DirectoryItem>
      <DirectoryItem vertical align="center" justify="center" backgroundImage={PopularGamesImg}>
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
