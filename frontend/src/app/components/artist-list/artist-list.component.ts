import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Artist } from '../../models/models';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  filteredArtists: Artist[] = [];
  loading = true;
  searchTerm = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadArtists();
  }

  loadArtists() {
    this.apiService.getArtists().subscribe({
      next: (data) => {
        this.artists = data;
        this.filteredArtists = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading artists:', error);
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredArtists = this.artists;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredArtists = this.artists.filter(artist =>
      artist.name.toLowerCase().includes(term) ||
      artist.specialty.toLowerCase().includes(term) ||
      artist.location.toLowerCase().includes(term)
    );
  }
}
