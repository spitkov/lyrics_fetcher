export interface SearchParams {
  track_name: string;
  artist_name: string;
  album_name?: string;
  duration?: number;
}

export interface LyricsRecord {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string | null;
  syncedLyrics: string | null;
}

export interface LyricsResult {
  syncedLyrics: string | null;
  plainLyrics: string | null;
  isSynced: boolean;
}