import { Button, Input, Form, message, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCateoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori ekleme başarılı");
        form.resetFields();
        navigate(`/admin/categories`);
      } else {
        message.error("Kategori ekleme başarısız");
      }
    } catch (error) {
      console.log("Kategori ekleme hatası: ", error);
    } finally {
      setLoading(false);
    }
  };

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category İmage (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input img!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateCateoryPage;
