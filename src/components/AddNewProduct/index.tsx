// Components
import { Button, ConfigProvider, Modal, Form, Input, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Hooks
import { useEffect, useState } from 'react';
import { useProductsActions } from '../../hooks';
// Themes
import { blackTheme, orangeTheme } from '../../utils/themes';
// Types
import { ProductFormFields } from '../../types/enums';
import type { ProductFormData } from '../../types/interfaces';
import type { SelectProps } from 'antd';
// Utils
import { getCategories } from '../../utils';


const AddNewProduct: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const { addProductStart } = useProductsActions();
  const { useForm } = Form;
  const [form] = useForm();

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setOptions(categories?.map(({ category }) => ({ label: category, value: category })))
      });
  }, []);

  const showModal = () => {
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
  }

  // TODO set up CKEditor
  const handleSubmit = ({
    productCategory,
    productName,
    productPrice,
    productThumbnail,
    productDescription,
  }: ProductFormData): void => {
    hideModal();
    console.log(productDescription.data);
    addProductStart({
      category: productCategory,
      productName: productName,
      price: parseFloat(productPrice),
      thumbnail: productThumbnail,
      description: productDescription,
      quantity: 1,
    });

    form.resetFields();
  }

  return (
    <ConfigProvider theme={blackTheme}>
      <Button type="primary" onClick={showModal}>ADD NEW PRODUCT</Button>
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
          validateMessages={{ required: "Please, fill this field" }}
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
                style={{ width: 300 }}
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
              style={{ width: 300 }}
              type="text"
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.THUMBNAIL}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter image URL"
              style={{ width: 300 }}
              type="url"
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.PRICE}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter price"
              style={{ width: 300 }}
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
            />
          </Form.Item>

        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddNewProduct;
