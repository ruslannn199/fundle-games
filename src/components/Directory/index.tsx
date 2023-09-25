// Components
import { Button, ConfigProvider } from 'antd';
import Wrapper from '../Wrapper';
// Images
import NewGamesImg from '../../assets/images/new-games.jpg';
import PopularGamesImg from '../../assets/images/popular-games.webp';
// Themes
import { blackTheme } from '../../utils/themes';

const Directory: React.FC = () => (
  <div className="directory">
    <Wrapper className={"wrapper_flex"}>
      <div className="directory__item" style={{backgroundImage: `url(${NewGamesImg})`}}>
        <h2 className="directory__title">Новинки</h2>
        <ConfigProvider theme={blackTheme}>
          <Button type="primary" className="btn directory__btn" size="large">Перейти</Button>
        </ConfigProvider>
      </div>
      <div className="directory__item" style={{backgroundImage: `url(${PopularGamesImg})`}}>
        <h2 className="directory__title">Популярные</h2>
        <ConfigProvider theme={blackTheme}>
          <Button type="default" className="btn directory__btn" size="large">Перейти</Button>
        </ConfigProvider>
      </div>
    </Wrapper>
  </div>
);

export default Directory;
