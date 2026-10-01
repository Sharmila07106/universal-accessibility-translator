package com.uat.config;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HealthCheckServiceTest {

    @Mock
    private DataSource dataSource;

    @Mock
    private RedisConnectionFactory redisConnectionFactory;

    @Mock
    private Connection connection;

    @Mock
    private Statement statement;

    @Mock
    private RedisConnection redisConnection;

    @InjectMocks
    private HealthCheckService healthCheckService;

    @Test
    void isDatabaseUp_ReturnsTrue() throws Exception {
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.createStatement()).thenReturn(statement);
        when(statement.execute("SELECT 1")).thenReturn(true);

        assertTrue(healthCheckService.isDatabaseUp());
    }

    @Test
    void isDatabaseUp_ReturnsFalse_OnException() throws Exception {
        when(dataSource.getConnection()).thenThrow(new RuntimeException("DB down"));

        assertFalse(healthCheckService.isDatabaseUp());
    }

    @Test
    void isRedisUp_ReturnsTrue() {
        when(redisConnectionFactory.getConnection()).thenReturn(redisConnection);
        when(redisConnection.ping()).thenReturn("PONG");

        assertTrue(healthCheckService.isRedisUp());
    }

    @Test
    void isRedisUp_ReturnsFalse_OnException() {
        when(redisConnectionFactory.getConnection()).thenThrow(new RuntimeException("Redis down"));

        assertFalse(healthCheckService.isRedisUp());
    }
}
