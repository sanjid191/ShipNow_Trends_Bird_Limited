import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth & Shipments Contexts
import { AuthProvider } from './context/AuthContext';
import { ShipmentsProvider } from './context/ShipmentsContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import CreateShipment from './pages/CreateShipment';
import Invoices from './pages/Invoices';
import Warehouse from './pages/Warehouse';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <AuthProvider>
      <ShipmentsProvider>
        <Router>
          <Routes>
            {/* Public Auth Route */}
            <Route 
              path="/login" 
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              } 
            />

            {/* Protected Dashboard Shell Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/shipments" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Shipments />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/shipments/create" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CreateShipment />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Invoices />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/warehouse" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Warehouse />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />

            {/* Protected Placeholder Routes */}
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlaceholderPage title="Analytics Dashboard" />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlaceholderPage title="Operations Calendar" />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tracking" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlaceholderPage title="Live Vehicle Tracking" />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/fleets" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlaceholderPage title="Fleet Management" />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/drivers" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlaceholderPage title="Driver Roster & Shift Schedules" />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />

            {/* 404 / Fallback Route */}
            <Route 
              path="*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PlaceholderPage title="Page Not Found (404)" />
                  </DashboardLayout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ShipmentsProvider>
    </AuthProvider>
  );
}
