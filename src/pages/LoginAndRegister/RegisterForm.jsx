import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Bạn chưa nhập tên")
    .min(6, "Mật khẩu của bạn phải nằm trong khoảng 6-32 kí tự")
    .max(32, "Mật khẩu của bạn phải nằm trong khoảng 6-32 kí tự"),
  email: yup
    .string()
    .required("Bạn chưa nhập email")
    .email("Email không đúng định dạng"),
  password: yup
    .string()
    .required("Bạn chưa nhập mật khẩu")
    .min(6, "Mật khẩu của bạn phải nằm trong khoảng 6-14 kí tự")
    .max(14, "Mật khẩu của bạn phải nằm trong khoảng 6-14 kí tự"),
  rePassword: yup
    .string()
    .required("Bạn chưa nhập lại mật khẩu mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
});

const RegisterFormPage = ({ userList, setUserList, setIsLogin }) => {
  const [defaultValues, setDefaultValues] = useState({
    role: 'user'
  })
  const {
    register,
    watch,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    console.log('🚀 ~ file: RegisterForm.jsx ~ line 46 ~ RegisterFormPage ~ defaultValues', defaultValues);
    reset(defaultValues)
  }, [defaultValues])

  const getData = () => {
    // Giống như gọi API Detail để lấy thông tin edit
    setTimeout(() => {
      setDefaultValues({
        name: 'Tuấn',
        role: 'admin'
      })
    }, 3000)
  }

  const onSubmit = (values) => {
    const emailIndex = userList.findIndex(
      (item) => item.email === values.email
    );
    if (emailIndex !== -1) {
      setError("email", {
        type: "manual",
        message: "Email đã tồn tại.",
      });
    } else {
      setUserList([...userList, values]);
      setIsLogin(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Button type="button" onClick={() => getData()}>Get Data</Button>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          {...register("name")}
        />
        <span className="text-danger">{errors.name?.message}</span>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
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

      <Form.Group className="mb-3">
        <Form.Label>Re-Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-Password"
          {...register("rePassword")}
        />
        <span className="text-danger">{errors.rePassword?.message}</span>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select placeholder="Gender" {...register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="radio"
          label="User"
          value="user"
          {...register("role")}
        />
        <Form.Check
          type="radio"
          label="Admin"
          value="admin"
          {...register("role")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Option 1"
          value="1"
          {...register("choice")}
        />
        <Form.Check
          type="checkbox"
          label="Option 2"
          value="2"
          {...register("choice")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Đồng ý điều khoản"
          {...register("isOK")}
        />
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="w-100"
        disabled={!watch("isOK")}
      >
        Submit
      </Button>
    </Form>
  );
};

export default RegisterFormPage;
