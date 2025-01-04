// Utility functions for handling Spotify URLs
export function extractSongInfo(spotifyUrl: string) {
  if (!spotifyUrl) {
    throw new Error('Please enter a Spotify URL');
  }

  if (!spotifyUrl.includes('spotify.com/track/')) {
    throw new Error('Invalid Spotify URL. Please enter a valid track URL');
  }

  // Extract track ID from Spotify URL
  const trackId = spotifyUrl.split('/track/')[1]?.split('?')[0];
  if (!trackId) {
    throw new Error('Invalid Spotify URL format');
  }
  
  return { trackId };
}