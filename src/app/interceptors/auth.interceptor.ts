import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const sessionId = localStorage.getItem('session_id');

  if (sessionId) {
    const clonedReq = req.clone({
      setParams: {
        session_id: sessionId,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
