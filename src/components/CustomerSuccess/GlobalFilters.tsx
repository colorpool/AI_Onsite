import React, { useState } from 'react';
import { Row, Col, Select, DatePicker, Input, Button, Space, Tooltip } from 'antd';
import { SearchOutlined, SaveOutlined, ExportOutlined, FilterOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface GlobalFiltersProps {
  filters: {
    timeRange: 'current' | 'previous' | 'custom';
    customDateRange?: [dayjs.Dayjs, dayjs.Dayjs] | null;
    industries: string[];
    customerSizes: string[];
    csmOwners: string[];
    regions: string[];
    isChannelCustomer?: boolean | null;
    searchText: string;
  };
  onFiltersChange: (filters: any) => void;
  onSaveView: () => void;
  onExport: () => void;
}

const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  filters,
  onFiltersChange,
  onSaveView,
  onExport,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const industries = [
    '互联网科技', '金融服务', '制造业', '零售电商', '医疗健康',
    '教育培训', '房地产', '物流运输', '能源化工', '政府机构'
  ];

  const customerSizes = [
    '小微企业(1-50人)', '中小企业(51-200人)', 
    '中型企业(201-1000人)', '大型企业(1000+人)'
  ];

  const csmOwners = [
    '王一', '李二', '张三', '赵四', '陈五', 
    '孙六', '周七', '吴八', '郑九', '刘十'
  ];

  const regions = [
    '华北', '华东', '华南', '华中', '西南', '西北', '东北'
  ];

  const timeRangeOptions = [
    { label: '本季度', value: 'current' },
    { label: '上季度', value: 'previous' },
    { label: '自定义', value: 'custom' }
  ];

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e8e8e8',
      marginBottom: '16px',
      overflow: 'hidden'
    }}>
      {/* 标题栏 - 始终显示 */}
      <div style={{
        padding: '12px 16px',
        background: '#fafafa',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }} onClick={() => setIsExpanded(!isExpanded)}>
        <Space>
          <FilterOutlined style={{ color: '#1890ff', fontSize: '14px' }} />
          <span style={{ fontWeight: 600, color: '#262626', fontSize: '14px' }}>全局筛选</span>
        </Space>
        <Button 
          type="text" 
          size="small" 
          icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
          style={{ color: '#666' }}
        />
      </div>
      
      {/* 筛选内容 - 可展开收起 */}
      {isExpanded && (
        <div style={{ padding: '16px' }}>
          <Row gutter={[12, 12]} align="middle">
        
        {/* 时间维度 */}
        <Col>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>时间维度</span>
            <Select
              value={filters.timeRange}
              onChange={(value) => handleFilterChange('timeRange', value)}
              style={{ width: 120 }}
              size="small"
            >
              {timeRangeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>

        {/* 自定义时间范围 */}
        {filters.timeRange === 'custom' && (
          <Col>
            <Space direction="vertical" size={4}>
              <span style={{ fontSize: '12px', color: '#8c8c8c' }}>自定义时间</span>
              <RangePicker
                value={filters.customDateRange}
                onChange={(dates) => handleFilterChange('customDateRange', dates)}
                size="small"
                style={{ width: 200 }}
              />
            </Space>
          </Col>
        )}

        {/* 行业 */}
        <Col>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>行业</span>
            <Select
              mode="multiple"
              value={filters.industries}
              onChange={(value) => handleFilterChange('industries', value)}
              placeholder="选择行业"
              style={{ width: 160 }}
              size="small"
              maxTagCount={1}
            >
              {industries.map(industry => (
                <Option key={industry} value={industry}>
                  {industry}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>

        {/* 客户规模段 */}
        <Col>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>客户规模</span>
            <Select
              mode="multiple"
              value={filters.customerSizes}
              onChange={(value) => handleFilterChange('customerSizes', value)}
              placeholder="选择规模"
              style={{ width: 160 }}
              size="small"
              maxTagCount={1}
            >
              {customerSizes.map(size => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>

        {/* CSM负责人 */}
        <Col>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>CSM负责人</span>
            <Select
              mode="multiple"
              value={filters.csmOwners}
              onChange={(value) => handleFilterChange('csmOwners', value)}
              placeholder="选择CSM"
              style={{ width: 140 }}
              size="small"
              maxTagCount={1}
            >
              {csmOwners.map(csm => (
                <Option key={csm} value={csm}>
                  {csm}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>

        {/* 地区 */}
        <Col>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>地区</span>
            <Select
              mode="multiple"
              value={filters.regions}
              onChange={(value) => handleFilterChange('regions', value)}
              placeholder="选择地区"
              style={{ width: 120 }}
              size="small"
              maxTagCount={1}
            >
              {regions.map(region => (
                <Option key={region} value={region}>
                  {region}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>

        {/* 是否渠道客户 */}
        <Col>
          <Space direction="vertical" size={4}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>渠道客户</span>
            <Select
              value={filters.isChannelCustomer}
              onChange={(value) => handleFilterChange('isChannelCustomer', value)}
              placeholder="全部"
              style={{ width: 100 }}
              size="small"
              allowClear
            >
              <Option value={true}>是</Option>
              <Option value={false}>否</Option>
            </Select>
          </Space>
        </Col>

        {/* 搜索 */}
        <Col flex="auto">
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>搜索</span>
            <Input
              value={filters.searchText}
              onChange={(e) => handleFilterChange('searchText', e.target.value)}
              placeholder="客户名称/ID"
              prefix={<SearchOutlined />}
              size="small"
              style={{ minWidth: 200 }}
            />
          </Space>
        </Col>

            {/* 操作按钮 */}
            <Col>
              <Space>
                <Tooltip title="保存当前筛选条件为视图">
                  <Button
                    type="text"
                    icon={<SaveOutlined />}
                    onClick={onSaveView}
                    size="small"
                  >
                    保存视图
                  </Button>
                </Tooltip>
                <Tooltip title="导出当前筛选结果">
                  <Button
                    type="text"
                    icon={<ExportOutlined />}
                    onClick={onExport}
                    size="small"
                  >
                    导出
                  </Button>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default GlobalFilters;