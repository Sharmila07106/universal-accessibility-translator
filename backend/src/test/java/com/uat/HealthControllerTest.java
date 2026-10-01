package com.uat;

import com.uat.config.HealthCheckService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HealthCheckService healthCheckService;

    @Test
    void healthEndpointReturnsUpWhenAllServicesUp() throws Exception {
        when(healthCheckService.isDatabaseUp()).thenReturn(true);
        when(healthCheckService.isRedisUp()).thenReturn(true);

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("uat-backend"))
                .andExpect(jsonPath("$.components.database").value("UP"))
                .andExpect(jsonPath("$.components.redis").value("UP"));
    }

    @Test
    void healthEndpointReturnsDegradedWhenDatabaseDown() throws Exception {
        when(healthCheckService.isDatabaseUp()).thenReturn(false);
        when(healthCheckService.isRedisUp()).thenReturn(true);

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DEGRADED"))
                .andExpect(jsonPath("$.components.database").value("DOWN"))
                .andExpect(jsonPath("$.components.redis").value("UP"));
    }

    @Test
    void healthEndpointReturnsDegradedWhenRedisDown() throws Exception {
        when(healthCheckService.isDatabaseUp()).thenReturn(true);
        when(healthCheckService.isRedisUp()).thenReturn(false);

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DEGRADED"))
                .andExpect(jsonPath("$.components.database").value("UP"))
                .andExpect(jsonPath("$.components.redis").value("DOWN"));
    }
}
