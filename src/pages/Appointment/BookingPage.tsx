import React from 'react';
import { Divider } from 'antd';
import BookingForm from '@/pages/Appointment/BookingForm';
import ScheduleTable from '@/pages/Appointment/ScheduleTable';

export default () => {
  return (
    <div>
      <BookingForm />
      <Divider />
      <ScheduleTable />
    </div>
  );
};
