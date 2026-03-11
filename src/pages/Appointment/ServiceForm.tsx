import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { useModel } from 'umi';
import { Service } from '@/models/appointment';
import { useEffect } from "react";

interface ServiceFormProps {
  onSubmit?: (values: any) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const { isEdit, visible, setVisible, addService, editService, record, services } = useModel('appointment');

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record]);

  
  const handleFinish = (values: any) => {

    if (isEdit) {

      const service = services.find((s) => s.id === record.id);

      if (service) {
        editService(service.id, { ...service, ...values } as Service);
      }

    } else {

      onSubmit?.(values);

    }

    form.resetFields();
    setVisible(false);

  };

  return (
    <Modal
      title={isEdit ? "Sửa dịch vụ" : "Thêm dịch vụ"}
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setVisible(false);
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ price: 0, duration: 30 }}
      >
        <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên dịch vụ" />
        </Form.Item>
        <Form.Item name="price" label="Giá dịch vụ">
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item name="duration" label="Thời gian (phút)">
          <Input type="number" min={1} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? "Cập nhật" : "Thêm"}
        </Button>
      </Form>
    </Modal>
  );
};

export default ServiceForm;
