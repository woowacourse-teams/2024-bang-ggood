package com.bang_ggood.logging;

import com.bang_ggood.logging.dto.ErrorLog;
import com.bang_ggood.logging.dto.InfoLog;
import com.bang_ggood.logging.dto.WarnLog;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import java.util.Arrays;
import java.util.Optional;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @AfterReturning("execution(public * com.bang_ggood..*Service.*(..)))")
    public void loggingInfo(JoinPoint joinPoint) {
        if (RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes) {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String methodName = joinPoint.getSignature().getName();

            log.info(InfoLog.of(request, methodName).toString());
        }
    }

    @Before("execution(* com.bang_ggood.handler.GlobalExceptionHandler.*(..)) &&"
            + "!execution(* com.bang_ggood.handler.GlobalExceptionHandler.handleRuntimeException(..)))")
    public void loggingWarn(JoinPoint joinPoint) {
        Optional<Exception> exceptionOptional = Arrays.stream(joinPoint.getArgs())
                .filter(arg -> arg instanceof Exception)
                .map(arg -> (Exception) arg)
                .findFirst();

        if (exceptionOptional.isPresent() && RequestContextHolder.getRequestAttributes() != null) {
            Exception exception = exceptionOptional.get();
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

            log.warn(WarnLog.of(exception, request).toString());
        }
    }

    @Before("execution(* com.bang_ggood.handler.GlobalExceptionHandler.handleRuntimeException(..)))")
    public void loggingError(JoinPoint joinPoint) {
        Optional<Exception> exceptionOptional = Arrays.stream(joinPoint.getArgs())
                .filter(arg -> arg instanceof Exception)
                .map(arg -> (Exception) arg)
                .findFirst();

        if (exceptionOptional.isPresent() && RequestContextHolder.getRequestAttributes() != null) {
            Exception exception = exceptionOptional.get();
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

            log.error(ErrorLog.of(exception, request).toString());
        }
    }
}
