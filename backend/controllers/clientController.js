const {
  getAllClients,
  createClient,
  findClientById,
  updateClientById,
  deleteClientById,
} = require("../services/database/clientService");

const getClients = async (req, res) => {
  try {
    const clients = await getAllClients();

    return res.status(200).json({
      success: true,
      clients,
    });
  } catch (error) {
    console.error("Get clients error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
      error: error.message,
    });
  }
};

const addClient = async (req, res) => {
  try {
    const { client_name, report_display_name, client_aliases } = req.body;

    const client = await createClient({
      client_name,
      report_display_name,
      client_aliases,
    });

    return res.status(201).json({
      success: true,
      message: "Client added successfully",
      client,
    });
  } catch (error) {
    console.error("Add client error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add client",
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await findClientById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    console.error("Get client by id error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch client",
      error: error.message,
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const updated = await updateClientById(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
    });
  } catch (error) {
    console.error("Update client error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update client",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const deleted = await deleteClientById(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Delete client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete client",
      error: error.message,
    });
  }
};

module.exports = {
  getClients,
  addClient,
  getClientById,
  updateClient,
  deleteClient,
};