import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Getusers = () => {
  const [feedbacks, setFeedbacks] = useState([]); 
  const apiurl = import.meta.env.VITE_API_URL; 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch feedback data from the API
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${apiurl}/auth/getalluser`); // Replace with your endpoint
        if (response.data.success) {
            console.log(response.data.users);
            
          setFeedbacks(response.data.users); // Assuming `feedbacks` is the key in API response
        } else {
          console.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
//     if (!confirmDelete) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${apiurl}/feedback/deleteFeedback`,
//         { feedbackId: id },
//         { withCredentials: true }
//       );
//       if (response.data.success) {
//         setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id)); // Update state
//         alert("Feedback deleted successfully!");
//       } else {
//         alert("Failed to delete the feedback.");
//       }
//     } catch (error) {
//       console.error("Error deleting feedback:", error);
//       alert("An error occurred while deleting the feedback.");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

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
                    <h5 className="card-title">Feedback Table</h5>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">MobileNumber</th>
                      <th scope="col">User Name</th>
                      <th scope="col">email</th>
                      <th scope="col">address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((feedback, i) => (
                        <tr key={++i}>
                          <td>{++i}</td>
                          <td>{feedback.mobileNumber}</td>
                          <td>{feedback.businessName}</td>
                          <td>{feedback.email}</td>
                          <td>{feedback.address}</td>
                          {/* <td>
                            <button
                              className="btn btn-red"
                              onClick={() => handleDelete(feedback.id)}
                            >
                              {loading ? "Deleting..." : "Delete"}
                            </button>
                          </td> */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No feedback found.
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

export default Getusers;
