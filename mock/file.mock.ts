import type { Request, Response } from 'express';

export default {
  'POST /api/file': (req: Request, res: Response) => {
    res.status(200).send('ok');
  },
  'GET /api/file': (req: Request, res: Response) => {
    res.status(200).send('ok');
  },
};
