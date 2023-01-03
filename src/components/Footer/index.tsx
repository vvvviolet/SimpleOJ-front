import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = 'BCL';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ backgroundColor: 'transparent', fontStyle: 'italic', color: 'silver' }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/vvvviolet/SimpleOJ-front',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
