// The base URL of your Spring Boot controller
const apiUrl = 'http://localhost:8080/food';

// Getting HTML elements
const foodForm = document.getElementById('food-form');
const foodList = document.getElementById('food-list');
const btnGenerate = document.getElementById('btn-generate');
const recipeContent = document.getElementById('recipe-content');

document.addEventListener('DOMContentLoaded', fetchFoodItems);

// ==========================================
// 1. FETCH FOOD INVENTORY (GET)
// ==========================================
async function fetchFoodItems() {
    try {
        const response = await fetch(apiUrl);
        const foods = await response.json();

        foodList.innerHTML = '';

        if (foods.length === 0) {
            foodList.innerHTML = '<li class="empty-message">Your fridge is empty...</li>';
            return;
        }

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
    e.preventDefault();

    const name = document.getElementById('food-name').value;
    const category = document.getElementById('food-category').value;
    const quantity = document.getElementById('food-qty').value;

    const expiryDate = "2026-12-31";

    const newFood = { name, category, quantity, expiryDate };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFood)
        });

        foodForm.reset();
        fetchFoodItems();
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
        fetchFoodItems();
    } catch (error) {
        console.error("Error deleting food:", error);
    }
}

// ==========================================
// 4. GENERATE RECIPE VIA AI (GET)
// ==========================================
btnGenerate.addEventListener('click', async () => {
    recipeContent.classList.remove('placeholder');
    recipeContent.innerHTML = '<em>Consulting the AI Chef... please wait 👨‍🍳✨</em>';
    btnGenerate.disabled = true;
    btnGenerate.style.opacity = '0.5';

    try {
        const response = await fetch('http://localhost:8080/generate');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipeText = await response.text();

        recipeContent.innerHTML = '';
        let i = 0;
        const speed = 15;

        function typeWriter() {
            if (i < recipeText.length) {
                if (recipeText.charAt(i) === '\n') {
                    recipeContent.innerHTML += '<br>';
                } else {
                    recipeContent.innerHTML += recipeText.charAt(i);
                }
                i++;
                setTimeout(typeWriter, speed);
            } else {
                btnGenerate.disabled = false;
                btnGenerate.style.opacity = '1';
            }
        }
        typeWriter();

    } catch (error) {
        console.error("Error generating recipe:", error);
        recipeContent.innerHTML = '<span style="color: #ef4444;">Oops! The chef is busy right now. Please check your console or try again.</span>';
        btnGenerate.disabled = false;
        btnGenerate.style.opacity = '1';
    }
});