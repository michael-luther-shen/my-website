// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const exploreBtn = document.getElementById('exploreBtn');
const contactBtn = document.getElementById('contactBtn');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Button interactions
exploreBtn.addEventListener('click', () => {
  const aboutSection = document.getElementById('about');
  aboutSection.scrollIntoView({ behavior: 'smooth' });
});

contactBtn.addEventListener('click', () => {
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  // Animate skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });

  // Animate stat items
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(item);
  });

  // Animate contact items
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });

  // Animate social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(30px)';
    link.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(link);
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start) + '+';
    
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    }
  }, 16);
}

// Animate counters when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.textContent);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  counterObserver.observe(stat);
});

// Floating cards hover effect
document.querySelectorAll('.floating-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-30px) scale(1.05)';
    card.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Button ripple effect
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 600ms linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const floatingCards = document.querySelectorAll('.floating-card');
  
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  floatingCards.forEach((card, index) => {
    const speed = 0.5 + (index * 0.1);
    card.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const nameElement = document.querySelector('.name');
  if (nameElement) {
    const originalText = nameElement.textContent;
    typeWriter(nameElement, originalText, 150);
  }
});

// Add smooth reveal animation for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Add reveal class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  section {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  section.reveal {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(revealStyle);

// Console welcome message
console.log(`
🚀 Welcome to Michael's Website!
✨ Built with modern web technologies
🎨 Designed for the best user experience
📱 Fully responsive and mobile-friendly

Thanks for visiting! 👋
`);

// Add some fun interactions
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'cursor';
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(newCursor);
  }
  
  const cursorElement = document.querySelector('.cursor');
  cursorElement.style.left = e.clientX - 10 + 'px';
  cursorElement.style.top = e.clientY - 10 + 'px';
});

// Hide cursor on mobile
if (window.innerWidth <= 768) {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.style.display = 'none';
  }
}
