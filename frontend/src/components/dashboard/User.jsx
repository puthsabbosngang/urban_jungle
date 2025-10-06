import { useEffect, useState } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");

  async function fetchUsers() {
    const res = await fetch("http://localhost:5000/api/users");
    setUsers(await res.json());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setShowAddModal(false);
    fetchUsers();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  }

  function openEditModal(u) {
    setEditId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
    setEditRole(u.role);
    setShowEditModal(true);
  }

  async function saveEdit(e) {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/users/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName,
        email: editEmail,
        role: editRole,
      }),
    });
    setShowEditModal(false);
    setEditId(null);
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Manage Users</h2>

      <button style={styles.btnAdd} onClick={() => setShowAddModal(true)}>
        + Add User
      </button>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.role}</td>
                <td style={styles.td}>
                  {new Date(u.created_at).toLocaleString()}
                </td>
                <td style={styles.td}>
                  <button style={styles.btnEdit} onClick={() => openEditModal(u)}>
                    Edit
                  </button>
                  <button
                    style={styles.btnDelete}
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit} style={styles.modalForm}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.input}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div>
                <button type="submit" style={styles.btnSave}>
                  Save
                </button>
                <button
                  type="button"
                  style={styles.btnCancel}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit User</h3>
            <form onSubmit={saveEdit} style={styles.modalForm}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
                style={styles.input}
              />
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                style={styles.input}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div>
                <button type="submit" style={styles.btnSave}>
                  Save
                </button>
                <button
                  type="button"
                  style={styles.btnCancel}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "1000px", margin: "0 auto", padding: "20px" },
  title: { marginBottom: "15px" },
  btnAdd: {
    padding: "10px 16px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  tableWrapper: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  th: { background: "#222", color: "#fff", padding: "12px", textAlign: "left" },
  tr: { background: "#fff" },
  td: { padding: "12px", borderBottom: "1px solid #ddd" },
  btnEdit: {
    padding: "6px 10px",
    marginRight: "8px",
    border: "none",
    borderRadius: "4px",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  btnDelete: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "4px",
    background: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  },
  btnSave: {
    padding: "8px 14px",
    marginRight: "8px",
    border: "none",
    borderRadius: "4px",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  btnCancel: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "4px",
    background: "#6c757d",
    color: "#fff",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  modalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
};
