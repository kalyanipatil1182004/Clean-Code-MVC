
const ticketService = require("../services/ticketService");

function getAllTickets(req, res) {
    const tickets = ticketService.getAllTickets();

    res.json({
        success: true,
        count: tickets.length,
        data: tickets
    });
}

function getTicketById(req, res) {
    const id = parseInt(req.params.id);
    const ticket = ticketService.getTicketById(id);

    if (!ticket) {
        return res.status(404).json({
            success: false,
            message: "Ticket not found"
        });
    }

    res.json({
        success: true,
        data: ticket
    });
}

function createTicket(req, res) {
    const result = ticketService.createTicket(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error
        });
    }

    res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        data: result
    });
}

function updateTicket(req, res) {
    const id = parseInt(req.params.id);
    const ticket = ticketService.updateTicket(id, req.body);

    if (!ticket) {
        return res.status(404).json({
            success: false,
            message: "Ticket not found"
        });
    }

    res.json({
        success: true,
        message: "Ticket updated",
        data: ticket
    });
}

function deleteTicket(req, res) {
    const id = parseInt(req.params.id);
    const ticket = ticketService.deleteTicket(id);

    if (!ticket) {
        return res.status(404).json({
            success: false,
            message: "Ticket not found"
        });
    }

    res.json({
        success: true,
        message: "Ticket deleted",
        data: ticket
    });
}

function getAllUsers(req, res) {
    const users = ticketService.getAllUsers();

    res.json({
        success: true,
        count: users.length,
        data: users
    });
}

function getTicketStats(req, res) {
    const stats = ticketService.getTicketStats();

    res.json({
        success: true,
        ...stats
    });
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
