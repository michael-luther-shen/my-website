// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    
    // For now, just show an alert since we don't have sections
    // In a real implementation, you'd scroll to the appropriate section
    switch(targetId) {
      case 'about':
        alert('About section would be here!');
        break;
      case 'projects':
        alert('Projects section would be here!');
        break;
      case 'contact':
        alert('Contact section would be here!');
        break;
      default:
        console.log('Clicked on:', targetId);
    }
  });
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click ripple effect to buttons
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

// Console welcome message
console.log(`
🚀 Welcome to Michael's Website!
✨ Built with animated gradient background
🎨 Featuring typewriter effect
📱 Fully responsive design

Thanks for visiting! 👋
`);

// Add some fun mouse tracking effect
document.addEventListener('mousemove', (e) => {
  // Create subtle parallax effect on the gradient
  const body = document.body;
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  // Subtle background position adjustment based on mouse position
  body.style.backgroundPosition = `${50 + x * 10}% ${50 + y * 10}%`;
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const buttons = document.querySelectorAll('.btn');
  let currentIndex = -1;
  
  // Find current focused button
  buttons.forEach((btn, index) => {
    if (btn === document.activeElement) {
      currentIndex = index;
    }
  });
  
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % buttons.length;
    buttons[nextIndex].focus();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
    buttons[prevIndex].focus();
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (document.activeElement && document.activeElement.classList.contains('btn')) {
      document.activeElement.click();
    }
  }
});

// Add focus styles for accessibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
  .btn:focus {
    outline: 3px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
`;
document.head.appendChild(focusStyle);
