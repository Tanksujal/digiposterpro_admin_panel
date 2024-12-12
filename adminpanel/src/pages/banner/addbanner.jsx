import { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Add_Banner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const apiurl = import.meta.env.VITE_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    

    try {
        const formData = new FormData();
        formData.append("bannerImage", bannerImage);
    
        const response = await axios.post(`${apiurl}/banner/addbanner`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        if (response.data.success) {
          setMessage(response.data.message || "Banner uploaded successfully!");
        } else {
          setMessage("Failed to upload banner.");
        }
    } catch (error) {
      setMessage("Error uploading banner. Please try again.");
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
              <h4 className="page-title">Add Banner</h4>
              <div className="ms-auto text-end">
                <nav aria-label="breadcrumb"></nav>
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
                    {/* Banner Image Upload */}
                    <div className="form-group row">
                      <label
                        htmlFor="bannerImage"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Upload Banner Image
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          name="bannerImage"
                          id="bannerImage"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setBannerImage(e.target.files[0])}
                          required
                        />
                        <small className="form-text text-muted">
                          Upload a single banner image.
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
                      <Link to={'/viewbanner'} className="btn btn-info">
                        View Banners
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

export default Add_Banner;
