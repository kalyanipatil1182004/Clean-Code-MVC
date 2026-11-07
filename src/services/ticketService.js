
const ticketRepository = require("../repositories/ticketRepository");

function getAllTickets() {
    return ticketRepository.getAllTickets();
}

function getTicketById(id) {
    return ticketRepository.getTicketById(id);
}

function createTicket(ticketData) {
    const { title, description } = ticketData;
    let { priority, user } = ticketData;

    if (title == undefined || title === "") {
        return { error: "Title is required" };
    }

    if (description == undefined || description === "") {
        return { error: "Description is required" };
    }

    if (priority == undefined || priority === "") {
        priority = "Medium";
    }

    if (user == undefined || user === "") {
        user = "Guest";
    }

    return ticketRepository.createTicket({
        title,
        description,
        status: "Open",
        priority,
        user
    });
}

function updateTicket(id, updateData) {
    const allowedFields = [
        "title",
        "description",
        "status",
        "priority",
        "user"
    ];

    const filteredData = {};

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            filteredData[field] = updateData[field];
        }
    });

    return ticketRepository.updateTicket(id, filteredData);
}

function deleteTicket(id) {
    return ticketRepository.deleteTicket(id);
}

function getAllUsers() {
    return ticketRepository.getAllUsers();
}

function getTicketStats() {
    return ticketRepository.getTicketStats();
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
