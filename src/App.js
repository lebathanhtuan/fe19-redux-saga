import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";

import DefaultRoute from "./layouts/DefaultRoute";
import AdminRoute from "./layouts/AdminRoute";
import LoginRoute from "./layouts/LoginRoute";

import HomePage from "./pages/user/Home";
import ProductListPage from "./pages/user/ProductList";
import ProductDetailPage from "./pages/user/ProductDetail";
import ToDoListAntDPage from "./pages/user/ToDoListAntD";

import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminProductListPage from "./pages/admin/ProductList";
import AdminModifyProductPage from "./pages/admin/ModifyProduct";

import LoginAndRegisterPage from "./pages/LoginAndRegister";
import NotFoundPage from "./pages/NotFound";

import { ROUTER } from "./constants/router";

import { darkTheme, lightTheme } from "./themes";

import { getUserInfoAction } from './redux/actions'

import "./App.css";
import "antd/dist/antd.css";

function App() {
  // const [isTop, setIsTop] = useState(true)
  const { theme } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
    dispatch(getUserInfoAction(userInfo))
  }, [])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > 0 && isTop) {
  //       setIsTop(false)
  //     } else {
  //       setIsTop(true)
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Switch>
          <DefaultRoute
            exact
            path={ROUTER.USER.HOME}
            component={HomePage}
          />
          <DefaultRoute
            exact
            path={ROUTER.USER.PRODUCT_LIST}
            component={ProductListPage}
          />
          <DefaultRoute
            exact
            path={ROUTER.USER.TO_DO_LIST_ANTD}
            component={ToDoListAntDPage}
          />
          <DefaultRoute
            exact
            path={ROUTER.USER.PRODUCT_DETAIL}
            component={ProductDetailPage}
          />
          <AdminRoute exact path={ROUTER.ADMIN.DASHBOARD} component={AdminDashboardPage} />
          <AdminRoute exact path={ROUTER.ADMIN.PRODUCT_LIST} component={AdminProductListPage} />
          <AdminRoute exact path={ROUTER.ADMIN.CREATE_PRODUCT} component={AdminModifyProductPage} />
          <AdminRoute exact path={ROUTER.ADMIN.UPDATE_PRODUCT} component={AdminModifyProductPage} />
          <LoginRoute
            exact
            path={ROUTER.LOGIN}
            component={LoginAndRegisterPage}
          />
          <Route path={ROUTER.NOT_FOUND} component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
