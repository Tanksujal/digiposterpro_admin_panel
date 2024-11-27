import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // For accessing route parameters
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import axios from "axios";

const Edit_templates = () => {
  const { id } = useParams(); // Get the `id` parameter from the route
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]); // New images to upload
  const [existingImages, setExistingImages] = useState([]); // Existing images from the API
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const apiurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  // Fetch category details on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post(
          `${apiurl}/category/getCategoryBycategory`,
          { categoryId: id },
          { withCredentials: true }
        );
        if (response.data.success) {
          const { category, type, images } = response.data.category;
          setCategory(category || "");
          setType(type || "");
          setExistingImages(images || []); // Store existing images
          console.log(response.data.category.images);
          
        } else {
          setMessage("Failed to fetch category details.");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setMessage("Error fetching category details.");
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form submission for updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("category", category);
    formData.append("categoryId", id);
    formData.append("type", type);
    Array.from(images).forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        `${apiurl}/category/updateCategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setMessage(response.data.message || "Template updated successfully!");
        navigate('/view_templates')
      } else {
        setMessage("Failed to update template.");
      }
    } catch (error) {
      setMessage("Error updating template. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle removing existing images
  const handleRemoveImage = async (image) => {
    try {
      const response = await axios.delete(
        `${apiurl}/category/deleteImage/${id}`,
        { data: { image } }
      );
      if (response.data.success) {
        setExistingImages((prev) =>
          prev.filter((img) => img !== image)
        ); // Remove image from state
        setMessage("Image removed successfully!");
      } else {
        setMessage("Failed to remove image.");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      setMessage("Error removing image. Please try again.");
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
              <h4 className="page-title">Edit Template</h4>
              <div className="ms-auto text-end">
                <nav aria-label="breadcrumb">
                 
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
                    

                    {/* Category Input */}
                    <div className="form-group row mt-10">
                      <label
                        htmlFor="category"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Category
                      </label>
                      <div className="col-sm-9 mt-10">
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
                      <div className="col-sm-9 mt-10">
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

                    {/* Existing Images */}
                    <div className="form-group row">
                      <label
                        htmlFor="existing-images"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Existing Images
                      </label>
                      <div className="col-sm-9 d-flex flex-wrap">
                        {existingImages.map((img, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              margin: "5px",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={img.url}
                              alt="Existing"
                              style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                            />
                            <button
                              type="button"
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRemoveImage(img)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* New Image Upload */}
                    <div className="form-group row ">
                      <label
                        htmlFor="images"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Upload Images
                      </label>
                      <div className="col-sm-9 mt-10">
                        <input
                          type="file"
                          name="images"
                          id="images"
                          className="form-control"
                          multiple
                          accept="image/*"
                          onChange={(e) => setImages(e.target.files)}
                        />
                        <small className="form-text text-muted">
                          You can upload multiple images. Existing images will
                          remain unless explicitly removed.
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
                        {loading ? "Updating..." : "Update"}
                      </button>
                      <a href="/view_templates" className="btn btn-info">
                        View
                      </a>
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

export default Edit_templates;
