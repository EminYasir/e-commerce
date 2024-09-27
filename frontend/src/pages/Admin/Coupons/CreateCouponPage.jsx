import { Button, Input, Form, message, Spin, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupon/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon ekleme başarılı");
        form.resetFields();
        navigate(`/admin/coupons`);
      } else {
        message.error("Kupon ekleme başarısız");
      }
    } catch (error) {
      console.log("Kupon ekleme hatası: ", error);
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
          label="Kupon Kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input coupon code!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="İndirim Yüzdesi"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input discount percent!",
            },
          ]}
        >
          <InputNumber />
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

export default CreateCouponPage;
