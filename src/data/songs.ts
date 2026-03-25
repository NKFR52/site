/**
 * Local playlist — add MP3s under `public/music/` as file1.mp3, file2.mp3, …
 */
export type Song = {
  title: string;
  artist: string;
  /** Path from site root (e.g. "/music/file1.mp3") */
  url: string;
};

export const songs: Song[] = [
  { title: "никита", artist: "N1KOTIN", url: "/music/file1.mp3" },
  { title: "I_Suss", artist: "Ленинград", url: "/music/file2.mp3" },
  { title: "hunter eyes", artist: "laydownrot", url: "/music/file3.mp3" },
  { title: "UR THE MOON", artist: "Playboi Carti", url: "/music/file4.mp3" },
];
