import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList';
import Product from './components/Product';
import NotFound from './components/NotFound';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path='/:product' element={<ProductList />} />
        <Route path='/:product/:id' element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
