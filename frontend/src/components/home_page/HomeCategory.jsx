import { useEffect, useState, useRef } from "react";

export default function HomeCategory(){
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef();

  async function fetchCategories() {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  async function handleAdd() {
    const name = prompt("Enter category name:");
    const description = prompt("Enter description:");
    if (!name) return;

    // trigger hidden file input
    fileInputRef.current.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (file) formData.append("img", file);

      await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        body: formData,
      });

      fetchCategories();
    };
    fileInputRef.current.click();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
      });
      fetchCategories();
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📂 Manage Categories</h2>
      <button onClick={handleAdd}>+ Add Category</button>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} />

      <table border="1" cellPadding="8" style={{ marginTop: "15px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                {c.img ? (
                  <img src={`http://localhost:5000${c.img}`} alt={c.name} width="60" />
                ) : "No image"}
              </td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
