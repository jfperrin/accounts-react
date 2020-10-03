import { Button, Form, Input } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import mutation from '../gqlQueries/login';
import query from '../gqlQueries/currentUser';
import { getLoginErrors } from '../../../selectors/ui';
import { updateLoginErrors } from '../../../actions/ui/login/errors';
import client from '../../../../apolloClient';
import './stylesheet.css';

const layout = {
  style: { marginTop: 25 },
  labelCol: { span: 10 },
  wrapperCol: { span: 5 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 5 },
};

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [loginMutate] = useMutation(mutation);
  const { data } = useQuery(query);
  const loginErrors = useSelector(getLoginErrors);

  useLayoutEffect(() => {
    if (data && data.user) {
      history.push('/');
    }
  }, [data, history]);

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
        history.push('/');
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

export default withRouter(Login);
