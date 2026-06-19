package dev.java10x.MagicFridgeAI.service;

import dev.java10x.MagicFridgeAI.model.FoodItem;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatGptService {

    private final WebClient webClient;
    private String apiKey = System.getenv("API_KEY_OPENAI");

    public ChatGptService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> generateRecipe(List<FoodItem> fooditems) {

        String foods = fooditems.stream()
                .map(item -> String.format("%s (%s) - Quantity: %d, Expire Date: %s",
                                item.getName(), item.getCategory(), item.getQuantity(), item.getExpiryDate()))
                .collect(Collectors.joining("\n"));

        String prompt = "Based on my database, create a recipe using the following ingredients(Take into account the quantity (either in units or grams) and the expiration date, prioritizing ingredients that are closest to expiring.):\n " + foods;

        Map<String, Object> requestBody = Map.of("model", "gpt-5.5",
                "messages", List.of(
                        Map.of("role", "system", "content", "You are an assistant who creates recipes."),
                        Map.of("role", "user", "content", prompt)
                )

        );

        return webClient.post()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var choices = (List<Map<String, Object>>) response.get("choices");
                    if (choices != null && !choices.isEmpty()) {
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        return message.get("content").toString();
                    }
            return "No recipe found.";
        });

    }
}
