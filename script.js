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
  // 2. THEME TOGGLE
  // ======================
  const initThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';

    const updateTheme = (theme) => {
      const isLight = theme === 'light';
      root.dataset.theme = theme;
      themeToggle.innerHTML = `<i class="fas fa-${isLight ? 'moon' : 'sun'}"></i>`;
      themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
      themeToggle.setAttribute('title', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    };

    updateTheme(initialTheme);

    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', nextTheme);
      updateTheme(nextTheme);
    });
  };

  // ======================
  // 3. SCROLL EFFECTS
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
  // 4. TIMELINE INTERACTIONS
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
    setupTimeline('#internships');
  };

  // ======================
  // 5. PROJECT FILTERING
  // ======================
  const initProjectFilter = () => {
    const tabButtons = document.querySelectorAll('.project-tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (tabButtons.length === 0) return;

    // Set default category
    const defaultCategory = 'robotics';

    // Apply default filter on load
    tabButtons.forEach(button => {
      const category = button.getAttribute('data-category');
      if (category === defaultCategory) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    projectCards.forEach(card => {
      card.style.display = (card.getAttribute('data-category') === defaultCategory) ? 'block' : 'none';
    });

    // Handle button click filtering
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          card.style.display =
            category === 'all' || card.getAttribute('data-category') === category
              ? 'block'
              : 'none';
        });
      });
    });
  };

  // ======================
  // 6. SCROLL ANIMATIONS
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
  // 7. SCROLL SPY EFFECT
  // ======================
  const initScrollSpy = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
      let current = "";

      // Detect which section is currently in viewport
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset for navbar height
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      // Highlight the active navigation link
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  };  

  // ======================
  // INITIALIZE ALL FEATURES
  // ======================
  initMobileMenu();
  initThemeToggle();
  initScrollEffects();
  initTimelineSections();
  initProjectFilter();
  initScrollAnimations();
  initScrollSpy();

  // Optional: Console greeting
  console.log('%c👋 Hello! Thanks for checking out my portfolio.', 
    'color: #00f0ff; font-size: 16px; font-weight: bold;');
});