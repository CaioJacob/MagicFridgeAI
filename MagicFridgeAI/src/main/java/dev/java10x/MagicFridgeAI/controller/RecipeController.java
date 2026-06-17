package dev.java10x.MagicFridgeAI.controller;

import dev.java10x.MagicFridgeAI.service.ChatGptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class RecipeController {

    private ChatGptService chatGptService;

    public RecipeController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @GetMapping
    public Mono<ResponseEntity<String>> generateRecipe(){
        return chatGptService.generateRecipe();

    }

}
