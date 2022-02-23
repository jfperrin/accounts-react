import moment from 'moment';
import React, { useEffect } from 'react';
import { Button, Form, InputNumber, Input, Modal, Space, DatePicker } from 'antd';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import mutateCreate from '../../Periods/gqlQueries/createOperation';
import mutateUpdate from '../gqlQueries/update';
import { getModaleEntity, getModaleOpened } from '../../../redux/selectors/ui';
import { updateModaleEntity, updateModaleOpened } from '../../../redux/actions/ui/layout/modale';
import { dateFormat } from '../../../services/utils';

const { Item, useForm } = Form;

const FormOperation = ({ refetch, idPeriod }) => {
  const [form] = useForm();
  const [update] = useMutation(mutateUpdate);
  const [create] = useMutation(mutateCreate);
  const dispatch = useDispatch();
  const isOpened = useSelector(getModaleOpened);
  const entity = useSelector(getModaleEntity);

  useEffect(() => {
    if (entity?.id) {
      form.setFieldsValue({ dt: moment(new Date(entity.dt)), label: entity.label, amount: entity.amount });
    } else {
      form.setFieldsValue({ dt: moment(new Date()), label: null, amount: 0 });
    }
  }, [entity, form]);

  const close = () => {
    dispatch(updateModaleOpened(false));
  };

  const onFinish = formObject => {
    if (entity?.id) {
      update({
        variables: {
          dt: formObject.dt,
          amount: formObject.amount,
          label: formObject.label,
          id: entity.id,
        },
      }).then(response => {
        refetch();
        dispatch(updateModaleEntity(response.data.updateOperation));
        close();
      });
    } else {
      create({
        variables: {
          dt: formObject.dt,
          amount: formObject.amount,
          label: formObject.label,
          periodId: idPeriod,
        },
      }).then(response => {
        refetch();
        dispatch(updateModaleEntity(response.data.addOperation));
        close();
      });
    }
  };

  return (
    <Modal forceRender title="Basic Modal" visible={isOpened === 'operations'} onCancel={close} footer={null}>
      <Form form={form} onFinish={onFinish} name="period">
        <Item label="Date" name="dt" rules={[{ required: true, message: 'Please input date!' }]}>
          <DatePicker format={dateFormat} />
        </Item>
        <Item label="Label" name="label" rules={[{ required: true, message: 'Please input label!' }]}>
          <Input />
        </Item>
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

export default FormOperation;
