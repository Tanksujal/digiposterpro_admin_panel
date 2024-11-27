import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const View_templates = () => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const apiurl = import.meta.env.VITE_API_URL; // Adjust API URL if needed
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiurl}/category/getCategories`); // Replace with your endpoint
        if (response.data.success) {
          setCategories(response.data.categories); // Assuming `categories` is the key in API response
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  },);
  const moveCategory = async (index, direction) => {
    const newCategories = [...categories];
    const movedCategory = newCategories.splice(index, 1)[0]; // Remove category
  
    const newIndex = direction === "up" ? index - 1 : index + 1;
    newCategories.splice(newIndex, 0, movedCategory); // Insert at new position
  
    // Update the `index` field for all categories in the new array
    const reorderedCategories = newCategories.map((category, idx) => ({
      ...category,
      index: idx,
    }));
  
    setCategories(reorderedCategories); // Optimistically update UI
  

    try {
      const response = await axios.post(
        `${apiurl}/category/updateCategoryOrder`,
        { updatedCategories: reorderedCategories },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Category order updated successfully.");
      } else {
        alert("Failed to update category order.");
      }
    } catch (error) {
      console.error("Error updating category order:", error);
      alert("An error occurred while updating category order.");
    }
  };
  
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const response = await axios.post(`${apiurl}/category/deleteCategory`,{categoryId: id},{ withCredentials: true });
      if (response.data.success) {
        setCategories(categories.filter((category) => category.id !== id)); // Update state
        alert("Category deleted successfully!");
      } else {
        alert("Failed to delete the category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    }finally {
        setLoading(false); // Stop loading
    }
  };
  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin5"
      data-sidebartype="full"
      data-sidebar-position="absolute"
      data-header-position="absolute"
      data-boxed-layout="full"
    >
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Templates</h4>
              <div className="ms-auto text-end">
                <nav aria-label="breadcrumb">
                  
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">Template Table</h5>
                    <Link
  to="/add_templates"
  className="btn btn-success d-flex align-items-center"
  style={{
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  }}
>
  <span className="me-2">+</span> Add Template
</Link>

                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Category</th>
                      <th scope="col">Type</th>
                      <th scope="col">No Of Images</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr key={category.id || index}>
                           <td>
                           <button
                              onClick={() => moveCategory(index, "up")}
                              disabled={index === 0}
                              className="btn btn-sm btn-blue me-2"
                            >
                              ↑ Move Up
                            </button>
                            <button
                              onClick={() => moveCategory(index, "down")}
                              disabled={index === categories.length - 1}
                              className="btn btn-sm btn-blue me-2"
                            >
                              ↓ Move Down
                            </button>
      </td>
                          <td>{category.category}</td> 
                          <td>{category.type}</td>
                          <td>{category.images?.length || 0}</td> 
                          <td>
                            <Link className="btn btn-primary me-5" to={`/edit_templates/${category._id}`}>
                              Edit
                            </Link>
                            <Link className="btn btn-green me-5" to={`/viewimage_templates/${category._id}`}>
                              View
                            </Link>
                            <button
                              className="btn btn-red"
                              onClick={() => handleDelete(category._id)}
                            >
                              {loading ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No categories found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default View_templates;
