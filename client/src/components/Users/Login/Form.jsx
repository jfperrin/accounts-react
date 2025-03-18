import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import mutation from '../gqlQueries/login';
import query from '../gqlQueries/currentUser';
import { getLoginErrors } from '../../../redux/selectors/ui';
import { updateLoginErrors } from '../../../redux/actions/ui/login/errors';
import client from '../../../config/apolloClient';
import './stylesheet.scss';

const layout = {
  style: { marginTop: 25 },
  labelCol: { span: 10 },
  wrapperCol: { span: 5 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 5 },
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMutate] = useMutation(mutation);
  const { data } = useQuery(query);
  const loginErrors = useSelector(getLoginErrors);

  useEffect(() => {
    if (data?.user) {
      navigate('/');
    }
  }, [data]);

  if (!data) return null;

  const onFinish = data => {
    client.resetStore();
    loginMutate({
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: [{ query }],
    })
      .then(() => {
        navigate('/');
      })
      .catch(res => {
        dispatch(updateLoginErrors(res.graphQLErrors.map(error => error.message)));
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} {...layout} name="basic">
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <div className="errors">{loginErrors}</div>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
