import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();

    if (!response.on) return next.handle();

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${request?.method} ${request?.url} ${statusCode} ${contentLength} - ${request?.userAgent} ${request?.ip}`,
      );
    });

    return next.handle();
  }
}
