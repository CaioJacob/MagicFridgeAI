// The base URL of your Spring Boot controller
const apiUrl = 'http://localhost:8080/food';

// Getting HTML elements
const foodForm = document.getElementById('food-form');
const foodList = document.getElementById('food-list');
const btnGenerate = document.getElementById('btn-generate');
const recipeContent = document.getElementById('recipe-content');

// Fetch inventory when the page loads
document.addEventListener('DOMContentLoaded', fetchFoodItems);

// ==========================================
// 1. FETCH FOOD INVENTORY (GET)
// ==========================================
async function fetchFoodItems() {
    try {
        const response = await fetch(apiUrl);
        const foods = await response.json();

        foodList.innerHTML = ''; // Clear current list

        // Show empty message if fridge is empty
        if (foods.length === 0) {
            foodList.innerHTML = '<li class="empty-message">Your fridge is empty...</li>';
            return;
        }

        // Populate list with items
        foods.forEach(food => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${food.name}</strong> 
                    <span style="color: var(--text-muted); font-size: 0.9em;">(${food.category})</span>
                </div>
                <div>
                    <span style="margin-right: 15px; font-weight: bold;">x${food.quantity}</span>
                    <button onclick="deleteFood(${food.id})" style="background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 0.3rem 0.6rem;">Remove</button>
                </div>
            `;
            foodList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching foods:", error);
    }
}

// ==========================================
// 2. ADD NEW FOOD (POST)
// ==========================================
foodForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload

    // Get values from inputs
    const name = document.getElementById('food-name').value;
    const category = document.getElementById('food-category').value;
    const quantity = document.getElementById('food-qty').value;

    // Provide a generic expiry date to satisfy the database constraint
    const expiryDate = "2026-12-31";

    const newFood = { name, category, quantity, expiryDate };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFood)
        });

        foodForm.reset(); // Clear input fields
        fetchFoodItems(); // Reload list to show the new item
    } catch (error) {
        console.error("Error saving food:", error);
    }
});

// ==========================================
// 3. REMOVE FOOD (DELETE)
// ==========================================
async function deleteFood(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchFoodItems(); // Reload list after deletion
    } catch (error) {
        console.error("Error deleting food:", error);
    }
}