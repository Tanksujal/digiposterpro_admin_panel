import { useParams, Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Viewimage_templates = () => {
  const { id } = useParams(); // Capture category ID from the URL
  const [category, setCategory] = useState(null); // Store category details
  const [images, setImages] = useState([]); // Store images
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState([]); // Store selected image for upload
  const apiurl = import.meta.env.VITE_API_URL;

  // Fetch category details and its images
  const fetchCategoryImages = async () => {
    try {
      const response = await axios.post(
        `${apiurl}/category/getCategoryBycategory`,
        { categoryId: id },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCategory(response.data.category);
        setImages(response.data.category.images || []);
      } else {
        setMessage("Failed to fetch category images.");
      }
    } catch (error) {
      console.error("Error fetching category images:", error);
      setMessage("An error occurred while fetching category images.");
    }
  };

  useEffect(() => {
    fetchCategoryImages(); // Fetch the category images when the component mounts or id changes
  }, [id]);

  // Handle image upload
  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!selectedImage || selectedImage.length === 0) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedImage).forEach((image) => formData.append("images", image));
    formData.append("categoryId", id);

    try {
      const response = await axios.post(`${apiurl}/category/addImageToCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        // Re-fetch the images after upload or update the images state
        fetchCategoryImages();
        setMessage("Images added successfully.");
      } else {
        setMessage("Failed to add images.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("An error occurred while uploading the image.");
    }
  };

  // Handle image delete
  const handleImageDelete = async (imageId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post(`${apiurl}/category/Imagedelete`, {
        data: { imageId, categoryId: id },
        withCredentials: true,
      });

      if (response.data.success) {
        // Remove the image from the state
        setImages(images.filter((img) => img._id !== imageId));
        setMessage("Image deleted successfully.");
      } else {
        setMessage("Failed to delete image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setMessage("An error occurred while deleting the image.");
    }
  };

  // Handle image reordering (moving image up or down)
  const moveImage = (index, direction) => {
    const newImages = [...images];
    const movedImage = newImages.splice(index, 1)[0];

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    newImages.splice(newIndex, 0, movedImage);
    setImages(newImages);

    // Send the updated order to the backend
    axios.post(`${apiurl}/category/updateImageOrder`, {
      categoryId: id,
      updatedImages: newImages
    }, { withCredentials: true })
    .then(response => {
      if (response.data.success) {
        setMessage("Image order updated successfully.");
      } else {
        setMessage("Failed to update image order.");
      }
    })
    .catch(error => {
      console.error("Error updating image order:", error);
      setMessage("An error occurred while updating image order.");
    });
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
              <h4 className="page-title">View Images</h4>
              <div className="ms-auto text-end">
                
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Images in Category: {category?.category || "N/A"}
                  </h5>
                  {message && <div className="alert alert-warning">{message}</div>}
                </div>

                {/* Add Image Form */}
                <div className="card-body">
                  <form onSubmit={handleImageUpload}>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Upload Image</label>
                      <input
                        type="file"
                        id="image"
                        className="form-control"
                        onChange={(e) => setSelectedImage(e.target.files)}
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      Add Image
                    </button>
                  </form>
                </div>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Image</th>
                        <th scope="col">Image ID</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {images.length > 0 ? (
                        images.map((img, index) => (
                          <tr key={img._id || index}>
                            <td>
                              <button
                                onClick={() => moveImage(index, 'up')}
                                disabled={index === 0}
                                className="btn btn-sm btn-blue me-5"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => moveImage(index, 'down')}
                                disabled={index === images.length - 1}
                                className="btn btn-sm btn-blue"
                              >
                                ↓
                              </button>
                            </td>
                            <td>
                              <img
                                src={img.url}
                                alt={`Image ${index + 1}`}
                                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                              />
                            </td>
                            <td>{img._id || "N/A"}</td>
                            <td>
                              <button
                                className="btn btn-red"
                                onClick={() => handleImageDelete(img._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No images found for this category.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="card-footer">
                  <Link to="/view_templates" className="btn btn-primary">
                    Back to Templates
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Viewimage_templates;
