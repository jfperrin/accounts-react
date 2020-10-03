import React, { useEffect } from 'react';
// TODO replace moment by dayjs
import moment from 'moment';
import { Button, Form, InputNumber, Input, Modal, Space, DatePicker } from 'antd';
import { useMutation } from 'react-apollo';
import { useDispatch, useSelector } from 'react-redux';
import mutateCreate from '../../Periods/gqlQueries/createOperation';
import mutateUpdate from '../gqlQueries/update';
import { getModaleEntity, getModaleOpened } from '../../../selectors/ui';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';

const { Item, useForm } = Form;
const dateFormat = 'DD/MM/yyyy';

const FormOperation = ({ refetch, idPeriod }) => {
  const [form] = useForm();
  const [update] = useMutation(mutateUpdate);
  const [create] = useMutation(mutateCreate);
  const dispatch = useDispatch();
  const isOpened = useSelector(getModaleOpened);
  const entity = useSelector(getModaleEntity);

  useEffect(() => {
    if (entity?.id) {
      form.setFieldsValue({ dt: moment(new Date(entity.dt), dateFormat), label: entity.label, amount: entity.amount });
    } else {
      form.setFieldsValue({ dt: moment(new Date(), dateFormat), label: null, amount: 0 });
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
    <Modal title="Basic Modal" visible={isOpened} onCancel={close} footer={null}>
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
