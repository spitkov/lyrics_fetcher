import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function SearchInput({ value, onChange, onSubmit, loading }: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter song name and artist (e.g., 'Shape of You - Ed Sheeran')"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500">
          Tip: Include the artist name for better results (e.g., "Song Name - Artist Name")
        </p>
      </div>
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Find Lyrics'}
      </button>
    </form>
  );
}