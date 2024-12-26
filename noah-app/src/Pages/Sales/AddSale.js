// import React, { useState } from "react";
// import "./Sales.css";

// const AddSale = () => {
//   const [products, setProducts] = useState([
//     { productName: "", quantity: 0, description: "", unitPrice: 0, netAmount: 0, stock: 0, warranty: "" },
//   ]);

//   const [formDetails, setFormDetails] = useState({
//     customerName: "",
//     address: "",
//     invoiceNumber: "",
//     previousDues: 0,
//     date: "",
//     remarks: "",
//     nextPaymentDate: "",
//     chalanDescription: "",
//   });

//   const [account, setAccount] = useState({
//     transportCost: 0,
//     discountAmount: 0,
//     discountPercentage: 0,
//     cashReceived: 0,
//     dueAmount: 0,
//     paymentMethod: "",
//   });

//   const handleProductChange = (index, field, value) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;

//     if (field === "quantity" || field === "unitPrice") {
//       updatedProducts[index].netAmount =
//         updatedProducts[index].quantity * updatedProducts[index].unitPrice;
//     }

//     setProducts(updatedProducts);
//   };

//   const addProductRow = () => {
//     setProducts([
//       ...products,
//       { productName: "", quantity: 0, description: "", unitPrice: 0, netAmount: 0, stock: 0, warranty: "" },
//     ]);
//   };

//   const removeProductRow = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//   };

//   const calculateTotal = () => {
//     const totalProductAmount = products.reduce((acc, product) => acc + product.netAmount, 0);
//     const total =
//       totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
//     return total - Number(account.cashReceived);
//   };

//   const handleSubmit = () => {
//     // Placeholder for PDF generation
//     console.log("Generating PDF with data:", { formDetails, products, account });
//     alert("PDF generated (implement PDF functionality here)");
//   };

//   const handleClose = () => {
//     setFormDetails({
//       customerName: "",
//       address: "",
//       invoiceNumber: "",
//       previousDues: 0,
//       date: "",
//       remarks: "",
//       nextPaymentDate: "",
//       chalanDescription: "",
//     });
//     setProducts([
//       { productName: "", quantity: 0, description: "", unitPrice: 0, netAmount: 0, stock: 0, warranty: "" },
//     ]);
//     setAccount({
//       transportCost: 0,
//       discountAmount: 0,
//       discountPercentage: 0,
//       cashReceived: 0,
//       dueAmount: 0,
//       paymentMethod: "",
//     });
//   };

//   return (
//     <div className="add-sale">
//       <h2>Add Sale</h2>
      
//       {/* Form Section */}
//       <div className="addsale-form-section">
//         {["Customer Name", "Address", "Invoice Number", "Previous Dues", "Date", "Remarks", "Next Payment Date", "Chalan Description"].map((label, idx) => (
//           <div className="addsale-form-group" key={idx}>
//             <label>{label}</label>
//             <input
//               type={label === "Date" || label === "Next Payment Date" ? "date" : "text"}
//               value={formDetails[label.toLowerCase().replace(/\s+/g, "")]}
//               onChange={(e) =>
//                 setFormDetails({ ...formDetails, [label.toLowerCase().replace(/\s+/g, "")]: e.target.value })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* Product Section */}
//       <div className="addsale-product-section">
//         <h3>Products</h3>
//         {products.map((product, index) => (
//           <div className="addsale-product-row" key={index}>
//             {["Product Name", "Quantity", "Description", "Unit Price", "Net Amount", "Stock", "Warranty"].map(
//               (field, idx) => (
//                 <input
//                   key={idx}
//                   type={["Quantity", "Unit Price", "Net Amount", "Stock"].includes(field) ? "number" : "text"}
//                   placeholder={field}
//                   value={product[field.toLowerCase().replace(/\s+/g, "")]}
//                   disabled={field === "Net Amount"}
//                   onChange={(e) =>
//                     handleProductChange(index, field.toLowerCase().replace(/\s+/g, ""), e.target.value)
//                   }
//                 />
//               )
//             )}
//             <button className="addsale-remove-btn" onClick={() => removeProductRow(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button className="addsale-add-btn" onClick={addProductRow}>
//           + Add Product
//         </button>
//       </div>

