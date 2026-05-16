(function(){
  // Demo toggle: set to false for the real MeshInfo API.
  window.USE_MOCK_MESHINFO = false;
  window.MESHINFO_REAL_BASE = 'https://meshinfo.cvme.sh';
  window.MESHINFO_BASE = window.USE_MOCK_MESHINFO ? '' : window.MESHINFO_REAL_BASE;
})();
