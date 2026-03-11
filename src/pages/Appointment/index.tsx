// import React from 'react';
// import TableBase from '@/components/Table';
// import { Tag } from 'antd';
// import { IColumn } from '@/components/Table/typing';

// const AppointmentPage = () => {
//   const columns: IColumn<any>[] = [
//     {
//       title: 'Khách hàng',
//       dataIndex: 'customerName',
//       width: 200,
//       filterType: 'string',
//       sortable: true,
//     },
//     {
//       title: 'Nhân viên',
//       dataIndex: 'staffName',
//       width: 200,
//       filterType: 'string',
//     },
//     {
//       title: 'Dịch vụ',
//       dataIndex: 'serviceName',
//       width: 200,
//     },
//     {
//       title: 'Ngày hẹn',
//       dataIndex: 'date',
//       width: 150,
//       sortable: true,
//     },
//     {
//       title: 'Giờ',
//       dataIndex: 'time',
//       width: 100,
//     },
//     {
//       title: 'Trạng thái',
//       dataIndex: 'status',
//       width: 150,
//       filterType: 'select',
//       filterData: [
//         { value: 'pending', label: 'Chờ duyệt' },
//         { value: 'confirmed', label: 'Xác nhận' },
//         { value: 'completed', label: 'Hoàn thành' },
//         { value: 'cancelled', label: 'Hủy' },
//       ],
//       render: (value: string) => {
//         const map: any = {
//           pending: 'orange',
//           confirmed: 'blue',
//           completed: 'green',
//           cancelled: 'red',
//         };

//         const text: any = {
//           pending: 'Chờ duyệt',
//           confirmed: 'Xác nhận',
//           completed: 'Hoàn thành',
//           cancelled: 'Hủy',
//         };

//         return <Tag color={map[value]}>{text[value]}</Tag>;
//       },
//     },
//   ];

//   return (
//     <TableBase
//       modelName="appointment"
//       title="Quản lý lịch hẹn"
//       columns={columns}
//       rowSelection
//       addStt
//     />
//   );
// };

// export default AppointmentPage;