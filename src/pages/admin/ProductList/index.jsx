import React, { useEffect, useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Space,
  Image,
  Row,
  Popconfirm,
  Drawer,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Pagination,
} from "antd";
import { v4 as uuidv4 } from "uuid";

import { ROUTER } from "../../../constants/router";

import {
  getProductListAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../../redux/actions";

const AdminProductListPage = () => {
  // null: close
  // 'create': open with create form
  // 'update': open with update form
  const [isShowModifyProduct, setIsShowModifyProduct] = useState(null);
  const [initialUpdateValue, setInitialUpdateValue] = useState({});

  const [modifyProductForm] = Form.useForm();
  const history = useHistory();

  const { productList } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const initialValues = initialUpdateValue.id
    ? {
        name: initialUpdateValue?.name,
        price: initialUpdateValue?.price,
        isNew: initialUpdateValue?.isNew,
      }
    : {
        name: "",
        price: 0,
        isNew: false,
      };

  useEffect(() => {
    if (!!isShowModifyProduct) {
      modifyProductForm.resetFields();
    }
  }, [isShowModifyProduct]);

  useEffect(() => {
    dispatch(getProductListAction({ limit: 10, page: 1 }));
  }, []);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductAction({ id }));
  };

  const handleSubmitForm = (values) => {
    if (isShowModifyProduct === "update") {
      dispatch(
        updateProductAction({
          ...values,
          id: initialUpdateValue.id,
          image: "https://via.placeholder.com/800x600",
        })
      );
    } else {
      dispatch(
        createProductAction({
          ...values,
          id: uuidv4(),
          image: "https://via.placeholder.com/800x600",
        })
      );
    }
    setIsShowModifyProduct(null);
  };

  const tableColumns = [
    {
      title: "T??n s???n ph???m",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space size={16}>
            <Image height={40} width={40} src={record.image} />
            {record.name}
          </Space>
        );
      },
    },
    {
      title: "H??ng s???n xu???t",
      dataIndex: "category",
      key: "category",
      render: (item) => item.name,
    },
    {
      title: "Gi??",
      dataIndex: "price",
      key: "price",
      render: (item) => item.toLocaleString(),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => {
              setIsShowModifyProduct("update");
              setInitialUpdateValue(record);
            }}
          >
            S???a (Modal)
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() =>
              history.push(
                generatePath(ROUTER.ADMIN.UPDATE_PRODUCT, { id: record.id })
              )
            }
          >
            S???a (Trang m???i)
          </Button>
          <Popconfirm
            title="B???n c?? ch???c mu???n x??a s???n ph???m n??y kh??ng?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>X??a</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tableData = productList.data.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 0 }}>Qu???n l?? s???n ph???m</h3>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyProduct("create");
              setInitialUpdateValue({});
            }}
          >
            Th??m s???n ph???m (Modal)
          </Button>
          <Button
            type="primary"
            onClick={() => history.push(ROUTER.ADMIN.CREATE_PRODUCT)}
          >
            Th??m s???n ph???m (Trang m???i)
          </Button>
        </Space>
      </Row>
      {productList.error && <p>{productList.error}</p>}
      <Table
        columns={tableColumns}
        dataSource={tableData}
        loading={productList.loading}
        pagination={false}
      />
      <Pagination
        current={productList.meta.page}
        total={productList.meta.total}
        onChange={(page) =>
          dispatch(getProductListAction({ limit: 10, page }))
        }
      />
      <Drawer
        title={
          isShowModifyProduct === "update" ? "S???a s???n ph???m" : "Th??m s???n ph???m"
        }
        placement="right"
        onClose={() => setIsShowModifyProduct(null)}
        visible={!!isShowModifyProduct}
        width={500}
      >
        <Form
          form={modifyProductForm}
          name={
            isShowModifyProduct === "update"
              ? "update-product-form"
              : "create-product-form"
          }
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initialValues}
          onFinish={(values) => handleSubmitForm(values)}
        >
          <Form.Item
            label="T??n s???n ph???m"
            name="name"
            rules={[{ required: true, message: "B???n ch??a nh???p t??n" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gi?? s???n ph???m"
            name="price"
            rules={[{ required: true, message: "B???n ch??a nh???p gi??" }]}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="isNew"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 18 }}
          >
            <Checkbox>S???n ph???m m???i</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 18 }}
            style={{ marginBottom: 0 }}
          >
            <Button type="primary" htmlType="submit">
              {isShowModifyProduct === "update" ? "S???a" : "Th??m"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminProductListPage;
