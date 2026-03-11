import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { useModel } from 'umi';
import { Booking, Staff, Service } from '@/models/appointment';

const ScheduleTable: React.FC = () => {
  const { bookings, staffs, services, updateBookingStatus } = useModel('appointment');

  // Tìm tên nhân viên/dịch vụ theo id
  const findStaff = (id: number) => staffs.find(s => s.id === id)?.name || '';
  const findService = (id: number) => services.find(s => s.id === id)?.name || '';

  const columns = [
    { title: 'Khách hàng', dataIndex: 'customer' },
    { title: 'Nhân viên', render: (text: any, record: Booking) => findStaff(record.staffId) },
    { title: 'Dịch vụ', render: (text: any, record: Booking) => findService(record.serviceId) },
    { title: 'Ngày giờ', dataIndex: 'date' },
    { title: 'Trạng thái', dataIndex: 'status', 
      render: (status: string) => {
        let color = '';
        if (status === 'Chờ duyệt') color = 'orange';
        if (status === 'Đã xác nhận') color = 'blue';
        if (status === 'Hoàn thành') color = 'green';
        if (status === 'Đã hủy') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Hành động', render: (_: any, record: Booking) => (
        <Space>
          {record.status !== 'Hoàn thành' && (
            <Button 
              onClick={() => updateBookingStatus(record.id, 'Hoàn thành')}
              size="small" type="primary"
            >
              Hoàn thành
            </Button>
          )}
          {record.status !== 'Đã hủy' && (
            <Button
              onClick={() => updateBookingStatus(record.id, 'Đã hủy')}
              size="small" danger
            >
              Hủy
            </Button>
          )}
        </Space>
      )
    }
  ];

  return <Table columns={columns} dataSource={bookings} rowKey="id" />;
};

export default ScheduleTable;
