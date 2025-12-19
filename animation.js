document.addEventListener('DOMContentLoaded', function() {
  
// Hero text animation
const wordItems = document.querySelectorAll('.hero-word-item');

wordItems.forEach(function(wordItem) {
  const text = wordItem.textContent.trim();
  wordItem.innerHTML = '';
  
  text.split('').forEach(function(char) {
    const span = document.createElement('span');
    span.className = 'hero-letter';
    span.style.display = 'inline-block';
    span.textContent = char;
    wordItem.appendChild(span);
  });
});

const letters = document.querySelectorAll('.hero-letter');

gsap.set(letters, { 
  yPercent: -120,
  opacity: 0 
});

const heroTrigger = document.getElementById('enter');

if (heroTrigger) {
  heroTrigger.addEventListener('click', function() {
    gsap.to(letters, {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      delay: 0.5,
      ease: 'power3.out',
      stagger: {
        each: 0.035,
        from: 'center'
      }
    });
  });
}

  // Time display
  function updateTime() {
    const options = {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const time = new Date().toLocaleTimeString('fr-FR', options);
    
    const headerTime = document.getElementById('courchevel-time');
    const footerTime = document.getElementById('courchevel-time-footer');
    
    if (headerTime) headerTime.innerText = time;
    if (footerTime) footerTime.innerText = time;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // Door entrance
  const door = document.querySelector('.section_door');
  const enterBtn = document.getElementById('enter');
  const body = document.body;
  
  if (door && enterBtn) {
    body.style.overflow = 'hidden';
    
    enterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      door.style.transition = 'transform 0.8s ease-in-out';
      door.style.transform = 'translateY(-100%)';
      
      setTimeout(function() {
        door.style.display = 'none';
        body.style.overflow = '';
      }, 800);
    });
  }

  // Navbar scroll behavior
  const navbar = document.querySelector('.navbar_component');
  const heroHeight = window.innerHeight;
  let lastScroll = 0;
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      
      if (currentScroll > heroHeight * 0.2) {
        navbar.classList.add('is-active');
      } else {
        navbar.classList.remove('is-active');
      }
      
      if (currentScroll > heroHeight) {
        if (currentScroll > lastScroll) {
          navbar.classList.add('is-hidden');
          navbar.classList.remove('is-scrollback');
        } else {
          navbar.classList.remove('is-hidden');
          navbar.classList.add('is-scrollback');
        }
      } else {
        navbar.classList.remove('is-hidden');
        navbar.classList.remove('is-scrollback');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Marquee animation
  gsap.registerPlugin(ScrollTrigger);
  
  const leftColumns = document.querySelectorAll('.where_marquee-column.is-left');
  const rightColumns = document.querySelectorAll('.where_marquee-column.is-right');
  const animations = [];
  
  leftColumns.forEach(column => {
    const content = column.innerHTML;
    column.innerHTML = content + content;
    
    const anim = gsap.to(column, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: 'linear'
    });
    animations.push(anim);
  });
  
  rightColumns.forEach(column => {
    const content = column.innerHTML;
    column.innerHTML = content + content;
    
    gsap.set(column, { xPercent: -50 });
    
    const anim = gsap.to(column, {
      xPercent: 0,
      repeat: -1,
      duration: 30,
      ease: 'linear'
    });
    animations.push(anim);
  });
  
  if (animations.length > 0) {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity()) / 1000;
        const speed = 1 + Math.min(velocity, 2);
        
        animations.forEach(anim => {
          anim.timeScale(speed);
          gsap.to(anim, {
            timeScale: 1,
            duration: 0.5,
            overwrite: true
          });
        });
      }
    });
  }

  // FAQ accordion
  var summaryHeadings = document.querySelectorAll('.summary_faq-heading');
  var firstSummaryItem = document.querySelector('.summary_list-item');
  
  if (firstSummaryItem) {
    firstSummaryItem.classList.add('is-open');
  }

  for (var i = 0; i < summaryHeadings.length; i++) {
    summaryHeadings[i].addEventListener('click', function() {
      var item = this.closest('.summary_list-item');
      item.classList.toggle('is-open');
    });
  }

});
