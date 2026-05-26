const pool = require("../../config/database");

const normalizeText = (value = "") => {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
};

const getAllClients = async () => {
  const [clients] = await pool.query(
    `SELECT 
      id,
      client_name,
      report_display_name,
      client_aliases,
      created_at
     FROM clients
     ORDER BY created_at DESC`
  );

  return clients;
};

const createClient = async ({ client_name, report_display_name, client_aliases }) => {
  const cleanClientName = client_name?.trim();

  if (!cleanClientName) {
    throw new Error("Client name is required");
  }

  const cleanDisplayName = report_display_name?.trim() || cleanClientName;
  const cleanAliases = client_aliases?.trim() || cleanClientName;

  const [result] = await pool.query(
    `INSERT INTO clients 
      (client_name, report_display_name, client_aliases)
     VALUES (?, ?, ?)`,
    [cleanClientName, cleanDisplayName, cleanAliases]
  );

  return {
    id: result.insertId,
    client_name: cleanClientName,
    report_display_name: cleanDisplayName,
    client_aliases: cleanAliases,
  };
};

const findClientById = async (clientId) => {
  const [clients] = await pool.query(
    `SELECT 
      id,
      client_name,
      report_display_name,
      client_aliases,
      created_at
     FROM clients
     WHERE id = ?
     LIMIT 1`,
    [clientId]
  );

  return clients[0] || null;
};

const updateClientById = async (clientId, data) => {
  const cleanClientName = data.client_name?.trim();

  if (!cleanClientName) {
    throw new Error("Client name is required");
  }

  const cleanDisplayName =
    data.report_display_name?.trim() || cleanClientName;

  const cleanAliases =
    data.client_aliases?.trim() || cleanClientName;

  const [result] = await pool.query(
    `UPDATE clients
     SET client_name = ?,
         report_display_name = ?,
         client_aliases = ?
     WHERE id = ?`,
    [cleanClientName, cleanDisplayName, cleanAliases, clientId]
  );

  return result.affectedRows > 0;
};

const deleteClientById = async (clientId) => {
  const [result] = await pool.query(
    "DELETE FROM clients WHERE id = ?",
    [clientId]
  );

  return result.affectedRows > 0;
};

const findOrCreateClient = async (clientName) => {
  const cleanClientName = clientName || "Unknown Client";

  const [existingClients] = await pool.query(
    `SELECT * FROM clients 
     WHERE client_name = ? 
        OR report_display_name = ?
     LIMIT 1`,
    [cleanClientName, cleanClientName]
  );

  if (existingClients.length > 0) {
    return existingClients[0];
  }

  const [result] = await pool.query(
    `INSERT INTO clients 
      (client_name, report_display_name, client_aliases) 
     VALUES (?, ?, ?)`,
    [cleanClientName, cleanClientName, cleanClientName]
  );

  return {
    id: result.insertId,
    client_name: cleanClientName,
    report_display_name: cleanClientName,
    client_aliases: cleanClientName,
  };
};

const matchClientFromText = async (inputText = "") => {
  const normalizedInput = normalizeText(inputText);
  const clients = await getAllClients();

  for (const client of clients) {
    const possibleNames = [
      client.client_name,
      client.report_display_name,
      ...(client.client_aliases
        ? client.client_aliases.split(",").map((alias) => alias.trim())
        : []),
    ];

    const isMatch = possibleNames.some((name) => {
      const normalizedName = normalizeText(name);
      return normalizedName && normalizedInput.includes(normalizedName);
    });

    if (isMatch) {
      return client;
    }
  }

  return null;
};

module.exports = {
  getAllClients,
  createClient,
  findClientById,
  updateClientById,
  deleteClientById,
  findOrCreateClient,
  matchClientFromText,
  normalizeText,
};