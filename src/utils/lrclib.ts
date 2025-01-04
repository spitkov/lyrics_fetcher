import { LyricsRecord, LyricsResult, SearchParams } from './types';
import { fetchFromApi } from './api';
import { parseSongInput } from './parser';

export async function searchLyrics(input: string): Promise<LyricsResult> {
  if (!input.trim()) {
    throw new Error('Please enter a song name');
  }

  const { track_name, artist_name } = parseSongInput(input);
  
  try {
    // Try the more accurate /api/get endpoint first
    if (artist_name) {
      try {
        const params: SearchParams = {
          track_name,
          artist_name
        };
        
        const record = await fetchFromApi<LyricsRecord>('/get', params);
        return {
          syncedLyrics: record.syncedLyrics,
          plainLyrics: record.plainLyrics,
          isSynced: Boolean(record.syncedLyrics)
        };
      } catch (error) {
        // If /api/get fails, fall back to search
        console.log('Direct lookup failed, falling back to search');
      }
    }

    // Fall back to search API
    const searchParams = artist_name 
      ? { q: `${track_name} ${artist_name}` }
      : { q: track_name };
    
    const records = await fetchFromApi<LyricsRecord[]>('/search', searchParams);
    
    if (!records.length) {
      throw new Error('No lyrics found for this song');
    }

    const bestMatch = records[0];
    return {
      syncedLyrics: bestMatch.syncedLyrics,
      plainLyrics: bestMatch.plainLyrics,
      isSynced: Boolean(bestMatch.syncedLyrics)
    };
  } catch (error) {
    console.error('Lyrics search error:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch lyrics');
  }
}