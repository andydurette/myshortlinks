import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ErrorSnackBar({
  openSnackbar,
  setOpenSnackbar,
  snackbarMessage
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarMessage.severity} sx={{ width: "100%" }}>
          {snackbarMessage.copy}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

// Added for prop clarity
ErrorSnackBar.propTypes = {
  setOpenSnackbar: PropTypes.func,
  openSnackbar: PropTypes.bool,
  snackbarMessage: PropTypes.object
};

ErrorSnackBar.defaultProps = {
  setOpenSnackbar:() => {},
  openSnackbar: false,
  snackbarMessage: {}
};

export default ErrorSnackBar;