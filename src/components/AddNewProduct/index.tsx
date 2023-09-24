import { useState } from 'react';
import { Button, ConfigProvider, Modal, Form, Input, Select, SelectProps } from 'antd';
import { blackTheme, orangeTheme } from '../../utils/themes';
import { ProductFormFields } from '../../types/enums';
import type { ProductFormData } from '../../types/interfaces';
import { useProductsActions } from '../../hooks';
import { getDocuments } from '../../utils/firebase.utils';


const AddNewProduct: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<any>([]);
  const { addProductStart } = useProductsActions();
  const { useForm } = Form;
  const [form] = useForm();

  const { TextArea } = Input;

  const fetchOptions = async () => {
    try {
      setOptions((await getDocuments('products'))?.docs.map(
        (doc) => ({ label: doc.data().category, value: doc.data().category })
      ));
    } catch (err) {
      console.error(err);
    }
  }

  fetchOptions();

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
    productDescription,
  }: ProductFormData): void => {
    hideModal();
    addProductStart({
      category: productCategory,
      name: productName,
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
            <TextArea
              placeholder="Enter description"
              style={{ width: 300 }}
              showCount
              maxLength={1024}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddNewProduct;
