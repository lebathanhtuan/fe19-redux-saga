import React, { useEffect, useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Card, Input, Space, Tag } from "antd";

import { PAGE_SIZE } from "../../../constants/pagination";
import { ROUTER } from "../../../constants/router";

import * as S from "./styles";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";

const ProductListPage = () => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [keywordFilter, setKeywordFilter] = useState('');

  const history = useHistory();

  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListAction({ limit: PAGE_SIZE.USER_PRODUCT, page: 1 }));
    dispatch(getCategoryListAction());
  }, []);

  const renderCategoryList = () => {
    return categoryList.data.map((item, index) => (
      <S.FilterItem
        key={item.id}
        active={categoryFilter?.id === item.id}
        onClick={() => {
          dispatch(
            getProductListAction({
              limit: PAGE_SIZE.USER_PRODUCT,
              page: 1,
              categoryId: item.id,
              keyword: keywordFilter,
            })
          )
          setCategoryFilter(item)
        }}
      >
        {item.name}
      </S.FilterItem>
    ));
  };

  const renderProductList = () => {
    return productList.data.map((item, index) => (
      <Col span={6} key={item.id}>
        <div
          className="card"
          onClick={() =>
            history.push(
              generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: item.id })
            )
          }
        >
          {item.isNew && <div className="new">NEW</div>}
          <img src={item.image} className="image" alt="" />
          <div className="card-content">
            <div>{item.name}</div>
            <div>{item.price.toLocaleString()}</div>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card size="small">{renderCategoryList()}</Card>
      </Col>
      <Col span={18}>
        <Input
          placeholder="Tìm kiếm"
          value={keywordFilter}
          onChange={(e) => {
            dispatch(
              getProductListAction({
                limit: PAGE_SIZE.USER_PRODUCT,
                page: 1,
                categoryId: categoryFilter?.id,
                keyword: e.target.value,
              })
            )
            setKeywordFilter(e.target.value)
          }}
        />
        <Space style={{ marginTop: 16 }}>
          {categoryFilter && (
            <Tag closable onClose={() => {
              setCategoryFilter(null)
              dispatch(
                getProductListAction({
                  limit: PAGE_SIZE.USER_PRODUCT,
                  page: 1,
                  keyword: keywordFilter,
                })
              )
            }}>
              {categoryFilter.name}
            </Tag>
          )}
          {keywordFilter && (
            <Tag closable onClose={() => {
              setKeywordFilter('')
              dispatch(
                getProductListAction({
                  limit: PAGE_SIZE.USER_PRODUCT,
                  page: 1,
                  categoryId: categoryFilter?.id,
                })
              )
            }}>
              Từ khóa: {keywordFilter}
            </Tag>
          )}
        </Space>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>{renderProductList()}</Row>
        {productList.meta.total !== productList.data.length && (
          <Row justify="center" style={{ marginTop: 16 }}>
            <Button
              onClick={() =>
                dispatch(
                  getProductListAction({
                    limit: PAGE_SIZE.USER_PRODUCT,
                    page: productList.meta.page + 1,
                    categoryId: categoryFilter.id,
                    keyword: keywordFilter,
                    more: true,
                  })
                )
              }
            >
              Hiển thị thêm
            </Button>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default ProductListPage;
