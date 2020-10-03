import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
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
      form.setFieldsValue({ label: entity.label });
    } else {
      form.setFieldsValue({ label: null });
    }
  }, [entity, form]);

  const close = () => {
    dispatch(updateModaleOpened(false));
  };

  const onFinish = formObject => {
    if (entity?.id) {
      update({
        variables: {
          label: formObject.label,
          id: entity.id,
        },
        refetchQueries: [{ query }],
      }).then(response => {
        dispatch(updateModaleEntity(response.data.updateBank));
        close();
      });
    } else {
      create({
        variables: {
          label: formObject.label,
        },
        refetchQueries: [{ query }],
      }).then(response => {
        dispatch(updateModaleEntity(response.data.addBank));
        close();
      });
    }
  };

  return (
    <Modal title="Basic Modal" visible={isOpened} onCancel={close} footer={null}>
      <Form form={form} onFinish={onFinish} name="entity">
        <Item label="Label" name="label" rules={[{ required: true, message: 'Please input label!' }]}>
          <Input />
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
