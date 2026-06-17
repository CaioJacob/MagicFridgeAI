package dev.java10x.MagicFridgeAI.controller;

import dev.java10x.MagicFridgeAI.model.FoodItem;
import dev.java10x.MagicFridgeAI.service.FoodItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodItemController {

    private FoodItemService service;

    public FoodItemController(FoodItemService service) {
        this.service = service;
    }

    //POST
    @PostMapping
    public ResponseEntity<FoodItem> create(@RequestBody FoodItem fooditem){
        FoodItem saved = service.save(fooditem);
        return ResponseEntity.ok(saved);
    };

    //GET
    @GetMapping
    public ResponseEntity<List<FoodItem>> list(){
        List<FoodItem> list = service.list();
        return ResponseEntity.ok(list);
    }

    //UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> update(@RequestBody FoodItem foodItem, @PathVariable Long id){
        return service.findById(id)
        .map(existingItem -> {
            foodItem.setId(existingItem.getId());
            FoodItem updated = service.update(foodItem);
            return ResponseEntity.ok(updated);
        })
        .orElse(ResponseEntity.notFound().build());
    }

    //DELETE
    @DeleteMapping
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
