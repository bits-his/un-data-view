import { PieChart } from "@mui/icons-material"
import React from "react"




function AppNavigation() {
    let element = useRoutes([
      { path: "/",  },
      { path: "/piechat", element: < /> },
    
      {
        path: 'app',
        element: <AuthenticatedContainer />,
        children: [
          {
            path: "records",
            element: <AssRent />,
            children: [
              {
                // index: true,
                path: 'patients',
                element: <PatientsIndex />,
                children: [
                  // patient list
                  { index: true, element: <AllPatientList /> },
                  { path: 'new', element: <Basic /> },
                  { path: 'edit/:patientId', element: <Basic /> },
                  { path: 'in-patient', element: <Patient /> },
                ],
              },
              {
                path: 'beds',
                element: <Khalifa />,
              },
            ],
          },