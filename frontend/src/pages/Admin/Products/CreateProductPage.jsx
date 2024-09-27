import { Button, Input, Form, message, Spin, InputNumber, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = useForm();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories/`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Veri getirme başarısız");
        }
      } catch (error) {
        console.log("Veri Hatalı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const imgColors = values.colors.split("\n").map((link) => link.trim());
    const imgSizes = values.sizes.split("\n").map((link) => link.trim());

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...values,
            price:{
                current:values.current,
                discount:values.discount
            },
            img:imgLinks,
            colors:imgColors,
            sizes:imgSizes
        }),
      });
      if (response.ok) {
        message.success("Ürün ekleme başarılı");
        form.resetFields();
        navigate(`/admin/products`);
      } else {
        message.error("Ürün ekleme başarısız");
      }
    } catch (error) {
      console.log("Ürün ekleme hatası: ", error);
    } finally {
      setLoading(false);
    }
  };

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
          label="Ürün Adı"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ürün Kategori"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün kategorisi seçin!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatı giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen ürün indirim oranını giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen ürün açıklaması giriniz!",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Ürün Resimleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 görsel linkli giriniz!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="her bir görsel linkini yeni bir satıra yazınız"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri (RBG Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi giriniz!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="her bir RGB kodunu yeni bir satıra yazınız"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün bedeni giriniz!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="her bir beden ölçüsünü yeni bir satıra yazınız"
            autoSize={{ minRows: 4 }}
          />
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

export default CreateProductPage;
