// Components
import { Button, ConfigProvider, Image, Table, Tag } from 'antd';
// Hooks
import { useProductsActions } from '../../hooks';
// Themes
import { blackTheme } from '../../utils/themes';
// Types
import type { Products } from '../../types/interfaces';
import type { ColumnsType } from 'antd/es/table';
import { ProductTableImage } from './ProductTable.styles';

interface ProductTableProps {
  products: Products;
}

interface ProductTableColumns {
  key: string;
  name: string;
  quantity: number;
  price: number;
  category: string[];
  thumbnail: string;
}

const ProductsTable: React.FC<ProductTableProps> = ({ products }) => {
  const { deleteProductStart } = useProductsActions();
  const columns: ColumnsType<ProductTableColumns> = [
    {
      title: 'Имя',
      key: 'name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => (a.name.localeCompare(b.name)),
        multiple: 3,
      },
      width: '20rem',
    },
    {
      title: 'Количество',
      key: 'quantity',
      dataIndex: 'quantity',
      sorter: {
        compare: (a, b) => (a.quantity - b.quantity),
        multiple: 3,
      },
      width: '13rem',
    },
    {
      title: 'Цена',
      key: 'price',
      dataIndex: 'price',
      render: (_: any, { price }: ProductTableColumns) => (<>{price}₽</>),
      sorter: {
        compare: (a, b) => (a.price - b.price),
        multiple: 3,
      },
      width: '13rem',
    },
    {
      title: 'Категории',
      key: 'category',
      dataIndex: 'category',
      render: (_: any, { category }: ProductTableColumns) => (
        <>
          {category.map((tag) => (<Tag key={tag}>{tag}</Tag>))}
        </>
      ),
      width: '20rem',
    },
    {
      title: 'Изображение',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (_: any, { thumbnail, name }: ProductTableColumns) => (
        <ProductTableImage src={thumbnail} alt={name} />
      ),
      width: '25rem',
    },
    {
      title: 'Действия',
      key: 'actions',
      dataIndex: 'actions',
      render: (_: any, { key }: ProductTableColumns) => (
        <Button
          type="link"
          onClick={() => deleteProductStart(key)}
        >
          Delete
        </Button>
      ),
      width: '13rem',
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
        scroll={{ x: '100rem', scrollToFirstRowOnChange: true }}
      />
    </ConfigProvider>
  );
};

export default ProductsTable;
