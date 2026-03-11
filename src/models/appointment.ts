import { set } from 'lodash';
import { useState, useEffect } from 'react';

export interface Staff {
  id: number;
  name: string;
  maxCustomer: number;
  workTime: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export interface Booking {
  id: number;
  customer: string;
  staffId: number;
  serviceId: number;
  date: string;
  status: string;
}

export interface Review {
  id: number;
  staffId: number;
  rating: number;
  comment: string;
  reply?: string;
}

const STORAGE_KEY = 'appointment_data';

export default function useAppointmentModel() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<any>(null); // Dùng chung cho staff/service khi edit

  // Load từ localStorage khi khởi động
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setStaffs(parsed.staffs || []);
      setServices(parsed.services || []);
      setBookings(parsed.bookings || []);
      setReviews(parsed.reviews || []);
    }
  }, []);

  // Lưu vào localStorage khi thay đổi data
  useEffect(() => {
    const payload = { staffs, services, bookings, reviews };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [staffs, services, bookings, reviews]);

  // Thêm nhân viên
  const addStaff = (staff: Staff) => {
    if (staffs.find((s) => s.name === staff.name)) {
      alert("Nhân viên đã tồn tại");
      return;
    }
    if (staff.maxCustomer <= 0) {
      alert("Số khách tối đa phải lớn hơn 0");
      return;
    }
    if (!staff.workTime) {
      alert("Vui lòng chọn lịch làm việc");
      return;
    }
    setStaffs([...staffs, staff]);
    alert("Đã thêm nhân viên");
  };

  // Sửa nhân viên
  const editStaff = (id: number, updated: Staff) => {
    setStaffs(staffs.map((s) => (s.id === id ? updated : s)));
    alert("Đã cập nhật nhân viên");
  };

  // Xóa nhân viên (và xóa luôn lịch liên quan)
  const deleteStaff = (id: number) => {
    setStaffs(staffs.filter((s) => s.id !== id));
    setBookings(bookings.filter((b) => b.staffId !== id));
    alert("Đã xóa nhân viên");
  };

  // Thêm dịch vụ
  const addService = (service: Service) => {
    setServices([...services, service]);
    alert("Đã thêm dịch vụ");
  };

  // Sửa dịch vụ
  const editService = (id: number, updated: Service) => {
    setServices(services.map((s) => (s.id === id ? updated : s)));
    alert("Đã cập nhật dịch vụ");
  };

  // Xóa dịch vụ (và xóa luôn lịch liên quan)
  const deleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
    setBookings(bookings.filter((b) => b.serviceId !== id));
    alert("Đã xóa dịch vụ");
  };

  // Đặt lịch (kiểm tra xung đột thời gian)
  const addBooking = (booking: Booking) => {
    // Kiểm tra nếu cùng nhân viên, ngày giờ trùng
    const exist = bookings.find(
      (b) => b.staffId === booking.staffId && b.date === booking.date
    );
    if (exist) {
      alert("Lịch hẹn bị trùng, vui lòng chọn thời gian khác");
      return;
    }
    setBookings([...bookings, booking]);
    alert("Đã tạo lịch hẹn");
  };

  // Cập nhật trạng thái lịch hẹn
  const updateBookingStatus = (id: number, status: string) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  // Thêm đánh giá (có thể reply sau)
  const addReview = (review: Review) => {
    setReviews([...reviews, review]);
    alert("Cảm ơn đánh giá của bạn");
  };
  

  return {
    staffs,
    services,
    bookings,
    reviews,
    isEdit,
    visible,
    setIsEdit,
    setVisible,
    addStaff,
    editStaff,
    deleteStaff,
    addService,
    editService,
    deleteService,
    addBooking,
    updateBookingStatus,
    addReview,
    record, setRecord,
  };
}
