import React, { useState, useEffect, useRef } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  notificationBar: {
    background: 'linear-gradient(90deg, #e6f7ff 0%, #ffffff 100%)',
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    height: '40px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  bellIcon: {
    color: '#fa8c16',
    fontSize: '16px',
    flexShrink: 0,
  },
  messageContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    height: '24px',
  },
  messageList: {
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.5s ease-in-out',
  },
  message: {
    color: '#1890ff',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

// 模拟通知数据
const notifications = [
  '关于2025年8月产品迭代和对应安排工作的通知',
  '客户满意度调查结果已更新，请及时查看',
  '新版本功能上线通知：智能标签系统已优化',
  '重要提醒：年度续约高峰期即将到来',
  '系统维护通知：本周日凌晨2-4点进行维护',
];

const NotificationBar: React.FC = () => {
  const { styles } = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(notifications.length, 3));
    }, 3000); // 每3秒切换一次

    return () => clearInterval(interval);
  }, []);

  // 只显示最新的3条消息
  const displayMessages = notifications.slice(0, 3);

  return (
    <div className={styles.notificationBar}>
      <BellOutlined className={styles.bellIcon} />
      <div className={styles.messageContainer}>
        <div 
          ref={messageListRef}
          className={styles.messageList}
          style={{
            transform: `translateY(-${currentIndex * 24}px)`,
          }}
        >
          {displayMessages.map((message, index) => (
            <div key={index} className={styles.message}>
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
