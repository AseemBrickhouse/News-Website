import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import StickyBox from "react-sticky-box";
import ReporterArticles from "./ReporterArticles/ReporterArticles";
import ReporterTop from "./ReporterTop/ReporterTop";
import "./css/RightPanel.css";
import useAccountArticleFetcher from "../../../Hooks/AccountHooks/useAccountArticleFetcher";

const RightPanel = ({ reporter }) => {
  const {articles} = useAccountArticleFetcher(reporter)
  return (
    <StickyBox offsetTop={75}>
      <Box className="main-container-rightpanel">
        <Box
          sx={{
            alignContent: "flex-start",
            justifyContent: "center",
            marginLeft: "12.5%",
          }}
        >
          <ReporterTop reporter={reporter} />
          <ReporterArticles
            reporterArticles={articles}
            reporter={reporter}
          />
        </Box>
      </Box>
    </StickyBox>
  );
};
export default RightPanel;
