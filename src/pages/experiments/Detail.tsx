import React, { useEffect, useState } from 'react';
import { Button, Divider, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useParams } from 'umi';
import { getExperimentDetail } from '@/services/SimpleOJ/experiment';
import { DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// const initCode = `#include<stdio.h>
// int main(){
//   printf("hello SimpleOJ!");
//   return 0;
// }`;

const Detail: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const params: { id?: string } | undefined = useParams();
  const [dataSoure, setDatasource] = useState({ title: '', description: '' });
  // const [code, setCode] = useState(initCode);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getExperimentDetail(params?.id);
      if (res.success === true) {
        setDatasource({ title: res.data.title, description: res.data.description });
        console.log(dataSoure);
      }
    };
    console.log(params);
    fetchData();
  }, []);
  return (
    <>
      {/* <PageContainer > */}
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title=""
          style={{ paddingLeft: '20px' }}
          extra={
            <>
              <Button
                style={{
                  float: 'left',
                }}
                onClick={() => history.back()}
              >
                返回
              </Button>
            </>
          }
          split={responsive ? 'horizontal' : 'vertical'}
          // bordered
          headerBordered
        >
          <Title id="intro">{dataSoure.title}</Title>
          <Paragraph>
            <div dangerouslySetInnerHTML={{ __html: dataSoure.description }} />
          </Paragraph>
        </ProCard>
        <ProCard>
          <a
            onClick={() => {
              alert('下载附件');
            }}
          >
            {' '}
            <DownloadOutlined />
            下载附件
          </a>
        </ProCard>
        <Divider />
        <ProCard>评论区</ProCard>
      </RcResizeObserver>
      {/* </PageContainer> */}
    </>
  );
};
export default Detail;
