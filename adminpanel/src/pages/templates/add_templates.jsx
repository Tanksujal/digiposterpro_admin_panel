import { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Add_templates = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const apiurl = import.meta.env.VITE_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("category", category);
    formData.append("type", type);
    Array.from(images).forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        `${apiurl}/category/Addcategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setMessage(response.data.message || "Template added successfully!");
      } else {
        setMessage("Failed to add template.");
      }
    } catch (error) {
      setMessage("Error adding template. Please try again.");
      console.error("Error:", error);
    } finally {
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
              <h4 className="page-title">Add Template</h4>
              <div className="ms-auto text-end">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Add Template
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <form
                  onSubmit={handleSubmit}
                  className="form-horizontal"
                  encType="multipart/form-data"
                >
                  <div className="card-body">
                    <h4 className="card-title">Add Template</h4>

                    {/* Category Input */}
                    <div className="form-group row">
                      <label
                        htmlFor="category"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Category
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="category"
                          className="form-control"
                          id="category"
                          placeholder="Category Name Here"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Type Dropdown */}
                    <div className="form-group row">
                      <label
                        htmlFor="type"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Type
                      </label>
                      <div className="col-sm-9">
                        <select
                          name="type"
                          id="type"
                          className="form-control"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          required
                        >
                          <option value="" disabled>
                            Select a Type
                          </option>
                          <option value="business">Business</option>
                          <option value="daily">Daily</option>
                          <option value="festival">Festival</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="form-group row">
                      <label
                        htmlFor="images"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Upload Images
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          name="images"
                          id="images"
                          className="form-control"
                          multiple
                          accept="image/*"
                          onChange={(e) => setImages(e.target.files)}
                          required
                        />
                        <small className="form-text text-muted">
                          You can upload multiple images.
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-top">
                    <div className="card-body">
                      <button
                        type="submit"
                        className="btn btn-primary me-5"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                      <Link to={'/view_templates'} className="btn btn-info">
                        View
                      </Link>
                    </div>
                  </div>
                </form>
                {message && (
                  <div className="alert alert-info mt-3">{message}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Footer />
    </div>
  );
};

export default Add_templates;
