// Components
import { Button, ConfigProvider, Image, Table, Tag } from 'antd';
// Hooks
import { useProductsActions } from '../../hooks';
// Themes
import { blackTheme } from '../../utils/themes';
// Types
import type { Products } from '../../types/interfaces';
import type { ColumnsType } from 'antd/es/table';

interface ProductTableColumns {
  key: string;
  name: string;
  quantity: number;
  price: number;
  category: string[];
  thumbnail: string;
};

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
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      sorter: {
        compare: (a, b) => (a.quantity - b.quantity),
        multiple: 3,
      },
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
    },
    {
      title: 'Thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (_: any, { thumbnail }: ProductTableColumns) => (
        <Image src={thumbnail} width={200} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_: any, { key }: ProductTableColumns) => (
        <Button type="link" onClick={() => deleteProductStart(key)}>Delete</Button>
      ),
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
      <Table
        columns={columns}
        dataSource={dataSource}
        sticky
      />
    </ConfigProvider>
  );
};

export default ProductsTable;
