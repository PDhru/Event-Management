import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login"; // Import login page
import ProtectedRoute from "./components/common/ProtectedRoute"; // Import ProtectedRoute
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import CreateEvent from "./components/common/CreateEvent";
import MyEvents from "./components/common/MyEvents";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        {/* Only protect the Index page */}
        <Route path="/" element={<Index />} />
      </Route>
      <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
      <Route path="/my-event" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
      <Route path="/edit-event/:eventId" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the app in AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
