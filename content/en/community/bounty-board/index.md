---
title: "Bounty Board"
linkTitle: "Bounty Board"
weight: 20
description: "Community Hardware Funding & Projects"
---

<style>
.bounty-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
  color: #1e293b;
  transition: transform 0.2s;
}
.bounty-card:hover { transform: translateY(-3px); }
[data-bs-theme="dark"] .bounty-card {
  background: rgba(15, 23, 42, 0.7) !important;
  color: #e2e8f0;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}
.progress-container {
  background: rgba(0,0,0,0.1);
  border-radius: 100px;
  height: 12px;
  overflow: hidden;
  margin: 1rem 0;
}
[data-bs-theme="dark"] .progress-container { background: rgba(255,255,255,0.1); }
.progress-fill {
  background: linear-gradient(90deg, #1dd1a1, #10ac84);
  height: 100%;
  border-radius: 100px;
}
.hardware-list { list-style: none; padding-left: 0; }
.hardware-list li { padding: 0.25rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
[data-bs-theme="dark"] .hardware-list li { border-bottom: 1px solid rgba(255,255,255,0.05); }
.hardware-list li:last-child { border-bottom: none; }
</style>

<div class="row mb-5 mt-5 pt-4">
  <div class="col-12 text-center">
    <h1 class="display-4 fw-bold" style="color: #1dd1a1;">Community Bounty Board</h1>
    <p class="lead text-muted">Pitch in to help fund strategic infrastructure nodes across the Central Valley. Every contribution builds a stronger, more resilient network for everyone.</p>
  </div>
</div>

<div class="row">
  <div class="col-12">
    <div class="bounty-card text-center py-5">
      <i class="fa-solid fa-mug-hot fa-3x mb-3 text-muted"></i>
      <h3 class="fw-bold mb-2">No Active Bounties</h3>
      <p class="text-muted mb-0">Our current network goals are fully funded or completed. Check back soon for new opportunities to support the mesh!</p>
    </div>
  </div>
</div>