//       {/* Account Section */}
//       <div className="addsale-account-section">
//         <h3>+ Account</h3>
//         {["Transport Cost", "Discount Amount", "Cash Received", "Discount Percentage", "Payment Method"].map(
//           (label, idx) => (
//             <div className="form-group" key={idx}>
//               <label>{label}</label>
//               {label === "Payment Method" ? (
//                 <select
//                   value={account.paymentMethod}
//                   onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
//                 >
//                   <option value="">Select Payment Method</option>
//                   <option value="cash">Cash</option>
//                   <option value="card">Card</option>
//                   <option value="bank-transfer">Bank Transfer</option>
//                 </select>
//               ) : (
//                 <input
//                   type="number"
//                   value={account[label.toLowerCase().replace(/\s+/g, "")]}
//                   onChange={(e) =>
//                     setAccount({
//                       ...account,
//                       [label.toLowerCase().replace(/\s+/g, "")]: Number(e.target.value),
//                       ...(label === "Discount Percentage"
//                         ? { discountAmount: (calculateTotal() * Number(e.target.value)) / 100 }
//                         : {}),
//                     })
//                   }
//                 />
//               )}
//             </div>
//           )
//         )}
//         <div className="form-group">
//           <label>Due Amount</label>
//           <input type="number" value={calculateTotal()} disabled />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="addsale-action-buttons">
//         <button className="addsale-submit-btn" onClick={handleSubmit}>
//           Submit
//         </button>
//         <button className="addsale-close-btn" onClick={handleClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSale;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";  // Import jsPDF
// import "./Sales.css";

// const AddSale = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([
//     { productName: "", quantity: 0, warranty: "", unit: "", netAmount: 0, stock: 0 },
//   ]);

//   const [formDetails, setFormDetails] = useState({
//     customerName: "",
//     address: "",
//     invoiceNumber: "",
//     previousDues: 0,
//     date: "",
//     remarks: "",
//     nextPaymentDate: "",
//     chalanDescription: "",
//   });

//   const [account, setAccount] = useState({
//     transportCost: 0,
//     discountAmount: 0,
//     discountPercentage: 0,
//     cashReceived: 0,
//     dueAmount: 0,
//     paymentMethod: "",
//   });

//   // Fetch products from the server
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle product selection from dropdown
//   const handleProductChange = (index, value) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].productName = value;

//     // Find the product in the fetched products
//     const selectedProduct = products.find((product) => product.productName === value);

//     // Populate the details of the selected product
//     if (selectedProduct) {
//       updatedProducts[index] = {
//         ...updatedProducts[index],
//         warranty: selectedProduct.warranty,
//         unit: selectedProduct.unit,
//         stock: selectedProduct.stock,
//         netAmount: selectedProduct.unitPrice * updatedProducts[index].quantity,
//       };
//     }

//     setSelectedProducts(updatedProducts);
//   };

//   const handleProductQuantityChange = (index, quantity) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].quantity = quantity;
//     updatedProducts[index].netAmount = quantity * updatedProducts[index].unitPrice;
//     setSelectedProducts(updatedProducts);
//   };

//   const addProductRow = () => {
//     setSelectedProducts([
//       ...selectedProducts,
//       { productName: "", quantity: 0, warranty: "", unit: "", netAmount: 0, stock: 0 },
//     ]);
//   };

//   const removeProductRow = (index) => {
//     const updatedProducts = selectedProducts.filter((_, i) => i !== index);
//     setSelectedProducts(updatedProducts);
//   };

//   const calculateTotal = () => {
//     const totalProductAmount = selectedProducts.reduce((acc, product) => acc + product.netAmount, 0);
//     const total =
//       totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
//     return total;
//   };

//   const calculateDueAmount = () => {
//     const totalAmount = calculateTotal();
//     return totalAmount - Number(account.cashReceived);
//   };

//   // Handle PDF generation and download
//   const handleSubmit = () => {
//     const doc = new jsPDF();

