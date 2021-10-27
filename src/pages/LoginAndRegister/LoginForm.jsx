import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { ROUTER } from '../../constants/router'

import { loginAction } from '../../redux/actions'

import * as S from './styles'

const schema = yup.object({
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .email('Email không đúng định dạng'),
  password: yup
    .string()
    .required('Bạn chưa nhập mật khẩu')
    .min(6, 'Mật khẩu của bạn phải nằm trong khoảng 6-14 kí tự')
    .max(14, 'Mật khẩu của bạn phải nằm trong khoảng 6-14 kí tự'),
});

const LoginFormPage = ({ userList }) => {
  const history = useHistory();

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    const userIndex = userList.findIndex((item) => {
      return (
        item.email === values.email && item.password === values.password
      );
    });
    if (userIndex !== -1) {
      const userInfo = userList[userIndex]
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      dispatch(loginAction(userInfo))
      if (userInfo.role === 'admin') {
        history.push(ROUTER.ADMIN.DASHBOARD)
      } else {
        history.push(ROUTER.USER.HOME)
      }
    } else {
      alert('Đăng nhập thất bại')
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          {...register("email")}
        />
        <span className="text-danger">{errors.email?.message}</span>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <span className="text-danger">{errors.password?.message}</span>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Submit
      </Button>
    </Form>
  );
};

export default LoginFormPage;
