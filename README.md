🎧 Chillax – Minimalist Music Streaming Web App

Chillax is a lightweight, web-based music player built using pure HTML, CSS, and JavaScript. It dynamically loads songs from local folders and organizes them into albums using JSON metadata.

🌐 Live Demo  
👉 https://music-app-c2c5b.web.app

✨ Features
- Folder-based music organization using JSON files
- Dynamic playlist rendering
- Play, pause, next, and previous track controls
- Interactive seek bar with real-time progress
- Automatic song & artist extraction from filenames
- Responsive sidebar navigation (hamburger menu)
- Clean and minimal UI

📂 Project Structure
Music files must follow this structure:

/songs/AlbumName/
- info.json → album title & description  
- list.json → list of audio filenames  
- cover.jpeg → album artwork  
- Song-Artist.mpeg → audio files (hyphen-separated)

🛠️ Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (Audio API)
- Firebase Hosting

🚀 Running Locally
1. Clone the repository
```bash
git clone https://github.com/yourusername/chillax.git
