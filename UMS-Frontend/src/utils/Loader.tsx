import { Spin, Space } from 'antd';

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    }}>
      <Space size="middle">
        <Spin size="large" tip="Loading student data..." />
      </Space>
    </div>
  );
};

export default Loader;