import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: {
        id: 1834198,
        name: 'George',
        password: '123456',
        email: 'Betty@testmail.com',
        phone: '006-43740336-678',
        status: 1,
        role: 0,
        create_time: '2009-06-17T18:17:57.000Z',
        update_time: '1995-05-21T12:17:10.000Z',
        last_login_time: '2023-01-13T03:06:38.672Z',
        ip: '169.163.168.40',
      },
      errorCode: '',
      errorMessage: '',
      showType: 0,
      traceId: '',
      host: '',
    });
  },
  // GET POST 可省略
  'GET /api/user': {
    total: 4,
    success: true,
    data: [
      {
        id: '2135544',
        name: 'cn',
        email: '465465@gmail.com',
        phone: '1597866775654',
        role: 'student',
        status: '1',
      },
      {
        id: '2076465',
        name: 'laobai',
        email: '465465@gmail.com',
        phone: '1597866775654',
        role: 'student',
        status: '0',
      },
      {
        id: '1134543',
        name: 'John Brown',
        email: '465465@gmail.com',
        phone: '1597866775654',
        role: 'student',
        status: '0',
      },
      {
        id: '1134543',
        name: 'John Brown',
        email: '465465@gmail.com',
        phone: '1597866775654',
        role: 'student',
        status: '1',
      },
    ],
  },
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, id, type } = req.body;
    await waitTime(2000);
    if (password === 'admin' && id === 'admin') {
      res.send({
        success: true,
        status: 'ok',
        code: 0,
        msg: '成功',
        data: {
          id: '000001',
          name: 'lucas',
          email: 'admin@gmail.com',
          phone: '178xxxyyyy',
          role: 0,
          status: 1,
          token:
            'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZTllMDYwNS0xMTNkLTRmMjQtODc3OC0zZGY0Y2EzNTBmOTgiLCJpZCI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJpc3N1ZWRBdCI6IjIwMjItMTEtMzBUMTg6MjY6MjAiLCJuYmYiOjE2Njk4MDM5ODAsImV4cCI6MTY2OTgwNDA0MCwiaXNzIjoiU2ltcGxlT2ouYWRtaW4iLCJhdWQiOiJhZG1pbiJ9.-CgHSkvEzd6LQ_XEppqHlyn0-9646vMBvMDQFdAz-cs',
          ip: '111.187.106.17',
        },
      });
      return;
    }
    if (password === 'user' && id === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET /api/login/outLogin': (req: Request, res: Response) => {
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },

  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,

  'POST /api/user': (req: Request, res: Response) => {
    res.status(200).send({
      res: req.body,
    });
  },
};
