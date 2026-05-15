const pool = require("../../config/database");

const findOrCreateClient = async (clientName) => {
  const cleanClientName = clientName || "Unknown Client";

  const [existingClients] = await pool.query(
    "SELECT * FROM clients WHERE client_name = ? LIMIT 1",
    [cleanClientName]
  );

  if (existingClients.length > 0) {
    return existingClients[0];
  }

  const [result] = await pool.query(
    "INSERT INTO clients (client_name) VALUES (?)",
    [cleanClientName]
  );

  return {
    id: result.insertId,
    client_name: cleanClientName,
  };
};

module.exports = {
  findOrCreateClient,
};