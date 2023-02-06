import type { Request, Response } from 'express';
export default {
  'GET /api/discuss': (req: Request, res: Response) => {
    const cur = Number(req.query.current === undefined ? 1 : req.query.current);
    const size = Number(req.query.pageSize === undefined ? 10 : req.query.pageSize);

    const dataList = Array.from({ length: 103 }).map((_, i) => ({
      id: i + 1,
      title: `标题${i + 1}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description: '描述',
      content: '内容',
    }));
    res.send({
      success: true,
      data: {
        list: dataList,
        total: 103,
        current: cur,
        pageSize: size,
      },
    });
  },
  'POST /api/discuss': (req: Request, res: Response) => {
    console.log(req.body);
    res.send({
      success: true,
    });
  },
};
