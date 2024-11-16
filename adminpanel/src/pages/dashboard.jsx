import Footer from "../components/footer"
import Header from "../components/header"
import Sidebar from "../components/sidebar"

const Dashboard = () => {
  return (
    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
    data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
      <Header/>
      <Sidebar/>
      <Footer/>
    </div>
  )
}
export default Dashboard