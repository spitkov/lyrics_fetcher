import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { searchLyrics } from './utils/lrclib';
import { LyricsDisplay } from './components/LyricsDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { SearchInput } from './components/SearchInput';
import { parseSongInput } from './utils/parser';

function App() {
  const [songInput, setSongInput] = useState('');
  const [lyrics, setLyrics] = useState<string>('');
  const [isSynced, setIsSynced] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<{ title: string; artist: string } | null>(null);

  const handleSearch = async () => {
    setError('');
    setLoading(true);

    try {
      const { track_name, artist_name } = parseSongInput(songInput);
      const result = await searchLyrics(songInput);

      if (result.syncedLyrics) {
        setLyrics(result.syncedLyrics);
        setIsSynced(true);
      } else if (result.plainLyrics) {
        setLyrics(result.plainLyrics);
        setIsSynced(false);
      } else {
        setError('No lyrics found for this song');
        return;
      }

      setCurrentSong({
        title: track_name,
        artist: artist_name || 'Unknown Artist'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lyrics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Lyrics Finder</h1>
          </div>
          <p className="text-gray-600">Search for song lyrics by name and artist</p>
        </div>

        <SearchInput
          value={songInput}
          onChange={setSongInput}
          onSubmit={handleSearch}
          loading={loading}
        />

        {error && <ErrorMessage message={error} />}

        {lyrics && currentSong && (
          <LyricsDisplay
            lyrics={lyrics}
            isSynced={isSynced}
            title={currentSong.title}
            artist={currentSong.artist}
          />
        )}
      </div>
    </div>
  );
}

export default App;