//     // Add Sale Information
//     doc.text("Sale Invoice", 20, 10);
//     doc.text(`Customer Name: ${formDetails.customerName}`, 20, 20);
//     doc.text(`Invoice Number: ${formDetails.invoiceNumber}`, 20, 30);
//     doc.text(`Address: ${formDetails.address}`, 20, 40);
//     doc.text(`Date: ${formDetails.date}`, 20, 50);
//     doc.text(`Remarks: ${formDetails.remarks}`, 20, 60);
//     doc.text(`Next Payment Date: ${formDetails.nextPaymentDate}`, 20, 70);

//     // Add Products List
//     doc.text("Products:", 20, 80);
//     selectedProducts.forEach((product, index) => {
//       doc.text(
//         `${index + 1}. ${product.productName} | Quantity: ${product.quantity} | Warranty: ${product.warranty} | Unit: ${product.unit} | Net Amount: ${product.netAmount}`,
//         20,
//         90 + (index * 10)
//       );
//     });

//     // Add Account Information
//     doc.text("Account Information:", 20, 90 + (selectedProducts.length * 10));
//     doc.text(`Transport Cost: ${account.transportCost}`, 20, 100 + (selectedProducts.length * 10));
//     doc.text(`Discount Amount: ${account.discountAmount}`, 20, 110 + (selectedProducts.length * 10));
//     doc.text(`Cash Received: ${account.cashReceived}`, 20, 120 + (selectedProducts.length * 10));
//     doc.text(`Payment Method: ${account.paymentMethod}`, 20, 130 + (selectedProducts.length * 10));

//     // Add Due Amount
//     doc.text(`Due Amount: ${calculateDueAmount()}`, 20, 140 + (selectedProducts.length * 10));

//     // Save PDF
//     doc.save(`Invoice_${formDetails.invoiceNumber}.pdf`);
//   };

//   const handleClose = () => {
//     setFormDetails({
//       customerName: "",
//       address: "",
//       invoiceNumber: "",
//       previousDues: 0,
//       date: "",
//       remarks: "",
//       nextPaymentDate: "",
//       chalanDescription: "",
//     });
//     setSelectedProducts([ { productName: "", quantity: 0, warranty: "", unit: "", netAmount: 0, stock: 0 } ]);
//     setAccount({
//       transportCost: 0,
//       discountAmount: 0,
//       discountPercentage: 0,
//       cashReceived: 0,
//       dueAmount: 0,
//       paymentMethod: "",
//     });
//   };

//   return (
//     <div className="add-sale">
//       <h2>Add Sale</h2>

//       {/* Form Section */}
//       <div className="addsale-form-section">
//         {["Customer Name", "Address", "Invoice Number", "Previous Dues", "Date", "Remarks", "Next Payment Date", "Chalan Description"].map((label, idx) => (
//           <div className="addsale-form-group" key={idx}>
//             <label>{label}</label>
//             <input
//               type={label === "Date" || label === "Next Payment Date" ? "date" : "text"}
//               value={formDetails[label.toLowerCase().replace(/\s+/g, "")]}
//               onChange={(e) =>
//                 setFormDetails({ ...formDetails, [label.toLowerCase().replace(/\s+/g, "")]: e.target.value })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* Product Section */}
//       <div className="addsale-product-section">
//         <h3>Products</h3>
//         {selectedProducts.map((product, index) => (
//           <div className="addsale-product-row" key={index}>
//             <select
//               value={product.productName}
//               onChange={(e) => handleProductChange(index, e.target.value)}
//             >
//               <option value="">Select Product</option>
//               {products.map((productOption) => (
//                 <option key={productOption.id} value={productOption.productName}>
//                   {productOption.productName}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               value={product.quantity}
//               onChange={(e) => handleProductQuantityChange(index, e.target.value)}
//               placeholder="Quantity"
//             />
            
//             <input
//               type="text"
//               value={product.warranty}
//               disabled
//               placeholder="Warranty"
//             />
//             <input
//               type="text"
//               value={product.unit}
//               disabled
//               placeholder="Unit"
//             />

//             <button className="addsale-remove-btn" onClick={() => removeProductRow(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button className="addsale-add-btn" onClick={addProductRow}>
//           + Add Product
//         </button>
//       </div>

