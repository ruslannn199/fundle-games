import { Button, ConfigProvider, Empty, Flex, Image } from 'antd';
import { useTypedSelector } from '../../hooks';
import Table, { ColumnsType } from 'antd/es/table';
import { CloseSquareFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { orangeTheme, redTheme } from '../../utils/themes';
import { useCartActions, useProductsActions } from '../../hooks/useActions';
import { useEffect } from 'react';
import CheckoutCounter from '../CheckoutCounter';
import { useLocation } from 'react-router-dom';

interface CartTableColumns {
  key: string;
  name: string;
  quantity: number;
  price: number;
  thumbnail: string;
}

interface CheckoutProps extends React.HTMLAttributes<HTMLElement> {
  popup?: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({ popup }) => {
  const { cartItems, total } = useTypedSelector((state) => (state.cartData));
  const { product } = useTypedSelector((state) => (state.productsData));
  const { fetchProductStart, setProduct } = useProductsActions();
  const { addToCart, removeCartItem, reduceCartItem, clearCartItems } = useCartActions();
  const location = useLocation();

  const handleDecrease = (id: string, quantity: number) => {
    if (quantity === 1) {
      removeCartItem(id);
    } else {
      reduceCartItem(id);
    }
  }

  useEffect(() => {
    if (location.pathname.includes('checkout')) {
      if (product) {
        addToCart(product);
      }
      return () => { setProduct(null) };
    }
  }, [product]);

  const { Summary: { Row, Cell } } = Table;

  const columns: ColumnsType<CartTableColumns> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => (a.name.localeCompare(b.name)),
        multiple: 3,
      },
      width: popup ? '25rem' : '35rem',
    },
    {
      title: 'Thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (_: any, { thumbnail }: CartTableColumns) => (
        <Image src={thumbnail} width={ popup ? "10rem" : "20rem" } />
      ),
      width: popup ? '16rem' : '35rem',
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      render: (_: any, { quantity, key }: CartTableColumns) => (
        <ConfigProvider theme={orangeTheme}>
          <Flex justify="center" align="center" gap="1rem">
            <CheckoutCounter
              icon={<MinusCircleOutlined style={{ fontSize: "2rem" }} />}
              onClick={() => handleDecrease(key, quantity)}
            />
            <Flex align="center">{quantity}</Flex>
            <CheckoutCounter
              icon={<PlusCircleOutlined style={{ fontSize: "2rem" }} />}
              onClick={() => fetchProductStart(key) }
            />
          </Flex>
        </ConfigProvider>
      ),
      sorter: {
        compare: (a, b) => (a.quantity - b.quantity),
        multiple: 3,
      },
      width: popup ? '17rem' : '30rem',
      align: 'center',
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (_: any, { price, quantity }: CartTableColumns) => (
        <>{price * quantity}₽</>
      ),
      sorter: {
        compare: (a, b) => (a.price * a.quantity - b.price * b.quantity),
        multiple: 3,
      },
      width: popup ? '14rem' : '25rem',
      align: 'center',
    },
    {
      title: 'Remove',
      key: 'remove',
      dataIndex: 'remove',
      render: (_: any, { key }: CartTableColumns) => (
        <ConfigProvider theme={redTheme}>
          <Button
            type="link"
            icon={<CloseSquareFilled style={{ fontSize: "3.2rem" }} />}
            onClick={() => removeCartItem(key)}
          />
        </ConfigProvider>
      ),
      width: popup ? '15rem' : '20rem',
      align: 'center',
    },
  ];

  const dataSource: CartTableColumns[] = cartItems
    .map(({ id, productName, quantity, price, thumbnail }, index) => ({
      key: id || `${index}`,
      name: productName,
      quantity,
      price,
      thumbnail,
    }))

  return (
    <Flex align="center" justify="center">
      <ConfigProvider
        theme={orangeTheme}
        renderEmpty={() => <Empty description="You cart is empty" />}
      >
        <Table
          style={{
            maxWidth: popup ? "90rem" : "150rem",
          }}
          scroll={ popup ? { y: "35rem", scrollToFirstRowOnChange: true } : undefined}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          sticky
          summary={() => (
              <Row style={{ fontWeight: 'bold' }}>
                <Cell index={0}>Total</Cell>
                <Cell index={1} colSpan={3} align="right">{total}₽</Cell>
                <Cell index={2} align="center">
                  <Button
                    type="link"
                    onClick={() => clearCartItems()}
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: 0,
                    }}
                  >
                    Clear
                  </Button>
                </Cell>
              </Row>
            )
          }
        />
      </ConfigProvider>
    </Flex>
  );
}

export default Checkout;
