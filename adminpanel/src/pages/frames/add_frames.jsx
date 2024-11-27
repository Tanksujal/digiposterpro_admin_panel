import { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
const Add_Frames = () => {
  const [frame, setFrame] = useState("");
  const [images, setFrameImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const apiurl = import.meta.env.VITE_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append("cssText", frame);
    formData.append("imageurl",images[0])
    try {
      const response = await axios.post(
        `${apiurl}/frame/convert-json`,
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
              <h4 className="page-title">Add Frames</h4>
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
                    <div className="form-group row">
                      <label
                        htmlFor="frame"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Frame Details
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          name="frame"
                          id="frame"
                          className="form-control"
                          rows="3"
                          placeholder="Enter frame details here..."
                          value={frame}
                          onChange={(e) => setFrame(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    {/* Frame Image Upload */}
                    <div className="form-group row">
                      <label
                        htmlFor="frameImages"
                        className="col-sm-3 text-end control-label col-form-label"
                      >
                        Upload Frame Images
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          name="frameImages"
                          id="frameImages"
                          className="form-control"
                          multiple
                          accept="image/*"
                          onChange={(e) => setFrameImages(e.target.files)}
                          required
                        />
                        <small className="form-text text-muted">
                          You can upload multiple frame images.
                        </small>
                      </div>
                    </div>


                    {/* Image Upload */}
                    
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

export default Add_Frames;
