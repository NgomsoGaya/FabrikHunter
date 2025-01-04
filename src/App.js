import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ShopCategory } from './Pages/ShopCategory';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory category="men"/>}/>
        <Route path='/womens' element={<ShopCategory category="women"/>}/>
        <Route path='/kids' element={<ShopCategory category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
            <Route path=":productID" element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
       </Routes>
       <Footer />
      </BrowserRouter>
   
    </div>
  );
}

export default App;
