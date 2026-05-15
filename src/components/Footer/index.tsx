import { landingUrl, unitName } from '@/services/base/constant';
import { DefaultFooter } from '@ant-design/pro-layout';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
	const intl = useIntl();
	const defaultMessage = intl.formatMessage({
		id: 'app.copyright.produced',
		defaultMessage: 'CopyRight',
	});

	return (
		<DefaultFooter
			copyright={`2026 Nhóm "4 chàng trai" - ${APP_CONFIG_APP_VERSION}`}
			links={[
				{
					key: 'github',
					title: unitName.toUpperCase(),
					href: landingUrl,
					blankTarget: true,
				},
			]}
			style={{ width: '100%' }}
		/>
	);
};
export default Footer;
