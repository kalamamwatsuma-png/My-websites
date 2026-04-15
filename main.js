// Sticky nav shadow
window.addEventListener('scroll',()=>{
  document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

// Mobile drawer toggle
function toggleDrawer(){
  const d = document.getElementById('nav-drawer');
  if(d) d.classList.toggle('open');
}
// Starts animation
const counters = document.querySelectorAll('.stat-n');

counters.forEach(counter => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const increment = target / 100; // controls speed

  function updateCount() {
    count += increment;

    if (count < target) {
      counter.innerText = Math.floor(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  }
  updateCount();
  
// Active nav link highlight based on current page
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a[data-page]').forEach(a => {
    if(a.getAttribute('href') === page || a.getAttribute('data-page') === page){
      a.classList.add('active');
    }
  });
})();

// Contact form submission (all pages)
function handleSubmit(){
  const name  = document.getElementById('f-name')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  const msg   = document.getElementById('f-msg')?.value.trim();
  if(!name || !email || !msg){
    alert('Please fill in Name, Email and Message.');
    return;
  }
  const btn = document.querySelector('.submit-btn');
  if(btn){ btn.textContent = 'Sending…'; btn.disabled = true; }
  setTimeout(()=>{
    const ok = document.getElementById('form-success');
    if(ok){ ok.style.display = 'block'; }
    if(btn){ btn.textContent = 'Send Message'; btn.disabled = false; }
    document.getElementById('f-name').value  = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-msg').value   = '';
  }, 900);
}

// Intersection observer for fade-up animations
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.style.animationPlayState='running'; });
},{threshold:.15});
document.querySelectorAll('.fade-up').forEach(el=>{
  el.style.animationPlayState='paused';
  obs.observe(el);
});
