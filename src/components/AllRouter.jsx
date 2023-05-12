import {Route,Routes} from "react-router-dom";
import Home from "./Home/Home";
import AddContact from "./AddContact/AddContact";
import EditContact from "./EditContact/EditContact";

export default function AllRoutes(){
      return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/addcontact" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      )
}

