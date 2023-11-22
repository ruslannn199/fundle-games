// Components
import { Result } from 'antd';
// Hooks
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);


  return (
    <Result
      status="success"
      title="Оплата завершена успешно"
      subTitle="Скоро вы будете успешно перенаправлены на главную"
    />
  );
}

export default Success;
