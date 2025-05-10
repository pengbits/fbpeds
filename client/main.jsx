import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import PatientsPage from "./pages/PatientsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import AppointmentSearchPage from "./pages/AppointmentSearchPage";
import ProvidersPage from "./pages/ProvidersPage";
import ProviderDetailsPage from "./pages/ProviderDetailsPage";
import VisitDetailsPage from "./pages/VisitDetailsPage";
import App from "./App"

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        index:true, 
        Component: PatientsPage
      },
      {
        path: '/patients', 
        Component: PatientsPage
      },
      {
        path: '/patients/:id', 
        Component: PatientDetailsPage
      },
      {
        path: '/providers', 
        Component: ProvidersPage
      },
      {
        path: '/providers/:id', 
        Component: ProviderDetailsPage
      },
      {
        path: '/appointments/new',
        Component: AppointmentSearchPage
      },
      {
        path: '/appointments/:appointmentId/edit',
        Component: AppointmentSearchPage
      },
      {
        path: '/appointments/new/patient/:patientId',
        Component: AppointmentSearchPage
      },
      {
        path: '/patients/:id/visits/:visitId',
        Component: VisitDetailsPage
      }
    ]
  }
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
