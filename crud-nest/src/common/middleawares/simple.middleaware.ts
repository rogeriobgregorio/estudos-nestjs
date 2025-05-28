import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware called');

    return res.status(404).send({
      message: 'This is a simple middleware response',
    });
  }
}
