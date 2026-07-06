const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const authenticate = require("./auth");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "budget-planner-secret",
        resave: false,
        saveUninitialized: false
    })
);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Data files
const USERS_FILE = path.join(__dirname, "users.json");
const BUDGETS_FILE = path.join(__dirname, "budgets.json");

// ---------------- Helper Functions ----------------

function readUsers() {
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readBudgets() {
    return JSON.parse(fs.readFileSync(BUDGETS_FILE));
}

function saveBudgets(budgets) {
    fs.writeFileSync(BUDGETS_FILE, JSON.stringify(budgets, null, 2));
}

// ---------------- Register ----------------

app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required."
        });
    }

    const users = readUsers();

    const exists = users.find(user => user.username === username);

    if (exists) {
        return res.status(400).json({
            message: "Username already exists."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        id: Date.now(),
        username,
        password: hashedPassword
    });

    saveUsers(users);

    res.json({
        message: "Registration successful."
    });

});

// ---------------- Login ----------------

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const users = readUsers();

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).json({
            message: "Invalid username or password."
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            message: "Invalid username or password."
        });
    }

    req.session.user = {
        id: user.id,
        username: user.username
    };

    res.json({
        message: "Login successful."
    });

});

// ---------------- Logout ----------------

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.json({
            message: "Logged out successfully."
        });

    });

});

// ---------------- Current User ----------------

app.get("/me", authenticate, (req, res) => {

    res.json(req.session.user);

});

// ---------------- Get Budgets ----------------

app.get("/api/budgets", authenticate, (req, res) => {

    const budgets = readBudgets();

    const userBudgets = budgets.filter(
        budget => budget.username === req.session.user.username
    );

    res.json(userBudgets);

});

// ---------------- Add Budget ----------------

app.post("/api/budgets", authenticate, (req, res) => {

    const { category, amount } = req.body;

    if (!category || !amount) {

        return res.status(400).json({
            message: "Category and amount are required."
        });

    }

    const budgets = readBudgets();

    budgets.push({

        id: Date.now(),

        username: req.session.user.username,

        category,

        amount: Number(amount)

    });

    saveBudgets(budgets);

    res.json({
        message: "Budget added successfully."
    });

});

// ---------------- Delete Budget ----------------

app.delete("/api/budgets/:id", authenticate, (req, res) => {

    const id = Number(req.params.id);

    let budgets = readBudgets();

    budgets = budgets.filter(budget => {

        if (budget.id !== id) return true;

        return budget.username !== req.session.user.username;

    });

    saveBudgets(budgets);

    res.json({
        message: "Budget deleted."
    });

});

// ---------------- Default Route ----------------

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "login.html"));

});

// ---------------- Start Server ----------------

app.listen(PORT, () => {

    console.log(`Budget Planner running at http://localhost:${PORT}`);

});