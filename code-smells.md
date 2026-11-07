# Manual Code Smell Identification

## 1. Long Function

**Location:** `app.post("/tickets")`

**Observation:**

While checking the code, I noticed that the ticket creation function is handling too many things in one place. It checks the input details, sets default values, creates a new ticket, updates the ticket ID, and sends the response.

**Why is it a problem?**

When one function handles so many tasks, the code becomes difficult to read and understand. If we need to make changes in the future, it may also take more time to maintain.

**My Understanding:**

I think this function can be divided into smaller functions so that each function handles one specific task.

## 2. Duplicate Code

**Location:** 
- `app.get("/tickets/:id")`
- `app.put("/tickets/:id")`
- `app.delete("/tickets/:id")`

**Observation:**

While reviewing these three routes, I noticed that the same ticket searching logic is written again and again using for loops.

**Why is it a problem?**

Writing the same logic multiple times makes the code longer. If we need to change the searching logic later, we have to update it in multiple places.

**My Understanding:**

I think we can create one common function to search for a ticket by its ID and reuse it wherever needed.

let result = [];
let found = null;
let high = 0;
let medium = 0;
let low = 0;

## 4. Business Logic in Routes

**Location:** `app.post("/tickets")`

**Observation:**

While checking the POST route, I noticed that the actual ticket creation logic is written directly inside the route. It handles input checking, sets default values, creates the ticket, and stores it in the array.

**Why is it a problem?**

The route becomes responsible for too many things. This makes the application harder to manage when more features are added.

**My Understanding:**

I think this logic should be moved into a separate service so that the route can focus mainly on handling requests and responses.

## 5. Lack of Input Validation

**Location:** `app.post("/tickets")`

**Observation:**

While checking the ticket creation route, I noticed that the code checks whether the priority is empty or not. However, it does not check whether the entered priority is actually valid.

**Why is it a problem?**

Users may enter incorrect values, which can create inconsistent data in the application.

**My Understanding:**

I think we should validate the priority and other input values properly before creating a ticket.

## 6. Magic Numbers

**Location:** `app.listen(3000)` and `let nextId = 4`

**Observation:**

While reviewing the code, I noticed that some numbers like `3000` and `4` are directly written in the application.

**Why is it a problem?**

Someone reading the code may not immediately understand why these values are used. If we need to change them later, we have to search for them in the code.

**My Understanding:**

I think we can use meaningful constants or configuration values instead of directly writing these numbers.

## 7. Hardcoded Data

**Location:** `app.js` – tickets and users arrays

**Observation:**

While reviewing the application, I noticed that all ticket and user details are directly stored in arrays inside the main JavaScript file.

**Why is it a problem?**

If we want to add, update, or manage more data, we need to make changes directly in the code. This is not a good approach for a larger application.

**My Understanding:**

I think the data should be handled separately, such as through a repository or database, instead of keeping everything inside the main file.

## 8. No Centralized Error Handling

**Location:** GET, PUT and DELETE ticket routes

**Observation:**

While checking the routes, I noticed that error responses are handled separately inside different routes. There is no common error-handling middleware in the application.

**Why is it a problem?**

If we need to change the error response format, we may have to update multiple places. This can make error handling difficult to maintain.

**My Understanding:**

I think we should use a common error-handling middleware to manage errors in one place.

## 9. Tight Coupling

**Location:** POST, PUT and DELETE ticket routes

**Observation:**

While reviewing the application, I noticed that the routes directly access and modify the tickets array. The request-handling code and data-handling logic are mixed together.

**Why is it a problem?**

If we change how ticket data is stored in the future, we may also need to make changes in multiple routes. This makes the application harder to maintain.

**My Understanding:**

I think we should move the data-related operations into a separate repository so that the routes are not directly dependent on the data storage logic.

## 10. Lack of Separation of Concerns

**Location:** Entire `app.js` file

**Observation:**

While reviewing the application, I noticed that all the code is written in a single file. Routes, business logic, data handling, statistics calculation, and server setup are all mixed together.

**Why is it a problem?**

As the application grows, managing everything in one file becomes difficult. It also makes the code harder to understand, test, and update.

**My Understanding:**

I think we should organize the application into separate folders like routes, controllers, services, and repositories. This will make the project cleaner and easier to maintain.
# AI Code Review and Comparison
## AI Review

After completing my manual code review, I used ChatGPT to review the same Express application.

The purpose was to identify any additional code smells and compare the AI findings with my own observations.

I will compare both reviews and check whether I missed any important issues.

| No. | My Manual Finding | AI Review Finding | Result |
|---|---|---|---|
| 1 | Long Function | Function handles multiple responsibilities | Matched |
| 2 | Duplicate Code | Repeated ticket searching logic | Matched |
| 3 | Poor Variable Naming | Some variable names are not clear | Matched |
| 4 | Business Logic in Routes | Business logic is written inside routes | Matched |
| 5 | Lack of Input Validation | Priority values are not properly validated | Matched |
| 6 | Magic Numbers | Fixed values are directly used in code | Matched |
| 7 | Hardcoded Data | Ticket and user data are stored in arrays | Matched |
| 8 | No Centralized Error Handling | No common error-handling middleware | Matched |
| 9 | Tight Coupling | Routes directly access the tickets array | Matched |
| 10 | Lack of Separation of Concerns | All responsibilities are in one file | Matched |

### Additional Observation

During the AI review, I also noticed that the application does not have automated tests. Adding tests will help us verify that the application works correctly after refactoring.