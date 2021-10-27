import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Space, Dropdown, Menu } from "antd";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

import { ROUTER } from "../../constants/router";
import {
  setThemeAction,
  toggleSidebarAction,
  logoutAction,
} from "../../redux/actions";

import * as S from "./styles";

function UserHeader() {
  const history = useHistory();

  const { theme } = useSelector((state) => state.commonReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  };

  return (
    <S.Header>
      <Button
        type="text"
        icon={<MenuUnfoldOutlined style={{ color: "white" }} />}
        onClick={() => dispatch(toggleSidebarAction())}
      ></Button>
      <Space size={32}>
        <Select
          value={theme}
          onChange={(value) => dispatch(setThemeAction(value))}
          style={{ width: 100 }}
        >
          <Select.Option value="light">Light</Select.Option>
          <Select.Option value="dark">Dark</Select.Option>
        </Select>
        {userInfo.name ? (
          <Dropdown
            overlay={
              <Menu>
                {userInfo.role === "admin" && (
                  <Menu.Item
                    key="0"
                    onClick={() => history.push(ROUTER.ADMIN.DASHBOARD)}
                  >
                    Admin Page
                  </Menu.Item>
                )}
                <Menu.Item key="1">My Profile</Menu.Item>
                <Menu.Item key="2" onClick={() => handleLogout()}>
                  Logout
                </Menu.Item>
              </Menu>
            }
          >
            <Space>
              <UserOutlined style={{ color: "white" }} />
              <div style={{ color: "white" }}>{userInfo.name}</div>
            </Space>
          </Dropdown>
        ) : (
          <Button onClick={() => history.push(ROUTER.LOGIN)}>Đăng nhập</Button>
        )}
      </Space>
    </S.Header>
  );
}

export default UserHeader;
