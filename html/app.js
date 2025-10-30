// app.js — handles navigation toggle, tabs, and reveal-on-scroll
(function(){
  // small DOM helpers
  const $ = (s, root=document) => Array.from(root.querySelectorAll(s));

  // year fillers
  const y = new Date().getFullYear();
  const yEls = ['year','year2','year3'];
  yEls.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = y; });

  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', ()=>{
      mainNav.classList.toggle('open');
    });
  }

  // Tabs logic
  const tabButtons = $('.tab');
  if(tabButtons.length){
    tabButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        const target = btn.dataset.target;
        // switch active tab
        const parent = btn.closest('.tabs');
        if(!parent) return;
        $('.tab', parent).forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        // switch panels
        $('.tab-panel', parent).forEach(p=>p.classList.remove('active'));
        const panel = parent.querySelector('#'+target);
        if(panel) panel.classList.add('active');
      });
    });
  }

  // Reveal on scroll using IntersectionObserver
  const reveals = $('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },{root:null,rootMargin:'0px 0px -6% 0px',threshold:0.05});
    reveals.forEach(r=>io.observe(r));
  } else {
    // fallback
    reveals.forEach(r=>r.classList.add('in-view'));
  }

  // Smooth anchor scrolling for internal links
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href.length>1){
      const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
  });

})();
