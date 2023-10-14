// Components
import { Button, ConfigProvider } from 'antd';
import Wrapper from '../Wrapper';
import { Link } from 'react-router-dom';
// Images
import NewGamesImg from '../../assets/images/new-games.jpg';
import PopularGamesImg from '../../assets/images/popular-games.webp';
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
    <div className="directory">
      <Wrapper className={"wrapper_flex"}>
        <div className="directory__item" style={{backgroundImage: `url(${NewGamesImg})`}}>
          <h2 className="directory__title">Новинки</h2>
          <ConfigProvider theme={blackTheme}>
            <Link to="search/?category=new-products&page=1" className="directory__link" onClick={() => redirect('New products')}>
              <Button type="primary" className="btn directory__btn" size="large">
                Перейти
              </Button>
            </Link>
          </ConfigProvider>
        </div>
        <div className="directory__item" style={{backgroundImage: `url(${PopularGamesImg})`}}>
          <h2 className="directory__title">Популярные</h2>
          <ConfigProvider theme={blackTheme}>
            <Button type="default" className="btn directory__btn" size="large">
              <Link to="search/?category=popular&page=1" className="directory__link" onClick={() => redirect('Popular')}>
                Перейти
              </Link>
            </Button>
          </ConfigProvider>
        </div>
      </Wrapper>
    </div>
  );
};

export default Directory;
