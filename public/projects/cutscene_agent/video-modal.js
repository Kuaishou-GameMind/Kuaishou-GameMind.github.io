  // ── Video Modal (inline to guarantee execution) ──
  (function() {
    var modal = document.getElementById('videoModal');
    var video = document.getElementById('modalVideo');
    var closeBtn = document.getElementById('modalClose');
    var backdrop = document.getElementById('modalBackdrop');

    function open(src) {
      // If modal already open with same src, do nothing (avoid audio restart)
      if (modal.classList.contains('is-open')) return;
      video.src = src;
      video.load();
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Wait a tick so modal becomes visible before play (fixes iOS/Chrome frame render)
      setTimeout(function() {
        var p = video.play();
        if (p && p.catch) p.catch(function(){});
      }, 50);
    }

    function close() {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      video.pause();
      video.removeAttribute('src');
      video.load();
      document.body.style.overflow = '';
    }

    var thumb1 = document.getElementById('thumb1');
    if (thumb1) {
      thumb1.addEventListener('click', function() { open('assets/demo_mds_1.mp4'); });
    }

    var thumb2 = document.getElementById('thumb2');
    if (thumb2) {
      thumb2.addEventListener('click', function() { open('assets/demo_bar.mp4'); });
    }

    var thumb3 = document.getElementById('thumb3');
    if (thumb3) {
      thumb3.addEventListener('click', function() { open('assets/demo_gf_1.mp4'); });
    }

    var thumb4 = document.getElementById('thumb4');
    if (thumb4) {
      thumb4.addEventListener('click', function() { open('assets/demo_let_bullet_fly_1.mp4'); });
    }

    var thumb5 = document.getElementById('thumb5');
    if (thumb5) {
      thumb5.addEventListener('click', function() { open('assets/camera_ctrl_demo_1.mp4'); });
    }

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
  })();
