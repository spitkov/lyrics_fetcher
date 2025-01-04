export function parseSongInput(input: string): { track_name: string; artist_name: string } {
  // Handle common separators: "-", "by", "—"
  const separators = [' - ', ' by ', ' — '];
  let parts: string[] = [];

  for (const separator of separators) {
    if (input.includes(separator)) {
      parts = input.split(separator);
      break;
    }
  }

  // If no separator found, assume the entire input is the track name
  if (parts.length < 2) {
    return {
      track_name: input.trim(),
      artist_name: ''
    };
  }

  return {
    track_name: parts[0].trim(),
    artist_name: parts[1].trim()
  };
}