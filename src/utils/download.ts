export type LyricsFormat = 'lrc' | 'txt' | 'json';

export function formatLyrics(lyrics: string, format: LyricsFormat, metadata: { title: string; artist: string }) {
  switch (format) {
    case 'lrc':
      return lyrics; // LRC format is already correct for synced lyrics
    case 'txt':
      // Remove timestamps for plain text
      return lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '').trim();
    case 'json':
      return JSON.stringify({
        title: metadata.title,
        artist: metadata.artist,
        lyrics: lyrics,
        timestamp: new Date().toISOString()
      }, null, 2);
    default:
      return lyrics;
  }
}

export function downloadLyrics(content: string, filename: string, format: LyricsFormat) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}