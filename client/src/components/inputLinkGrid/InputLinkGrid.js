import { Grid, Button, TextField, Typography } from "@mui/material";
import { createShortLink } from "../../lib/apiCalls";
import { inputFieldStyles, inputButtonStyles } from "./InputLinkGridStyles";
import PropTypes from 'prop-types';

function InputLinkGrid({
  setShortLinkInput,
  shortLinkInput,
  setShortLink,
  setOpenSnackbar,
  setSnackbarMessage
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const getShortLink = await createShortLink(shortLinkInput);
    if (!getShortLink.error) {
      setShortLink(getShortLink);
      // Setting local storage value of successful creation of a shortLink
      localStorage.setItem('savedShortLinkId', getShortLink._id);
    } else {
      setOpenSnackbar(true);
      setSnackbarMessage(`Error: ${getShortLink.error}`);
    }
  };

  return (
    <Grid container item component="form" onSubmit={handleSubmit}>
      <TextField
        id="shorten-link-field"
        label="Shorten Your Link"
        variant="outlined"
        value={shortLinkInput}
        onInput={(e) => setShortLinkInput(e.target.value)}
        sx={inputFieldStyles}
      />
      <Button 
      type="submit" 
      variant="contained" 
      sx={inputButtonStyles}
      disabled={!shortLinkInput}
      
      >
        <Typography>Shorten</Typography>
      </Button>
    </Grid>
  );
}


// Added for prop clarity
InputLinkGrid.propTypes = {
  setShortLinkInput: PropTypes.func,
  setShortLink: PropTypes.func,
  setOpenSnackbar: PropTypes.func,
  setSnackbarMessage:PropTypes.func,
  shortLinkInput: PropTypes.string,
};

InputLinkGrid.defaultProps = {
  setShortLinkInput: () => {},
  setShortLink: () => {},
  setOpenSnackbar: () => {},
  setSnackbarMessage:() => {},
  shortLinkInput: '',
};

export default InputLinkGrid;
