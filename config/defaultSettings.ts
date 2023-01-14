import type { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  pwa: false,
  title: 'SimpleOJ',
  logo: '/logo.svg',
  headerHeight: 48,
  splitMenus: false,
};

export default Settings;
