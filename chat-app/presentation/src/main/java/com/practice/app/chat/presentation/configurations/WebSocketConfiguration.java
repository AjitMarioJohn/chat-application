package com.practice.app.chat.presentation.configurations;

import com.practice.app.chat.presentation.handlers.ChatHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@Slf4j
public class WebSocketConfiguration implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        log.debug("adding websocket handler");
        registry.addHandler(new ChatHandler(), "/chat").setAllowedOrigins("*");
    }
}
