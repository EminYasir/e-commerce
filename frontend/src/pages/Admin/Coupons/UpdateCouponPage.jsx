import { Button, Input, Form, message, Spin, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const couponId = params.id;
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupon/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kupon güncelleme başarılı");
        navigate(`/admin/coupons`);
      } else {
        message.error("Kupon güncelleme başarısız");
      }
    } catch (error) {
      console.log("Kupon günccelleme hatası: ", error);
    }finally{
        setLoading(false)
    }
  };

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleCoupon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/coupon/${couponId}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            form.setFieldsValue({
              code: data.code,
              discountPercent: data.discountPercent,
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
    fetchSingleCoupon();
  }, [apiUrl, couponId, form]);

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
          label="Kupon Codu"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen Kupon kodunu giriniz",
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
              message: "Lütfen indirim yüzdesini giriniz",
            },
          ]}
        >
          <InputNumber />
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

export default UpdateCouponPage;
