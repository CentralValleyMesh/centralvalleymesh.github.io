---
title: Central Valley Mesh
---

<style>

.hero-section {
  position: relative;
  height: 80vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0b0f19;
  color: white;
  margin-top: -3rem;
  margin-bottom: 2rem;
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  width: 90%;
}

.home_header {
  font-weight: 800;
  font-size: 2.8rem;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none !important;
  margin-bottom: 1.5rem;
}

.btn-custom {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border-radius: 50px;
  padding: 12px 28px;
  font-weight: 500;
  text-decoration: none;
}

.btn-custom:hover {
  background: white;
  color: #0b0f19;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.btn-primary-custom {
  background: linear-gradient(135deg, #0061ff 0%, #60efff 100%);
  border: none;
  color: white;
  border-radius: 50px;
  padding: 12px 28px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(96, 239, 255, 0.4);
  color: white;
}


.glass-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  color: #1a1a1a;
}
.glass-card h4 {
  color: #1a1a1a !important;
}
.glass-card .text-muted {
  color: #4b5563 !important;
}
.glass-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.icon-wrapper {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #0061ff;
  background: -webkit-linear-gradient(135deg, #0061ff 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.discord-banner {
  background: linear-gradient(135deg, #5865F2, #4752c4);
  color: white;
  border-radius: 24px;
  padding: 5rem 2rem;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 4rem;
  box-shadow: 0 20px 40px rgba(88, 101, 242, 0.3);
  position: relative;
  overflow: hidden;
}

.discord-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  z-index: 0;
}
.discord-inner {
  position: relative;
  z-index: 1;
}


.front-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>

<div class="hero-section">
  <div id="tsparticles"></div>
  <div class="hero-content">
    <img src="/images/central-valley-mesh.png" alt="Central Valley Mesh Logo" style="width:160px; margin-bottom: 1.5rem; filter: drop-shadow(0px 0px 15px rgba(255,255,255,0.15));">
    <h1 class="home_header">Central Valley Mesh<br /><span style="font-size:1.6rem; font-weight:400; color:#cbd5e1; -webkit-text-fill-color: #cbd5e1;">A Meshtastic Community Site</span></h1>
    <p class="lead mb-4" style="color:#e2e8f0; font-size: 1.1rem;">Building the communication network of tomorrow, together in the Central Valley.</p>
    
<div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
<a class="btn btn-primary-custom mx-2 mb-2" href="about/">
Learn More <i class="fas fa-arrow-right ms-2"></i>
</a>
<a class="btn btn-custom mx-2 mb-2" href="docs/">
Docs <i class="fa-solid fa-book ms-2"></i>
</a>
<a class="btn btn-custom mx-2 mb-2" href="community/">
Community <i class="fa-solid fa-users ms-2"></i>
</a>
</div>
  </div>
</div>

<div class="front-container mt-5 pt-4">
  <div class="row text-center mb-5 pb-3">
    <div class="col-12">
      <h2 class="display-5 fw-bold">Connecting the Valley</h2>
      <p class="lead text-muted" style="max-width: 600px; margin: 0 auto;">Join the growing network of decentralized, off-grid communicators mapping the Central Valley.</p>
    </div>
  </div>

  <div class="row g-4 mb-5 pb-4">
    <div class="col-md-4">
      <div class="glass-card text-center d-flex flex-column">
        <div class="icon-wrapper"><i class="fa-solid fa-satellite-dish"></i></div>
        <h4 class="fw-bold mb-3">Wide Coverage</h4>
        <p class="text-muted flex-grow-1">Our community operates nodes across the Central Valley, expanding coverage every day.</p>
        <a href="#live-network-map" class="text-decoration-none fw-bold text-primary mt-3">View Coverage Map &rarr;</a>
      </div>
    </div>
    <div class="col-md-4">
      <div class="glass-card text-center d-flex flex-column">
        <div class="icon-wrapper"><i class="fa-solid fa-calendar-days"></i></div>
        <h4 class="fw-bold mb-3">Events</h4>
        <p class="text-muted flex-grow-1">Meetups, build days, and mesh tests. Come hang out and learn with the community.</p>
        <a href="events/" class="text-decoration-none fw-bold text-primary mt-3">See Upcoming Events &rarr;</a>
      </div>
    </div>
    <div class="col-md-4">
      <div class="glass-card text-center d-flex flex-column">
        <div class="icon-wrapper"><i class="fa-solid fa-solar-panel"></i></div>
        <h4 class="fw-bold mb-3">Solar Nodes</h4>
        <p class="text-muted flex-grow-1">Learn how to build sustainable, off-grid communication relays for your area.</p>
        <a href="builds/" class="text-decoration-none fw-bold text-primary mt-3">Explore Builds &rarr;</a>
      </div>
    </div>
  </div>

  {{< telemetry_blocks >}}

  <div id="live-network-map" class="mt-5 pt-4 mb-5">
    <div class="d-flex justify-content-between align-items-end mb-4">
      <div>
        <h2 class="display-6 fw-bold mb-0">Live Network Map</h2>
        <p class="mt-2 mb-0 text-muted">Explore the real-time layout of the Central Valley nodes via <span class="fw-bold">CV Mesh Info</span>.</p>
      </div>
      <div>
        <a href="https://meshinfo.cvme.sh/map" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary rounded-pill px-4 me-2 shadow-sm mb-2 mb-md-0 d-none d-md-inline-block">Open Full Screen <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i></a>
        <a href="https://map.visaliamesh.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary rounded-pill px-4 me-2 shadow-sm mb-2 mb-md-0 d-block d-md-inline-block">Visalia Map <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i></a>
        <a href="https://meshmap.net/" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary rounded-pill px-4 d-none d-md-inline-block">Old MeshMap <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i></a>
      </div>
    </div>
    
<div class="card border-0 shadow-lg" style="border-radius: 20px; overflow: hidden; height: 650px; background: #0f172a;">
<iframe src="https://meshinfo.cvme.sh/map" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
</div>
<div class="text-end mt-3 me-2">
<small class="text-muted" style="opacity: 0.8;">Powered by <a href="https://github.com/MeshAddicts/meshinfo" class="fw-bold text-decoration-none" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github me-1"></i>CV Mesh Info</a></small>
</div>
  </div>


  {{< recent_builds >}}

  <div class="discord-banner">
    <div class="discord-inner">
      <i class="fab fa-discord fa-4x mb-4"></i>
      <h2 class="display-6 fw-bold text-white mb-3">Join Our Discord Community</h2>
      <p class="lead text-white-50 mb-5" style="max-width: 600px; margin: 0 auto;">Our website is continually evolving, and our community is highly active! Join the conversation, share your builds, and get help starting out.</p>
      <a href="https://discord.gg/UfWSrQMFp9" class="btn btn-light btn-lg rounded-pill fw-bold px-5 py-3 shadow-lg" style="color: #5865F2; transition: transform 0.2s;">Join the Server</a>
    </div>
  </div>
</div>


<script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  tsParticles.load("tsparticles", {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: { grab: { distance: 150, links: { opacity: 0.8 } } },
    },
    particles: {
      color: { value: "#00f2fe" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1.0,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 70 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  });
});
</script>