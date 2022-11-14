// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      data: [
        {
          key: 96,
          disabled: true,
          href: 'https://umijs.org/',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
          name: '孟强',
          owner: 'Miller',
          desc: '放器维格其光内认思从种象解养直太。',
          callNo: 88,
          status: 86,
          updatedAt: 'y&O738T',
          createdAt: 'd^UcWR',
          progress: 65,
        },
        {
          key: 99,
          disabled: true,
          href: 'https://procomponents.ant.design/',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          name: '邓丽',
          owner: 'Martin',
          desc: '完集品群六明技问道情正二律具论列选。',
          callNo: 64,
          status: 81,
          updatedAt: '23#x!',
          createdAt: 'Nd6)72A',
          progress: 99,
        },
        {
          key: 79,
          disabled: true,
          href: 'https://umijs.org/',
          avatar: 'https://avatars1.githubusercontent.com/u/8186664?s=40&v=4',
          name: '史明',
          owner: 'Perez',
          desc: '界团治开有做证文传里小火电质离。',
          callNo: 98,
          status: 99,
          updatedAt: '!LfAmP',
          createdAt: 'vfc3V',
          progress: 85,
        },
        {
          key: 68,
          disabled: true,
          href: 'https://umijs.org/',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          name: '薛静',
          owner: 'Lee',
          desc: '养眼消外及取积情四战府地压。',
          callNo: 100,
          status: 97,
          updatedAt: '2Ie2RVz',
          createdAt: 'eSaa5x',
          progress: 72,
        },
        {
          key: 84,
          disabled: true,
          href: 'https://umijs.org/',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          name: '万秀英',
          owner: 'Davis',
          desc: '面信六备验以人快计深条决用民花收。',
          callNo: 78,
          status: 61,
          updatedAt: 'Gyp&',
          createdAt: 'f&)',
          progress: 99,
        },
      ],
      total: 75,
      success: true,
    });
  },
};