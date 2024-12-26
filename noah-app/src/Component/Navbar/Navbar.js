import React from "react";
import "./Navbar.css"
import { FaBell, FaCog, FaEnvelope, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="search-bar">
          <input type="text" className="NavSearch" placeholder="Search....." />
        </div>
        <ul className="menu">
          <li>Dashboard</li>
          <li>Product</li>
          <li>Sales</li>
          <li>Stock</li>
        </ul>
      </div>

      <div className="navbar-right">
        <FaBell className="icon" />
        <FaEnvelope className="icon" />
        <FaCog className="icon" />
        <FaUser className="icon" />
      </div>
    </div>
  );
};

export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import "./Navbar.css";
// import { FaBell, FaCog, FaEnvelope, FaUser } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="navbar-left">
//         <div className="search-bar">
//           <input type="text" placeholder="Search....." />
//         </div>
//         <ul className="menu">
//           <li><Link to="/">Dashboard</Link></li> {/* Link to Dashboard */}
//           <li><Link to="/add-product">Product</Link></li> {/* Link to AddProduct */}
//           <li><Link to="/add-sale">Sales</Link></li> {/* Link to AddSale */}
//           <li><Link to="/stock">Stock</Link></li> {/* Link to Stock */}
//         </ul>
//       </div>
//       <div className="navbar-right">
//         <FaBell className="icon" />
//         <FaEnvelope className="icon" />
//         <FaCog className="icon" />
//         <FaUser className="icon" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
