import { message, Spin, Table } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setDataSource(data);
        } else {
          message.error("Veri getirme başarısız");
        }
      } catch (error) {
        console.log("Veri Hatalı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY]);

 // console.log(dataSource.data);

  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <b>{(text / 100).toFixed(2)} $</b>,
    },
  ];

  return (
    <div>
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource.data}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={false}
          loading={loading}
        />
      </Spin>
    </div>
  );
};

export default OrderPage;
