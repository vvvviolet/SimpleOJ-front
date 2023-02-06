import React, { useState } from 'react';
import { Button, Divider, Typography } from 'antd';
import { PageContainer, ProCard, ProFormList } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

const { Title, Paragraph, Text } = Typography;

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

function onEditorChange(newValue: any) {
  console.log('change', newValue);
}

const Detail: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

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
          // style={{ padding: '10px' }}
          extra={
            <>
              <Button onClick={() => history.back()}>返回</Button>
            </>
          }
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          headerBordered
        >
          <ProCard colSpan="50%">
            <Title id="intro">10. 正则表达式匹配</Title>
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
                  <a href="/docs/resource/download">资料3</a>
                </li>
              </ul>
            </Paragraph>
          </ProCard>
          <ProCard
            wrap
            title="代码编辑"
            extra={
              <Button
                onClick={(e) => {
                  console.log(e.target);
                }}
              >
                提交
              </Button>
            }
          >
            <AceEditor
              placeholder="Placeholder Text"
              mode="c_cpp"
              theme="github"
              name="blah2"
              width="100%"
              // onLoad={this.onLoad}
              onChange={onEditorChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={false}
              value={`#include<stdio.h>
    int main(){
    printf("hello SimpleOJ!");
    return 0;
}
`}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
            <Divider />
            <ProCard
              onScroll={(e) => {
                console.log(e);
              }}
              extra={<>运行结果</>}
              bordered
              colSpan={24}
            >
              <pre className="language-bash">ok</pre>
            </ProCard>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
      {/* </PageContainer> */}
    </>
  );
};
export default Detail;
