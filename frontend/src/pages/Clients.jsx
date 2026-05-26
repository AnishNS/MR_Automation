import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const API_BASE_URL = "http://localhost:5000/api";

const emptyForm = {
  client_name: "",
  report_display_name: "",
  client_aliases: "",
};

function Clients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    const res = await fetch(`${API_BASE_URL}/clients`);
    const data = await res.json();

    if (data.success) {
      setClients(data.clients);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openAddModal = () => {
    setEditingClient(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);

    setFormData({
      client_name: client.client_name || "",
      report_display_name: client.report_display_name || "",
      client_aliases: client.client_aliases || "",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingClient(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();

    if (!formData.client_name.trim()) {
      alert("Client name is required");
      return;
    }

    try {
      setLoading(true);

      const url = editingClient
        ? `${API_BASE_URL}/clients/${editingClient.id}`
        : `${API_BASE_URL}/clients`;

      const method = editingClient ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: formData.client_name,
          report_display_name:
            formData.report_display_name || formData.client_name,
          client_aliases:
            formData.client_aliases || formData.client_name,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to save client");
        return;
      }

      closeModal();
      fetchClients();
    } catch (error) {
      console.error("Save client error:", error);
      alert("Failed to save client");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchClients();
      } else {
        alert(data.message || "Failed to delete client");
      }
    } catch (error) {
      console.error("Delete client error:", error);
      alert("Failed to delete client");
    }
  };

  return (
    <div className="clients-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="clients-topbar">
        <div>
          <h1>Clients</h1>
          <p>Manage your clients and their service assignments</p>
        </div>

        <button className="add-client-top-btn" onClick={openAddModal}>
          <AddIcon />
          Add Client
        </button>
      </div>

      <div className="clients-card-grid">
        {clients.map((client) => (
          <div className="client-profile-card" key={client.id}>
            <div className="client-card-header">
              <div className="client-icon-box">
                <GroupsIcon />
              </div>

              <div className="client-info">
                <h2>{client.report_display_name || client.client_name}</h2>
                <p>{client.client_name}</p>
              </div>

              <span className="client-status">
                <CheckCircleIcon />
                Active
              </span>
            </div>

            <div className="client-meta-box">
              <div>
                <span>Services</span>
                <strong>0</strong>
              </div>

              <div>
                <span>Created</span>
                <strong>
                  {client.created_at
                    ? new Date(client.created_at).toLocaleDateString()
                    : "-"}
                </strong>
              </div>
            </div>

            <div className="client-alias-box">
              <span>Aliases</span>
              <p>{client.client_aliases || "No aliases added"}</p>
            </div>

            <div className="client-card-actions">
              <button title="Edit" onClick={() => openEditModal(client)}>
                <EditIcon />
              </button>

              <button
                title="Delete"
                className="delete-client-btn"
                onClick={() => handleDelete(client.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="client-modal-overlay">
          <div className="client-modal">
            <div className="client-modal-header">
              <div>
                <h2>{editingClient ? "Edit Client" : "Add New Client"}</h2>
                <p>
                  {editingClient
                    ? "Update client details and aliases."
                    : "Create a new client for report generation."}
                </p>
              </div>

              <button className="client-modal-close" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSaveClient}>
              <label className="client-label">Client Name</label>
              <input
                className="client-input"
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                placeholder="The Madras Cosmetic Clinics"
              />

              <label className="client-label">Report Display Name</label>
              <input
                className="client-input"
                type="text"
                name="report_display_name"
                value={formData.report_display_name}
                onChange={handleChange}
                placeholder="TMCC"
              />

              <label className="client-label">Client Aliases</label>
              <textarea
                className="client-textarea"
                name="client_aliases"
                value={formData.client_aliases}
                onChange={handleChange}
                placeholder="TMCC, Madras Cosmetic Clinic, The Madras Cosmetic Clinics"
              />

              <button className="client-submit-btn" type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingClient
                  ? "Update Client"
                  : "Add Client"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;