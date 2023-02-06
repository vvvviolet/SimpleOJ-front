// @ts-ignore
import type { Request, Response } from 'express';

export default {
  'POST /api/login/account': (req: Request, res: Response) => {
    res
      .status(200)
      .send({ status: 'success', type: 11, currentAuthority: 'user', token: '2054394' });
  },
};
