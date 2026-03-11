import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import MyDatePicker from '@/components/MyDatePicker';
import { useModel } from 'umi';
import { Service, Staff } from '@/models/appointment';

const { Option } = Select;

const BookingForm: React.FC = () => {
  const { staffs, services, addBooking } = useModel('appointment');
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    // Thêm lịch hẹn, mặc định status "Chờ duyệt"
    addBooking({
      id: Date.now(),
      status: 'Chờ duyệt',
      ...values,
    });
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form} onFinish={handleFinish}>
      <Form.Item name="customer" rules={[{ required: true }]}>
        <Input placeholder="Tên khách" />
      </Form.Item>
      <Form.Item name="staffId" rules={[{ required: true }]}>
        <Select placeholder="Chọn nhân viên" style={{ width: 120 }}>
          {staffs.map((s: Staff) => (
            <Option key={s.id} value={s.id}>{s.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="serviceId" rules={[{ required: true }]}>
        <Select placeholder="Chọn dịch vụ" style={{ width: 120 }}>
          {services.map((s: Service) => (
            <Option key={s.id} value={s.id}>{s.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="date" rules={[{ required: true }]}>
        <MyDatePicker placeholder="Chọn ngày & giờ" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Đặt lịch</Button>
    </Form>
  );
};

export default BookingForm;
