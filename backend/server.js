const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// In-memory database (replace with real database in production)
let artists = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    bio: 'Contemporary digital artist specializing in surrealism and abstract compositions',
    avatar: 'https://i.pravatar.cc/150?img=1',
    specialty: 'Digital Art',
    location: 'Barcelona, Spain',
    followers: 12500,
    artworks: []
  },
  {
    id: '2',
    name: 'Marcus Chen',
    bio: 'Oil painter exploring the intersection of traditional and modern techniques',
    avatar: 'https://i.pravatar.cc/150?img=12',
    specialty: 'Oil Painting',
    location: 'San Francisco, USA',
    followers: 8900,
    artworks: []
  },
  {
    id: '3',
    name: 'Amara Okafor',
    bio: 'Sculptor and installation artist bringing African heritage to contemporary art',
    avatar: 'https://i.pravatar.cc/150?img=5',
    specialty: 'Sculpture',
    location: 'Lagos, Nigeria',
    followers: 15200,
    artworks: []
  },
  {
    id: '4',
    name: 'Yuki Tanaka',
    bio: 'Minimalist photographer capturing the essence of urban landscapes',
    avatar: 'https://i.pravatar.cc/150?img=9',
    specialty: 'Photography',
    location: 'Tokyo, Japan',
    followers: 23400,
    artworks: []
  },
  {
    id: '5',
    name: 'Sofia Bergström',
    bio: 'Watercolor artist inspired by Nordic nature and seasons',
    avatar: 'https://i.pravatar.cc/150?img=24',
    specialty: 'Watercolor',
    location: 'Stockholm, Sweden',
    followers: 6700,
    artworks: []
  }
];

let artworks = [
  {
    id: '1',
    artistId: '1',
    title: 'Digital Dreams',
    description: 'A surreal exploration of consciousness',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    likes: 234,
    createdAt: '2024-10-15',
    tags: ['digital', 'surrealism', 'abstract']
  },
  {
    id: '2',
    artistId: '1',
    title: 'Neon Nights',
    description: 'Urban landscapes in vibrant colors',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    likes: 189,
    createdAt: '2024-10-20',
    tags: ['digital', 'urban', 'neon']
  },
  {
    id: '3',
    artistId: '2',
    title: 'Sunset Portrait',
    description: 'Classical portrait with modern twist',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    likes: 412,
    createdAt: '2024-09-28',
    tags: ['oil', 'portrait', 'classical']
  },
  {
    id: '4',
    artistId: '3',
    title: 'Heritage Monument',
    description: 'Bronze sculpture celebrating African culture',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    likes: 567,
    createdAt: '2024-08-12',
    tags: ['sculpture', 'bronze', 'heritage']
  },
  {
    id: '5',
    artistId: '4',
    title: 'Tokyo Station',
    description: 'Minimalist view of urban architecture',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    likes: 892,
    createdAt: '2024-10-25',
    tags: ['photography', 'minimalism', 'architecture']
  },
  {
    id: '6',
    artistId: '5',
    title: 'Winter Lake',
    description: 'Serene Nordic landscape in watercolor',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    likes: 321,
    createdAt: '2024-10-10',
    tags: ['watercolor', 'landscape', 'nature']
  }
];

// Populate artists with their artworks
artists.forEach(artist => {
  artist.artworks = artworks.filter(a => a.artistId === artist.id);
});

// Routes

// Get all artists
app.get('/api/artists', (req, res) => {
  const artistsWithCounts = artists.map(artist => ({
    ...artist,
    artworkCount: artworks.filter(a => a.artistId === artist.id).length
  }));
  res.json(artistsWithCounts);
});

// Get single artist
app.get('/api/artists/:id', (req, res) => {
  const artist = artists.find(a => a.id === req.params.id);
  if (!artist) {
    return res.status(404).json({ message: 'Artist not found' });
  }
  
  const artistArtworks = artworks.filter(a => a.artistId === artist.id);
  res.json({ ...artist, artworks: artistArtworks });
});

// Create new artist
app.post('/api/artists', (req, res) => {
  const newArtist = {
    id: uuidv4(),
    name: req.body.name,
    bio: req.body.bio || '',
    avatar: req.body.avatar || 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
    specialty: req.body.specialty || 'Artist',
    location: req.body.location || '',
    followers: 0,
    artworks: []
  };
  
  artists.push(newArtist);
  res.status(201).json(newArtist);
});

// Get all artworks
app.get('/api/artworks', (req, res) => {
  const artistId = req.query.artistId;
  
  if (artistId) {
    const filtered = artworks.filter(a => a.artistId === artistId);
    return res.json(filtered);
  }
  
  res.json(artworks);
});

// Get single artwork
app.get('/api/artworks/:id', (req, res) => {
  const artwork = artworks.find(a => a.id === req.params.id);
  if (!artwork) {
    return res.status(404).json({ message: 'Artwork not found' });
  }
  res.json(artwork);
});

// Upload artwork
app.post('/api/artworks', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }
  
  const newArtwork = {
    id: uuidv4(),
    artistId: req.body.artistId,
    title: req.body.title,
    description: req.body.description || '',
    imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    likes: 0,
    createdAt: new Date().toISOString().split('T')[0],
    tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : []
  };
  
  artworks.push(newArtwork);
  
  // Update artist's artworks
  const artist = artists.find(a => a.id === req.body.artistId);
  if (artist) {
    artist.artworks.push(newArtwork);
  }
  
  res.status(201).json(newArtwork);
});

// Like artwork
app.post('/api/artworks/:id/like', (req, res) => {
  const artwork = artworks.find(a => a.id === req.params.id);
  if (!artwork) {
    return res.status(404).json({ message: 'Artwork not found' });
  }
  
  artwork.likes += 1;
  res.json(artwork);
});

// Delete artwork
app.delete('/api/artworks/:id', (req, res) => {
  const index = artworks.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Artwork not found' });
  }
  
  const artwork = artworks[index];
  
  // Delete file if it's a local upload
  if (artwork.imageUrl.includes('/uploads/')) {
    const filename = artwork.imageUrl.split('/uploads/')[1];
    const filepath = path.join(__dirname, 'uploads', filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
  
  artworks.splice(index, 1);
  res.json({ message: 'Artwork deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`🎨 Artist Gallery API running on http://localhost:${PORT}`);
});
