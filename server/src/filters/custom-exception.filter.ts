import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('CustomExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const msg = exception.getResponse();

    this.logger.debug(response);
    this.logger.debug(status);
    this.logger.debug(msg);

    response.status(status).json(msg);
  }
}
