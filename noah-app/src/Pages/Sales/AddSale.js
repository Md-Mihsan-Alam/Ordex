import { saveSaleDataToServer } from "../../utils/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
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
    paymentMethod: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (index, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].productName = value;

    const selectedProduct = products.find((product) => product.productName === value);
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

  const handleProductQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = Number(quantity);
    updatedProducts[index].netAmount = Number(quantity) * updatedProducts[index].unitPrice;
    setSelectedProducts(updatedProducts);
  };

  const handleUnitPriceChange = (index, price) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].unitPrice = Number(price);
    updatedProducts[index].netAmount = updatedProducts[index].quantity * Number(price);
    setSelectedProducts(updatedProducts);
  };

  const handleDiscountPercentageChange = (percentage) => {
    const discountAmount = (calculateTotal() * Number(percentage)) / 100;
    setAccount({ ...account, discountPercentage: Number(percentage), discountAmount });
  };

  const handleDiscountAmountChange = (amount) => {
    const discountPercentage = (Number(amount) / calculateTotal()) * 100;
    setAccount({ ...account, discountAmount: Number(amount), discountPercentage });
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
    const total = totalProductAmount + Number(account.transportCost) - Number(account.discountAmount);
    return total >= 0 ? total : 0;
  };

  const calculateDueAmount = () => {
    const totalAmount = calculateTotal();
    const dueAmount = totalAmount - account.cashReceived;
    return dueAmount >= 0 ? dueAmount : 0;
  };

  const handleSubmit = async () => {

    const saleData = {
      SL:formDetails.id,
      customerName: formDetails.customerName,
      address: formDetails.address,
      invoiceNumber: formDetails.invoiceNumber,
      previousDues: formDetails.previousDues,
      date: formDetails.date,
      Remarks: formDetails.remarks,
      nextPaymentDate: formDetails.nextPaymentDate,
      chalanDescription: formDetails.chalanDescription,
      products: selectedProducts,
      quantity: selectedProducts.quantity,
      warranty: selectedProducts.warranty,
      unitPrice: selectedProducts.unitPrice,
      netAmount: selectedProducts.netAmount,
      transportCost: account.transportCost,
      discountAmount: account.discountAmount,
      discountPercentage: account.discountPercentage,
      cashReceived: account.cashReceived,
      paymentMethod: account.paymentMethod,
      total: calculateTotal(),
      dueAmount: calculateDueAmount(),
    };

    try {
      const response = await saveSaleDataToServer(saleData);
      console.log('Sale data saved successfully:', response);
      // Handle successful submission (e.g., show success message, clear form)
    } catch (error) {
      console.error('Error saving sale data:', error);
      // Handle error (e.g., show error message to user)
    }
  

    const doc = new jsPDF();
    doc.text("Sale Invoice", 20, 10); // Title
    doc.text(`Customer Name: ${formDetails.customerName || "N/A"}`, 20, 20);
    doc.text(`Invoice Number: ${formDetails.invoiceNumber || "N/A"}`, 20, 30);
    doc.text(`Address: ${formDetails.address || "N/A"}`, 20, 40);
    doc.text(`Date: ${formDetails.date || "N/A"}`, 20, 50);
    doc.text(`Remarks: ${formDetails.remarks || "N/A"}`, 20, 60);
    doc.text(`Next Payment Date: ${formDetails.nextPaymentDate || "N/A"}`, 20, 70);
  
    doc.text("Products:", 20, 80);
    selectedProducts.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.productName || "N/A"} | Quantity: ${
          product.quantity || 0
        } | Warranty: ${product.warranty || "N/A"} | Unit Price: ${
          product.unitPrice || 0
        } | Net Amount: ${product.netAmount || 0}`,
        20,
        90 + index * 10
      );
    });
  
    doc.text("Account Information:", 20, 90 + selectedProducts.length * 10);
    doc.text(`Transport Cost: ${account.transportCost || 0}`, 20, 100 + selectedProducts.length * 10);
    doc.text(`Discount Amount: ${account.discountAmount || 0}`, 20, 110 + selectedProducts.length * 10);
    doc.text(`Cash Received: ${account.cashReceived || 0}`, 20, 120 + selectedProducts.length * 10);
    doc.text(`Payment Method: ${account.paymentMethod || "N/A"}`, 20, 130 + selectedProducts.length * 10);
  
    doc.text(`Due Amount: ${calculateDueAmount() || 0}`, 20, 140 + selectedProducts.length * 10);
  
    doc.save(`Invoice_${formDetails.invoiceNumber || "N/A"}.pdf`);
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
    setSelectedProducts([{ productName: "", quantity: 0, warranty: "", unitPrice: 0, netAmount: 0, stock: 0 }]);
    setAccount({
      transportCost: 0,
      discountAmount: 0,
      discountPercentage: 0,
      cashReceived: 0,
      paymentMethod: "",
    });
  };

  return (
    <div className="add-sale">
      <h2>Add Sale</h2>
      <div className="addsale-form-section">
        {/* Customer Form Section */}
        {["Customer Name", "Address", "Invoice Number","Previous Dues", "Date", "Remarks", "Next Payment Date", "Chalan Description"].map(
          (label, idx) => (
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
          )
        )}
      </div>

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
            <input type="text" value={product.warranty} disabled placeholder="Warranty" />
            <input
              type="number"
              value={product.unitPrice}
              onChange={(e) => handleUnitPriceChange(index, e.target.value)}
              placeholder="Unit Price"
            />
            <input
              type="number"
              value={product.netAmount}
              disabled
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

      <div className="addsale-account-section">
        <h3>Account</h3>
        <div className="form-group">
          <label>Transport Cost</label>
          <input
            type="number"
            value={account.transportCost}
            onChange={(e) => setAccount({ ...account, transportCost: Number(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Discount Percentage</label>
          <input
            type="number"
            value={account.discountPercentage}
            onChange={(e) => handleDiscountPercentageChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Discount Amount</label>
          <input
            type="number"
            value={account.discountAmount}
            onChange={(e) => handleDiscountAmountChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Cash Received</label>
          <input
            type="number"
            value={account.cashReceived}
            onChange={(e) => setAccount({ ...account, cashReceived: Number(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={account.paymentMethod}
            onChange={(e) => setAccount({ ...account, paymentMethod: e.target.value })}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
          </select>
        </div>
        <div className="form-group">
          <label>Total Amount</label>
          <input type="number" value={calculateTotal()} disabled />
        </div>
        <div className="form-group">
          <label>Due Amount</label>
          <input type="number" value={calculateDueAmount()} disabled />
        </div>
      </div>

      <div className="addsale-buttons">
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
