import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import { useVisionUIController, setLayout } from "context";

function PageLayout({ children }) {
  const [, dispatch] = useVisionUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return <div>hgjh</div>;
}
PageLayout.defaultProps = {
  background: "default",
};
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
