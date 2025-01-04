import React from 'react';
import { Download } from 'lucide-react';
import { LyricsFormat, downloadLyrics, formatLyrics } from '../utils/download';

interface DownloadButtonProps {
  lyrics: string;
  title: string;
  artist: string;
  isSynced: boolean;
}

export function DownloadButton({ lyrics, title, artist, isSynced }: DownloadButtonProps) {
  const formats: { value: LyricsFormat; label: string }[] = [
    { value: 'lrc', label: 'LRC (Synced)' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'json', label: 'JSON' }
  ];

  const handleDownload = (format: LyricsFormat) => {
    const formattedLyrics = formatLyrics(lyrics, format, { title, artist });
    const filename = `${title} - ${artist}`.replace(/[/\\?%*:|"<>]/g, '-');
    downloadLyrics(formattedLyrics, filename, format);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Download as:</span>
      <div className="flex gap-2">
        {formats.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleDownload(value)}
            disabled={value === 'lrc' && !isSynced}
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm
              ${value === 'lrc' && !isSynced 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            <Download className="w-4 h-4 mr-1" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}