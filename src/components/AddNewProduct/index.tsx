// Components
import { Button, ConfigProvider, Modal, Form, Input, Select, FloatButton } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PlusOutlined } from '@ant-design/icons';
// Hooks
import { useEffect, useMemo, useState } from 'react';
import { useProductsActions, useTypedSelector, useCategoriesActions } from '../../hooks';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import { ProductFormFields } from '../../types/enums';
import type { ProductFormData } from '../../types/interfaces';
import type { SelectProps } from 'antd';

interface AddNewProductProps {
  float?: boolean;
}

const AddNewProduct: React.FC<AddNewProductProps> = ({ float }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ckeditorText, setCkeditorText] = useState<string>('');
  const { addProductStart } = useProductsActions();
  const { fetchCategoriesStart } = useCategoriesActions();
  const { categories } = useTypedSelector((state) => (state.category));
  const { useForm } = Form;
  const [form] = useForm();

  const options: SelectProps['options'] = useMemo(() => (
    categories.map(({ category }) => ({ label: category, value: category }))
  ), [categories]);

  useEffect(() => {
    fetchCategoriesStart();
  }, [fetchCategoriesStart]);

  const showModal = () => {
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
  }

  const handleSubmit = ({
    productCategory,
    productName,
    productPrice,
    productThumbnail,
  }: ProductFormData): void => {
    hideModal();
    addProductStart({
      id: crypto.randomUUID(),
      category: productCategory,
      productName: productName,
      price: parseFloat(productPrice),
      thumbnail: productThumbnail,
      description: ckeditorText,
      quantity: 1,
    });

    form.resetFields();
  }

  return (
    <ConfigProvider theme={blackTheme}>
      {
        float
          ? <FloatButton type="primary" onClick={showModal} tooltip="Добавить новый продукт" icon={<PlusOutlined />} />
          : <Button type="primary" onClick={showModal}>Добавить новый продукт</Button>
      }
      <Modal
        title="ADD NEW PRODUCT"
        open={open}
        onCancel={hideModal}
        footer={[
          <Button
            form={ProductFormFields.FORM_NAME}
            key="reset"
            htmlType="reset"
          >
            Reset
          </Button>,
          <Button
            form={ProductFormFields.FORM_NAME}
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id={ProductFormFields.FORM_NAME}
          form={form}
          name={ProductFormFields.FORM_NAME}
          onFinish={handleSubmit}
          validateMessages={{ required: "Пожалуйста, заполните это поле." }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 32 }}
        >

          <ConfigProvider theme={orangeTheme}>
            <Form.Item
              name={ProductFormFields.CATEGORY}
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                mode="tags"
                style={{ width: "30rem" }}
                placeholder="Choose category"
                filterOption={(input, option): boolean => (typeof option?.label === 'string' && option.label.includes(input))}
                filterSort={(optionA, optionB): number => {
                  if (typeof optionA.label === 'string' && typeof optionB.label === 'string')
                    return optionA.label.toLowerCase().localeCompare((optionB.label).toLowerCase());
                  return -1;
                }}
                options={options}
                />
            </Form.Item>
          </ConfigProvider>

          <Form.Item
            name={ProductFormFields.PRODUCT_NAME}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter name"
              style={{ width: "30rem" }}
              type="text"
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.THUMBNAIL}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter image URL"
              style={{ width: "30rem" }}
              type="url"
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.PRICE}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter price"
              style={{ width: "30rem" }}
              type="number"
              min={0}
              step={0.01}
              max={1000000}
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.DESCRIPTION}
            rules={[{ required: true }]}
          >
            <CKEditor
              editor={ ClassicEditor }
              onChange={(e, editor) => {
                setCkeditorText(editor.getData());
              }}
            />
          </Form.Item>

        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddNewProduct;
