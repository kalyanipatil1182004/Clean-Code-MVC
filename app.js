
const express = require("express");
const app = express();

app.use(express.json());

let tickets = [
    { id: 1, title: "Login issue", description: "Unable to login", status: "Open", priority: "High", user: "Amit" },
    { id: 2, title: "Network issue", description: "Internet is slow", status: "Pending", priority: "Medium", user: "Sneha" },
    { id: 3, title: "Password reset", description: "Forgot password", status: "Closed", priority: "Low", user: "Rahul" }
];

let users = [
    { id: 1, name: "Amit", email: "amit@example.com" },
    { id: 2, name: "Sneha", email: "sneha@example.com" },
    { id: 3, name: "Rahul", email: "rahul@example.com" }
];

let nextId = 4;

app.get("/", function(req, res) {
    res.send("Welcome to Support Ticket Management System");
});

app.get("/tickets", function(req, res) {
    console.log("Getting all tickets");
    let result = [];
    for (let i = 0; i < tickets.length; i++) {
        result.push(tickets[i]);
    }
    res.json({ success: true, count: result.length, data: result });
});

app.get("/tickets/:id", function(req, res) {
    console.log("Searching ticket");
    let id = parseInt(req.params.id);
    let found = null;
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id == id) {
            found = tickets[i];
        }
    }
    if (found == null) {
        res.status(404).json({ success: false, message: "Ticket not found" });
    } else {
        res.json({ success: true, data: found });
    }
});

app.post("/tickets", function(req, res) {
    console.log("Creating new ticket");
    let title = req.body.title;
    let description = req.body.description;
    let priority = req.body.priority;
    let user = req.body.user;

    if (title == undefined || title == "") {
        res.status(400).json({ success: false, message: "Title is required" });
        return;
    }

    if (description == undefined || description == "") {
        res.status(400).json({ success: false, message: "Description is required" });
        return;
    }

    if (priority == undefined || priority == "") {
        priority = "Medium";
    }

    if (user == undefined || user == "") {
        user = "Guest";
    }

    let newTicket = {
        id: nextId,
        title: title,
        description: description,
        status: "Open",
        priority: priority,
        user: user
    };

    tickets.push(newTicket);
    nextId = nextId + 1;

    res.status(201).json({ success: true, message: "Ticket created successfully", data: newTicket });
});

app.put("/tickets/:id", function(req, res) {
    console.log("Updating ticket");
    let id = parseInt(req.params.id);
    let ticket = null;

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id == id) {
            ticket = tickets[i];
        }
    }

    if (ticket == null) {
        res.status(404).json({ success: false, message: "Ticket not found" });
        return;
    }

    if (req.body.title != undefined) {
        ticket.title = req.body.title;
    }
    if (req.body.description != undefined) {
        ticket.description = req.body.description;
    }
    if (req.body.status != undefined) {
        ticket.status = req.body.status;
    }
    if (req.body.priority != undefined) {
        ticket.priority = req.body.priority;
    }
    if (req.body.user != undefined) {
        ticket.user = req.body.user;
    }

    res.json({ success: true, message: "Ticket updated", data: ticket });
});

app.delete("/tickets/:id", function(req, res) {
    console.log("Deleting ticket");
    let id = parseInt(req.params.id);
    let index = -1;

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id == id) {
            index = i;
        }
    }

    if (index == -1) {
        res.status(404).json({ success: false, message: "Ticket not found" });
        return;
    }

    let deleted = tickets.splice(index, 1);
    res.json({ success: true, message: "Ticket deleted", data: deleted[0] });
});

app.get("/users", function(req, res) {
    console.log("Getting users");
    res.json({ success: true, count: users.length, data: users });
});

app.get("/stats", function(req, res) {
    let open = 0;
    let closed = 0;
    let pending = 0;

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].status == "Open") {
            open++;
        } else if (tickets[i].status == "Closed") {
            closed++;
        } else if (tickets[i].status == "Pending") {
            pending++;
        }
    }

    let high = 0;
    let medium = 0;
    let low = 0;

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].priority == "High") {
            high++;
        } else if (tickets[i].priority == "Medium") {
            medium++;
        } else if (tickets[i].priority == "Low") {
            low++;
        }
    }

    res.json({
        success: true,
        totalTickets: tickets.length,
        openTickets: open,
        closedTickets: closed,
        pendingTickets: pending,
        highPriority: high,
        mediumPriority: medium,
        lowPriority: low
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
