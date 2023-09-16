import { useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input, Select, SelectProps } from 'antd';
import { blackTheme, orangeTheme } from '../../utils/themes';
import { useForm } from 'antd/es/form/Form';
import { ProductCategories, ProductFormFields } from '../../types/enums';

const AddNewProduct: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = useForm();

  const options: SelectProps['options'] = [
    {
      label: ProductCategories.NEW_PRODUCTS,
      value: ProductCategories.NEW_PRODUCTS,
    },
    {
      label: ProductCategories.POPULAR,
      value: ProductCategories.POPULAR,
    }
  ]

  const showModal = () => {
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
  }

  const handleSubmit = (values: Record<ProductFormFields, string>) => {
    hideModal();
    (console.log(values));
  }

  return (
    <ConfigProvider theme={blackTheme}>
      <Button type="primary" onClick={showModal}>ADD NEW PRODUCT</Button>
      <Modal
        title="ADD NEW PRODUCT"
        open={open}
        footer={[
          <Button
            form={ProductFormFields.FORM_NAME}
            key="submit"
            htmlType="submit"
          >
            Submit
          </Button>
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
              placeholder="Insert name"
              style={{ width: 300 }}
              type="text"
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.MAIN_IMAGE_URL}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Insert URL"
              style={{ width: 300 }}
              type="url"
            />
          </Form.Item>

          <Form.Item
            name={ProductFormFields.PRICE}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Insert price"
              style={{ width: 300 }}
              type="number"
              min={0}
              max={1000000}
            />
          </Form.Item>

        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddNewProduct;
