// import React, { useState, useEffect } from 'react';
// import "./Product.css";
// import { saveProductsToServer } from "../../utils/api";

// const AddProduct = () => {
//   const [productName, setProductName] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   const [unit, setUnit] = useState('');
//   const [businessLocation, setBusinessLocation] = useState('');
//   const [barcodeType, setBarcodeType] = useState(generateBarcode());
//   const [warranty, setWarranty] = useState('');
//   const [productImage, setProductImage] = useState(null);
//   const [brands, setBrands] = useState([]);

//   const categoryBrands = {
//     Electronics: ["Samsung", "Sony", "Xiaomi", "Apple", "Dell", "HP", "Acer", "Asus"],
//     Furniture: ["IKEA", "Otobi", "Partex", "Navana", "Hatil", "Akhtar", "Otobi", "Pik"],
//     Clothing: ["Zara", "Le Reve", "Rise Brand", "Yellow", "Ecstasy", "Nipun", "Anjan's"],
//     "Home Appliances": ["Philips", "Panasonic", "Walton", "Singer", "Hitachi", "Sharp", "LG"],
//     "Beauty Products": ["The Body Shop", "Loreal", "Kylie", "MAC", "Maybelline", "Revlon", "Nivea"],
//   };

//   useEffect(() => {
//     if (category) {
//       setBrands(categoryBrands[category] || []);
//     } else {
//       setBrands([]);
//     }
//   }, [category]);

//   function generateBarcode() {
//     return `Code 128 (${Math.random().toString(36).substring(2, 10).toUpperCase()})`;
//   }

//   const handleImageChange = (e) => {
//     setProductImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const product = {
//       productName,
//       brand,
//       category,
//       unit,
//       businessLocation,
//       barcodeType,
//       warranty,
//       productImage: productImage ? productImage.name : null,
//     };

//     try {
//       await saveProductsToServer(product);
//       alert("Product added successfully..!");
//       setBarcodeType(generateBarcode()); 
//       setProductName('');
//       setBrand('');
//       setCategory('');
//       setUnit('');
//       setBusinessLocation('');
//       setWarranty('');
//       setProductImage(null);
//     } catch (error) {
//       alert("Failed to add product.");
//     }
//   };

//   const units = ["Piece", "Kilogram", "Liter", "Box", "Packet", "Set", "Meter"];
//   const businessLocations = [
//     "Dhanmondi", "Gulshan", "Banani", "Uttara", "Mirpur-12", "Mirpur-11", "Mirpur-10", "Mirpur-13", "Pallabi", "DOSH", "Mohakhali", "Bashundhara", "Shyamoli", "Farmgate", "Panthapath"];
//   const warranties = ["1 Month", "3 Months", "6 Months", "10 Months", "1 Year", "2 Years", "3 Years", "5 Years", "Lifetime!"];

//   return (
//     <div className="add-product">
//       <h1>Add New Product</h1>

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Product Name:*</label>
//           <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
//         </div>

//         <div className="form-group">
//           <label>Barcode Type:*</label>
//           <input type="text" value={barcodeType} disabled/>
//         </div>

//         <div className="form-group">
//           <label>Unit:*</label>
//           <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
//             <option value="">Please Select</option>
//             {units.map((u, index) => (
//               <option key={index} value={u}>{u}</option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Category:</label>
//           <select value={category} onChange={(e) => setCategory(e.target.value)} required>
//             <option value="">Please Select</option>
//             {Object.keys(categoryBrands).map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Brand:</label>
//           <select value={brand} onChange={(e) => setBrand(e.target.value)} required>
//             <option value="">Please Select</option>
//             {brands.map((b) => (
//               <option key={b} value={b}>{b}</option>
//             ))}
//           </select>
//         </div>


//         <div className="form-group">
//           <label>Business Location:</label>
//           <select value={businessLocation} onChange={(e) => setBusinessLocation(e.target.value)} required>
//             <option value="">Please Select</option>
//             {businessLocations.map((loc, index) => (
//               <option key={index} value={loc}>{loc}</option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Product Image:</label>
//           <input type="file" onChange={handleImageChange} accept="image/*" />
//           <small>Max File size: 100 MB<br />Aspect ratio should be 1:1</small>
//         </div>

