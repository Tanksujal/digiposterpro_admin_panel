import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Add_templates from "./pages/templates/add_templates";
import View_templates from "./pages/templates/view_templates";
import Edit_templates from "./pages/templates/edit_templates";
import Viewimage_templates from "./pages/templates/viewimage_templates";
import UserProtected from "./pages/protectedRoutes/userprotectedRoutes";
import Add_Frames from "./pages/frames/add_frames";
import View_frames from "./pages/frames/view_frames";
import GetFeedback from "./pages/feedback/getfeedback";
import Getusers from "./pages/users/getusers";
import Add_Banner from "./pages/banner/addbanner";
import Viewbanner from "./pages/banner/viewbanner";
function App() {
  return (
   <>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<UserProtected/>}>
               <Route path="/dashboard" element={<Dashboard/>} />
               <Route path="/add_templates" element={<Add_templates/>}/>
               <Route path="/view_templates" element={<View_templates/>}/>
               <Route path="/edit_templates/:id" element={<Edit_templates/>}/>
               <Route path="/viewimage_templates/:id" element={<Viewimage_templates/>}/>
               <Route path="/view_frames" element={<View_frames/>}/>
               <Route path="/Add_Frames" element={<Add_Frames/>}/>
               <Route path="/feedback" element={<GetFeedback/>}/>
               <Route path="/users" element={<Getusers/>}/>
               <Route path="/addbanner" element={<Add_Banner/>}/>
               <Route path="/viewbanner" element={<Viewbanner/>}/>
         </Route>
         </Routes>
      </BrowserRouter>
   </>
  );
}
export default App