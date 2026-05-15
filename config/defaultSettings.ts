import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
	pwa?: boolean;
	logo?: string;
	borderRadiusBase: string;
	siderWidth: number;

	secondaryColor?: string;
	backgroundColor?: string;
	textColor?: string;
	sidebarBackgroundColor?: string;
} = {
	
	// Sử dụng biến toàn cục bạn đã declare trong typings.d.ts
	primaryColor: process.env.APP_CONFIG_PRIMARY_COLOR || '#CC0D00',
	secondaryColor: process.env.APP_CONFIG_SECONDARY_COLOR || '#1890FF',
	backgroundColor: process.env.APP_CONFIG_BG_COLOR || '#F0F2F5',
	textColor: process.env.APP_CONFIG_TEXT_COLOR || '#262626',
	sidebarBackgroundColor: process.env.APP_CONFIG_SIDEBAR_BG || '#001529',

	borderRadiusBase: '6px',
	layout: 'mix',
	contentWidth: 'Fluid',
	fixedHeader: false,
	fixSiderbar: true,
	colorWeak: false,
	title: 'Bệnh viện Thú y ABC',
	pwa: false,
	logo: '/logo.png',
	iconfontUrl: '',
	headerTheme: 'dark', // Đổi sang dark
    navTheme: 'realDark', 
    headerHeight: 56, // Giảm nhẹ chiều cao Header để tăng không gian nội dung
	siderWidth: 220,
};

export default Settings;