import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterApplicant from './pages/RegisterApplicant';
import 'bootstrap/dist/css/bootstrap.min.css';

import HrAssistantDashboard from './pages/HrAssistant/Dashboard';
import HrStaffDashboard from './pages/HrStaffDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ApplicantDashboard from './pages/ApplicantDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import HrAssistantLayout from './pages/HrAssistant/HrAssistantLayout';
import EmployeeRecords from './pages/HrAssistant/EmployeeRecords';

// ✅ ADD THESE TWO IMPORTS for Leave Management
import HRLeaveDashboard from './pages/hr/HRLeaveDashboard'; // Make sure path is correct
import EmployeeLeaveRequest from './components/Employee/EmployeeLeaveRequest'; // ✅ NEW import

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/hr-assistant"
          element={
            <ProtectedRoute role="HR Assistant">
              <HrAssistantLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HrAssistantDashboard />} />
          <Route path="employee-records" element={<EmployeeRecords />} />
        </Route>

        <Route
          path="/dashboard/hr-staff"
          element={
            <ProtectedRoute role="HR Staff">
              <HrStaffDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADD THESE TWO ROUTES for Leave Management */}
        <Route
          path="/dashboard/hr-assistant"
          element={
            <ProtectedRoute role="HR Assistant">
              <HrAssistantLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HrAssistantDashboard />} />
          <Route path="employee-records" element={<EmployeeRecords />} />
          <Route path="leave" element={<HRLeaveDashboard />} /> {/* ✅ this keeps the sidebar */}
        </Route>

        <Route
          path="/dashboard/manager"
          element={
            <ProtectedRoute role="Manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/applicant"
          element={
            <ProtectedRoute role="Applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/employee"
          element={
            <ProtectedRoute role="Employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ STEP 2: Add only this route for Leave Request */}
        <Route
          path="/dashboard/employee/leave-request"
          element={
            <ProtectedRoute role="Employee">
              <EmployeeLeaveRequest />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<RegisterApplicant />} />

        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
