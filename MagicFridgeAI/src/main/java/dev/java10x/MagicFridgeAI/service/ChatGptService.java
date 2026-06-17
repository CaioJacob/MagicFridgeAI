package dev.java10x.MagicFridgeAI.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ChatGptService {

    private final WebClient webClient;
    private String apiKey = System.getenv("API_KEY_OPENAI");

    public ChatGptService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> generateRecipe() {
        String prompt = "Now you are a chef, and you will suggest recipes based on the ingredients I provide here:";

    }

}
