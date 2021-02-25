<div align="center">

**Technologies:**
JavaScript, Express.js, Node.js, React.js, Redux, Sequelize

---

# BreakEven
## Expense-tracking application

**Developer:**
David Lee

<img src="readme/login.PNG" alt="login">

**Table of Contents**

[About](#about-breakeven) | [Features](#features) | [Installation](#installation) | [Contact](#contact)


## About BreakEven

</div>

An expense-tracking application that allow users to record their financial data and personal expenses by creating new expenses, paying off past expenses, and request payments from other users. Users can 'friend' other users, cash out their balance, and notify their friends of unpaid expenses

**Github Backend URL**
* https://github.com/dyclee/breakeven-backend

**Goals**
* user account CRUD and authentication
* ability to create expenses with any number of friends
* ability to make payments
* ability to send friend requests to other users, confirm or remove requests
* ability to cash out current balance
* ability to notify friends of unpaid expenses

**Checklist**
* create database schema, set up DB
* plan frontend and server routes
* set up Express server using Sequelize
* set up React frontend
* CRUD for users and authentication
* CRUD for expenses and user-expenses (individual expense if split between multiple users)
* CRUD for friendships
* add notifications
* styling

## Technologies
- JavaScript
- Node.js
- PostgreSQL
- Express
- Sequelize
- React
- Redux
- pg
- Bcrypt
- JWTs
- HTML/CSS

## Feature List
### Users / Friends
- Create a new account (sign-up)
- Login / Logout
- Users can add and remove friends

### Expenses
- Users can create an expense
- Users can pay an expense

### Notifications
- Users can notify each other concerning expenses

### Other
- Users can cash out their current balance
