import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client/react';
import { Form, Input, Button } from 'antd';
import mutation from '../gqlQueries/signup';
import query from '../gqlQueries/currentUser';
import { getLoginErrors } from '../../../redux/selectors/ui';
import { updateLoginErrors } from '../../../redux/actions/ui/login/errors';
import './stylesheet.scss';
import Loading from '../../common/Loading';
import { useNavigate } from 'react-router';

const { Item } = Form;

const layout = {
  style: { marginTop: 25 },
  labelCol: { span: 10 },
  wrapperCol: { span: 5 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 5 },
};

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useQuery(query);
  const [mutate] = useMutation(mutation);
  const errors = useSelector(getLoginErrors);

  useEffect(() => {
    if (!loading && data?.user) {
      navigate('/');
    }
  }, [loading, data]);

  const onFinish = formObject => {
    mutate({
      variables: {
        email: formObject.email,
        password: formObject.password,
        firstname: formObject.firstname,
        lastname: formObject.lastname,
        nickname: formObject.nickname,
      },
      refetchQueries: [{ query }],
    }).catch(res => {
      dispatch(updateLoginErrors(res.graphQLErrors.map(error => error.message)));
    });
  };

  if (loading) return <Loading />;

  return (
    <Form onFinish={onFinish} {...layout} name="basic">
      <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Item>

      <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Item>

      <Item label="Prénom" name="firstname" rules={[{ required: true, message: 'Please input your firstname!' }]}>
        <Input />
      </Item>

      <Item label="Nom" name="lastname" rules={[{ required: true, message: 'Please input your lastname!' }]}>
        <Input />
      </Item>

      <Item label="Surnom" name="nickname" rules={[{ required: true, message: 'Please input your nickname!' }]}>
        <Input />
      </Item>

      <div className="errors">{errors}</div>

      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </Item>
    </Form>
  );
};

export default SignupForm;
