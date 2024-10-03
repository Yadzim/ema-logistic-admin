import React, { useState, useEffect } from 'react';

const AdminDashboard: React.FC = (): JSX.Element => {

  return (
    <div className="">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card h-36"></div>
        <div className="card h-36"></div>
        <div className="card h-36"></div>
        <div className="card h-36"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="card h-96"></div>
        <div className="card h-96"></div>
      </div>

      <div className="card h-72 mt-6"></div> 
      
    </div>
  );
};

export default AdminDashboard;