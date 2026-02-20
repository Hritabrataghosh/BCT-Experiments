// ===== Cosmic Starfield =====
const bg = document.getElementById('bg');
const ctx = bg.getContext('2d');
function resize(){ bg.width=innerWidth; bg.height=innerHeight; }
resize(); addEventListener('resize',resize);

let stars = Array.from({length:120},()=>({
  x:Math.random()*bg.width,
  y:Math.random()*bg.height,
  v:Math.random()*0.6+0.2,
  s:Math.random()*1.2+0.5
}));

function drawStars(){
  ctx.clearRect(0,0,bg.width,bg.height);
  stars.forEach(s=>{
    s.y += s.v; if(s.y>bg.height){ s.y=0; s.x=Math.random()*bg.width; }
    ctx.fillStyle = `rgba(124,124,255,.9)`;
    ctx.fillRect(s.x, s.y, s.s, s.s);
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== Scroll progress + reveal =====
addEventListener('scroll',()=>{
  const p = (scrollY/(document.body.scrollHeight-innerHeight))*100;
  document.getElementById('progress').style.width=p+'%';

  document.querySelectorAll('.reveal').forEach((el,i)=>{
    if(el.getBoundingClientRect().top < innerHeight-120){
      setTimeout(()=>el.classList.add('show'), i*80);
    }
  });
});

// ===== Skill bar animate when visible =====
const skillObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar span').forEach(s=>{
        s.style.width = s.dataset.level + '%';
      });
      skillObserver.unobserve(e.target);
    }
  });
},{threshold:.4});
document.querySelectorAll('#skills').forEach(sec=>skillObserver.observe(sec));

// ===== Project filters with animation =====
const filters = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');
filters.forEach(b=>b.onclick=()=>{
  filters.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const f=b.dataset.f;
  projects.forEach((p,i)=>{
    const show = (f==='all'||p.dataset.cat.includes(f));
    p.style.transitionDelay = (i*40)+'ms';
    p.style.opacity = show ? '1':'0';
    p.style.transform = show ? 'translateY(0) scale(1)':'translateY(20px) scale(.95)';
    p.style.pointerEvents = show ? 'auto':'none';
  });
});

// ===== Modal =====
function openModal(t,d,i){
  const m=document.getElementById('modal');
  document.getElementById('mTitle').innerText=t;
  document.getElementById('mDesc').innerText=d;
  document.getElementById('mImg').src=i;
  m.style.display='grid';
}
function closeModal(){
  const m=document.getElementById('modal');
  m.style.display='none';
}

// ===== Magnetic buttons (subtle) =====
document.querySelectorAll('.btn, button').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX - r.left - r.width/2)/10;
    const y=(e.clientY - r.top - r.height/2)/10;
    btn.style.transform = `translate(${x}px,${y}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});

// ===== Smooth anchor scroll helper =====
function scrollToId(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}
