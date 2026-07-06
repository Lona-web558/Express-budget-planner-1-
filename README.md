# Express-budget-planner-1-

Budget Planner

A simple Budget Planner web application built with Node.js, Express.js, HTML5, CSS3, and JavaScript. Users can register, log in securely, and manage their personal budget categories.

---

Features

- User registration
- User login
- Secure password hashing using bcrypt
- Session-based authentication
- Protected dashboard
- Add budget categories
- Delete budget categories
- View total planned budget
- User-specific budget data
- Responsive user interface

---

Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Node.js
- Express.js
- Express Session
- bcrypt
- JSON File Storage

---

Project Structure

budget-planner/
│

│   ├── login.html
│   ├── register.html
│   ├── index.html
│   ├── script.js
│   └── style.css
│

│   └── auth.js
│

│   ├── users.json
│   └── budgets.json
│
├── server.js
├── package.json
└── README.md

---

Installation

1. Clone or download the project.

2. Open a terminal inside the project folder.

3. Install the project dependencies:

npm install

4. Start the application:

npm start

5. Open your browser and visit:

http://localhost:3000

---

How to Use

Register

- Open the Register page.
- Create a username and password.
- Log in using your new account.

Login

- Enter your username and password.
- You will be redirected to the Budget Planner dashboard.

Add a Budget

Enter:

- Budget Category (e.g. Rent, Food, Transport)
- Budget Amount

Click Add Budget.

Delete a Budget

Click the Delete button next to a budget category.

Logout

Click the Logout button to end your session securely.

---

API Endpoints

Method| Endpoint| Description
POST| "/register"| Register a new user
POST| "/login"| Log in
GET| "/logout"| Log out
GET| "/me"| Get current logged-in user
GET| "/api/budgets"| Get all budgets
POST| "/api/budgets"| Add a budget
DELETE| "/api/budgets/:id"| Delete a budget

---

Authentication

Passwords are securely hashed using bcrypt before being stored.

User sessions are managed using express-session, ensuring that only authenticated users can access the dashboard and budget data.

---

Future Improvements

- Edit existing budgets
- Monthly budget planning
- Budget categories with icons
- Budget progress bars
- Charts using Chart.js
- Search and filter budgets
- Export budgets to PDF or CSV
- SQLite or MongoDB database integration
- User profile management
- Dark mode

---

Learning Outcomes

By completing this project, you will gain experience with:

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Fetch API
- Node.js
- Express.js
- REST APIs
- Authentication
- Password hashing
- Session management
- JSON data storage
- Client-server communication
- CRUD operations

---

License

This project is licensed under the MIT License.

---

Author

Developed as a beginner-friendly full-stack web application using Express.js by Lona Smith in the Republic of South Africa @lona78584 @businessupdatez @goldfundalmenta.
