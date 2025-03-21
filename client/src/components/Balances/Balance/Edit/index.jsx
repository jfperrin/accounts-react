import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputNumber, Modal, Space } from 'antd';
import { useMutation } from '@apollo/client';
import mutation from '../../gqlQueries/update';
import { updateModaleOpened } from '../../../../redux/actions/ui/layout/modale';
import { getModaleEntity, getModaleOpened } from '../../../../redux/selectors/ui';

const { Item, useForm } = Form;

const Edit = ({ refetch }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const isOpened = useSelector(getModaleOpened);
  const entity = useSelector(getModaleEntity);
  const [mutate] = useMutation(mutation);

  useEffect(() => {
    if (entity?.id) {
      form.setFieldsValue({ amount: entity.amount });
    }
  }, [entity, form]);

  const close = () => {
    dispatch(updateModaleOpened(false));
  };

  const onFinish = formObject => {
    mutate({
      variables: { amount: formObject.amount, id: entity.id },
    }).then(() => {
      refetch();
      close();
    });
  };

  return (
    <Modal forceRender title={`Balance ${entity?.bank?.label}`} open={isOpened === 'balance'} onCancel={close} footer={null}>
      <Form form={form} onFinish={onFinish} name="period">
        <Item label="Montant" name="amount" rules={[{ required: true, message: 'Please input amount!' }]}>
          <InputNumber />
        </Item>
        <Space style={{ width: '100%' }} align={'end'} direction={'horizontal'}>
          <Button size={'large'} onClick={close}>
            Fermer
          </Button>
          <Button size={'large'} type="primary" htmlType="submit">
            Valider
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default Edit;
