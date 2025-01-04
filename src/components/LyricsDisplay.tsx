import React from 'react';
import { Clock, Music2 } from 'lucide-react';
import { DownloadButton } from './DownloadButton';

interface LyricsDisplayProps {
  lyrics: string;
  isSynced: boolean;
  title: string;
  artist: string;
}

export function LyricsDisplay({ lyrics, isSynced, title, artist }: LyricsDisplayProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        {/* Metadata Section */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Music2 className="w-4 h-4" />
              <span>{artist}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{isSynced ? 'Synced Lyrics' : 'Plain Lyrics'}</span>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="border-b pb-4">
          <DownloadButton
            lyrics={lyrics}
            title={title}
            artist={artist}
            isSynced={isSynced}
          />
        </div>

        {/* Lyrics Section */}
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed">
          {lyrics}
        </pre>
      </div>
    </div>
  );
}