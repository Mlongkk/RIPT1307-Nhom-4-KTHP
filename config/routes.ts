import component from "@/locales/en-US/component";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	// {
	// 	path: '/random-user',
	// 	name: 'RandomUser',
	// 	component: './RandomUser',
	// 	icon: 'ArrowsAltOutlined',
	// },

	// TH01

	// {
	// 	path: '/guess-number',
	// 	name: 'Đoán số',
	// 	component: './GuessNumber',
	// 	icon: 'ArrowsAltOutlined',
	// },
	// {
	// 	path: '/todo',
	// 	name: 'Todo List',
	// 	component: './TodoList',
	// 	icon: 'ArrowsAltOutlined',
	// },
	// {
	// 	path: '/one-two-three',
	// 	name: 'One Two Three',
	// 	component: './OneTwoThree',
	// 	icon: 'ArrowsAltOutlined',
	// },

	// TH02
	// {
	// 	path: '/quan-ly-ngan-hang',
	// 	name: 'Quản Lý Ngân Hàng',
	// 	component: './QuanLyNganHang',
	// 	icon: 'ArrowsAltOutlined',
	// },


	// TH03
	// {
	// 	path: '/appointment',
	// 	name: 'Lịch hẹn',
	// 	icon: 'FileTextOutlined',
	// 	routes: [
	// 		{ path: '/appointment/staff', name: 'Nhân viên', component: './Appointment/StaffPage' },
	// 		{ path: '/appointment/service', name: 'Dịch vụ', component: './Appointment/ServicePage' },
	// 		{ path: '/appointment/booking', name: 'Đặt lịch', component: './Appointment/BookingPage' },
	// 	],
	// },

	// TH04
	// {
	// 	path: '/quanlyVanBang',
	// 	name: 'Quản lý văn bằng',
	// 	icon: 'FileTextOutlined',
	// 	component: './QuanLyVanBang',
	// },

	//TH05
	// {
	// 	path: '/club',
	// 	name: 'TH05 - Quản lý câu lạc bộ',
	// 	icon: 'FileTextOutlined',
	// 	component: './TH05/Club',
	// },
	// {
	// 	path: '/club/:name',
	// 	component: '@/pages/TH05/Club/[name].tsx',
	// },
	// {
	// 	path: '/apply',
	// 	name: 'Quản lý đơn đăng ký thành viên',
	// 	icon: 'FileTextOutlined',
	// 	component: './TH05/Apply',
	// },
	// {
	// 	path: '/dashboardClub',
	// 	name: 'Quản lý báo cáo và thống kê',
	// 	icon: 'FileTextOutlined',
	// 	component: './TH05/Dashboard',
	// },

	//path dưới bị lỗi không render được, nên tạm thời để ra ngoài
	// {
	// 	path: '/Club',
	// 	name: 'Quản lý câu lạc bộ',
	// 	icon: 'FileTextOutlined',
	// 	routes: [
	// 		{ path: '/Club', name: 'Quản lý câu lạc bộ', component: './TH05/Club/index' },
	// 		{ path: '/Club/:name', component: './TH05/Club/[name].tsx' },
	// 		{ path: '/Club/apply', name: 'Quản lý đơn đăng ký thành viên', component: './TH05/Apply' },
	// 		{ path: '/Club/dashboardClub', name: 'Quản lý báo cáo và thống kê', component: './TH05/Dashboard' },
	// 	],
	// },


	//TH06
	{
		path: '/Destination',
		name: 'TH06 - Quản lý điểm đến',
		icon: 'FileTextOutlined',
		routes: [
			{ path: '/Destination', name: 'Trang chủ', component: './Destination/index' },
			{ path: '/Destination/planner', name: 'Lịch trình', component: './Destination/planner' },
			{ path: '/Destination/budget', name: 'Ngân sách', component: './Destination/budget' },
			{ path: '/Destination/admin', name: 'Quản trị Admin', component: './Destination/admin' }
		],
	},
	{
		path: '/TH07',
		name: 'TH07 - Quản lý công việc',
		icon: 'FileTextOutlined',
		component: './TH07/index',
	},
	{
		path: '/KtraGiuaKi',
		name: 'Ktra giữa kì',
		icon: 'FileTextOutlined',
		component: './KtraGiuaKi/index',
	},


	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
