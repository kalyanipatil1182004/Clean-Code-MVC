
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

function getAllTickets() {
    return tickets;
}

function getTicketById(id) {
    return tickets.find(ticket => ticket.id === id) || null;
}

function createTicket(ticketData) {
    const newTicket = {
        id: nextId++,
        ...ticketData
    };

    tickets.push(newTicket);
    return newTicket;
}

function updateTicket(id, updateData) {
    const ticket = getTicketById(id);

    if (!ticket) {
        return null;
    }

    Object.assign(ticket, updateData);
    return ticket;
}

function deleteTicket(id) {
    const index = tickets.findIndex(ticket => ticket.id === id);

    if (index === -1) {
        return null;
    }

    return tickets.splice(index, 1)[0];
}

function getAllUsers() {
    return users;
}

function getTicketStats() {
    const stats = {
        totalTickets: tickets.length,
        openTickets: 0,
        closedTickets: 0,
        pendingTickets: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0
    };

    tickets.forEach(ticket => {
        if (ticket.status === "Open") stats.openTickets++;
        else if (ticket.status === "Closed") stats.closedTickets++;
        else if (ticket.status === "Pending") stats.pendingTickets++;

        if (ticket.priority === "High") stats.highPriority++;
        else if (ticket.priority === "Medium") stats.mediumPriority++;
        else if (ticket.priority === "Low") stats.lowPriority++;
    });

    return stats;
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    getAllUsers,
    getTicketStats
};
