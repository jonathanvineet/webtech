import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artwork } from '../../models/models';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.css']
})
export class ArtworkCardComponent {
  @Input() artwork!: Artwork;
  @Output() like = new EventEmitter<void>();

  onLike() {
    this.like.emit();
  }
}
