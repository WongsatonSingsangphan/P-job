'use client'

import React from "react";
import styles from "./Signupframe.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import Logoplus from "@/assets/assets/images/plus.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

const Index = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const customStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: isMobile ? "center" : "flex-start",
    "& > :not(style)": {
      mr: 0,
      mb: 2,
      p: 2,
      width: 300,
      height: 320,
      borderRadius: 2,
      border: "1px solid #C2CCE1",
      [theme.breakpoints.up("md")]: {
        mr: 2,
        p: 3,
      },
    },
  };

  return (
    <div className={styles["full-page"]}>
      <div className={styles["sub-page"]}>
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <h2>Hi, Is this the company you work ?</h2>
            <p style={{ color: "#778296", marginTop: 20 }}>
              Please select your company.
            </p>
            <Box sx={customStyles}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <Image
                    src={Logotrac}
                    alt="logo"
                    style={{ width: "93px", height: "93px" }}
                  />
                </Paper>
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <h4 style={{ color: "#3D4D69" }}>
                    The Recovery Advisor Company Limited
                  </h4>
                </Paper>
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    height="4"
                    viewBox="0 0 52 4"
                    fill="none"
                  >
                    <path
                      d="M2 2H50"
                      stroke="#9FDBD6"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                </Paper>
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <p style={{ fontSize: 14, color: "#778296" }}>
                    The Recovery Advisor Company Limited Bangkok, 10210
                    Thailand.
                  </p>
                </Paper>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <Image
                    src={Logoplus}
                    alt="Logoplus"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginTop: isMobile ? 0 : 20,
                      marginBottom: isMobile ? 0 : 20,
                    }}
                  />
                </Paper>
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <h4
                    style={{
                      color: "#3D4D69",
                      marginBottom: isMobile ? 10 : 45,
                    }}
                  >
                    Add new your company
                  </h4>
                </Paper>
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    height="4"
                    viewBox="0 0 52 4"
                    fill="none"
                  >
                    <path
                      d="M2 2H50"
                      stroke="#9FDBD6"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                </Paper>
                <Paper
                  sx={{
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <p style={{ fontSize: 14, color: "#778296" }}>
                    For users who do not have a company listed in the options.
                  </p>
                </Paper>
              </Paper>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Index;