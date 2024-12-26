// import React from 'react';
// import './Dashboard.css'; // Importing the dashboard-specific styles
// import DashboardCard from '../../Component/Dashboard/DashboardCard'; // Importing reusable DashboardCard component

// const Dashboard = () => {
//   // Sample data for the dashboard cards (you can fetch this from an API or context)
//   const dashboardData = [
//     {
//       title: 'Total Purchase',
//       value: '10,000.00',
//     },
//     {
//       title: 'Total Order',
//       value: '10,000.00',
//     },
//     {
//       title: 'Total Sales',
//       value: '10,000.00',
//     },
//     {
//         title: 'Total Stock',
//         value: '10,000.00',
//     },
//     {
//         title: 'Total Invoice',
//         value: '10,000.00',
//     },
//     {
//         title: 'Expences',
//         value: '10,000.00',
//     },
//   ];

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="dashboard-cards">
//         {dashboardData.map((data, index) => (
//           <DashboardCard key={index} title={data.title} value={data.value} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import './Dashboard.css'; 
import DashboardCard from '../../Component/Dashboard/DashboardCard'; 
import { FaFileInvoice, FaCartPlus, FaTruck } from 'react-icons/fa'; 

const Dashboard = () => {
  // Sample data for the dashboard cards Its must be dynamic after some time 
  const dashboardData = [
    {
        title: 'Total Purchase',
        value: '10,000.00',
    },
    {
        title: 'Total Order',
        value: '10,000.00',
    },
    {
        title: 'Total Sales',
        value: '10,000.00',
    },
    {
        title: 'Total Stock',
        value: '10,000.00',
    },
    {
        title: 'Total Invoice',
        value: '10,000.00',
    },
    {
        title: 'Expences',
        value: '10,000.00',
    },
];

  // Time period state
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  // Function to handle changing the time period
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="time-meters">
          <button onClick={() => handlePeriodChange('Today')}>Today</button>
          <button onClick={() => handlePeriodChange('This Week')}>This Week</button>
          <button onClick={() => handlePeriodChange('This Month')}>This Month</button>
          <button onClick={() => handlePeriodChange('This Financial Year')}>This Financial Year</button>
        </div>
      </div>

      <div className="dashboard-cards">
        {dashboardData.map((data, index) => (
          <DashboardCard key={index} title={data.title} value={data.value} />
        ))}
      </div>


      <div className="action-cards">
        <DashboardCard
          title="Create Invoice"
          icon={<FaFileInvoice />}
        />
        <DashboardCard
          title="Add Purchase"
          icon={<FaCartPlus />}
        />
        <DashboardCard
          title="Add Order"
          icon={<FaTruck />}
        />
      </div>

      <div className="period-info">
        <h3>Selected Period: {selectedPeriod}</h3>
      </div>
    </div>
  );
};

export default Dashboard;

