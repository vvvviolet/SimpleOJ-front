import Footer from '@/components/Footer';
import { login } from '@/services/SimpleOJ/login';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
import { register } from '@/services/SimpleOJ/user';

type LoginType = 'phone' | 'account' | 'reset';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

function handleAdd(value: Entity.User) {
  return true;
}

const Login: React.FC = () => {
  const [createAddModalVisible, handleAddModalVisible] = useState<boolean>(false);
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loginType, setLoginType] = useState<LoginType>('account');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log('userInfo', userInfo);
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const response = await login({ ...values });
      if (response.success === true) {
        const data = response.data;
        localStorage.setItem('token', data.token ? data.token : '');
        message.success('登录成功');
        await fetchUserInfo();
        console.log('history', history);
        if (!history) return;
        const { query } = history.location;
        console.log('query', query);
        console.log('history', history.location);
        const { redirect } = query as { redirect: string };
        history.push('/');
        return;
      }

      // console.log(initialState?.currentUser);
      // setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试';
      message.error(defaultLoginFailureMessage);
    }
  };
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);

  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="SimpleOJ"
          subTitle="Keep moving"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'登录'} />
            <Tabs.TabPane key={'reset'} tab={'重置密码'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="id"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="学工号"
                rules={[
                  {
                    required: true,
                    message: '请输入学/工号',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              />
            </>
          )}

          {loginType === 'reset' && (
            <>
              <ProFormText
                name="oldid"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="学工号"
                rules={[
                  {
                    required: true,
                    message: '请输入学工号',
                  },
                ]}
              />
              <ProFormText.Password
                name="oldpassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              />
              <ProFormText.Password
                name="newpassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="新密码"
                rules={[
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            {loginType === 'account' ? (
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
            ) : (
              ''
            )}
            <a
              style={{
                marginBottom: 24,
                float: 'right',
              }}
              onClick={() => {
                handleAddModalVisible(true);
              }}
            >
              注册
            </a>
          </div>
          <ModalForm
            title="注册"
            width="800px"
            visible={createAddModalVisible}
            onVisibleChange={handleAddModalVisible}
            onFinish={async (value) => {
              const success = await handleAdd(value as API.User);
              if (success) {
                handleAddModalVisible(false);
              }
            }}
          >
            <ProForm<{
              id: string;
              name: string;
              password: string;
              phone?: string;
              email?: string;
            }>
              style={{ marginLeft: 220 }}
              onFinish={async (values) => {
                console.log(values);
                const msg = await register(values);
                console.log(msg);
                if (msg.success === true) {
                  message.success('注册成功');
                } else {
                  message.error('注册失败');
                }
              }}
              params={{}}
            >
              <ProFormText
                width="md"
                name="id"
                label="学工号"
                tooltip="最长为 10 位"
                placeholder="请输入名称"
              />
              <ProFormText width="md" name="name" label="姓名" placeholder="请输入名称" />
              <ProFormText.Password
                width="md"
                name="password"
                label="密码"
                placeholder="请输入密码"
              />
              <ProFormText name="phone" width="md" label="手机号" placeholder="请输入手机号" />
              <ProFormText name="email" width="md" label="邮箱" placeholder="请输入邮箱" />
            </ProForm>
          </ModalForm>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
