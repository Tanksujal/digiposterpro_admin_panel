import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Viewbanner = () => {
  const [banners, setBanners] = useState([]); // State to hold banners
  const apiurl = import.meta.env.VITE_API_URL; // Adjust API URL if needed
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch banners from the API
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${apiurl}/banner/getbanner`); // Replace with your endpoint
        if (response.data.success) {
          setBanners(response.data.banner);
          console.log(response.data.banner); // Assuming `banners` is the key in API response
        } else {
          console.error("Failed to fetch banners");
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;
    let obj = {
        bannerId : id
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiurl}/banner/deleteBanner`,obj, {withCredentials: true,
      });
      if (response.data.success) {
        setBanners(banners.filter((banner) => banner._id !== id)); // Update state
        alert("Banner deleted successfully!");
      } else {
        alert("Failed to delete the banner.");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("An error occurred while deleting the banner.");
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
              <h4 className="page-title">Banners</h4>
              <div className="ms-auto text-end">
                <nav aria-label="breadcrumb"></nav>
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
                    <h5 className="card-title">Banners Table</h5>
                    <Link
                      to="/addbanner"
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
                      <span className="me-2">+</span> Add Banner
                    </Link>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Banner Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.length > 0 ? (
                      banners.map((banner, index) => (
                        <tr key={banner._id || index}>
                          <td>{index + 1}</td>
                          <td>
                            <div>
                              {/* Display the image */}
                              <img
                                src={banner.image.url}
                                alt={`Banner ${index + 1}`}
                                style={{
                                  maxWidth: "150px",
                                  maxHeight: "150px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-red"
                              onClick={() => handleDelete(banner._id)}
                            >
                              {loading ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No banners found.
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

export default Viewbanner;
