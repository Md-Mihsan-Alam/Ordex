// Sidebar.jsx
import React, { useState } from "react";
import './Sidebar.css';
import { ImTruck } from "react-icons/im";


const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2><ImTruck/> OrderX</h2><br />
        <h3>NOAH</h3>
      </div>

      <ul className="sidemenu">

        <li>
        <div className="menu-item" onClick={() => toggleMenu("dashboard")}>
            Dashboard
          </div>
        </li>

        <li>
          <div className="menu-item" onClick={() => toggleMenu("products")}>
            Products
          </div>
          {activeMenu === "products" && (
            <ul className="submenu">
              <li>Add Product</li>
              
              <li>List Product</li>
            </ul>
          )}
        </li>

        <li>
          <div className="menu-item" onClick={() => toggleMenu("sales")}>
            Sales
          </div>
          {activeMenu === "sales" && (
            <ul className="submenu">
              <li>Add Sale</li>
              <li>List Sale</li>
              <li>Sale Return</li>
              <li>Return List</li>
            </ul>
          )}
        </li>

        <li>
          <div className="menu-item" onClick={() => toggleMenu("stock")}>
            Stock
          </div>
          {activeMenu === "stock" && (
            <ul className="submenu">
              <li>Stock List</li>
            </ul>
          )}
        </li>

      </ul>
      
    </div>
  );
};

export default Sidebar;



// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import './Sidebar.css';
// import { ImTruck } from "react-icons/im";

// const Sidebar = () => {
//   const [activeMenu, setActiveMenu] = useState(null);

//   const toggleMenu = (menu) => {
//     setActiveMenu(activeMenu === menu ? null : menu);
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2><ImTruck/> OrderX</h2>
//         <h2>NOAH</h2>
//       </div>
//       <ul className="sidemenu">
//         <li>
//           <div className="menu-item" onClick={() => toggleMenu("Dashboard")}>
//             <Link to="/">Dashboard</Link> {/* Link to Dashboard */}
//           </div>
//         </li>
//         <li>
//           <div className="menu-item" onClick={() => toggleMenu("products")}>
//             Products
//           </div>
//           {activeMenu === "products" && (
//             <ul className="submenu">
//               <li><Link to="/add-product">Add Product</Link></li> {/* Link to AddProduct */}
//               <li><Link to="/list-product">List Product</Link></li>
//             </ul>
//           )}
//         </li>
//         <li>
//           <div className="menu-item" onClick={() => toggleMenu("sales")}>
//             Sales
//           </div>
//           {activeMenu === "sales" && (
//             <ul className="submenu">
//               <li><Link to="/add-sale">Add Sale</Link></li> {/* Link to AddSale */}
//               <li>List Sale</li>
//               <li>Sale Return</li>
//               <li>Return List</li>
//             </ul>
//           )}
//         </li>
//         <li>
//           <div className="menu-item" onClick={() => toggleMenu("stock")}>
//             Stock
//           </div>
//           {activeMenu === "stock" && (
//             <ul className="submenu">
//               <li><Link to="/stock">Stock List</Link></li> {/* Link to Stock */}
//             </ul>
//           )}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
