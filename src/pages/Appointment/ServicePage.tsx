import React from 'react';
import { Button, Divider } from 'antd';
import { useModel } from 'umi';
import ServiceForm from '@/pages/Appointment/ServiceForm';

export default () => {
  const { services, addService, deleteService, setVisible, setIsEdit, record, setRecord } = useModel('appointment');
  
  return (
    <div>
      <Button type="primary" onClick={() => {
        setVisible(true);
        setIsEdit(false);
        setRecord(null);
      }}>
        Thêm dịch vụ
      </Button>
      <Divider />
      <ServiceForm onSubmit={(values) => addService({ id: Date.now(), ...values })}/>
        
      <span>Danh sách dịch vụ:</span>
      <ul>
        {services.map((s: any) => (
          <li key={s.id}>
            {s.name} - {s.price} VND - {s.duration} phút
            <Button onClick={() => {
              setIsEdit(true);
              setVisible(true);
              setRecord(s);
            }}>
              Sửa

            </Button>
            <Button danger style={{ marginLeft: 8 }} onClick={() => {
              deleteService(s.id);
            }}>
              Xóa
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
