import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Artist } from '../../models/models';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtist = '';
  title = '';
  description = '';
  tags = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading = false;
  uploadSuccess = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadArtists();
  }

  loadArtists() {
    this.apiService.getArtists().subscribe({
      next: (data) => {
        this.artists = data;
      },
      error: (error) => console.error('Error loading artists:', error)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.selectedFile || !this.selectedArtist || !this.title) {
      alert('Please fill in all required fields');
      return;
    }

    this.uploading = true;

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('artistId', this.selectedArtist);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('tags', this.tags);

    this.apiService.uploadArtwork(formData).subscribe({
      next: (artwork) => {
        this.uploadSuccess = true;
        this.uploading = false;
        
        // Reset form
        setTimeout(() => {
          this.router.navigate(['/artists', this.selectedArtist]);
        }, 2000);
      },
      error: (error) => {
        console.error('Error uploading artwork:', error);
        alert('Error uploading artwork. Please try again.');
        this.uploading = false;
      }
    });
  }

  clearPreview() {
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
