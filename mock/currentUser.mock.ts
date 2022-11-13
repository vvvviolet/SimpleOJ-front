// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.status(200).send({
      name: '杨超',
      avatar: 'https://avatars0.githubusercontent.com/u/507615?s=40&v=4',
      userid: 'BAbddf2f-F2EE-6cfE-CD1D-8D8DF7C29681',
      email: 'v.qjmb@gfkjarwk.aq',
      signature: '度科非员带劳水片设没白极格族节省往月。',
      title: '价联增矿气历真界解多置集。',
      group: '服务技术部',
      tags: [
        { key: 1, label: '海纳百川' },
        { key: 2, label: '大咖' },
        { key: 3, label: '阳光少年' },
        { key: 4, label: '海纳百川' },
        { key: 5, label: '海纳百川' },
        { key: 6, label: '阳光少年' },
        { key: 7, label: '傻白甜' },
        { key: 8, label: '名望程序员' },
      ],
      notifyCount: 85,
      unreadCount: 83,
      country: '俄罗斯',
      access: '接调走论科叫容着状报周设。',
      geographic: {
        province: { label: '内蒙古自治区', key: 9 },
        city: { label: '香港岛', key: 10 },
      },
      address: '青海省 海东市 循化撒拉族自治县',
      phone: '11233625365',
    });
  },
};
