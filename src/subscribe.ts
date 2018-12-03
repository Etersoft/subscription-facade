import { Request, Response } from 'express';
import axios from 'axios';


export function subscribe (backend: string, fixedMailingId?: number) {
  return async function (req: Request, res: Response) {
    const code = req.query.code;
    const email = req.query.email;
    const mailingId = fixedMailingId || req.query.mailingId;

    const url = `${backend}/mailings/${mailingId}/subscribe`;
    const { status } = await axios.post(url, JSON.stringify({ code, email }), {
      validateStatus: () => true
    });

    res.render('subscribe', {
      email,
      subscribeSuccess: status === 200
    });
  };
}
