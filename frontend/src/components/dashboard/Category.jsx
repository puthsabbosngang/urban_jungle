import { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [editing, setEditing] = useState(null); 
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImg, setEditImg] = useState(null);

  async function fetchCategories() {
    const res = await fetch("http://localhost:5000/api/categories");
    setCategories(await res.json());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (img) formData.append("img", img);

    await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      body: formData,
    });

    setName("");
    setDescription("");
    setImg(null);
    fetchCategories();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    }
  }

  function startEdit(c) {
    setEditing(c.id);
    setEditName(c.name);
    setEditDescription(c.description);
    setEditImg(null);
  }

  async function saveEdit(id) {
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("description", editDescription);
    if (editImg) formData.append("img", editImg);

    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "PUT",
      body: formData,
    });

    setEditing(null);
    fetchCategories();
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> Manage Categories</h2>

      
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
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <button type="submit" style={styles.btnAdd}>
          + Add Category
        </button>
      </form>

    
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} style={styles.tr}>
                <td style={styles.td}>
                  {c.img ? (
                    <img
                      src={`http://localhost:5000${c.img}`}
                      alt={c.name}
                      style={styles.img}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td style={styles.td}>
                  {editing === c.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td style={styles.td}>
                  {editing === c.id ? (
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    c.description
                  )}
                </td>
                <td style={styles.td}>
                  {editing === c.id ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => setEditImg(e.target.files[0])}
                      />
                      <button
                        style={styles.btnSave}
                        onClick={() => saveEdit(c.id)}
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
                        onClick={() => startEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.btnDelete}
                        onClick={() => handleDelete(c.id)}
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
  td: { padding: "12px", borderBottom: "1px solid #ddd", verticalAlign: "middle" },
  img: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
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
