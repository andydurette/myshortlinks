import React, { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { Grid, Box } from "@mui/material";
import ShortLinkGrid from "./components/shortLinkGrid/ShortLinkGrid";
import { headerStyles, headerLogo, gridWrapperStyles } from "./AppStyles";
import InputLinkGrid from "./components/inputLinkGrid/InputLinkGrid";
import { redirectToShortLink, confirmAndCallShortLink } from "./lib/apiCalls";
import SnackBar from "./components/snackBar/SnackBar";
import shortLinksLogo from "./assets/shortLinksLogo.svg";

function App() {
  const [shortLinkInput, setShortLinkInput] = useState("");
  const [shortLink, setShortLink] = useState(null);
  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    severity: "",
    copy: "",
  });
  // Hide page until confirmed required
  const [showPage, setShowPage] = useState(false);

  const redirectCall = async () => {
    //Gets first url section after the base url separated by a forward slash
    const shortenedUrlValue = new URL(window.location.href).pathname.split(
      "/"
    )[1];
    if (shortenedUrlValue) {
      const redirectLink = await redirectToShortLink(shortenedUrlValue);
      if (!redirectLink.error) {
        window.location.replace(redirectLink.full);
      } else {
        setShowPage(true);
        setOpenSnackbar(true);
        setSnackbarMessage({
          severity: "error",
          copy: `Error: ${redirectLink.error}`,
        });
        
      }
    }else{
      setShowPage(true);
    }
    
  };

  // Checks then verifies if the use short link last used by the browser exists
  // then updated the short link state value to the virtual dom
  const localStorageCall = async () => {
    const savedShortLink = localStorage.getItem("savedShortLinkId");
    if (savedShortLink) {
      const confirmedShortLink = await confirmAndCallShortLink(savedShortLink);
      if (!confirmedShortLink.error) {
        setShortLink(confirmedShortLink);
      }
    }
  };

  // Used to minimize time for redirect to take place as running off the client
  useLayoutEffect(() => {
    redirectCall();
  }, []);

  useEffect(() => {
    localStorageCall();
  }, []);

  return (
    <div className="App">
      {showPage && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={headerStyles}
          >
            <Box sx={headerLogo}>
              <img src={shortLinksLogo} alt="shortLinksLogo" />
            </Box>
          </Grid>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
            className="App-header"
            sx={gridWrapperStyles}
          >
            <Grid container item>
              <InputLinkGrid
                setShortLinkInput={setShortLinkInput}
                shortLinkInput={shortLinkInput}
                setShortLink={setShortLink}
                setSnackbarMessage={setSnackbarMessage}
                setOpenSnackbar={setOpenSnackbar}
              />
              {shortLink && (
                <ShortLinkGrid
                  shortLink={shortLink}
                  setSnackbarMessage={setSnackbarMessage}
                  setOpenSnackbar={setOpenSnackbar}
                />
              )}
              {/* Report errors or successes to uses */}
              <SnackBar
                openSnackbar={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
                snackbarMessage={snackbarMessage}
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default App;
