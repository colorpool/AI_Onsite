import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  QrcodeOutlined,
  DingdingOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {
  FormattedMessage,
  Helmet,
  useIntl,
  useModel,
  history,
} from '@umijs/max';
import { Alert, App, Tabs, Button, Space, Divider, QRCode } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Footer } from '@/components';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

// 删除其他登录方式图标组件

// 删除语言切换组件

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('dingtalk');
  const [qrCodeValue, setQrCodeValue] = useState<string>('');
  const [scanStatus, setScanStatus] = useState<'waiting' | 'scanned' | 'confirmed'>('waiting');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const { message } = App.useApp();
  const intl = useIntl();

  // 生成钉钉扫码登录二维码
  useEffect(() => {
    if (type === 'dingtalk') {
      // 生成二维码内容
      setQrCodeValue(`dingtalk://login?token=${Date.now()}`);
      setScanStatus('waiting');
    }
  }, [type]);

  const handleDingTalkLogin = async () => {
    try {
      // 模拟钉钉登录成功
      message.success('钉钉扫码登录成功！');
      
      // 设置用户信息
      const mockUser = {
        name: '钉钉用户',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: 'dingtalk_user_001',
        email: 'user@dingtalk.com',
      };
      
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: mockUser,
        }));
      });
      
      // 跳转到主页面
      const urlParams = new URLSearchParams(history.location.search);
      history.push(urlParams.get('redirect') || '/dashboard/work');
    } catch (error) {
      message.error('钉钉登录失败，请重试！');
    }
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URLSearchParams(history.location.search);
        history.push(urlParams.get('redirect') || '/dashboard/work');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      {/* 删除语言切换 */}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={(typeof window !== 'undefined' && (window as any).publicPath) ? `${(window as any).publicPath}soke.svg` : './soke.svg'} />}
          title="智能驻场"
          subTitle={intl.formatMessage({
            id: 'pages.layouts.userLayout.title',
          })}
          initialValues={{
            autoLogin: true,
          }}
          actions={[]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'dingtalk',
                label: (
                  <Space>
                    <DingdingOutlined />
                    钉钉扫码登录
                  </Space>
                ),
              },
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
              {
                key: 'mobile',
                label: intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '手机号登录',
                }),
              },
            ]}
          />

          {/* 钉钉扫码登录 */}
          {type === 'dingtalk' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                marginBottom: 16, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <QRCode
                  value={qrCodeValue}
                  size={200}
                  status={scanStatus === 'waiting' ? 'active' : scanStatus === 'scanned' ? 'loading' : 'expired'}
                />
              </div>
              <div style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
                {scanStatus === 'waiting' && (
                  <>
                    <QrcodeOutlined style={{ marginRight: 8 }} />
                    请使用钉钉扫描二维码登录
                  </>
                )}
                {scanStatus === 'scanned' && (
                  <>
                    <DingdingOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    扫描成功，请在手机上确认登录
                  </>
                )}
                {scanStatus === 'confirmed' && (
                  <>
                    <DingdingOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                    登录确认中...
                  </>
                )}
              </div>
              
              {/* 添加登录按钮 */}
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  size="large"
                  block
                  onClick={handleDingTalkLogin}
                  style={{ borderRadius: '6px' }}
                >
                  钉钉登录
                </Button>
                
                <Divider>或</Divider>
                
                <Button 
                  type="link" 
                  onClick={() => setType('account')}
                  style={{ color: '#1890ff' }}
                >
                  使用账号密码登录
                </Button>
              </Space>
            </div>
          )}

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && (
            <LoginMessage content="验证码错误" />
          )}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: '手机号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="请输入手机号！"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="手机号格式错误！"
                      />
                    ),
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '请输入验证码',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: '获取验证码',
                    })}`;
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: '获取验证码',
                  });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="请输入验证码！"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (!result) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage
                id="pages.login.rememberMe"
                defaultMessage="自动登录"
              />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage
                id="pages.login.forgotPassword"
                defaultMessage="忘记密码"
              />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
