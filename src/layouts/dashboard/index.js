import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import { Card, LinearProgress, Stack } from "@mui/material";
import VuiBox from "components/VuiBox";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
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
import { Button, Card, Col, FormGroup, Input, Label, Row } from "reactstrap";
import PieChart from "examples/Charts/PieCharts/PieChart";
import { pieOptionsDashboard } from "./data/PieChartOption";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  // const navigate = useNavigate();

  const [displayedGraph, setDisplayedGraph] = useState("Line");
  const [yearList, setYearList] = useState([]);
  const [report, setReport] = useState([]);
  const [fileUpload, setFileUpload] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [FormattedRows, setFormattedRows] = useState([]);
  const [FinalData, setFinalData] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  let [testData, setTestData] = useState([]);

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

  // ================================CSV DOWNLOAD DATA =================================
  const series = report[0]?.data || [];
  const indicator = report[0]?.name || [];
  const labels = yearList;
  const csvData = [
    ["Years", "Country", "Amount", "Indicator"],
    ...series.map((amount, index) => [labels[index], form.country, amount, indicator]),
  ];

  // ===================================INPUT FROM AND TO DATA==================================
  const reversedDate = [...yearList].sort((a, b) => b - a);

  const handleUpload = (event) => {
    let fileObj = event.target.files[0];
    console.log("fileObj", fileObj);
    if (!fileObj) {
      setErrorMessage("No file uploaded!");
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      setErrorMessage("Unknown file format. Only Excel files are uploaded!");
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        let data = [];
        // let basicInfo = []
        // let beginIndex = 0
        // let detailInfo = []
        // let items = []

        let colNames = resp.rows[0];
        resp.rows.slice(1).forEach((row, index) => {
          if (row && row !== "undefined" && row.length !== 0) {
            let obj = {};
            colNames.forEach((col, idx) => {
              obj[col] = row[idx];
            });
            data.push(obj);

            newRows.push({
              key: index,
              date: row[0],
              item_name: row[1],
              item_code: row[2],
              item_category: row[3],
              price: row[4],
              propose_quantity: row[5],
              vendor: row[6],
            });
          }
        });
        setTestData(data);
        if (newRows.length === 0) {
          setErrorMessage("No data found in file!");
          return false;
        } else {
          setCols(resp.cols);
          setRows(resp.rows);
          setFormattedRows(newRows);
          // let ff = formatData(newRows);
          // setFinalData(ff);
          setErrorMessage(null);

          return;
        }
      }
    });
    return false;
  };
  const postData = () => {
    setSubmitting(true);
    // toast.error(ErrorMessage);
    // setCols([])
    // setRows([])
    // toast.success("CSV File Submitted Successfully")
    // handleUpload()
    // console.log(rows, cols);
    // () => {
    //   toast.success("CSV submitted successfully");
    // },
    // () => {
    //     toast.error(ErrorMessage);
    //   };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar form={form} setForm={setForm} yearList={reversedDate} />
      {/* {JSON.stringify(series)}
      {JSON.stringify(labels)}
      {JSON.stringify(form.country)}
      {JSON.stringify(indicator)} */}
      {/* {JSON.stringify(csvData)} */}

      <VuiBox py={3} px={3}>
        <Row>
          <Col md={10} className="mb-3">
            <VuiBox>
              <Card className="mb-3">
                {fileUpload === false ? (
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
                    <div style={{ minHeight: "510px" }}>
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
                    </div>
                  </VuiBox>
                ) : (
                  <VuiBox>
                    <VuiBox px={2} py={2}>
                      <VuiButton
                        onClick={() => {
                          setFileUpload(false);
                        }}
                      >
                        Go Back
                      </VuiButton>
                    </VuiBox>
                    {/* {JSON.stringify(rows)} */}
                    <FormGroup className="m-2">
                      <Label style={{ color: "black" }}>Upload Your CSV file</Label>
                      <Input type="file" onChange={handleUpload} />
                    </FormGroup>
                    <Row>
                      <Col md={12}>
                        <OutTable
                          data={rows}
                          columns={cols}
                          tableClassName="ExcelTable2007"
                          tableHeaderRowClass="heading"
                          // style={{ overflowX: "scroll" }}>
                        />
                      </Col>
                    </Row>
                    {/* <div className="d-flex justify-content-between">
                      <VuiButton
                        onClick={() => {
                          setFileUpload(false);
                        }}
                      >
                        Go Back
                      </VuiButton>
                      <VuiButton
                        onClick={postData}
                        disabled={!rows.length ? true : undefined}
                        loading={submitting ? "loading" : undefined}
                      >
                        Submit
                      </VuiButton>
                    </div> */}
                    <center className="mb-1">
                      <VuiButton
                        onClick={postData}
                        disabled={!rows.length ? true : undefined}
                        loading={submitting ? "loading" : undefined}
                      >
                        Submit
                      </VuiButton>
                    </center>
                  </VuiBox>
                )}
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
                <VuiButton style={{}}>
                  {" "}
                  <CSVLink
                    data={csvData}
                    className="text-white text-decoration-none"
                    filename={`Result Associate ${indicator}`}
                  >
                    Download
                  </CSVLink>
                </VuiButton>
                <span></span>
                <span> </span>
                <VuiButton
                  style={{}}
                  onClick={() => {
                    setFileUpload(true);
                  }}
                >
                  Upload
                </VuiButton>
              </VuiBox>
            </Card>
            {/* <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  Do Something
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal> */}
          </Col>
        </Row>
        <div></div>
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
