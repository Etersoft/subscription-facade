import { Request, Response } from 'express';
import axios from 'axios';
import { catchPromise } from './catchPromise';


export function subscribe (backend: string, fixedMailingId?: number) {
  return catchPromise(async function (req: Request, res: Response) {
    const code = req.query.code;
    const email = req.query.email;
    const mailingId = fixedMailingId || req.query.mailingId;

    const url = `${backend}/mailings/${mailingId}/subscribe`;
    const { data: { data }, status } = await axios.post(url, JSON.stringify({ code, email }), {
      validateStatus: () => true
    });
    const { text } = data;
    
    res.render('subscribe', {
      email,
      text,      
      subscribeSuccess: status === 200,
    });
  });
}
