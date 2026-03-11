import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import MyDatePicker from '@/components/MyDatePicker';
import { useModel } from 'umi';
import { Staff } from '@/models/appointment';
import {useEffect} from "react";

interface StaffFormProps {
  onSubmit: (values: any) => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const { staffs, isEdit, visible, setVisible, addStaff, editStaff, record } = useModel('appointment');

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record]);

  const handleFinish = (values: any) => {
    if (isEdit) {
      // Sửa nhân viên
      staffs.map((s) => {
        if (s.id === values.id) {
          editStaff(s.id, { ...s, ...values } as Staff);
        }
      });
    } else {
      // Thêm nhân viên mới
      onSubmit(values);
    }
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title={isEdit ? "Sửa nhân viên" : "Thêm nhân viên"}
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
        initialValues={{ maxCustomer: 1 }}
      >
        <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên nhân viên" />
        </Form.Item>
        <Form.Item name="maxCustomer" label="Số khách tối đa">
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item name="workTime" label="Lịch làm việc">
          <MyDatePicker placeholder="Chọn giờ" />
        </Form.Item>
        {isEdit && (
          <Form.Item name="id" hidden>
            <Input type="hidden" />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          {isEdit ? "Cập nhật" : "Thêm"}
        </Button>
      </Form>
    </Modal>
  );
};

export default StaffForm;
