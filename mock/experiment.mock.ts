import type { Request, Response } from 'express';
export default {
  '/api/experiment': (req: Request, res: Response) => {
    // console.log(req.query);
    const experimentList = new Array();
    for (let i = 1; i < 55; i++) {
      experimentList.push({
        id: i,
        title: `实验${i}`,
        // desciption: '...',
        startTime: Date.now() - 10000000000,
        endTime: Date.now() + (i % 5 === 0 ? 1000000000 + i * 1000 : -1000000000),
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
  '/api/experiment/:id': (req: Request, res: Response) => {
    console.log(req.params);
    res.send({
      success: true,
      data: {
        title: `标题${req.params.id}`,
        description: `<p>内容${req.params.id}</p><p><strong>hdghgfhf</strong></p><p><strong><span style="color:#8e44ad">hgfgfhgfhgfhgf</span></strong></p><p><strong><span style="color:#8e44ad"><em>gdfgg</em></span></strong></p><ul><li><strong><span style="color:#8e44ad"><em>hgf</em></span></strong></li><li><strong><span style="color:#8e44ad"><em>5554</em></span></strong></li><li><strong><span style="color:#8e44ad"><em><u><span style="text-decoration:line-through">trgdfgdfd</span></u></em></span></strong></li></ul>`,
      },
    });
  },
  'POST /api/experiment/': (req: Request, res: Response) => {
    console.log(req.params);
    res.send({
      success: true,
      errorMessage: '',
    });
  },
  'GET /api/experiment/submit/:id': (req: Request, res: Response) => {
    console.log(req.params);
    const experimentSubmitList = new Array();
    for (let i = 1; i < 55; i++) {
      experimentSubmitList.push({
        studentId: i,
        studentName: `学生${i}`,
        deadline: Date.now() + 1000000000,
        firstSubmitTime: Date.now(),
        score: '',
        lastSubmitTime: i % 6 === 0 ? Date.now() + 100000000 : null,
      });
    }
    res.send({
      success: true,
      data: {
        list: experimentSubmitList,
        total: experimentSubmitList.length,
        current: 1,
        pageSize: 10,
      },
      errorMessage: '',
    });
  },
};
