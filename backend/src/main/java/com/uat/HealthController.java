package com.uat;

import com.uat.config.HealthCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthCheckService healthCheckService;

    @Autowired
    public HealthController(HealthCheckService healthCheckService) {
        this.healthCheckService = healthCheckService;
    }

    @GetMapping
    public Map<String, Object> health() {
        boolean dbUp = healthCheckService.isDatabaseUp();
        boolean redisUp = healthCheckService.isRedisUp();

        String overallStatus = (dbUp && redisUp) ? "UP" : "DEGRADED";

        Map<String, String> components = new HashMap<>();
        components.put("database", dbUp ? "UP" : "DOWN");
        components.put("redis", redisUp ? "UP" : "DOWN");

        Map<String, Object> response = new HashMap<>();
        response.put("status", overallStatus);
        response.put("service", "uat-backend");
        response.put("timestamp", Instant.now().toString());
        response.put("components", components);

        return response;
    }
}
