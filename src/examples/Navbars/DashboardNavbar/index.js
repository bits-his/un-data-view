import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
// Vision UI Dashboard PRO React components
import VuiTagInput, { fetchData } from "../../../components/ViuTagInput";
import VuiTagInput2 from "../../../components/ViuTagInput2";
import VuiTagInput1 from "../../../components/ViuTagInput1";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import {
  useVisionUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Card, FormControl } from "@mui/material";

function DashboardNavbar({
  absolute,
  light,
  isMini,
  form = {},
  setForm = (f) => f,
  yearList = [],
}) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [multiSelections, setMultiSelections] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "right",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem
  //       image={<img src={team2} alt="person" />}
  //       title={["New message", "from Laur"]}
  //       date="13 minutes ago"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       image={<img src={logoSpotify} alt="person" />}
  //       title={["New album", "by Travis Scott"]}
  //       date="1 day"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       color="text"
  //       image={
  //         <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
  //           payment
  //         </Icon>
  //       }
  //       title={["", "Payment successfully completed"]}
  //       date="2 days"
  //       onClick={handleCloseMenu}
  //     />
  //   </Menu>
  // );
  let data = [{ name: "Abula" }, { name: "Jone" }];

  return (
    <Toolbar>
      {/* <p style={{ color: "white" }}>{JSON.stringify(form)}</p> */}
      <div className="w-100">
        <Row>
          <Col lg={4} md={4} sm={3}>
            <FormGroup>
              <Label style={{ color: "white" }}>Indicators</Label>
              <VuiTagInput1
                placeholder="Add new tag."
                ClassName="mx-4"
                handleChange={(v) => setForm((p) => ({ ...p, indicator: v }))}
              />
            </FormGroup>
          </Col>
          <Col lg={4} md={4} sm={3}>
            <FormGroup>
              <Label style={{ color: "white" }}>Countries</Label>
              <VuiTagInput handleChange={(v) => setForm((p) => ({ ...p, country: v }))} />
            </FormGroup>
          </Col>
          <Col lg={2} md={2} sm={3}>
            <FormGroup>
              <Label style={{ color: "white" }}>From</Label>
              <VuiTagInput2
                yearList={yearList}
                handleChange={(v) => setForm((p) => ({ ...p, year_from: v }))}
              />
            </FormGroup>
          </Col>
          <Col lg={2} md={2} sm={3}>
            <FormGroup>
              <Label style={{ color: "white" }}>To</Label>
              <VuiTagInput2
                yearList={yearList}
                handleChange={(v) => setForm((p) => ({ ...p, year_to: v }))}
                style={{}}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>

      {/* <div className="d-flex p-5">
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
          <DropdownToggle caret>Dropdown</DropdownToggle>
          <DropdownMenu {...args}>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem>Some Action</DropdownItem>
            <DropdownItem text>Dropdown Item Text</DropdownItem>
            <DropdownItem disabled>Action (disabled)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div> */}
    </Toolbar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
