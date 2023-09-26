// Components
import { ConfigProvider, Image, Table, Tag } from 'antd';
// Hooks
import { useProductsActions } from '../../hooks';
// Themes
import { blackTheme } from '../../utils/themes';
// Types
import type { Products } from '../../types/interfaces';
import type { ColumnsType } from 'antd/es/table';

export interface ProductTableColumns {
  key: string;
  name: string;
  quantity: number;
  price: number;
  category: string[];
  thumbnail: string;
};

const ProductsTable: React.FC<Record<'products', Products>> = ({ products }) => {
  const { deleteProductStart } = useProductsActions();
  const columns: ColumnsType<ProductTableColumns> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (_: any, { price }: ProductTableColumns) => (<>{price}₽</>)
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
        <a onClick={() => { deleteProductStart(key); }}>Delete</a>
      ),
    },
  ];

  const dataSource = products.data.map((
    { productName: name, quantity, price, category, thumbnail, id }, index) => ({
      key: id || `${index}`,
      name,
      quantity,
      price,
      category,
      thumbnail,
  }));

  return (
    <ConfigProvider theme={blackTheme}>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
    </ConfigProvider>
  );
};

export default ProductsTable;
