import { Button, message, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users/`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      }else{
        message.error("Veri getirme başarısız")
      }
    } catch (error) {
      console.log("Veri Hatalı:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteUser=async(userEmail)=>{
    try {
        const response = await fetch(`${apiUrl}/api/users/${userEmail}`,{
            method:"DELETE",
        });
        if (response.ok) {
            message.success("Kullanıcı başarıyla silindi")
          fetchUsers();
        }else{
            message.error("Silme işlemi başarısız.")
        }
      } catch (error) {
        console.log("Silme Hatalı:", error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    {
      title: "avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt=""
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "username",
      dataIndex: "name",
      key: "username",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
        title: "Action",
        dataIndex: "actions",
        key: "actions",
        render:(_,record)=>(
            <Popconfirm
    title="Kullanıcıyı Sil"
    description="Kullanıcıyı silmek istediğinizden emin misiniz?"
    onConfirm={()=>deleteUser(record.email)}
    okText="Yes"
    cancelText="No"
  >
    <Button type="primary" danger>Sil</Button>
  </Popconfirm>
        )
      },
  ];


  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => {
        record._id;
      }}
      loading={loading}
    />
  );
};

export default AdminUserPage;
