import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredArtworks: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFeaturedArtworks();
  }

  loadFeaturedArtworks() {
    this.apiService.getArtworks().subscribe({
      next: (artworks) => {
        // Get random 6 artworks for featured section
        this.featuredArtworks = artworks
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading artworks:', error);
        this.loading = false;
      }
    });
  }

  viewArtists() {
    this.router.navigate(['/artists']);
  }

  startUploading() {
    this.router.navigate(['/upload']);
  }

  likeArtwork(artwork: any) {
    this.apiService.likeArtwork(artwork.id).subscribe({
      next: (updated) => {
        artwork.likes = updated.likes;
      },
      error: (error) => console.error('Error liking artwork:', error)
    });
  }
}
