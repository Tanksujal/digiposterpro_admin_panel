import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Add_templates from "./pages/templates/add_templates";
import View_templates from "./pages/templates/view_templates";
import Edit_templates from "./pages/templates/edit_templates";
import Viewimage_templates from "./pages/templates/viewimage_templates";
function App() {
  return (
   <>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/add_templates" element={<Add_templates/>}/>
          <Route path="/view_templates" element={<View_templates/>}/>
          <Route path="/edit_templates/:id" element={<Edit_templates/>}/>
          <Route path="/viewimage_templates/:id" element={<Viewimage_templates/>}/>
         </Routes>
      </BrowserRouter>
   </>
  );
}
export default App