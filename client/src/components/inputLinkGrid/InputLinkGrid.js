import { Grid, Button, TextField, Typography } from "@mui/material";
import { createShortLink } from "../../lib/apiCalls";
import { inputFieldStyles, inputButtonStyles } from "./InputLinkGridStyles";
import PropTypes from 'prop-types';
import urlValidator from '../../lib/urlValidator';

function InputLinkGrid({
  setShortLinkInput,
  shortLinkInput,
  setShortLink,
  setOpenSnackbar,
  setSnackbarMessage
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(urlValidator(shortLinkInput)){
      const getShortLink = await createShortLink(shortLinkInput);
      if (!getShortLink.error) {
        setShortLink(getShortLink);
        // Setting local storage value of successful creation of a shortLink
        localStorage.setItem('savedShortLinkId', getShortLink._id);
        setOpenSnackbar(true);
        setSnackbarMessage({
          severity: "success",
          copy: `Short link Created`,
        });
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage({
          severity: "error",
          copy: `Error: ${getShortLink.error}`,
        });
      }
    }else{
      setOpenSnackbar(true);
      setSnackbarMessage({
        severity: "error",
        copy: `Error: A valid url wasn't provided please check the url and including formatting such as http or https`
      });
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
