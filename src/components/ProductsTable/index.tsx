// Components
import { Button, ConfigProvider, Image, Tag } from 'antd';
// Hooks
import { useProductsActions } from '../../hooks';
// Themes
import { blackTheme } from '../../utils/themes';
// Types
import type { Products } from '../../types/interfaces';
import type { ColumnsType } from 'antd/es/table';
import { BaseProductsTable } from './ProductsTable.styles';

interface ProductTableColumns {
  key: string;
  name: string;
  quantity: number;
  price: number;
  category: string[];
  thumbnail: string;
}

// TODO implement reset func to first page after adding new product
const ProductsTable: React.FC<Record<'products', Products>> = ({ products }) => {
  const { deleteProductStart } = useProductsActions();
  const columns: ColumnsType<ProductTableColumns> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => (a.name.localeCompare(b.name)),
        multiple: 3,
      },
      width: '30rem',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      sorter: {
        compare: (a, b) => (a.quantity - b.quantity),
        multiple: 3,
      },
      width: '20rem',
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (_: any, { price }: ProductTableColumns) => (<>{price}₽</>),
      sorter: {
        compare: (a, b) => (a.price - b.price),
        multiple: 3,
      },
      width: '20rem',
    },
    {
      title: 'Categories',
      key: 'category',
      dataIndex: 'category',
      render: (_: any, { category }: ProductTableColumns) => (
        <>
          {category.map((tag) => (<Tag key={tag}>{tag}</Tag>))}
        </>
      ),
      width: '30rem',
    },
    {
      title: 'Thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (_: any, { thumbnail }: ProductTableColumns) => (
        <Image src={thumbnail} width="20rem" />
      ),
      width: '25rem',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_: any, { key }: ProductTableColumns) => (
        <Button
          type="link"
          style={{ fontSize: "2rem" }}
          onClick={() => deleteProductStart(key)}
        >
          Delete
        </Button>
      ),
      width: '15rem',
    },
  ];

  const dataSource =
    products
      .data
      .map(({ productName, quantity, price, category, thumbnail, id }, index) => ({
        key: id || `${index}`,
        name: productName,
        quantity,
        price,
        category,
        thumbnail,
      }
  ));

  return (
    <ConfigProvider theme={blackTheme}>
      <BaseProductsTable
        columns={columns}
        dataSource={dataSource}
        sticky
      />
    </ConfigProvider>
  );
};

export default ProductsTable;
