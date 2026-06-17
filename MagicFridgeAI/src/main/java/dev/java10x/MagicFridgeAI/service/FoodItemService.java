package dev.java10x.MagicFridgeAI.service;

import dev.java10x.MagicFridgeAI.model.FoodItem;
import dev.java10x.MagicFridgeAI.repository.FoodItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    private FoodItemRepository repository;

    public FoodItemService(FoodItemRepository repository) {
        this.repository = repository;
    }

    public FoodItem save(FoodItem foodItem){
        return repository.save(foodItem);
    }

    public List<FoodItem> list(){
        return repository.findAll();
    }

    public Optional<FoodItem> findById(Long id){
        return repository.findById(id);
    }

    public FoodItem update(FoodItem foodItem){
        return repository.save(foodItem);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
