import { Button, message, Popconfirm, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const fetchCoupon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupon/`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Veri getirme başarısız");
      }
    } catch (error) {
      console.log("Veri Hatalı:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupon/${couponId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kupon başarıyla silindi");
        fetchCoupon();
      } else {
        message.error("Kupon silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme Hatalı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, [fetchCoupon]);

  const columns = [
    {
      title: "Kod Kodu",
      dataIndex: "code",
      key: "code",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "İndirim Yüzdesi",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <span>%{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kuponu Sil"
            description="Kuponu silmek istediğinizden emin misiniz?"
            onConfirm={() => deleteCoupon(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => {
          record._id;
        }}
        loading={loading}
      />
      <Button type="primary" onClick={()=>navigate(`/admin/coupons/create/`)}>
        Kupon Ekle
      </Button>
    </div>
  );
};

export default CouponPage;
