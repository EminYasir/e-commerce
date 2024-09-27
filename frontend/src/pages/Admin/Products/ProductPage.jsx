import { Button, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Ürün başarıyla silindi");
        //fetchProducts();
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
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
    const fetchProducts = async () => {
      setLoading(true);
      try {//birden fzle promise işlemi yapımı
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories/`),
          fetch(`${apiUrl}/api/products/`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Veri getirme başarısız");
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });

        setDataSource(productWithCategories);
      } catch (error) {
        console.log("Veri Hatalı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc[0]}
          alt=""
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "İndirim Oranı",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount}</span>,
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Categoriyi Sil"
            description="Categoriyi silmek istediğinizden emin misiniz?"
            onConfirm={() => deleteProduct(record._id)}
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
      <Button
        type="primary"
        onClick={() => navigate(`/admin/products/create/`)}
      >
        Product Ekle
      </Button>
    </div>
  );
};

export default ProductPage;
