import React, { useState, useEffect } from 'react';
import { Card, Input, Button, message, Modal, Typography, Space } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { history } from '@umijs/max';
import styles from './PersonalCenter.less';

const { Title, Text } = Typography;

const PersonalCenter: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  // 检查页面有效期
  useEffect(() => {
    const checkExpiry = () => {
      const storedExpiryDate = localStorage.getItem('personalCenterExpiry');
      if (storedExpiryDate) {
        const expiry = new Date(storedExpiryDate);
        const now = new Date();
        
        if (now > expiry) {
          message.error('页面已过期，请联系管理员');
          history.push('/');
          return;
        }
        setExpiryDate(expiry);
      } else {
        // 首次访问，设置10天有效期
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 10);
        localStorage.setItem('personalCenterExpiry', expiry.toISOString());
        setExpiryDate(expiry);
      }
    };

    checkExpiry();
    
    // 每分钟检查一次有效期
    const interval = setInterval(checkExpiry, 60000);
    
    return () => clearInterval(interval);
  }, []);



  // 防止复制和下载
  useEffect(() => {
    const preventCopy = (e: Event) => {
      e.preventDefault();
      message.warning('本页面内容受版权保护，禁止复制');
    };

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      message.warning('本页面内容受版权保护，禁止右键操作');
    };

    const preventKeyboard = (e: KeyboardEvent) => {
      // 禁用 Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V, F12 等
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'a' || e.key === 'c' || e.key === 'v')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        message.warning('本页面内容受版权保护，禁止此操作');
      }
    };

    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('contextmenu', preventRightClick);
    document.addEventListener('keydown', preventKeyboard);
    document.addEventListener('selectstart', preventCopy);
    document.addEventListener('dragstart', preventCopy);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('keydown', preventKeyboard);
      document.removeEventListener('selectstart', preventCopy);
      document.removeEventListener('dragstart', preventCopy);
    };
  }, []);

  const handlePasswordSubmit = async () => {
    if (!password) {
      message.error('请输入密码');
      return;
    }

    setLoading(true);
    
    // 模拟验证延迟
    setTimeout(() => {
      if (password === '123456') {
        console.log('密码验证成功，设置 isAuthenticated 为 true');
        setIsAuthenticated(true);
        message.success('验证成功，欢迎进入个人中心');
        
        // 验证成功后跳转到登录页面
        console.log('验证成功，准备跳转到登录页面');
        setTimeout(() => {
          console.log('开始跳转到 /user/login');
          history.push('/user/login');
        }, 1500);
      } else {
        message.error('密码错误，请重新输入');
      }
      setLoading(false);
    }, 1000);
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const showCopyrightInfo = () => {
    Modal.info({
      title: '版权信息',
      content: (
        <div>
          <p>本页面为授客AI和企业共创，版权由授客AI所有。</p>
          <p>页面有效期为10天，10天后将自动失效。</p>
          <p>本页面内容受版权保护，不允许下载或复制。</p>
          {expiryDate && (
            <p>页面到期时间：{expiryDate.toLocaleString('zh-CN')}</p>
          )}
        </div>
      ),
      okText: '我知道了',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.watermark}>授客AI</div>
        <div className={styles.loginBox}>
          <Card className={styles.loginCard}>
            <div className={styles.header}>
              <LockOutlined className={styles.lockIcon} />
              <Title level={3} className={styles.title}>
                个人中心访问验证
              </Title>
            </div>
            
            <div className={styles.notice}>
              <Text type="secondary">
                本页面为授客AI和企业共创，版权由授客AI所有。
                <br />
                页面有效期为10天，10天后将自动失效访问。
                <br />
                本页面不允许客户下载或复制。
              </Text>
            </div>

            <div className={styles.form}>
              <Input.Password
                size="large"
                placeholder="请输入访问密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleEnterPress}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className={styles.passwordInput}
              />
              
              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={handlePasswordSubmit}
                className={styles.submitButton}
                block
              >
                验证并进入
              </Button>
            </div>

            <div className={styles.footer}>
              <Button type="link" onClick={showCopyrightInfo}>
                查看版权信息
              </Button>
              {expiryDate && (
                <Text type="secondary" className={styles.expiryInfo}>
                  页面到期：{expiryDate.toLocaleDateString('zh-CN')}
                </Text>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.watermark}>授客AI</div>
      <div className={styles.content}>
        <Card className={styles.welcomeCard}>
          <div className={styles.welcomeHeader}>
            <Title level={2} className={styles.welcomeTitle}>
              🎉 验证成功，欢迎进入个人中心
            </Title>
            <Text type="secondary" className={styles.redirectInfo}>
              正在为您跳转到登录页面...
            </Text>
          </div>
          
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
          
          <div className={styles.footer}>
            <Text type="secondary">
              如果页面没有自动跳转，请手动点击
              <Button type="link" onClick={() => history.push('/user/login')}>
                这里
              </Button>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PersonalCenter;