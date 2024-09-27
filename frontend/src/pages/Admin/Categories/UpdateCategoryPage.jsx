import { Button, Input, Form, message, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const categoryId = params.id;
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori güncelleme başarılı");
        navigate(`/admin/categories`);
      } else {
        message.error("Kategori güncelleme başarısız");
      }
    } catch (error) {
      console.log("Kategori günccelleme hatası: ", error);
    }finally{
        setLoading(false)
    }
  };

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            form.setFieldsValue({
              name: data.name,
              img: data.img,
            });
          }
        } else {
          message.error("Veri getirme başarısız");
        }
      } catch (error) {
        console.log("Veri Hatalı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [apiUrl, categoryId, form]);

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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
