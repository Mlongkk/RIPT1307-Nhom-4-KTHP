export interface Room {
    id: string;
    name: string;
    capacity: number;
    type: 'ly_thuyet' | 'thuc_hanh' | 'hoi_truong';
    manager: string;
}

const KEY = 'rooms_data';

const fakeData: Room[] = [
    { id: 'L301', name: 'Lab Máy Tính 1', capacity: 45, type: 'thuc_hanh', manager: 'Nguyễn Văn A' },
    { id: 'R101', name: 'Phòng A1', capacity: 25, type: 'ly_thuyet', manager: 'Nguyễn Văn A' },
    { id: 'H401', name: 'Hội trường nhỏ', capacity: 80, type: 'hoi_truong', manager: 'Nguyễn Văn A' },

    { id: 'R102', name: 'Phòng A2', capacity: 30, type: 'ly_thuyet', manager: 'Trần Thị B' },
    { id: 'L302', name: 'Lab Máy Tính 2', capacity: 50, type: 'thuc_hanh', manager: 'Trần Thị B' },
    { id: 'H402', name: 'Hội trường vừa', capacity: 120, type: 'hoi_truong', manager: 'Trần Thị B' },

    { id: 'R103', name: 'Phòng A3', capacity: 20, type: 'ly_thuyet', manager: 'Lê Văn C' },
    { id: 'L303', name: 'Lab IoT', capacity: 35, type: 'thuc_hanh', manager: 'Lê Văn C' },
    { id: 'H403', name: 'Hội trường lớn', capacity: 200, type: 'hoi_truong', manager: 'Lê Văn C' },

    { id: 'L304', name: 'Lab AI', capacity: 60, type: 'thuc_hanh', manager: 'Phạm Văn D' },
    { id: 'R201', name: 'Phòng B1', capacity: 35, type: 'ly_thuyet', manager: 'Phạm Văn D' },
    { id: 'H404', name: 'Auditorium Premium', capacity: 180, type: 'hoi_truong', manager: 'Phạm Văn D' },

    { id: 'R202', name: 'Phòng B2', capacity: 40, type: 'ly_thuyet', manager: 'Hoàng Thị E' },
    { id: 'L305', name: 'Lab Mạng', capacity: 55, type: 'thuc_hanh', manager: 'Hoàng Thị E' },
    { id: 'R501', name: 'Phòng Seminar 1', capacity: 25, type: 'ly_thuyet', manager: 'Hoàng Thị E' },

    { id: 'L601', name: 'Lab Robotics', capacity: 40, type: 'thuc_hanh', manager: 'Trần Thị B' },
    { id: 'R502', name: 'Phòng Seminar 2', capacity: 28, type: 'ly_thuyet', manager: 'Nguyễn Văn A' },
    { id: 'L602', name: 'Lab Embedded', capacity: 38, type: 'thuc_hanh', manager: 'Lê Văn C' },
];

export const getRooms = (): Room[] => {
    const data = localStorage.getItem(KEY);
    if (!data) {
        localStorage.setItem(KEY, JSON.stringify(fakeData));
        return fakeData;
    }
    return JSON.parse(data);
};

export const saveRooms = (data: Room[]) => {
    localStorage.setItem(KEY, JSON.stringify(data));
};