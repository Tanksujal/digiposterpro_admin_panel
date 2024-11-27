import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);

  const apiurl = import.meta.env.VITE_API_URL;

  // Fetch dashboard data
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${apiurl}/auth/getTotalUserCount`)
        const framesResponse = await axios.get(`${apiurl}/frame/getTotalFrameCount`)
        const templatesResponse = await axios.get(`${apiurl}/category/getTotalTemplateCount`)
        setTotalUsers(usersResponse.data.count || 0);
        setTotalTemplates(templatesResponse.data.templateCount || 0);
        setTotalFrames(framesResponse.data.count || 0);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [apiurl]);

  return (
    <div id="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row mt-4">
            {/* Total Users */}
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h3 className="card-title">Total Users</h3>
                  <p className="display-4 mt-10">{totalUsers}</p>
                </div>
              </div>
            </div>

            {/* Total Templates */}
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h3 className="card-title">Total Templates</h3>
                  <p className="display-4 mt-10">{totalTemplates}</p>
                </div>
              </div>
            </div>

            {/* Total Frames */}
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h3 className="card-title">Total Frames</h3>
                  <p className="display-4 mt-10">{totalFrames}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
