import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import ListProduct from './Pages/Product/ProductList';
import AddProduct from './Pages/Product/AddProduct';
import Signup from './Pages/Auth/Signup';
import AddSale from './Pages/Sales/AddSale';
import ListSale from './Pages/Sales/ListSale';
// import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">

      {/* pending work */}
{/* 
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
      </div>
      <AddSale/> */}

      <ListSale/>

      {/* sign up form  */}
      {/* <Signup/> */}

      {/* to show the add product  */}

      {/* <Navbar /> 

     <div style={{ display: "flex" }}>

      <Sidebar />
      </div> 

      <AddProduct />  */}

      {/* to show the list product  */}

      {/* <ListProduct/> */}



      {/* <AppRoutes /> */}


      {/* to show the dashboard component  */}



      {/* <Navbar />


        <div style={{ display: "flex" }}>

      <Sidebar />


      
        </div>
        <div style={{ marginLeft: "100px", padding: "40px", width: "100%" }}>
          <Dashboard/>
        </div> */}
    </div>
  );
}

export default App;