//       {/* Account Section */}
//       <div className="addsale-account-section">
//         <h3>+ Account</h3>
//         {["Transport Cost", "Discount Amount", "Cash Received", "Discount Percentage", "Payment Method"].map((label, idx) => (
//           <div className="form-group" key={idx}>
//             <label>{label}</label>
//             {label === "Payment Method" ? (
//               <select
//                 value={account.paymentMethod}
//                 onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="cash">Cash</option>
//                 <option value="card">Card</option>
//                 <option value="bank-transfer">Bank Transfer</option>
//               </select>
//             ) : (
//               <input
//                 type="number"
//                 value={account[label.toLowerCase().replace(/\s+/g, "")]}
//                 onChange={(e) =>
//                   setAccount({
//                     ...account,
//                     [label.toLowerCase().replace(/\s+/g, "")]: Number(e.target.value),
//                     ...(label === "Discount Percentage"
//                       ? { discountAmount: (calculateTotal() * Number(e.target.value)) / 100 }
//                       : {}),
//                   })
//                 }
//               />
//             )}
//           </div>
//         ))}
//         <div className="form-group">
//           <label>Due Amount</label>
//           <input type="number" value={calculateDueAmount()} disabled />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="addsale-action-buttons">
//         <button className="addsale-submit-btn" onClick={handleSubmit}>
//           Submit
//         </button>
//         <button className="addsale-close-btn" onClick={handleClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSale;









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";  // Import jsPDF
// import "./Sales.css";

// const AddSale = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([
//     { productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 },
//   ]);

//   const [formDetails, setFormDetails] = useState({
//     customerName: "",
//     address: "",
//     invoiceNumber: "",
//     previousDues: 0,
//     date: "",
//     remarks: "",
//     nextPaymentDate: "",
//     chalanDescription: "",
//   });

//   const [account, setAccount] = useState({
//     transportCost: 0,
//     discountAmount: 0,
//     discountPercentage: 0,
//     cashReceived: 0,
//     dueAmount: 0,
//     paymentMethod: "",
//   });

//   // Fetch products from the server
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle product selection from dropdown
//   const handleProductChange = (index, value) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].productName = value;

//     // Find the product in the fetched products
//     const selectedProduct = products.find((product) => product.productName === value);

//     // Populate the details of the selected product
//     if (selectedProduct) {
//       updatedProducts[index] = {
//         ...updatedProducts[index],
//         warranty: selectedProduct.warranty,
//         unitPrice: selectedProduct.unitPrice,
//         stock: selectedProduct.stock,
//         netAmount: selectedProduct.unitPrice * updatedProducts[index].quantity,
//       };
//     }

//     setSelectedProducts(updatedProducts);
//   };

//   const handleProductQuantityChange = (index, quantity) => {
//     const updatedProducts = [...selectedProducts];
//     updatedProducts[index].quantity = quantity;
//     updatedProducts[index].netAmount = quantity * updatedProducts[index].unitPrice;
//     setSelectedProducts(updatedProducts);
//   };

//   const addProductRow = () => {
//     setSelectedProducts([
//       ...selectedProducts,
//       { productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 },
//     ]);
//   };

//   const removeProductRow = (index) => {
//     const updatedProducts = selectedProducts.filter((_, i) => i !== index);
//     setSelectedProducts(updatedProducts);
//   };

//   const calculateTotal = () => {
//     const totalProductAmount = selectedProducts.reduce((acc, product) => acc + product.netAmount, 0);
//     const total =
//       totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
//     return total;
//   };

//   const calculateDueAmount = () => {
//     const totalAmount = calculateTotal();
//     return totalAmount - Number(account.cashReceived);
//   };

//   // Handle PDF generation and download
//   const handleSubmit = () => {
//     const doc = new jsPDF();

//     // Add Sale Information
//     doc.text("Sale Invoice", 20, 10);
//     doc.text(`Customer Name: ${formDetails.customerName}`, 20, 20);
//     doc.text(`Invoice Number: ${formDetails.invoiceNumber}`, 20, 30);
//     doc.text(`Address: ${formDetails.address}`, 20, 40);
//     doc.text(`Date: ${formDetails.date}`, 20, 50);
//     doc.text(`Remarks: ${formDetails.remarks}`, 20, 60);
//     doc.text(`Next Payment Date: ${formDetails.nextPaymentDate}`, 20, 70);

