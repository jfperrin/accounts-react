import React, { useEffect } from 'react';
import { Button, Form, Input, InputNumber, Modal, Space } from 'antd';
import { useMutation } from 'react-apollo';
import { useDispatch, useSelector } from 'react-redux';
import mutateUpdate from '../gqlQueries/update';
import mutateCreate from '../gqlQueries/create';
import query from '../gqlQueries/list';
import { getModaleEntity, getModaleOpened } from '../../../selectors/ui';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';

const { Item, useForm } = Form;

const FormRecurrentOperations = () => {
  const [form] = useForm();
  const [update] = useMutation(mutateUpdate);
  const [create] = useMutation(mutateCreate);
  const dispatch = useDispatch();
  const isOpened = useSelector(getModaleOpened);
  const entity = useSelector(getModaleEntity);

  useEffect(() => {
    if (entity?.id) {
      form.setFieldsValue({ day: entity.day, label: entity.label, amount: entity.amount });
    } else {
      form.setFieldsValue({ day: null, label: null, amount: 0 });
    }
  }, [entity?.id]);

  const close = () => {
    dispatch(updateModaleOpened(false));
  };

  const onFinish = formObject => {
    if (entity?.id) {
      update({
        variables: {
          day: parseInt(formObject.day, 10),
          amount: parseFloat(formObject.amount),
          label: formObject.label,
          id: entity.id,
        },
        refetchQueries: [{ query }],
      }).then(response => {
        dispatch(updateModaleEntity(response.data.updateRecurrentOperation));
        close();
      });
    } else {
      create({
        variables: {
          day: parseInt(formObject.day, 10),
          amount: parseFloat(formObject.amount),
          label: formObject.label,
        },
        refetchQueries: [{ query }],
      }).then(response => {
        dispatch(updateModaleEntity(response.data.addRecurrentOperation));
        close();
      });
    }
  };

  return (
    <Modal title="Basic Modal" visible={isOpened} onCancel={close} footer={null}>
      <Form form={form} onFinish={onFinish} name="entity">
        <Item label="Jours" name="day" rules={[{ required: true, message: 'Please input day!' }]}>
          <InputNumber max={31} min={1} />
        </Item>
        <Item label="Libellé" name="label" rules={[{ required: true, message: 'Please input label!' }]}>
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

export default FormRecurrentOperations;
