// @ts-ignore
import type { Request, Response } from 'express';
import { parse } from 'url';
import moment from 'moment';

// 生成数据
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.ExperimentItem[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: `${index}`,
      name: `实验${index + 1}`,
      description:
        '2MX75WN92M01P4BUM2400J2SUQZHHILXMP8QY5P04QBLZX90Y8TLM964G7Z0K5PWJK6A1LEN29IDVWX73JJ7V32530V8GWIHCKST',
      status: '0',
      startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().format('YYYY-MM-DD 23:59:59'),
    });
  }
  // tableListDataSource.reverse();
  return tableListDataSource;
};
let tableListDataSource = genList(1, 20);

// 获取实验项目列表
function getExperiment(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  // const params = parse(realUrl, true).query as unknown as API.PageParams &
  //   API.ExperimentItem & {
  //     sorter: any;
  //     filter: any;
  //   };
  // console.log(params);
  const dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  // console.log(dataSource);

  res.status(200).send({
    success: true,
    status: 'ok',
    code: 0,
    msg: '成功',
    data: dataSource,
  });
}

function postExperiment(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;
  console.log(body);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: moment().format('YYYY-MM-DD'),
          createdAt: moment().format('YYYY-MM-DD'),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}
function removeExperiment(req: Request, res: Response, u: string, b: Request) {
  // console.log(req, res, u, b);
  res.status(200).send({});
}
export default {
  'GET /api/experiment': getExperiment,
  'POST /api/experiment': postExperiment,
  'DELETE /api/experiment': removeExperiment,
};
