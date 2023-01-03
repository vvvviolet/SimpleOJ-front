import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

const { Title, Paragraph, Text } = Typography;

// const initCode = `#include<stdio.h>
// int main(){
//   printf("hello SimpleOJ!");
//   return 0;
// }`;

const Detail: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  // const [code, setCode] = useState(initCode);

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
          <Title id="intro">8. 二叉树前序遍历</Title>
          <Paragraph>
            给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 <Text mark>&apos;.&apos;</Text>
             和 <Text mark>&apos;*&apos;</Text> 的正则表达式匹配。 &apos;.&apos;匹配任意单个字符
            &apos;*&apos; 匹配零个或多个前面的那一个元素
            所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
          </Paragraph>

          <Title level={3}>示例1</Title>
          <Paragraph>
            <Text code>
              输入：s = &quot;aa&quot;, p = &quot;a&quot; 输出：false 解释：&quot;a&quot; 无法匹配
              &quot;aa&quot; 整个字符串。
            </Text>
          </Paragraph>
          <Title level={3}>示例2</Title>
          <Paragraph>
            <Text code>
              输入：s = &quot;aa&quot;, p = &quot;a&quot; 输出：false 解释：&quot;a&quot; 无法匹配
              &quot;aa&quot; 整个字符串。
            </Text>
          </Paragraph>
          <Title level={3}>提示</Title>

          <Paragraph>
            <ul>
              <li>1 &lt;= s.length &lt;= 20</li>
              <li>1 &lt;= s.length &lt;= 20</li>
              <li>s 只包含从 a-z 的小写字母</li>
              <li>p 只包含从 a-z 的小写字母，以及字符 . 和 *。</li>
              <li>保证每次出现字符 * 时，前面都匹配到有效的字符</li>
            </ul>
          </Paragraph>
          <Title level={3}>参考资料</Title>
          <Paragraph>
            <ul>
              <li>
                <a href="/docs/spec/proximity">资料1</a>
              </li>
              <li>
                <a href="/docs/pattern/navigation">资料2</a>
              </li>
              <li>
                <a href="/docs/resource/download/pic.png">资料3</a>
              </li>
            </ul>
          </Paragraph>
        </ProCard>
      </RcResizeObserver>
      {/* </PageContainer> */}
    </>
  );
};
export default Detail;
