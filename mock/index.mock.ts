import type { Request, Response } from 'express';
export default {
  'GET /api/problem/info': (req: Request, res: Response) => {
    res.send({
      total: 5000,
    });
  },
  'GET /api/experiment/info': (req: Request, res: Response) => {
    res.send({
      total: 45,
    });
  },
};
