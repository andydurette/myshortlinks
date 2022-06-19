import { Grid, Button, Box, Typography } from "@mui/material";
import {
  shortLinkGridBox,
  shortLinkGridTypography,
  shortLinkGridButton,
} from "./ShortLinkGridStyles";

function ShortLinkGrid({ shortLink, setSnackbarMessage, setOpenSnackbar }) {

  const copyShortLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/${shortLink.short}`);
    setSnackbarMessage({severity:'success', copy: `Copied short link to clipboard`});
    setOpenSnackbar(true);
  }  

  return (
    <Grid
      container
      item
      sx={{
        marginTop: { xs: "20px" },
      }}
    >
      <Box
        id="outlined-basic"
        variant="outlined"
        disabled
        sx={shortLinkGridBox}
      >
        <Typography sx={shortLinkGridTypography}>
          {shortLink.full}
          <br />
          {`${window.location.host}/${shortLink.short}`}
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        sx={shortLinkGridButton}
        onClick={copyShortLink}
        
        >
        Copy
      </Button>
    </Grid>
  );
}

export default ShortLinkGrid;
