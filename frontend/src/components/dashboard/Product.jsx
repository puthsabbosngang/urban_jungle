import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    quantity: 0,
    instock: 1,
    description: "",
    img: null,
  });

  async function fetchProducts() {
    const res = await fetch("http://localhost:5000/api/products");
    setProducts(await res.json());
  }

  async function fetchCategories() {
    const res = await fetch("http://localhost:5000/api/categories");
    setCategories(await res.json());
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  function openModal(product = null) {
    if (product) {
      setEditing(product.id);
      setFormData({
        name: product.name,
        category_id: product.category_id,
        quantity: product.quantity,
        instock: product.instock,
        description: product.description,
        img: null,
      });
    } else {
      setEditing(null);
      setFormData({
        name: "",
        category_id: "",
        quantity: 0,
        instock: 1,
        description: "",
        img: null,
      });
    }
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) form.append(key, formData[key]);
    }

    if (editing) {
      await fetch(`http://localhost:5000/api/products/${editing}`, {
        method: "PUT",
        body: form,
      });
    } else {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: form,
      });
    }

    setModalOpen(false);
    fetchProducts();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Manage Products</h2>
      <button style={styles.btnAdd} onClick={() => openModal()}>
        + Add Product
      </button>

      {/* Products Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>In Stock</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={styles.tr}>
                <td style={styles.td}>
                  {p.img ? (
                    <img
                      src={`http://localhost:5000${p.img}`}
                      alt={p.name}
                      style={styles.img}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.category_name}</td>
                <td style={styles.td}>{p.quantity}</td>
                <td style={styles.td}>{p.instock ? "✅ Yes" : "❌ No"}</td>
                <td style={styles.td}>{p.description}</td>
                <td style={styles.td}>
                  <button style={styles.btnEdit} onClick={() => openModal(p)}>
                    Edit
                  </button>
                  <button
                    style={styles.btnDelete}
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editing ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={styles.input}
              />
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                required
                style={styles.input}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                style={styles.input}
              />
              <select
                value={formData.instock}
                onChange={(e) =>
                  setFormData({ ...formData, instock: e.target.value })
                }
                style={styles.input}
              >
                <option value={1}>In Stock</option>
                <option value={0}>Out of Stock</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, img: e.target.files[0] })
                }
              />
              <div style={{ marginTop: "10px" }}>
                <button type="submit" style={styles.btnSave}>
                  {editing ? "Save Changes" : "Add Product"}
                </button>
                <button
                  type="button"
                  style={styles.btnCancel}
                  onClick={() => setModalOpen(false)}
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
  container: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
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
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    verticalAlign: "middle",
  },
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
    padding: "8px 14px",
    marginRight: "10px",
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
};
