import { ConfigProvider, Image, Table, Tag } from 'antd'
import { Products } from '../../types/interfaces';
import { ColumnsType } from 'antd/es/table';
import { blackTheme } from '../../utils/themes';
import { useProductsActions } from '../../hooks';

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
    { name, quantity, price, category, thumbnail, documentId }, index) => ({
      key: documentId || `${index}`,
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
