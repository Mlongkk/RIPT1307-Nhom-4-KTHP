import React from 'react';
import { Button, Divider } from 'antd';
import { useModel } from 'umi';
import StaffForm from '@/pages/Appointment/StaffForm';

export default () => {
    const { staffs, addStaff, deleteStaff, setVisible, setIsEdit, record, setRecord } = useModel('appointment');

    return (
        <div>
            <Button type="primary" onClick={() => {
                setVisible(true);
                setIsEdit(false);
                setRecord(null);
            }}>
                Thêm nhân viên
            </Button>
            <Divider />
            <StaffForm onSubmit={(values) => addStaff({ id: Date.now(), ...values })} />

            <span>Danh sách nhân viên:</span>
            <ul>
                {staffs.map((s: any) => (
                    <li key={s.id}>
                        {s.name} - Số lượng khách tối đa: {s.maxCustomer} - Lịch làm việc: {s.workTime} &nbsp;
                        <Button onClick={() => {
                            setIsEdit(true);
                            setVisible(true);
                            setRecord(s);
                        }}>
                            Sửa
                        </Button>

                        <Button danger style={{ marginLeft: 8 }} onClick={() => {
                            deleteStaff(s.id);
                        }}>
                            Xóa
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
