// import React from 'react';
// import './DashboardCard.css';

// const DashboardCard = ({ title, value }) => {
//   return (
//     <div className="dashboard-card">
//       <h3>{title}</h3>
//       <p>{value}</p>
//     </div>
//   );
// };

// export default DashboardCard;


import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="dashboard-card">
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      {value && <p>{value}</p>}
    </div>
  );
};

export default DashboardCard;
