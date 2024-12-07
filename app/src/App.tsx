import AllProducts from "./component/AllProducts";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductItem from "./component/Prodict";
import Favourite from "./component/favourite";
import Change from "./component/Change";
import CreateProduct from "./component/createProduct";
function App() {

  return (
    <div>
<BrowserRouter>  
<Routes>     
    <Route path ="/" element = { <AllProducts/>   } />
    <Route path="/product/:id" element = {      <ProductItem/>  } />
    <Route path = "/favourite" element = {<Favourite/>}/>
    <Route path = "/refine" element = {<Change/>} />
    <Route path = "/create" element = {<CreateProduct/>}/>
  </Routes>
     </BrowserRouter>

    </div>
  );
}
export default App;
