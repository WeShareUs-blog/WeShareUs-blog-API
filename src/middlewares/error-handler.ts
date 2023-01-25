import { Context } from 'koa';
import { Boom } from '@hapi/boom';

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err: any) {
    const customError = {
      statusCode: 500,
      error: '',
      developerErrorMessage: '',
      clientErrorMessage: '',
    };
    if (err instanceof Boom) {
      customError.statusCode = err.output.statusCode;
      customError.clientErrorMessage = err.data.errorMessage;
      customError.developerErrorMessage = err.output.payload.message;
      customError.error = err.output.payload.error;
    }

    ctx.status = customError.statusCode;
    ctx.body = {
      errorMessage: customError.clientErrorMessage || 'The server has an unexpected error.',
    };
  }
};
