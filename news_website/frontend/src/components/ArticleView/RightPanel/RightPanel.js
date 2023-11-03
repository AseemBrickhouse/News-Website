import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import StickyBox from "react-sticky-box";
import ReporterArticles from "./ReporterArticles/ReporterArticles";
import * as request from "../../Dashboard/Articles/ArticleID/components/RightPanel/Requests";
import ReporterTop from "./ReporterTop/ReporterTop";
import "./css/RightPanel.css";

const RightPanel = ({ reporter }) => {
  const [reporterArticles, setReporterArticles] = React.useState([]);

  useEffect(() => {
    const Init = async () => {
      setReporterArticles(await request.GetReporterArticles(reporter));
    };
    Init();
  }, []);

  return (
    <StickyBox offsetTop={75}>
      <Box className="main-container-rightpanel">
        <Box
          sx={{
            // marginTop: "2vh",
            alignContent: "flex-start",
            justifyContent: "center",
            marginLeft: "12.5%",
          }}
        >
          <ReporterTop reporter={reporter} />
          <ReporterArticles
            reporterArticles={reporterArticles}
            reporter={reporter}
          />
        </Box>
      </Box>
    </StickyBox>
  );
};
export default RightPanel;
