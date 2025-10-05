import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [instock, setInstock] = useState(1);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
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

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category_id", categoryId);
    formData.append("quantity", quantity);
    formData.append("instock", Number(instock)); // make sure backend gets number
    formData.append("description", description);
    if (img) formData.append("img", img);

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    // reset form
    setName("");
    setCategoryId("");
    setQuantity(0);
    setInstock(1);
    setDescription("");
    setImg(null);
    fetchProducts();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  }

  function startEdit(p) {
    setEditing(p.id);
    setEditData({
      name: p.name,
      category_id: p.category_id,
      quantity: p.quantity,
      instock: p.instock,
      description: p.description,
      img: null,
    });
  }

  async function saveEdit(id) {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("category_id", editData.category_id);
    formData.append("quantity", editData.quantity);
    formData.append("instock", Number(editData.instock));
    formData.append("description", editData.description);
    if (editData.img) formData.append("img", editData.img);

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    setEditing(null);
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Manage Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
        <select
          value={instock}
          onChange={(e) => setInstock(e.target.value)}
          style={styles.input}
        >
          <option value={1}>In Stock</option>
          <option value={0}>Out of Stock</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <button type="submit" style={styles.btnAdd}>
          + Add Product
        </button>
      </form>

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
                <td style={styles.td}>
                  {editing === p.id ? (
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      style={styles.input}
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td style={styles.td}>
                  {editing === p.id ? (
                    <select
                      value={editData.category_id}
                      onChange={(e) =>
                        setEditData({ ...editData, category_id: e.target.value })
                      }
                      style={styles.input}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    p.category_name
                  )}
                </td>
                <td style={styles.td}>
                  {editing === p.id ? (
                    <input
                      type="number"
                      value={editData.quantity}
                      onChange={(e) =>
                        setEditData({ ...editData, quantity: e.target.value })
                      }
                      style={styles.input}
                    />
                  ) : (
                    p.quantity
                  )}
                </td>
                <td style={styles.td}>
                  {editing === p.id ? (
                    <select
                      value={editData.instock}
                      onChange={(e) =>
                        setEditData({ ...editData, instock: e.target.value })
                      }
                      style={styles.input}
                    >
                      <option value={1}>In Stock</option>
                      <option value={0}>Out of Stock</option>
                    </select>
                  ) : p.instock ? (
                    "✅ Yes"
                  ) : (
                    "❌ No"
                  )}
                </td>
                <td style={styles.td}>
                  {editing === p.id ? (
                    <input
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({ ...editData, description: e.target.value })
                      }
                      style={styles.input}
                    />
                  ) : (
                    p.description
                  )}
                </td>
                <td style={styles.td}>
                  {editing === p.id ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) =>
                          setEditData({ ...editData, img: e.target.files[0] })
                        }
                      />
                      <button style={styles.btnSave} onClick={() => saveEdit(p.id)}>
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
                      <button style={styles.btnEdit} onClick={() => startEdit(p)}>
                        Edit
                      </button>
                      <button
                        style={styles.btnDelete}
                        onClick={() => handleDelete(p.id)}
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
  container: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
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
