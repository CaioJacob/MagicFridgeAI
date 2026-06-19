# 🧊 MagicFridge AI ✨

![Java](https://img.shields.io/badge/Java-24-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-Vanilla-E34F26?style=for-the-badge&logo=html5&logoColor=white)

MagicFridge AI is an intelligent, full-stack web application designed to reduce food waste and inspire culinary creativity. By keeping track of the ingredients available in your virtual fridge, the application leverages the power of Artificial Intelligence (OpenAI) to generate unique, customized recipes based strictly on what you currently have on hand.

## 🌟 Key Features

* **Inventory Management**: Full CRUD (Create, Read, Update, Delete) capabilities to manage your kitchen inventory, including expiration dates and quantities.
* **AI Recipe Generation**: Dynamic integration with OpenAI's API. The system intelligently parses your available ingredients and queries the LLM to invent a practical and delicious recipe.
* **Modern Asynchronous Frontend**: A sleek, responsive User Interface built with Vanilla JavaScript, featuring Glassmorphism aesthetics, dark mode design, and a real-time typewriter effect for AI responses.
* **Automated Database Migrations**: Uses Flyway to automatically construct and seed the initial H2 in-memory database upon application startup.

## 🛠️ Technology Stack

### Backend
* **Language**: Java 24
* **Framework**: Spring Boot 4.1.0
* **Data Access**: Spring Data JPA / Hibernate
* **Database**: H2 Database (In-Memory)
* **Migrations**: Flyway
* **Web Client**: Spring WebFlux (for asynchronous REST calls to OpenAI)

### Frontend
* **Core**: HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Styling**: Custom CSS with Glassmorphism, CSS Grid, and Flexbox

## ⚙️ Architecture & Design Patterns

This project follows a standard layered architectural pattern:
1. **Controller Layer**: Handles HTTP requests and routes (`FoodItemController`, `RecipeController`).
2. **Service Layer**: Encapsulates business logic and external API integrations (`FoodItemService`, `ChatGptService`).
3. **Repository Layer**: Manages database persistence via Spring Data JPA interfaces.
4. **Client Layer**: The frontend interacts with the backend asynchronously using the `Fetch API`, ensuring a seamless single-page application (SPA) experience without full page reloads.

## 🚀 Getting Started

### Prerequisites
* **Java Development Kit (JDK)** 24 or higher
* **Maven** (or use the provided Maven Wrapper)
* **OpenAI API Key**: You must have an active API key from OpenAI to use the recipe generation feature.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CaioJacob/MagicFridgeAI.git
   cd MagicFridgeAI
   ```

2. **Configure Environment Variables:**
   The application requires your OpenAI API key to be passed as an environment variable to ensure security and prevent hardcoding sensitive credentials.
   
   * **Windows (Command Prompt):**
     ```cmd
     set API_KEY_OPENAI=your_api_key_here
     ```
   * **Windows (PowerShell):**
     ```powershell
     $env:API_KEY_OPENAI="your_api_key_here"
     ```
   * **Linux/Mac:**
     ```bash
     export API_KEY_OPENAI="your_api_key_here"
     ```

3. **Build and Run:**
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Access the Application:**
   Open your web browser and navigate to:
   `http://localhost:8080/`

## 💡 Usage

1. Open the application in your browser. The Flyway migration will automatically seed your fridge with some default ingredients (e.g., Flour, Eggs, Milk, Strawberries).
2. Use the "What's in the fridge?" form to add new ingredients to your inventory.
3. Click the "Remove" button to delete items you no longer have.
4. Click the **"✨ Generate Magic Recipe"** button. The application will collect your current ingredients, send them securely to the OpenAI API, and stream back a custom recipe tailored to your exact inventory.

---
*Developed by [Caio Jacob](https://github.com/CaioJacob)*
