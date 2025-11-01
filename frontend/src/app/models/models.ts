export interface Artist {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  specialty: string;
  location: string;
  followers: number;
  artworks?: Artwork[];
  artworkCount?: number;
}

export interface Artwork {
  id: string;
  artistId: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  createdAt: string;
  tags: string[];
}
