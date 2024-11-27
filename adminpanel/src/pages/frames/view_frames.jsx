import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const View_frames = () => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const apiurl = import.meta.env.VITE_API_URL; // Adjust API URL if needed
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiurl}/frame/getFrameJson`); // Replace with your endpoint
        if (response.data.success) {
          setCategories(response.data.data);
          console.log(response.data.data);
           // Assuming `categories` is the key in API response
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  },);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const response = await axios.delete(`${apiurl}/frame/deleteframe`,{frameId: id},{ withCredentials: true });
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
              <h4 className="page-title">Frames</h4>
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
                    <h5 className="card-title">Frames Table</h5>
                    <Link
  to="/Add_Frames"
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
  <span className="me-2">+</span> Add Frames
</Link>

                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">frames json</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
  {categories.length > 0 ? (
    categories.map((category, index) => (
      <tr key={category._id || index}>
        <td>{index + 1}</td>
        <td>
          <div>
            {/* Display the image */}
            <img
              src={category.imageUrl}
              alt={`Frame ${index + 1}`}
              style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
            />
            <div>
              {/* Download button */}
             
            </div>
          </div>
        </td>
        <td>
          {/* <Link className="btn btn-primary me-3" to={`/edit_templates/${category._id}`}>
            Edit
          </Link>
          <Link className="btn btn-secondary me-3" to={`/viewimage_templates/${category._id}`}>
            View
          </Link> */}
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

export default View_frames;
