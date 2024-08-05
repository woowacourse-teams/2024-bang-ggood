import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

function ErrorBoundaryForRouter() {
  const error = useRouteError();
  const navigate = useNavigate();

  const reset = () => {
    navigate('/', { replace: true });
  };

  if (isRouteErrorResponse(error)) {
    return <div onClick={reset}>라우터 에러: {error.statusText}</div>;
  }

  return <div onClick={reset}>일반 에러: </div>;
}

export default ErrorBoundaryForRouter;
