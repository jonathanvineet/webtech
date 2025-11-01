import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Artist, Artwork } from '../../models/models';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist | null = null;
  artworks: Artwork[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const artistId = params['id'];
      this.loadArtistDetails(artistId);
    });
  }

  loadArtistDetails(artistId: string) {
    this.apiService.getArtist(artistId).subscribe({
      next: (data) => {
        this.artist = data;
        this.artworks = data.artworks || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading artist:', error);
        this.loading = false;
      }
    });
  }

  likeArtwork(artwork: Artwork) {
    this.apiService.likeArtwork(artwork.id).subscribe({
      next: (updated) => {
        artwork.likes = updated.likes;
      },
      error: (error) => console.error('Error liking artwork:', error)
    });
  }
}
