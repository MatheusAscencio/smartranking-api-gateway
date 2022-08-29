/* eslint-disable prettier/prettier */
import { ExceptionFilter, Logger, ArgumentsHost, HttpException, HttpStatus, Catch } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const req = ctx.getRequest()
        const res = ctx.getResponse();

        console.log(`excption: ${ JSON.stringify(exception) }`);

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        this.logger.error(`HttpStatus: ${ status } Error Message: ${ JSON.stringify(message) }`);

        res.status(status).json({
            timestamp: new Date().toISOString(),
            path: req.url,
            error: message
        });
    }

}