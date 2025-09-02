import React from 'react';
import { Result, Button } from 'antd';
import { history } from '@umijs/max';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false });
    history.push('/');
  };

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <Result
            status="500"
            title="页面出现错误"
            subTitle="抱歉，页面渲染时出现了错误。请尝试刷新页面或返回首页。"
            extra={[
              <Button type="primary" key="refresh" onClick={this.handleRefresh}>
                刷新页面
              </Button>,
              <Button key="home" onClick={this.handleGoHome}>
                返回首页
              </Button>,
            ]}
          />
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: 20, textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', marginBottom: 10 }}>
                查看错误详情（开发环境）
              </summary>
              <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4 }}>
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
