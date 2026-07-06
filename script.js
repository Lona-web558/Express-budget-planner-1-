// ==========================
// Select HTML Elements
// ==========================

const username = document.getElementById("username");
const budgetForm = document.getElementById("budgetForm");
const budgetList = document.getElementById("budgetList");
const total = document.getElementById("total");
const logoutBtn = document.getElementById("logoutBtn");

let budgets = [];

// ==========================
// Get Logged-in User
// ==========================

async function getCurrentUser() {

    const response = await fetch("/me");

    if (!response.ok) {

        window.location.href = "login.html";
        return;

    }

    const user = await response.json();

    username.textContent = user.username;

}

// ==========================
// Load Budgets
// ==========================

async function loadBudgets() {

    const response = await fetch("/api/budgets");

    if (!response.ok) {

        window.location.href = "login.html";
        return;

    }

    budgets = await response.json();

    displayBudgets();

}

// ==========================
// Display Budgets
// ==========================

function displayBudgets() {

    budgetList.innerHTML = "";

    let totalBudget = 0;

    budgets.forEach(budget => {

        totalBudget += budget.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${budget.category}</strong><br>
                $${budget.amount.toFixed(2)}
            </div>

            <button
                class="delete"
                onclick="deleteBudget(${budget.id})">
                Delete
            </button>
        `;

        budgetList.appendChild(li);

    });

    total.textContent = totalBudget.toFixed(2);

}

// ==========================
// Add Budget
// ==========================

budgetForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;

    const response = await fetch("/api/budgets", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            category,
            amount
        })

    });

    if (response.ok) {

        budgetForm.reset();

        loadBudgets();

    } else {

        const result = await response.json();

        alert(result.message);

    }

});

// ==========================
// Delete Budget
// ==========================

async function deleteBudget(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this budget?"
    );

    if (!confirmDelete) {
        return;
    }

    await fetch(`/api/budgets/${id}`, {

        method: "DELETE"

    });

    loadBudgets();

}

// ==========================
// Logout
// ==========================

logoutBtn.addEventListener("click", async () => {

    await fetch("/logout");

    window.location.href = "login.html";

});

// ==========================
// Initialize
// ==========================

async function initialize() {

    await getCurrentUser();

    await loadBudgets();

}

initialize();