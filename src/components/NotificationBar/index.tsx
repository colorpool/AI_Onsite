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
  '智能驻场原型设计更新公告，会议记录请前往钉钉多维表格',
  '每周一更新到内网服务器，每天更新到外网服务器（需要梯子），每周三、四、五，客成团队早会原型评审',
  '0911,新内容外网已更新。持续服务模块已经完成version 1.0设计，待客成评审'
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
