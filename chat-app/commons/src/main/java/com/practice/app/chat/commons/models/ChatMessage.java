package com.practice.app.chat.commons.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private String sender;
    private String content;
    private LocalDateTime timestamp;
}
