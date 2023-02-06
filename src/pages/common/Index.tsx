import {
  ModalForm,
  PageContainer,
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Card, Divider, List, message, Modal } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { Calendar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { addNotice, getNoticeList, removeNotice } from '@/services/SimpleOJ/notice';
function TimestampToDate(Timestamp: number) {
  const now = new Date(Timestamp);
  const [y, m, d] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  return (
    y +
    '-' +
    (m < 10 ? '0' + m : m) +
    '-' +
    (d < 10 ? '0' + d : d) +
    ' ' +
    now.toTimeString().substring(0, 8)
  );
}

const Notice: React.FC = (props) => {
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);
  const [noticeList, setNoticeList] = useState<API.NoticeItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNoticeList();
      setNoticeList(res.data.list);
    };
    fetchData();
  }, []);
  return (
    <>
      <ProCard
        title={
          <>
            公告
            {/* <a>更多</a> */}
          </>
        }
        extra={[
          <Button
            key="add"
            onClick={async () => {
              handleAddModalVisible(true);
              console.log(props.currentUser.data);
            }}
          >
            新增
          </Button>,
        ]}
      >
        <Modal
          title="发布公告"
          width="800px"
          open={addModalVisible}
          onCancel={() => handleAddModalVisible(false)}
          footer={null}
        >
          <ProForm<{
            title: string;
            content: string;
            createTime: string;
            publisher?: string;
          }>
            style={{ marginLeft: 220 }}
            onFinish={async (values) => {
              console.log(values);
              const msg = await addNotice({
                title: values.title,
                content: values.content,
                // publishDate: Date.now(),
                publishDate: new Date(),
                publisherId: Number(`${props.currentUser.data.id}`),
                publisher: `${props.currentUser.data.name}`,
              });
              if (msg.success === true) {
                message.success('发布成功');
                const fetchData = async () => {
                  const res = await getNoticeList();
                  setNoticeList(res.data.list);
                };
                fetchData();
                handleAddModalVisible(false);
              } else {
                message.error('发布失败');
              }
            }}
          >
            <ProFormText
              name="title"
              width="md"
              label="标题"
              placeholder="请输入标题"
              rules={[
                {
                  required: true,
                  message: '标题不能为空',
                },
              ]}
            />
            <ProFormTextArea
              name="content"
              width="md"
              label="内容"
              placeholder="请输入内容"
              rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}
            />
          </ProForm>
        </Modal>
        <List
          bordered
          dataSource={noticeList
            .sort((x: API.NoticeItem, y: API.NoticeItem) => {
              return x.publishDate < y.publishDate ? 1 : -1;
            })
            .slice(0, 5)}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <text key="date"> {TimestampToDate(new Date(item.publishDate).getTime())}</text>,
                <a
                  key="remove"
                  onClick={async () => {
                    console.log(item.id);
                    const msg = await removeNotice(item.id);
                    if (msg.success === true) {
                      message.success('删除成功');
                      const fetchData = async () => {
                        const res = await getNoticeList();
                        setNoticeList(res.data.list);
                      };
                      fetchData();
                    } else {
                      message.error('删除失败');
                    }
                  }}
                >
                  删除
                </a>,
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    <a
                      onClick={() => {
                        Modal.info({
                          title: item.title,
                          content: <>{item.content}</>,
                        });
                      }}
                    >
                      {item.title}
                    </a>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </ProCard>
    </>
  );
};
const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const [responsive, setResponsive] = useState(false);
  const currentUser = initialState?.currentUser;
  const courseData = [
    {
      title: '课程序号',
      description: '10071707',
    },
    {
      title: '课程名称',
      description: '高级语言程序设计实验',
    },
    {
      title: '上课时间',
      description: '星期三 1-2节 [1-4],星期三 1-2节 [5-17]',
    },
    {
      title: '上课地点',
      description: '学校机房(四平路),文106,四平排考机房-4',
    },
    {
      title: '教学大纲',
      description: '',
    },
  ];

  return (
    <PageContainer>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title=" 基本信息"
          extra={TimestampToDate(Date.now()).slice(0, 10)}
          split={responsive ? 'horizontal' : 'vertical'}
          // bordered
          headerBordered
          collapsible
        >
          <ProCard title="个人信息" colSpan="30%">
            <div style={{ height: 220 }}>
              <div>
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="180"
                  height="150"
                >
                  <path
                    d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M178.4 688.8c111.2-44 222.4-66.4 333.6-66.4s222.4 22.4 333.6 66.4c30.4 12 50.4 41.6 50.4 74.4 0 28.8-24 52.8-52.8 52.8H180.8c-28.8 0-52.8-24-52.8-52.8 0-32.8 20-62.4 50.4-74.4z"
                    fill="#D6F1FF"
                  />
                  <path
                    d="M843.2 830.4H180.8c-36.8 0-67.2-30.4-67.2-67.2 0-38.4 24-73.6 59.2-87.2C286.4 631.2 400 608 512 608s225.6 22.4 338.4 67.2c35.2 14.4 59.2 48.8 59.2 87.2 0.8 37.6-29.6 68-66.4 68zM512 636.8c-108 0-218.4 22.4-328.8 65.6-24.8 9.6-40.8 33.6-40.8 60.8 0 20.8 17.6 38.4 38.4 38.4h662.4c20.8 0 38.4-17.6 38.4-38.4 0-27.2-16.8-51.2-41.6-61.6-109.6-43.2-220-64.8-328-64.8z"
                    fill="#333333"
                  />
                  <path
                    d="M178.4 688.8c111.2-44 222.4-66.4 333.6-66.4s222.4 22.4 333.6 66.4c30.4 12 50.4 41.6 50.4 74.4 0 28.8-24 52.8-52.8 52.8H180.8c-28.8 0-52.8-24-52.8-52.8 0-32.8 20-62.4 50.4-74.4z"
                    fill="#0072FF"
                  />
                  <path
                    d="M843.2 830.4H180.8c-36.8 0-67.2-30.4-67.2-67.2 0-38.4 24-73.6 59.2-87.2C286.4 631.2 400 608 512 608s225.6 22.4 338.4 67.2c35.2 14.4 59.2 48.8 59.2 87.2 0.8 37.6-29.6 68-66.4 68zM512 636.8c-108 0-218.4 22.4-328.8 65.6-24.8 9.6-40.8 33.6-40.8 60.8 0 20.8 17.6 38.4 38.4 38.4h662.4c20.8 0 38.4-17.6 38.4-38.4 0-27.2-16.8-51.2-41.6-61.6-109.6-43.2-220-64.8-328-64.8z"
                    fill="#333333"
                  />
                  <path
                    d="M664.8 429.6l-4.8 48.8c-4 38.4-24 72-53.6 93.6-11.2 8-20.8 19.2-24.8 32.8-1.6 6.4-2.4 12-2.4 18.4 0 24.8 15.2 49.6 44.8 74.4H400.8c29.6-23.2 44.8-47.2 44.8-72.8 0-6.4-0.8-13.6-3.2-20-4-13.6-13.6-24.8-24.8-32.8-29.6-21.6-49.6-55.2-53.6-93.6l-4.8-48.8h-4.8c-19.2 0-35.2-16-35.2-35.2 0-18.4 14.4-33.6 32.8-35.2L344 280c-8.8-92.8 58.4-174.4 151.2-184H512c92.8 0 168 75.2 168 168 0 5.6 0 11.2-0.8 16.8l-8 79.2c18.4 1.6 32.8 16.8 32.8 35.2 0 19.2-16 35.2-35.2 35.2-1.6-0.8-2.4-0.8-4-0.8z"
                    fill="#FFDAC4"
                  />
                  <path
                    d="M662.4 712H360l32-24.8c26.4-20.8 39.2-40.8 39.2-61.6 0-5.6-0.8-11.2-2.4-15.2v-0.8c-2.4-9.6-9.6-18.4-19.2-25.6-33.6-24.8-55.2-62.4-59.2-104l-4-36.8c-23.2-4-41.6-24-41.6-48.8 0-20.8 12.8-38.4 32-45.6l-6.4-67.2c-9.6-100 64-188.8 164-199.2H512c100-0.8 182.4 81.6 182.4 181.6 0 5.6 0 12-0.8 18.4l-6.4 66.4c18.4 7.2 32 25.6 32 45.6 0 24-17.6 44-40.8 48.8l-4 36.8c-4 41.6-25.6 79.2-59.2 103.2-9.6 7.2-16.8 16-19.2 25.6-1.6 4.8-1.6 9.6-1.6 14.4 0 20 13.6 41.6 40 64l28 24.8z m-226.4-28.8h153.6c-16.8-20-24.8-40-24.8-60 0-7.2 0.8-14.4 3.2-21.6 5.6-20 20-33.6 30.4-40.8 27.2-19.2 44-50.4 48-84l6.4-61.6h12.8c1.6 0 4 0 6.4 0.8 10.4-0.8 19.2-10.4 19.2-20.8 0-11.2-8.8-20-20-20.8l-15.2-1.6 9.6-93.6c0.8-4.8 0.8-10.4 0.8-15.2 0-84.8-68.8-153.6-153.6-153.6h-16c-86.4 8.8-147.2 83.2-138.4 168L368 372l-14.4 1.6c-11.2 0.8-20 10.4-20 20.8 0 11.2 9.6 20.8 20.8 20.8h17.6l6.4 61.6c3.2 33.6 20.8 64 48 84 10.4 7.2 24 20 29.6 40 2.4 7.2 4 15.2 4 24.8 0 20-8 39.2-24 57.6z"
                    fill="#333333"
                  />
                  <path
                    d="M344.8 284.8L344 280c-8.8-92.8 58.4-174.4 151.2-184H512c92.8 0 168 75.2 168 168 0 5.6 0 11.2-0.8 16.8l-0.8 4.8h-23.2c-8.8 0-16-7.2-16-16s-7.2-16-16-16H397.6c-8.8 0-16 7.2-16 16s-7.2 16-16 16h-20.8v-0.8z"
                    fill="#333333"
                  />
                  <path
                    d="M690.4 300h-35.2c-16.8 0-30.4-13.6-30.4-30.4 0-0.8-0.8-1.6-1.6-1.6H397.6c-0.8 0-1.6 0.8-1.6 1.6 0 16.8-13.6 30.4-30.4 30.4h-35.2v-13.6l-0.8-4.8c-9.6-99.2 64-188.8 164-199.2H512c100-0.8 182.4 81.6 182.4 181.6 0 5.6 0 12-0.8 18.4l-3.2 17.6z m-292.8-60.8h225.6c16.8 0 30.4 13.6 30.4 30.4 0 0.8 0.8 1.6 1.6 1.6h10.4V264c0-84.8-68.8-153.6-153.6-153.6h-16C412.8 119.2 353.6 189.6 357.6 272h8c0.8 0 1.6-0.8 1.6-1.6 0-17.6 13.6-31.2 30.4-31.2z"
                    fill="#333333"
                  />
                  <path
                    d="M451.2 341.6c4.8 0 8.8 4 8.8 8.8v35.2c0 4.8-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8v-35.2c0-4.8 4-8.8 8.8-8.8z"
                    fill="#333333"
                  />
                  <path
                    d="M572.8 341.6c4.8 0 8.8 4 8.8 8.8v35.2c0 4.8-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8v-35.2c0-4.8 4-8.8 8.8-8.8z"
                    fill="#333333"
                  />
                  <path d="M259.2 800l169.6-159.2 84.8 44 88-43.2L767.2 800z" fill="#0072FF" />
                  <path d="M443.2 752.8L424 608l89.6 75.2z" fill="#D6F1FF" />
                  <path d="M585.6 752.8L604 608l-89.6 75.2z" fill="#D6F1FF" />
                </svg>
              </div>
              <Card>
                <Meta
                  title="姓名"
                  description={currentUser?.data.name ? currentUser?.data.name : '匿名'}
                />
                <Meta
                  title="学/工号"
                  description={currentUser?.data.id ? currentUser?.data.id : '000001'}
                />
                <Meta
                  title="上次登录IP"
                  description={currentUser?.data.ip ? currentUser?.data.ip : '0.0.0.0'}
                />
              </Card>
            </div>
          </ProCard>
          <ProCard title="课程信息">
            <List
              itemLayout="horizontal"
              dataSource={courseData}
              renderItem={(item, idx) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={
                      idx < 4 ? (
                        item.description
                      ) : (
                        <Button type="primary">
                          <a
                            download
                            href="http://roi69i2lx.hd-bkt.clouddn.com/%E6%95%99%E5%AD%A6%E5%A4%A7%E7%BA%B2.zip?e=1673746118&token=zxj5KCNaw-RtgKgU6CO2xSzpaaBqOP-_6p7KIgOU:eXrTSj_8v-kVP_3fcYfWIfHf_lw="
                          >
                            查看
                          </a>
                        </Button>
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </ProCard>
          <ProCard title="学期日历 - 当前是教学周第19周">
            <div style={{ height: 340 }}>
              <div className="site-calendar">
                <Calendar fullscreen={false} />
              </div>
            </div>
          </ProCard>
        </ProCard>
      </RcResizeObserver>

      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard.Group
          // headerBordered
          bordered
          title="数据"
          direction={responsive ? 'column' : 'row'}
          collapsible
        >
          <ProCard>
            <Statistic title="待提交实验" value={0} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="提交题目次数" value={13} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="通过题目数" value={93} suffix="/ 5678" />
          </ProCard>
        </ProCard.Group>
      </RcResizeObserver>
      <Notice currentUser={currentUser} />
    </PageContainer>
  );
};

export default Welcome;
