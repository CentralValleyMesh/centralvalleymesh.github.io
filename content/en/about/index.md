---
title: About Central Valley Mesh
linkTitle: About
menu: {main: {weight: 10}}
---

<style>

.scrolling-bg {
  position: fixed;
  top: -10%;
  left: -10%;
  width: 120vw;
  height: 120vh;
  z-index: -1;
  background: url('featured-background.jpg') center/cover no-repeat;
  animation: panImage 45s ease-in-out infinite alternate;
}

[data-bs-theme="dark"] .scrolling-bg {
  opacity: 0.5;
}

@keyframes panImage {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.1) translate(-2%, -2%); }
}

.about-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  margin-top: 4rem;
  margin-bottom: 4rem;
  color: #1e293b;
}
[data-bs-theme="dark"] .about-card {
  background: rgba(15, 23, 42, 0.8) !important;
  color: #e2e8f0;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}
</style>

<div class="scrolling-bg"></div>

<div class="container">
<div class="row justify-content-center">
<div class="col-lg-8">
<div class="about-card text-center">
<h1 class="display-3 fw-bold mb-4" style="background: linear-gradient(135deg, #0061ff 0%, #60efff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">About Us</h1>

<p class="lead mb-4">This is a website for the <a href="https://meshtastic.org/">Meshtastic</a> Community members that reside in the <a href="https://en.wikipedia.org/wiki/Central_Valley_(California)">Central Valley of California, USA</a>.</p>

<div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5 mt-4">
<a href="https://discord.gg/UfWSrQMFp9" class="btn btn-primary btn-lg rounded-pill px-4 gap-3">
<i class="fab fa-discord me-2"></i> Join our Discord
</a>
</div>

<p class="text-muted small">Don't worry if you're not local, there are other fantastic Meshtastic communities in <a href="https://meshtastic.org/docs/community/local-groups/#california">California</a>, or all around <a href="https://meshtastic.org/docs/community/local-groups/">the world</a>.</p>
</div>
</div>
</div>
</div>