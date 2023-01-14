import type { Request, Response } from 'express';
export default {
  '/api/notice': (req: Request, res: Response) => {
    // console.log(req.query);
    const experimentList = new Array();
    for (let i = 1; i < 55; i++) {
      experimentList.push({
        id: i,
        title: `公告${i}`,
        content: '...',
        startTime: Date.now() + i * 100000000,
        endTime: Date.now() + 1000000000 + i * 1000,
        publishTime: Date.now(),
        publisher: 'cn',
      });
    }
    res.send({
      success: true,
      data: {
        list: experimentList,
        total: experimentList.length,
        current: req.query.current,
        pageSize: req.query.pageSize,
      },
      errorCode: '',
      errorMessage: '',
      showType: 0,
      traceId: '',
      host: '',
    });
  },
};