//     // Add Products List
//     doc.text("Products:", 20, 80);
//     selectedProducts.forEach((product, index) => {
//       doc.text(
//         `${index + 1}. ${product.productName} | Quantity: ${product.quantity} | Warranty: ${product.warranty} | Unit Price: ${product.unitPrice} | Net Amount: ${product.netAmount}`,
//         20,
//         90 + (index * 10)
//       );
//     });

//     // Add Account Information
//     doc.text("Account Information:", 20, 90 + (selectedProducts.length * 10));
//     doc.text(`Transport Cost: ${account.transportCost}`, 20, 100 + (selectedProducts.length * 10));
//     doc.text(`Discount Amount: ${account.discountAmount}`, 20, 110 + (selectedProducts.length * 10));
//     doc.text(`Cash Received: ${account.cashReceived}`, 20, 120 + (selectedProducts.length * 10));
//     doc.text(`Payment Method: ${account.paymentMethod}`, 20, 130 + (selectedProducts.length * 10));

//     // Add Due Amount
//     doc.text(`Due Amount: ${calculateDueAmount()}`, 20, 140 + (selectedProducts.length * 10));

//     // Save PDF
//     doc.save(`Invoice_${formDetails.invoiceNumber}.pdf`);
//   };

//   const handleClose = () => {
//     setFormDetails({
//       customerName: "",
//       address: "",
//       invoiceNumber: "",
//       previousDues: 0,
//       date: "",
//       remarks: "",
//       nextPaymentDate: "",
//       chalanDescription: "",
//     });
//     setSelectedProducts([ { productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 } ]);
//     setAccount({
//       transportCost: 0,
//       discountAmount: 0,
//       discountPercentage: 0,
//       cashReceived: 0,
//       dueAmount: 0,
//       paymentMethod: "",
//     });
//   };

//   return (
//     <div className="add-sale">
//       <h2>Add Sale</h2>

//       {/* Form Section */}
//       <div className="addsale-form-section">
//         {["Customer Name", "Address", "Invoice Number", "Previous Dues", "Date", "Remarks", "Next Payment Date", "Chalan Description"].map((label, idx) => (
//           <div className="addsale-form-group" key={idx}>
//             <label>{label}</label>
//             <input
//               type={label === "Date" || label === "Next Payment Date" ? "date" : "text"}
//               value={formDetails[label.toLowerCase().replace(/\s+/g, "")]}
//               onChange={(e) =>
//                 setFormDetails({ ...formDetails, [label.toLowerCase().replace(/\s+/g, "")]: e.target.value })
//               }
//             />
//           </div>
//         ))}
//       </div>

//       {/* Product Section */}
//       <div className="addsale-product-section">
//         <h3>Products</h3>
//         {selectedProducts.map((product, index) => (
//           <div className="addsale-product-row" key={index}>
//             <select
//               value={product.productName}
//               onChange={(e) => handleProductChange(index, e.target.value)}
//             >
//               <option value="">Select Product</option>
//               {products.map((productOption) => (
//                 <option key={productOption.id} value={productOption.productName}>
//                   {productOption.productName}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               value={product.quantity}
//               onChange={(e) => handleProductQuantityChange(index, e.target.value)}
//               placeholder="Quantity"
//             />
            
//             <input
//               type="text"
//               value={product.warranty}
//               disabled
//               placeholder="Warranty"
//             />
//             <input
//               type="number"
//               value={product.unitPrice}
//               disabled
//               placeholder="Unit Price"
//             />
//             <input
//               type="number"
//               value={product.netAmount}
//               disabled
//               placeholder="Net Amount"
//             />

//             <button className="addsale-remove-btn" onClick={() => removeProductRow(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button className="addsale-add-btn" onClick={addProductRow}>
//           + Add Product
//         </button>
//       </div>

//       {/* Account Section */}
//       <div className="addsale-account-section">
//         <h3>+ Account</h3>
//         {["Transport Cost", "Discount Amount", "Cash Received", "Discount Percentage", "Payment Method"].map((label, idx) => (
//           <div className="form-group" key={idx}>
//             <label>{label}</label>
//             {label === "Payment Method" ? (
//               <select
//                 value={account.paymentMethod}
//                 onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="cash">Cash</option>
//                 <option value="card">Card</option>
//                 <option value="bank-transfer">Bank Transfer</option>
//               </select>
//             ) : (
//               <input
//                 type="number"
//                 value={account[label.toLowerCase().replace(/\s+/g, "")]}
//                 onChange={(e) =>
//                   setAccount({
//                     ...account,
//                     [label.toLowerCase().replace(/\s+/g, "")]: Number(e.target.value),
//                     ...(label === "Discount Percentage"
//                       ? { discountAmount: (calculateTotal() * Number(e.target.value)) / 100 }
//                       : {}),
//                   })
//                 }
//               />
//             )}
//           </div>
//         ))}

