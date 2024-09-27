import { Button, message, Popconfirm, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/`);
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

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Ürün başarıyla silindi");
        fetchCategories();
      } else {
        message.error("Ürün işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme Hatalı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const columns = [
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt=""
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Categoriyi Sil"
            description="Categoriyi silmek istediğinizden emin misiniz?"
            onConfirm={() => deleteCategory(record._id)}
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
      <Button type="primary" onClick={()=>navigate(`/admin/categories/create/`)}>
        Kategori Ekle
      </Button>
    </div>
  );
};

export default CategoryPage;
