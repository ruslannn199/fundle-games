import { Button, ConfigProvider, Empty, Flex, Image, Table } from 'antd';
import { useTypedSelector } from '../../hooks';
import { ColumnsType } from 'antd/es/table';
import { CloseSquareFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { orangeTheme, redTheme } from '../../utils/themes';
import { useCartActions, useProductsActions } from '../../hooks/useActions';
import { useEffect } from 'react';

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
  const { cartItems } = useTypedSelector((state) => (state.cartData));
  const { product } = useTypedSelector((state) => (state.productsData));
  const { fetchProductStart, setProduct } = useProductsActions();
  const { addToCart, removeCartItem, reduceCartItem, clearCartItems } = useCartActions();

  const handleDecrease = (id: string, quantity: number) => {
    if (quantity === 1) {
      removeCartItem(id);
    } else {
      reduceCartItem(id);
    }
  }

  useEffect(() => {
    if (product) {
      addToCart(product);
    }
    return () => { setProduct(null) };
  }, [product]);

  const columns: ColumnsType<CartTableColumns> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => (a.name.localeCompare(b.name)),
        multiple: 3,
      },
      width: popup ? 50 : 150,
    },
    {
      title: 'Thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (_: any, { thumbnail }: CartTableColumns) => (
        <Image src={thumbnail} width={popup ? 63 : 200} />
      ),
      width: popup ? 50 : 230,
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      render: (_: any, { quantity, key }: CartTableColumns) => (
        <ConfigProvider theme={orangeTheme}>
          <Button
            icon={<MinusCircleOutlined />}
            type="text"
            onClick={() => handleDecrease(key, quantity)}
          />
          {quantity}
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => fetchProductStart(key) }
            type="text"
          />
        </ConfigProvider>
      ),
      sorter: {
        compare: (a, b) => (a.quantity - b.quantity),
        multiple: 3,
      },
      width: popup ? 35 : 105,
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
      width: popup ? 30 : 80,
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
            icon={<CloseSquareFilled style={{ fontSize: '32px' }} />}
            onClick={() => removeCartItem(key)}
          />
        </ConfigProvider>
      ),
      width: popup ? 30 : 80,
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
            maxWidth: popup ? "60rem" : "90rem",
          }}
          scroll={ popup ? { y: "35rem", scrollToFirstRowOnChange: true } : undefined}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          sticky
          summary={(pageData) => {
            const total = pageData.reduce((acc, { price, quantity }) => (
              acc + (price * quantity)
            ), 0);
            const { Summary: { Row, Cell } } = Table;
            return (
              <Row>
                <Cell index={0}><b>Total</b></Cell>
                <Cell index={1} colSpan={3} align="right"><b>{total}₽</b></Cell>
                <Cell index={2}>
                  <Button
                    type="link"
                    onClick={() => clearCartItems()}
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Clear
                  </Button>
                </Cell>
              </Row>
            );
          }}
        />
      </ConfigProvider>
    </Flex>
  );
}

export default Checkout;