//         {/* Display Total */}
//         <div className="form-group">
//           <label>Total</label>
//           <input type="number" value={calculateTotal()} disabled />
//         </div>

//         {/* Display Due Amount */}
//         <div className="form-group">
//           <label>Due Amount</label>
//           <input type="number" value={calculateDueAmount()} disabled />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="addsale-action-buttons">
//         <button className="addsale-submit-btn" onClick={handleSubmit}>
//           Submit
//         </button>
//         <button className="addsale-close-btn" onClick={handleClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSale;





import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";  // Import jsPDF
import "./Sales.css";

const AddSale = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([
    { productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 },
  ]);

  const [formDetails, setFormDetails] = useState({
    customerName: "",
    address: "",
    invoiceNumber: "",
    previousDues: 0,
    date: "",
    remarks: "",
    nextPaymentDate: "",
    chalanDescription: "",
  });

  const [account, setAccount] = useState({
    transportCost: 0,
    discountAmount: 0,
    discountPercentage: 0,
    cashReceived: 0,
    dueAmount: 0,
    paymentMethod: "",
  });

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product selection from dropdown
  const handleProductChange = (index, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].productName = value;

    // Find the product in the fetched products
    const selectedProduct = products.find((product) => product.productName === value);

    // Populate the details of the selected product
    if (selectedProduct) {
      updatedProducts[index] = {
        ...updatedProducts[index],
        warranty: selectedProduct.warranty,
        unitPrice: selectedProduct.unitPrice,
        stock: selectedProduct.stock,
        netAmount: updatedProducts[index].quantity * updatedProducts[index].unitPrice,
      };
    }

    setSelectedProducts(updatedProducts);
  };

  // Handle product quantity change
  const handleProductQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = quantity;
    updatedProducts[index].netAmount = quantity * updatedProducts[index].unitPrice;
    setSelectedProducts(updatedProducts);
  };

  // Handle product unit price change
  const handleUnitPriceChange = (index, price) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].unitPrice = price;
    updatedProducts[index].netAmount = updatedProducts[index].quantity * price;
    setSelectedProducts(updatedProducts);
  };

  // Handle product net amount change
  const handleNetAmountChange = (index, amount) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].netAmount = amount;
    setSelectedProducts(updatedProducts);
  };

  const addProductRow = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 },
    ]);
  };

  const removeProductRow = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  const calculateTotal = () => {
    const totalProductAmount = selectedProducts.reduce((acc, product) => acc + product.netAmount, 0);
    const total =
      totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
    return total;
  };

  const calculateDueAmount = () => {
    const totalAmount = calculateTotal();
    return totalAmount - Number(account.cashReceived);
  };

  // Handle PDF generation and download
  const handleSubmit = () => {
    const doc = new jsPDF();

    // Add Sale Information
    doc.text("Sale Invoice", 20, 10);
    doc.text(`Customer Name: ${formDetails.customerName}`, 20, 20);
    doc.text(`Invoice Number: ${formDetails.invoiceNumber}`, 20, 30);
    doc.text(`Address: ${formDetails.address}`, 20, 40);
    doc.text(`Date: ${formDetails.date}`, 20, 50);
    doc.text(`Remarks: ${formDetails.remarks}`, 20, 60);
    doc.text(`Next Payment Date: ${formDetails.nextPaymentDate}`, 20, 70);

    // Add Products List
    doc.text("Products:", 20, 80);
    selectedProducts.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.productName} | Quantity: ${product.quantity} | Warranty: ${product.warranty} | Unit Price: ${product.unitPrice} | Net Amount: ${product.netAmount}`,
        20,
        90 + (index * 10)
      );
    });

    // Add Account Information
    doc.text("Account Information:", 20, 90 + (selectedProducts.length * 10));
    doc.text(`Transport Cost: ${account.transportCost}`, 20, 100 + (selectedProducts.length * 10));
    doc.text(`Discount Amount: ${account.discountAmount}`, 20, 110 + (selectedProducts.length * 10));
    doc.text(`Cash Received: ${account.cashReceived}`, 20, 120 + (selectedProducts.length * 10));
    doc.text(`Payment Method: ${account.paymentMethod}`, 20, 130 + (selectedProducts.length * 10));

    // Add Due Amount
    doc.text(`Due Amount: ${calculateDueAmount()}`, 20, 140 + (selectedProducts.length * 10));

    // Save PDF
    doc.save(`Invoice_${formDetails.invoiceNumber}.pdf`);
  };

  const handleClose = () => {
    setFormDetails({
      customerName: "",
      address: "",
      invoiceNumber: "",
      previousDues: 0,
      date: "",
      remarks: "",
      nextPaymentDate: "",
      chalanDescription: "",
    });
    setSelectedProducts([ { productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 } ]);
    setAccount({
      transportCost: 0,
      discountAmount: 0,
      discountPercentage: 0,
      cashReceived: 0,
      dueAmount: 0,
      paymentMethod: "",
    });
  };

  return (
    <div className="add-sale">
      <h2>Add Sale</h2>

      {/* Form Section */}
      <div className="addsale-form-section">
        {["Customer Name", "Address", "Invoice Number", "Previous Dues", "Date", "Remarks", "Next Payment Date", "Chalan Description"].map((label, idx) => (
          <div className="addsale-form-group" key={idx}>
            <label>{label}</label>
            <input
              type={label === "Date" || label === "Next Payment Date" ? "date" : "text"}
              value={formDetails[label.toLowerCase().replace(/\s+/g, "")]}
              onChange={(e) =>
                setFormDetails({ ...formDetails, [label.toLowerCase().replace(/\s+/g, "")]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      {/* Product Section */}
      <div className="addsale-product-section">
        <h3>Products</h3>
        {selectedProducts.map((product, index) => (
          <div className="addsale-product-row" key={index}>
            <select
              value={product.productName}
              onChange={(e) => handleProductChange(index, e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((productOption) => (
                <option key={productOption.id} value={productOption.productName}>
                  {productOption.productName}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductQuantityChange(index, e.target.value)}
              placeholder="Quantity"
            />
            
            <input
              type="text"
              value={product.warranty}
              disabled
              placeholder="Warranty"
            />
            <input
              type="number"
              value={product.unitPrice}
              onChange={(e) => handleUnitPriceChange(index, e.target.value)}
              placeholder="Unit Price"
            />
            <input
              type="number"
              value={product.netAmount}
              onChange={(e) => handleNetAmountChange(index, e.target.value)}
              placeholder="Net Amount"
            />

            <button className="addsale-remove-btn" onClick={() => removeProductRow(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="addsale-add-btn" onClick={addProductRow}>
          + Add Product
        </button>
      </div>

      {/* Account Section */}
      <div className="addsale-account-section">
        <h3>+ Account</h3>
        {["Transport Cost", "Discount Amount", "Cash Received", "Discount Percentage", "Payment Method"].map((label, idx) => (
          <div className="form-group" key={idx}>
            <label>{label}</label>
            {label === "Payment Method" ? (
              <select
                value={account.paymentMethod}
                onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            ) : (
              <input
                type="number"
                value={account[label.toLowerCase().replace(/\s+/g, "")]}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    [label.toLowerCase().replace(/\s+/g, "")]: Number(e.target.value),
                    ...(label === "Discount Percentage"
                      ? { discountAmount: (calculateTotal() * Number(e.target.value)) / 100 }
                      : {}),
                  })
                }
              />
            )}
          </div>
        ))}

        {/* Display Total */}
        <div className="form-group">
          <label>Total</label>
          <input type="number" value={calculateTotal()} disabled />
        </div>

        {/* Display Due Amount */}
        <div className="form-group">
          <label>Due Amount</label>
          <input type="number" value={calculateDueAmount()} disabled />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="addsale-action-buttons">
        <button className="addsale-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="addsale-close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddSale;
