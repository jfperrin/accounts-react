import React, { useEffect } from 'react';
import { Button, Form, InputNumber, Modal, Space } from 'antd';
import { useMutation } from 'react-apollo';
import { useDispatch, useSelector } from 'react-redux';
import query from '../gqlQueries/list';
import mutateUpdate from '../gqlQueries/update';
import mutateCreate from '../gqlQueries/create';
import { getModaleEntity, getModaleOpened } from '../../../selectors/ui';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';

const { Item, useForm } = Form;

const FormPeriod = () => {
  const [form] = useForm();
  const [update] = useMutation(mutateUpdate);
  const [create] = useMutation(mutateCreate);
  const dispatch = useDispatch();
  const isOpened = useSelector(getModaleOpened);
  const entity = useSelector(getModaleEntity);

  useEffect(() => {
    if (entity?.id) {
      form.setFieldsValue({ year: entity.year, month: entity.month });
    } else {
      form.setFieldsValue({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
    }
  }, [entity?.id]);

  const close = () => {
    dispatch(updateModaleOpened(false));
  };

  const onFinish = formObject => {
    if (entity?.id) {
      update({
        variables: {
          year: parseInt(formObject.year, 10),
          month: parseInt(formObject.month, 10),
          id: entity.id,
        },
        refetchQueries: [{ query }],
      }).then(response => {
        dispatch(updateModaleEntity(response.data.updatePeriod));
        close();
      });
    } else {
      create({
        variables: {
          year: parseInt(formObject.year, 10),
          month: parseInt(formObject.month, 10),
        },
        refetchQueries: [{ query }],
      }).then(response => {
        dispatch(updateModaleEntity(response.data.addPeriod));
        close();
      });
    }
  };

  return (
    <Modal title="Basic Modal" visible={isOpened} onCancel={close} footer={null}>
      <Form form={form} onFinish={onFinish} name="period">
        <Item label="Année" name="year" rules={[{ required: true, message: 'Please input year!' }]}>
          <InputNumber />
        </Item>
        <Item label="Mois" name="month" rules={[{ required: true, message: 'Please input month!' }]}>
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

export default FormPeriod;
