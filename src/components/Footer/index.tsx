import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

// 自定义SVG图标组件
const SokeIcon: React.FC = () => (
  <img 
    src="/soke.svg" 
    alt="Soke" 
    style={{ 
      width: '16px', 
      height: '16px',
      verticalAlign: 'middle'
    }} 
  />
);

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
        padding: '8px 16px',
        fontSize: '12px',
        lineHeight: '1.2',
        minHeight: 'auto',
      }}
      copyright="Powered by Dingxue Tech"
      links={[
        {
          key: 'Ant Design Pro',
          title: '钉学（杭州）科技有限公司',
          href: 'https://www.soke.cn/',
          blankTarget: true,
        },
        {
          key: 'soke',
          title: <SokeIcon />,
          href: 'https://www.soke.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
