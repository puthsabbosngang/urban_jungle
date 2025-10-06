import { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  async function fetchCategories() {
    const res = await fetch("http://localhost:5000/api/categories");
    setCategories(await res.json());
  }

  async function handleAdd(e) {
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
    setShowAddModal(false);
    fetchCategories();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    }
  }

  async function handleEdit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", selectedCategory.name);
    formData.append("description", selectedCategory.description);
    if (img) formData.append("img", img);

    await fetch(`http://localhost:5000/api/categories/${selectedCategory.id}`, {
      method: "PUT",
      body: formData,
    });

    setShowEditModal(false);
    setSelectedCategory(null);
    setImg(null);
    fetchCategories();
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🗂 Manage Categories</h2>

      <button style={styles.btnAddNew} onClick={() => setShowAddModal(true)}>
        + Add New Category
      </button>

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
              <tr key={c.id}>
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
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.description}</td>
                <td style={styles.td}>
                  <button
                    style={styles.btnEdit}
                    onClick={() => {
                      setSelectedCategory(c);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.btnDelete}
                    onClick={() => handleDelete(c.id)}
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
            <h3>Add New Category</h3>
            <form onSubmit={handleAdd} style={styles.modalForm}>
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
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                style={styles.input}
              />
              <div style={styles.modalActions}>
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

      {showEditModal && selectedCategory && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Category</h3>
            <form onSubmit={handleEdit} style={styles.modalForm}>
              <input
                type="text"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
                required
                style={styles.input}
              />
              <input
                type="text"
                value={selectedCategory.description}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    description: e.target.value,
                  })
                }
                style={styles.input}
              />
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                style={styles.input}
              />
              <div style={styles.modalActions}>
                <button type="submit" style={styles.btnSave}>
                  Update
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
  btnAddNew: {
    padding: "10px 16px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
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
  td: { padding: "12px", borderBottom: "1px solid #ddd" },
  img: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" },
  btnEdit: {
    padding: "6px 10px",
    marginRight: "8px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnDelete: {
    padding: "6px 10px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  /* ===== MODAL ===== */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  modalForm: { display: "flex", flexDirection: "column", gap: "10px" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  btnSave: {
    padding: "8px 14px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnCancel: {
    padding: "8px 14px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
