package com.practice.app.chat.presentation.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.practice.app.chat.commons.models.ChatMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.SmartLifecycle;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
public class ChatHandler extends TextWebSocketHandler implements SmartLifecycle {
    private final Set<WebSocketSession> sessions;
    private final ObjectMapper objectMapper;
    private boolean running = false;

    public ChatHandler() {
        sessions = new CopyOnWriteArraySet<>();
        objectMapper = new ObjectMapper();
        // Register JavaTimeModule for LocalDateTime support
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.trace("afterConnectionEstablished :: establishing connection with : {}", session.getRemoteAddress());
        sessions.add(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.trace("handleTextMessage :: payload : {}", payload);

        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        log.debug("handleTextMessage :: chatMessage : {}", chatMessage);
        for (WebSocketSession webSocketSession : sessions) {
            String responseJson = objectMapper.writeValueAsString(chatMessage);
            log.trace("handleTextMessage :: responseJson : {}", responseJson);
            webSocketSession.sendMessage(new TextMessage(responseJson));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.trace("afterConnectionClosed :: connection : {} is closed", session.getRemoteAddress());
        sessions.remove(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    @Override
    public void start() {
        running = true;
    }

    @Override
    public void stop() {
        running = false;
        log.debug("stop :: Shutting down gracefully... Closing WebSocket connections.");
        for (WebSocketSession session : sessions) {
            try {
                session.close();
            } catch (Exception e) {
                log.error("Failed to close WebSocket session: ", e);
            }
        }
    }

    @Override
    public boolean isRunning() {
        return running;
    }

//    @PreDestroy
//    public void shutdown() {
//        log.debug("shutdown :: Shutting down gracefully... Closing WebSocket connections.");
//        for (WebSocketSession session : sessions) {
//            try {
//                session.close();
//            } catch (Exception e) {
//                log.error("Failed to close WebSocket session: ", e);
//            }
//        }
//    }

}
