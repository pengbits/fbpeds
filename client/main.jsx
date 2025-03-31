import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import PatientsPage from "./pages/PatientsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";

import ProvidersPage from "./pages/ProvidersPage";
import { getPatients, getPatient } from "./api/patients";
import App from "./App"

const loadPatients = async () => {
  return getPatients()
}

const loadProviders = async () => {
  return Promise.resolve({providers:[]})
}

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        index:true, 
        loader: loadPatients, 
        Component: PatientsPage
      },
      {
        path: 
        '/patients', 
        loader: loadPatients,
        Component: PatientsPage
      },
      {
        path: 
        '/patients/:id', 
        loader: (({params}) => getPatient(params.id)),
        Component: PatientDetailsPage
      },
      {
        path: '/providers', 
        Component: 
        ProvidersPage
      }
    ]
  }
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
