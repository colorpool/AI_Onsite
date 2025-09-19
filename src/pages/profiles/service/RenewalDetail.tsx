import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTabManager } from '../../../contexts/TabContext';
import {
  Card,
  Row,
  Col,
  Statistic,
  Timeline,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tabs,
  Collapse,
  Tag,
  Avatar,
  Space,
  Typography,
  Progress,
  Tooltip
} from 'antd';
import {
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  PhoneOutlined,
  MailOutlined,
  WechatOutlined,
  PlayCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import ContinuousServiceHeader from '../../../components/service/ContinuousServiceHeader';
import { renewalCustomers, RenewalCustomer } from '../../../mock/renewalData';
import dayjs from 'dayjs';

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const RenewalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { removeTab } = useTabManager();
  const [customer, setCustomer] = useState<RenewalCustomer | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      // 从renewalCustomers中找到对应客户
      const foundCustomer = renewalCustomers.find(c => c.id === id);
      if (foundCustomer) {
        setCustomer(foundCustomer);
        
        // 检查是否为收藏客户
        const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
        setIsFavorite(favoriteCustomers.includes(id));
        
        // 如果URL中包含scrollTo参数，滚动到对应位置
        const searchParams = new URLSearchParams(location.search);
        const scrollTo = searchParams.get('scrollTo');
        if (scrollTo === 'top' && topRef.current) {
          setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // 如果找不到客户，跳转回续约管理页
        navigate('/profiles/renewal');
      }
    }
  }, [id, navigate, location.search]);

  if (!customer) {
    return <div>加载中...</div>;
  }

  const getHealthLevelColor = (level: string) => {
    switch (level) {
      case '健康': return 'green';
      case '一般': return 'orange';
      case '风险': return 'red';
      default: return 'gray';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'gold';
      case 'A': return 'blue';
      case 'B': return 'green';
      case 'C': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div ref={topRef}>
        <ContinuousServiceHeader
          customerData={{
            id: customer.id,
            name: customer.name,
            healthLevel: customer.healthLevel === '健康' ? 'healthy' : customer.healthLevel === '一般' ? 'normal' : 'risk',
            customerTier: customer.tier === 'S' ? 'strategic' : customer.tier === 'A' ? 'large' : 'medium',
            arr: customer.arr,
            renewalDate: customer.contractEndDate,
            lastContactDays: Math.floor((new Date().getTime() - new Date(customer.lastContactDate).getTime()) / (1000 * 60 * 60 * 24)),
            contractNumber: customer.id
          }}
          title={`续约详情 - ${customer.name}`}
          onBack={() => navigate('/profiles/renewal')}
          onViewContract={() => message.info('查看合同功能开发中')}
          onShare={() => message.info('分享功能开发中')}
          isFavorite={isFavorite}
          onToggleFavorite={() => {
            const favoriteCustomers = JSON.parse(localStorage.getItem('favoriteCustomers') || '[]');
            if (isFavorite) {
              const newFavorites = favoriteCustomers.filter((fId: string) => fId !== id);
              localStorage.setItem('favoriteCustomers', JSON.stringify(newFavorites));
            } else {
              favoriteCustomers.push(id);
              localStorage.setItem('favoriteCustomers', JSON.stringify(favoriteCustomers));
            }
            setIsFavorite(!isFavorite);
          }}
        />
      </div>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        {/* 基本信息卡片 */}
        <Col span={24}>
          <Card title="基本信息" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic
                  title="客户名称"
                  value={customer.name}
                  valueStyle={{ fontSize: '16px' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="健康状态"
                  value={customer.healthLevel}
                  valueStyle={{ color: getHealthLevelColor(customer.healthLevel) }}
                  prefix={<Tag color={getHealthLevelColor(customer.healthLevel)}>{customer.healthLevel}</Tag>}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="客户等级"
                  value={customer.tier}
                  valueStyle={{ color: getTierColor(customer.tier) }}
                  prefix={<Tag color={getTierColor(customer.tier)}>{customer.tier}</Tag>}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="ARR"
                  value={customer.arr}
                  precision={0}
                  prefix="¥"
                  suffix="万"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 续约信息卡片 */}
        <Col span={12}>
          <Card title="续约信息" bordered={false}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>合同到期日期：</Text>
                <Text>{customer.contractEndDate}</Text>
              </div>
              <div>
                <Text strong>距离到期：</Text>
                <Text>{customer.daysToExpiry} 天</Text>
              </div>
              <div>
                <Text strong>续约概率：</Text>
                <Progress percent={customer.renewalProbability} size="small" />
              </div>
              <div>
                <Text strong>续约阶段：</Text>
                <Tag color="blue">{customer.renewalStage}</Tag>
              </div>
              <div>
                <Text strong>续约类型：</Text>
                <Tag>{customer.renewalType}</Tag>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 财务信息卡片 */}
        <Col span={12}>
          <Card title="财务信息" bordered={false}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>当前合同价值：</Text>
                <Text>¥{customer.currentContractValue.toLocaleString()}</Text>
              </div>
              <div>
                <Text strong>建议续约价值：</Text>
                <Text>¥{customer.proposedRenewalValue.toLocaleString()}</Text>
              </div>
              <div>
                <Text strong>价值变化：</Text>
                <Text style={{ 
                  color: customer.proposedRenewalValue > customer.currentContractValue ? 'green' : 'red' 
                }}>
                  {customer.proposedRenewalValue > customer.currentContractValue ? '+' : ''}
                  {((customer.proposedRenewalValue - customer.currentContractValue) / customer.currentContractValue * 100).toFixed(1)}%
                </Text>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 风险因素 */}
        <Col span={12}>
          <Card title="风险因素" bordered={false}>
            <Space wrap>
              {customer.riskFactors.map((risk, index) => (
                <Tag key={index} color="red">{risk}</Tag>
              ))}
              {customer.riskFactors.length === 0 && <Text type="secondary">暂无风险因素</Text>}
            </Space>
          </Card>
        </Col>

        {/* 机会点 */}
        <Col span={12}>
          <Card title="机会点" bordered={false}>
            <Space wrap>
              {customer.opportunities.map((opportunity, index) => (
                <Tag key={index} color="green">{opportunity}</Tag>
              ))}
              {customer.opportunities.length === 0 && <Text type="secondary">暂无机会点</Text>}
            </Space>
          </Card>
        </Col>

        {/* 关键干系人 */}
        <Col span={24}>
          <Card title="关键干系人" bordered={false}>
            <Row gutter={[16, 16]}>
              {customer.keyStakeholders.map((stakeholder, index) => (
                <Col key={index} span={8}>
                  <Card size="small">
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div>
                        <Avatar icon={<UserOutlined />} />
                        <Text strong style={{ marginLeft: 8 }}>{stakeholder.name}</Text>
                      </div>
                      <div>
                        <Text type="secondary">职位：</Text>
                        <Text>{stakeholder.role}</Text>
                      </div>
                      <div>
                        <Text type="secondary">影响力：</Text>
                        <Tag color={stakeholder.influence === 'high' ? 'red' : stakeholder.influence === 'medium' ? 'orange' : 'green'}>
                          {stakeholder.influence}
                        </Tag>
                      </div>
                      <div>
                        <Text type="secondary">态度：</Text>
                        <Tag color={stakeholder.attitude === 'supporter' ? 'green' : stakeholder.attitude === 'neutral' ? 'blue' : 'red'}>
                          {stakeholder.attitude}
                        </Tag>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* 续约备注 */}
        <Col span={24}>
          <Card title="续约备注" bordered={false}>
            <Text>{customer.renewalNotes}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RenewalDetail;