// Initialize interactive background particles
function initParticles() {
  const particlesContainer = document.getElementById('particles-background');
  const codeSymbols = ['<>', '{}', '()', '[]', '//', '/*', '*/', ';;', '==', '=>', '&&', '||'];
  const colors = ['#4169e1', '#6495ED', '#1E90FF', '#87CEFA', '#4682B4'];
  
  // Configuration for particles
  const config = {
    particleCount: 60,  // Adjust for performance
    minSize: 3,
    maxSize: 8,
    minDuration: 15,  // Animation duration in seconds
    maxDuration: 30,
    codeParticleRate: 0.2, // 20% of particles will be code symbols
    triangleRate: 0.15,    // 15% will be triangles
    squareRate: 0.15       // 15% will be squares
  };
  
  // Cleanup any existing particles
  particlesContainer.innerHTML = '';
  
  // Create the particles
  for (let i = 0; i < config.particleCount; i++) {
    const particle = document.createElement('div');
    
    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const startX = Math.random() * 100; // random x position (%)
    const startY = Math.random() * 100; // random y position (%)
    const distanceX = (Math.random() - 0.5) * 50; // random horizontal movement
    const distanceY = (Math.random() - 0.5) * 50; // random vertical movement
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const delay = Math.random() * 10; // random delay to start animation
    const opacity = Math.random() * 0.5 + 0.1; // random opacity between 0.1 and 0.6
    const scale = Math.random() * 1 + 0.5; // random scale between 0.5 and 1.5
    const rotation = Math.random() * 360; // random rotation for non-circular particles
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set CSS custom properties to be used in the animation
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--start-x', `${startX}vw`);
    particle.style.setProperty('--start-y', `${startY}vh`);
    particle.style.setProperty('--distance-x', `${distanceX}vw`);
    particle.style.setProperty('--distance-y', `${distanceY}vh`);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--opacity', `${opacity}`);
    particle.style.setProperty('--scale', `${scale}`);
    particle.style.setProperty('--rotation', `${rotation}deg`);
    particle.style.backgroundColor = color;
    
    // Determine particle type based on configured rates
    const randomValue = Math.random();
    
    if (randomValue < config.codeParticleRate) {
      // Code symbol particle
      const symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
      particle.className = 'particle code';
      particle.textContent = symbol;
    } else if (randomValue < config.codeParticleRate + config.triangleRate) {
      // Triangle particle
      particle.className = 'particle triangle';
      particle.style.borderColor = color;
    } else if (randomValue < config.codeParticleRate + config.triangleRate + config.squareRate) {
      // Square particle
      particle.className = 'particle square';
    } else {
      // Default circle particle
      particle.className = 'particle';
    }
    
    // Set size for normal particles (code particles have their own sizing)
    if (!particle.classList.contains('code')) {
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
    }
    
    // Add to container
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles on page load
window.addEventListener('load', initParticles);

// Reinitialize on window resize (debounced to avoid performance issues)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initParticles, 250);
});

// Existing code continues below...
const menuHamburguer = document.querySelector('.menu-hamburguer');
const nav = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar-links li a');

let swiper = createSwiper(".mySwiper", ".swiper-pagination", ".swiper-button-next", ".swiper-button-prev");
let header = document.getElementById('header');
const backToTopButton = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.card-project');

// Initialize swiper
function createSwiper(container, pagination, nextButton, prevButton) {
  return new Swiper(container, {
    slidesPerView: handleWidth(),
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
}

function handleWidth() {
  let getWidth = window.innerWidth || document.documentElement.clientWidth;
  let slideShow = 3;

  if (getWidth < 1001) {
    slideShow = 2;
  }

  if (getWidth < 700) {
    slideShow = 1;
  }

  return slideShow
}

// Menu toggle
menuHamburguer.addEventListener('click', () => {
  nav.classList.toggle('active');
});

links.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.toggle('active');
  })
})

// Resize handler
window.addEventListener('resize', () => {
  swiper.params.slidesPerView = handleWidth();
  swiper.update();
})

// Scroll handlers
window.addEventListener('scroll', () => {
  // Header background change with blur effect
  if (window.scrollY >= 50) {
    header.classList.add('scrolled');
    header.style.background = 'rgba(25, 25, 25, 0.8)';
    header.style.backdropFilter = 'blur(10px)';
    header.style.padding = '15px 40px';
  } else {
    header.classList.remove('scrolled');
    header.style.background = 'transparent';
    header.style.backdropFilter = 'blur(0px)';
    header.style.padding = '20px 40px';
  }
  
  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
  
  // Fade in elements on scroll
  fadeInElements();
})

// Back to top button functionality
if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Project filtering functionality
if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Update swiper after filtering
      swiper.update();
    });
  });
}

// Contact form handling
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For now, just show a success message
    alert('Thanks for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
  });
}

// Add fade-in animation to elements
function fadeInElements() {
  const elements = document.querySelectorAll('.card-project, .box-about, .contact-form-container, .timeline-item');
  
  elements.forEach(element => {
    const position = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (position < screenPosition) {
      element.classList.add('fade-in');
      if (element.classList.contains('timeline-item')) {
        element.classList.add('animate');
      }
    }
  });
}

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});