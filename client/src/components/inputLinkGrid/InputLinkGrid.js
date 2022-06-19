import { Grid, Button, TextField, Typography } from "@mui/material";
import { createShortLink } from "../../lib/apiCalls";
import { inputFieldStyles, inputButtonStyles } from "./InputLinkGridStyles";

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

export default InputLinkGrid;
