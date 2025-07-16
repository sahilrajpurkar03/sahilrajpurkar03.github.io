/**
 * Sahil Rajpurkar - Portfolio Website
 * Main JavaScript File
 * 
 * Features:
 * - Mobile navigation
 * - Scroll effects
 * - Timeline interactions (Experience & Education)
 * - Project filtering
 * - Scroll animations
 * - Smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // 1. MOBILE NAVIGATION
  // ======================
  const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  };

  // ======================
  // 2. SCROLL EFFECTS
  // ======================
  const initScrollEffects = () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ======================
  // 3. TIMELINE INTERACTIONS
  // ======================
  const initTimelineSections = () => {
    const setupTimeline = (containerSelector) => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      container.querySelectorAll('.timeline-hint').forEach(hint => {
        hint.addEventListener('click', function() {
          const details = this.nextElementSibling;
          const arrow = this.querySelector('.arrow-icon');
          
          details.classList.toggle('active');
          arrow.style.transform = details.classList.contains('active') 
            ? 'rotate(180deg)' 
            : 'rotate(0)';
        });
      });
    };

    // Initialize for both Experience and Education sections
    setupTimeline('#experience');
    setupTimeline('#education');
  };

  // ======================
  // 4. PROJECT FILTERING
  // ======================
  const initProjectFilter = () => {
    const tabButtons = document.querySelectorAll('.project-tab-btn');
    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        document.querySelectorAll('.project-card').forEach(card => {
          card.style.display = (category === 'all' || card.getAttribute('data-category') === category) 
            ? 'block' 
            : 'none';
        });
      });
    });
  };

  // ======================
  // 5. SCROLL ANIMATIONS
  // ======================
  const initScrollAnimations = () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger animation slightly early
    });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  };

  // ======================
  // INITIALIZE ALL FEATURES
  // ======================
  initMobileMenu();
  initScrollEffects();
  initTimelineSections();
  initProjectFilter();
  initScrollAnimations();

  // Optional: Console greeting
  console.log('%c👋 Hello! Thanks for checking out my portfolio.', 
    'color: #00f0ff; font-size: 16px; font-weight: bold;');
});