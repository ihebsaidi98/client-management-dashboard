package tn.esprit.ihebsaidi.Configuration;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class AspectExam {

    @After(" execution(* tn.esprit.ihebsaidi.Services.*.add*(..)) ")
    public void logMethodExit(JoinPoint joinPoint) {
        log.info("Successfuly Added");
    }
}