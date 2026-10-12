import { RequestHandler, Request, Response } from 'express';


type PromiseHandler = (req: Request, res: Response) => Promise<unknown>;

/**
 * Оборачивает express-обработчик, и, в случае возврата им Promise,
 * ловит ошибку и отвечает 500-ым кодом.
 */
export function catchPromise (handler: PromiseHandler): RequestHandler {
  return async function (req: Request, res: Response) {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('Request error: ', err);
      if (!res.headersSent) {
        res.status(500).type('text').send('Internal Server Error');
      }
    }
  };
}
