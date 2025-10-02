import { useEffect, useState } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [editing, setEditing] = useState(null); // editing user ID
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");

  
  async function fetchUsers() {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
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
    fetchUsers();
  }

  
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  }

  
  function startEdit(u) {
    setEditing(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
    setEditRole(u.role);
  }

  
  async function saveEdit(id) {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName,
        email: editEmail,
        role: editRole,
      }),
    });

    setEditing(null);
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Manage Users</h2>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <button type="submit" style={styles.btnAdd}>
          + Add User
        </button>
      </form>

    
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
                <td style={styles.td}>
                  {editing === u.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td style={styles.td}>
                  {editing === u.id ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td style={styles.td}>
                  {editing === u.id ? (
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      style={styles.input}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td style={styles.td}>
                  {new Date(u.created_at).toLocaleString()}
                </td>
                <td style={styles.td}>
                  {editing === u.id ? (
                    <>
                      <button
                        style={styles.btnSave}
                        onClick={() => saveEdit(u.id)}
                      >
                        Save
                      </button>
                      <button
                        style={styles.btnCancel}
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={styles.btnEdit}
                        onClick={() => startEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.btnDelete}
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1000px", margin: "0 auto", padding: "20px" },
  title: { marginBottom: "15px" },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  btnAdd: {
    padding: "10px 16px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
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
    padding: "6px 10px",
    marginRight: "8px",
    border: "none",
    borderRadius: "4px",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  btnCancel: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "4px",
    background: "#6c757d",
    color: "#fff",
    cursor: "pointer",
  },
};
