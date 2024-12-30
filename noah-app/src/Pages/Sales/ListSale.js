import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";

const ListSale = () => {
  const [sales, setSales] = useState([]);

  // Fetch sales data when the component mounts
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard/Add_Sale_Data" // Adjust the API URL to where your sales data is stored
        );
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="list-sale">
      <h2>Sales List</h2>
      
      {sales.length === 0 ? (
        <p>No sales data available</p>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Invoice Number</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Cash Received</th>
              <th>Payment method</th>
              <th>Total Amount</th>
              <th>Due Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.invoiceNumber}>
                <td>{sale.invoiceNumber}</td>
                <td>{sale.customerName}</td>
                <td>{sale.date}</td>
                <td>{sale.total}</td>
                <td>{sale.dueAmount}</td>
                <td>
                  <button onClick={() => handleViewSale(sale.invoiceNumber)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Placeholder for the View Details function (optional)
const handleViewSale = (invoiceNumber) => {
  console.log("View sale details for invoice:", invoiceNumber);
  // You can use this function to navigate to a detailed view of the sale or show more information in a modal.
};

export default ListSale;
