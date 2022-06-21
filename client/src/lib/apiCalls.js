// Function to create a short link and return it 
export const createShortLink = async (shortLinkInput) => {
  try {
    const res = await fetch("/shortUrlCreate", {
      method: "POST",
      body: JSON.stringify({ full: shortLinkInput }),
      headers: { "Content-Type": "application/json" },
    });
    const createdShortLink = await res.json();
    return createdShortLink;
  } catch (error) {
    return {error}
  }
};


// PHASED OUT DUE TO FLICKER AS CLIENT NEEDED TO LOAD FIRST
// Function to redirect if using a url provided shortLink value
export const redirectToShortLink = async (shortLinkParam) => {
  try {
    const res = await fetch(`/shortUrlRedirect/${shortLinkParam}`);
    const redirectUrl = await res.json();
    return redirectUrl
  } catch (error) {
    return {error}
  }
};

// Function to redirect if using a url provided shortLink value
export const confirmAndCallShortLink = async (shortLinkId) => {
  try {
    const res = await fetch(`/shortUrlConfirm/${shortLinkId}`);
    const redirectUrl = await res.json();
    return redirectUrl
  } catch (error) {
    return {error}
  }
};