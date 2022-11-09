import { BarChart } from "@mui/icons-material";
import Card from "assets/theme/components/card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import React from "react";
function Piechat() {
  <Card>
    <VuiBox>
      <VuiBox
        mb="24px"
        height="220px"
        sx={{
          background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
          borderRadius: "20px",
        }}
      >
        <BarChart barChartData={barChartDataDashboard} barChartOptions={barChartOptionsDashboard} />
      </VuiBox>
      <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
        Active Users
      </VuiTypography>
      <VuiBox display="flex" alignItems="center" mb="40px">
        <VuiTypography variant="button" color="success" fontWeight="bold">
          (+23){" "}
          <VuiTypography variant="button" color="text" fontWeight="regular">
            than last week
          </VuiTypography>
        </VuiTypography>
      </VuiBox>
      <Grid container spacing="50px">
        <Grid item xs={6} md={3} lg={3}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <IoWallet color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              Users
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            32,984
          </VuiTypography>
          <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <IoIosRocket color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              Clicks
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            2,42M
          </VuiTypography>
          <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <FaShoppingCart color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              Sales
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            2,400$
          </VuiTypography>
          <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
            <VuiBox
              bgColor="info"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
            >
              <IoBuild color="#fff" size="12px" />
            </VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="medium">
              Items
            </VuiTypography>
          </Stack>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
            320
          </VuiTypography>
          <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
        </Grid>
      </Grid>
    </VuiBox>
  </Card>;
}
export default Piechat;