//         <div className="form-group">
//           <label>Warranty:*</label>
//           <select value={warranty} onChange={(e) => setWarranty(e.target.value)} required>
//             <option value="">Please Select</option>
//             {warranties.map((w, index) => (
//               <option key={index} value={w}>{w}</option>
//             ))}
//           </select>
//         </div>

//         <div className="btn">
//           <button type="submit">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;





import React, { useState, useEffect } from "react";
import "./Product.css";
import { saveProductsToServer } from "../../utils/api";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [barcodeType, setBarcodeType] = useState(generateBarcode());
  const [warranty, setWarranty] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [brands, setBrands] = useState([]);

  const categoryBrands = {
    Electronics: ["Samsung", "Sony", "Xiaomi", "Apple", "Dell", "HP", "Acer", "Asus"],
    Furniture: ["IKEA", "Otobi", "Partex", "Navana", "Hatil", "Akhtar", "Otobi", "Pik"],
    Clothing: ["Zara", "Le Reve", "Rise Brand", "Yellow", "Ecstasy", "Nipun", "Anjan's"],
    "Home Appliances": ["Philips", "Panasonic", "Walton", "Singer", "Hitachi", "Sharp", "LG"],
    "Beauty Products": ["The Body Shop", "Loreal", "Kylie", "MAC", "Maybelline", "Revlon", "Nivea"],
  };

  useEffect(() => {
    if (category) {
      setBrands(categoryBrands[category] || []);
    } else {
      setBrands([]);
    }
  }, [category]);

  function generateBarcode() {
    return `Code 128 (${Math.random().toString(36).substring(2, 10).toUpperCase()})`;
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      productName,
      brand,
      category,
      unit,
      businessLocation,
      barcodeType,
      warranty,
      productImage: productImage ? productImage.name : null,
    };

    try {
      await saveProductsToServer(product);
      alert("Product added successfully!");
      setBarcodeType(generateBarcode());
      setProductName("");
      setBrand("");
      setCategory("");
      setUnit("");
      setBusinessLocation("");
      setWarranty("");
      setProductImage(null);
    } catch (error) {
      alert("Failed to add product.");
    }
  };

  const units = ["Piece", "Kilogram", "Liter", "Box", "Packet", "Set", "Meter"];
  const businessLocations = [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Uttara",
    "Mirpur-12",
    "Mirpur-11",
    "Mirpur-10",
    "Mirpur-13",
    "Pallabi",
    "DOSH",
    "Mohakhali",
    "Bashundhara",
    "Shyamoli",
    "Farmgate",
    "Panthapath",
  ];
  const warranties = ["1 Month", "3 Months", "6 Months", "10 Months", "1 Year", "2 Years", "3 Years", "5 Years", "Lifetime!"];

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Product</h1>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="add-product-field">
          <label>Product Name:*</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>

        <div className="add-product-field">
          <label>Barcode Type:*</label>
          <input type="text" value={barcodeType} disabled />
        </div>

        <div className="add-product-field">
          <label>Unit:*</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
            <option value="">Please Select</option>
            {units.map((u, index) => (
              <option key={index} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="add-product-field">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Please Select</option>
            {Object.keys(categoryBrands).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="add-product-field">
          <label>Brand:</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} required>
            <option value="">Please Select</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="add-product-field">
          <label>Business Location:</label>
          <select value={businessLocation} onChange={(e) => setBusinessLocation(e.target.value)} required>
            <option value="">Please Select</option>
            {businessLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="add-product-field">
          <label>Product Image:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <small>Max File size: 100 MB<br />Aspect ratio should be 1:1</small>
        </div>

        <div className="add-product-field">
          <label>Warranty:*</label>
          <select value={warranty} onChange={(e) => setWarranty(e.target.value)} required>
            <option value="">Please Select</option>
            {warranties.map((w, index) => (
              <option key={index} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className="add-product-buttons">
          <button type="submit" className="add-product-save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
