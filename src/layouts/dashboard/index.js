import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import VuiButton from "components/VuiButton";
import { useState } from "react";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  // const navigate = useNavigate();

  const [displayedGraph, setDisplayedGraph] = useState("Line");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3} height={1000}>
        <div>
          <Card
            sx={{ height: "620px" }}
            style={{ float: "right", width: "10%", backgroundColor: "white" }}
          >
            {" "}
            ghjk
            <VuiButton style={{ marginTop: "515%" }}>Download</VuiButton>
          </Card>
          <VuiBox>
            <Card>
              <VuiBox sx={{ height: "500%" }}>
                <VuiTypography variant="lg" color="primary" fontWeight="bold" mb="5px" mx="4px">
                  <VuiButton mx="4px">Pie Chart</VuiButton>
                </VuiTypography>
                <VuiButton
                  style={{
                    margin: "5px",
                  }}
                  onClick={() => setDisplayedGraph("Line")}
                >
                  Line Chart
                </VuiButton>
                <VuiButton mx="4px" onClick={() => setDisplayedGraph("Bar")}>
                  Bar Chart
                </VuiButton>
                <VuiBox display="flex" alignItems="center" mb="20px">
                  <VuiTypography variant="button" color="success" fontWeight="bold">
                    <VuiTypography
                      variant="button"
                      color="text"
                      fontWeight="regular"
                    ></VuiTypography>
                  </VuiTypography>
                </VuiBox>
                <VuiBox sx={{ height: "510px" }}>
                  {displayedGraph === "Line" ? (
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  ) : (
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  )}
                </VuiBox>
              </VuiBox>
            </Card>
          </VuiBox>
          <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
            {/* <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrderOverview />
            </Grid> */}
          </Grid>
        </div>
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
