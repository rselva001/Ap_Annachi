const API_BASE = 'http://localhost:8080/api/videos'; // Change if needed

// Fetch videos from backend and render them
async function loadYouTubeVideos() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to load videos');
    const videos = await res.json();
    renderYouTubeVideos(videos);
    setupYouTubePlayers();
  } catch (err) {
    document.getElementById('youtubeVideoList').innerHTML = '<p style="color:red;">Could not load videos.</p>';
  }
}

function extractYouTubeID(url) {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function renderYouTubeVideos(videos) {
  const container = document.getElementById('youtubeVideoList');
  container.innerHTML = '';
  videos.forEach((video, idx) => {
    const videoId = extractYouTubeID(video.youtubeUrl);
    if (!videoId) return;
    const card = document.createElement('div');
    card.className = 'youtube-video-card';
    card.innerHTML = `
      <iframe id="ytplayer${idx+1}" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen style="width:100%; aspect-ratio:16/9;"></iframe>
      <p>Subscribe for more inspiring stories of service, leadership talks, and project updates.</p>
    `;
    container.appendChild(card);
  });
}

// Ensure only one video plays at a time
function setupYouTubePlayers() {
  window.onYouTubeIframeAPIReady = function() {
    const iframes = document.querySelectorAll('.youtube-horizontal-scroll iframe');
    window.ytPlayers = [];
    iframes.forEach((iframe, idx) => {
      window.ytPlayers[idx] = new YT.Player(iframe.id, {
        events: {
          'onStateChange': function(event) {
            if (event.data === YT.PlayerState.PLAYING) {
              window.ytPlayers.forEach(function(player) {
                if (player !== event.target) player.pauseVideo();
              });
            }
          }
        }
      });
    });
  };
}

// Load videos on page load
document.addEventListener('DOMContentLoaded', loadYouTubeVideos);
  // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const body = document.body;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
      body.classList.toggle('menu-open');
      
      // Change icon between bars and times
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      body.classList.remove('menu-open');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });

    // Close menu when clicking a link (for single page navigation)
    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
