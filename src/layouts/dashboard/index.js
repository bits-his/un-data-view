import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import { Card, LinearProgress, Stack } from "@mui/material";
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
import { useEffect, useState } from "react";
import { fetchData } from "components/ViuTagInput";
import { Card, Col, Row } from "reactstrap";
import PieChart from "examples/Charts/PieCharts/PieChart";
import { pieOptionsDashboard } from "./data/PieChartOption";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  // const navigate = useNavigate();

  const [displayedGraph, setDisplayedGraph] = useState("Line");
  const [yearList, setYearList] = useState([]);
  const [report, setReport] = useState([]);

  const series = report[0]?.data || [];
  const labels = yearList.reverse();

  useEffect(() => {
    fetchData({ query_type: "get_years" })
      .then((d) => {
        if (d && d.results) {
          setYearList(d.results.map((a) => a.year));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [displayedGraph]);

  const [form, setForm] = useState({
    indicator: [],
    country: ["Regional Outlook"],
    year_from: "2002",
    year_to: "2022",
  });

  useEffect(() => {
    if (form.country.includes("Regional Outlook")) {
      fetchData({ query_type: "by_region", ...form })
        .then((d) => {
          if (d && d.results) {
            // setList(d.results.map((a) => a.year));///
            let semiFinal = {};
            let finalData = [];

            d.results.forEach((i) => {
              if (Object.keys(semiFinal).includes(i.indicator)) {
                semiFinal[i.indicator] = [...semiFinal[i.indicator], i.amount];
              } else {
                semiFinal[i.indicator] = [i.amount];
              }
            });

            Object.keys(semiFinal).forEach((b) => finalData.push({ name: b, data: semiFinal[b] }));

            console.log(finalData);
            setReport(finalData);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fetchData({ query_type: "by_country", ...form })
        .then((d) => {
          if (d && d.results) {
            // setList(d.results.map((a) => a.year));
            let semiFinal = {};
            let finalData = [];

            d.results.forEach((i) => {
              if (Object.keys(semiFinal).includes(i.indicator)) {
                semiFinal[i.indicator] = [...semiFinal[i.indicator], i.amount];
              } else {
                semiFinal[i.indicator] = [i.amount];
              }
            });

            Object.keys(semiFinal).forEach((b) => finalData.push({ name: b, data: semiFinal[b] }));

            // console.log(finalData);
            setReport(finalData);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [form.country, form.indicator]);

  return (
    <DashboardLayout>
      <DashboardNavbar form={form} setForm={setForm} yearList={yearList} />
      {/* {JSON.stringify(report)} */}
      <VuiBox py={3} px={3} height={900}>
        <Row>
          <Col md={10} className="mb-3">
            <VuiBox>
              <Card className="mb-3">
                <VuiBox>
                  {/* <VuiTypography variant="lg" color="primary" fontWeight="bold" mb="5px" mx="4px">
                  <VuiButton mx="4px">Pie Chart</VuiButton>
                </VuiTypography> */}
                  <VuiButton mx="4px" onClick={() => setDisplayedGraph("Bar")}>
                    Bar Chart
                  </VuiButton>
                  <VuiButton mx="4px" onClick={() => setDisplayedGraph("pie")}>
                    Pie Chart
                  </VuiButton>
                  <VuiButton
                    style={{
                      margin: "5px",
                    }}
                    onClick={() => setDisplayedGraph("Line")}
                  >
                    Line Chart
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
                    {/* {JSON.stringify(report)} */}
                    {/* {JSON.stringify(yearList)} */}
                    {displayedGraph === "Line" && (
                      <LineChart
                        lineChartData={report}
                        lineChartOptions={{
                          ...lineChartOptionsDashboard,
                          xaxis: {
                            ...lineChartOptionsDashboard.xaxis,
                            type: "datetime",
                            categories: labels,
                          },
                        }}
                      />
                    )}
                    {displayedGraph === "Bar" && (
                      <BarChart
                        barChartData={report}
                        // barChartOptions={barChartOptionsDashboard}
                        barChartOptions={{
                          ...barChartOptionsDashboard,
                          xaxis: {
                            ...barChartOptionsDashboard.xaxis,
                            categories: labels,
                          },
                        }}
                      />
                    )}
                    {displayedGraph === "pie" && (
                      <PieChart
                        pieChartData={{
                          series: series,
                          labels: labels,
                        }}
                        pieChartOptions={{
                          width: 380,
                          type: "pie",
                        }}
                      />
                    )}
                  </VuiBox>
                </VuiBox>
              </Card>
            </VuiBox>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              {/* <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrderOverview />
            </Grid> */}
            </Grid>
          </Col>

          <Col md={2} className="mb-2">
            <Card
              // sx={{ height: "620px" }}
              className="mb-3"
              style={{ width: "100%", backgroundColor: "white", height: "100%" }}
            >
              <VuiBox>
                <VuiButton style={{}}>Download</VuiButton>
                <span></span>
                <span> </span>
                <VuiButton style={{}}>Upload</VuiButton>
              </VuiBox>
            </Card>
          </Col>
        </Row>
        <div></div>
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
