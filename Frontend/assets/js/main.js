/**
 * Portfolio Website - Main JavaScript
 * 
 * This file contains all interactive functionality for the portfolio site:
 * - Navigation behavior (hamburger menu, active nav highlighting)
 * - Dynamic content rendering (artifacts, work experience, reflections)
 * - Progressive enhancements
 */

// Site configuration
const SITE_CONFIG = {
  studentName: "Student Full Name",
  tagline: "Computer Programming 1 | JRU",
  course: "Bachelor of Science in Information Technology",
  school: "Jose Rizal University",
  profilePhoto: "assets/images/profile.jpg",
};

// Artifacts configuration (PDFs and video)
const ARTIFACTS = {
  compiledPTs: {
    label: "Compiled PTs & Products",
    description: "All performance tasks, machine problems, activities, seatwork, and recitations compiled in one document",
    path: "assets/pdfs/artifacts.pdf",
    available: true, // Set to true when file is ready
  },
  projectDocs: {
    label: "Project Documentation",
    description: "Comprehensive documentation for course projects",
    path: "assets/pdfs/project-docs.pdf",
    available: true,
  },
  videoPresentation: {
    label: "Video Project Presentation",
    description: "Video demonstration of project features and implementation",
    type: "youtube", // or "local"
    src: "https://www.youtube.com/embed/VIDEO_ID", // Replace with actual video ID
    available: false,
  },
};

// Work experience data
const WORK_EXPERIENCE = [
  {
    role: "Assistant Chess Coach",
    organization: "CISM",
    period: "January 2023 – March 2024",
    description: "Assistant chess coach at CISM, teaching Chinese and international students fundamentals, strategy, and competitive play, fostering critical thinking, discipline, and cross-cultural communication through structured lessons.",
  },
  // Add more entries as needed
];

// Seminars and trainings attended
const SEMINARS = [
  {
    name: "Kiro Workshop: AI - Powered Development",
    date: "April 7, 2026",
  }
  // Add more entries as needed
];

// Awards and recognitions
const AWARDS = [
  {
    name: "NCR Regional Meet",
    body: "Rizal High School",
    year: "2024",
  },
  {
    name: "NCAA Season 100 Chess Competition",
    body: "Jose Rizal University",
    year: "2024",
  },
  // Add more entries as needed
];

// Organization and community involvement
const ORG_INVOLVEMENT = [
  {
    name: "JRU Mathematics Society",
    role: "P.R.O Officer   - 2025",
    scope: "on-campus",
  }
  // Add more entries as needed
];

// Term reflections data
const REFLECTIONS = [
  {
    term: "Prelim Term",
    narrative: "During the Prelim Term of Computer Programming 2, I was introduced to the fundamental concepts of programming and computational thinking. We explored the basics of Conditions, Arrays, and Try Catch, which helped me understand how to break down complex problems into manageable steps. Learning about variables, data types, and basic input/output operations opened my eyes to how programs communicate with users. I also learned how to use JCreator and CodeChum, which helped me practice coding, run programs, and submit activities more efficiently. These tools became important in developing my programming skills throughout the term. At first, I had no idea what to expect from our professor, but as the term progressed, I realized how much I learned. I was able to understand problems better, enumerate the necessary syntax, and explain solutions more clearly. The hands-on exercises challenged me to think logically and systematically. I also felt happy and motivated because I achieved high grades and did not fail, which showed that my efforts and learning were effective. This term laid a solid foundation for my programming journey, and I'm excited to build upon these core concepts as I progress through the course.",
  },
  {
    term: "Midterm",
    narrative: "The Midterm period deepened my understanding of programming concepts through topics such as arrays, try-catch, methods, 2D arrays, and arrays within methods. These lessons helped me understand how to store, organize, and manipulate data more effectively, especially using arrays and multidimensional arrays. I also learned how to handle errors using try-catch, which made my programs more stable and reliable. Studying methods helped me improve code organization by making my programs more structured and reusable. Applying arrays inside methods challenged me to think more carefully about how data flows within a program. Working on more complex exercises helped me improve my logical thinking and problem-solving skills. This term strengthened my foundation in programming and gave me more confidence in writing organized and efficient code.",
  },
  {
    term: "Final Term",
    narrative: "The Final Term brought everything together as we explored more advanced topics such as data structures and sorting without using imports. Understanding how to organize and manipulate data efficiently was a big step forward for me, especially when applying different sorting techniques in our programs. We also worked on several machine problems that challenged me to apply everything I had learned throughout the semester. These activities improved my logical thinking, problem-solving skills, and attention to detail when writing code. Although we did not cover file handling and object-oriented programming, the lessons we had were enough to strengthen my foundation in programming. Completing the tasks was both challenging and rewarding, and it showed how much I had improved. Looking back, Computer Programming has been a meaningful experience that helped me grow my skills and confidence as a programmer. I'm excited to continue learning and improving in the field of software development.",
  },
];

/**
 * Initialize hamburger menu functionality
 * Toggles mobile navigation menu and handles click-outside behavior
 */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', !isOpen);
  });

  // Close menu when a nav link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Initialize active navigation highlighting
 * Uses IntersectionObserver to highlight the nav link corresponding to the visible section
 */
function initActiveNav() {
  // Feature detection for IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported - active nav highlighting disabled');
    return;
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (sections.length === 0 || navLinks.length === 0) return;

  // Create a map of section IDs to nav links for quick lookup
  const linkMap = new Map();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      linkMap.set(sectionId, link);
    }
  });

  // Observer options: trigger when section is 30% visible
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  // Observer callback: update active link when section enters viewport
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        const activeLink = linkMap.get(sectionId);
        
        if (activeLink) {
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));
          // Add active class to current link
          activeLink.classList.add('active');
        }
      }
    });
  };

  // Create observer and observe all sections
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

/**
 * Initialize smooth scroll behavior for anchor links
 * Provides smooth scrolling with proper offset for fixed navbar
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset for fixed navbar (60px height + 20px padding)
        const navbarHeight = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
}

/**
 * Render academic artifacts (PDFs and video)
 * Shows "Coming Soon" badge for unavailable content
 */
function renderArtifacts() {
  const container = document.getElementById('artifacts-container');
  if (!container) return;

  try {
    let html = '';

    // Render compiled PTs artifact
    html += createArtifactCard(
      ARTIFACTS.compiledPTs.label,
      ARTIFACTS.compiledPTs.description,
      ARTIFACTS.compiledPTs.available,
      ARTIFACTS.compiledPTs.path,
      'pdf'
    );

    // Render project documentation artifact
    html += createArtifactCard(
      ARTIFACTS.projectDocs.label,
      ARTIFACTS.projectDocs.description,
      ARTIFACTS.projectDocs.available,
      ARTIFACTS.projectDocs.path,
      'pdf'
    );

    // Render video presentation artifact
    html += createArtifactCard(
      ARTIFACTS.videoPresentation.label,
      ARTIFACTS.videoPresentation.description,
      ARTIFACTS.videoPresentation.available,
      ARTIFACTS.videoPresentation.src,
      'video'
    );

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering artifacts:', error);
    container.innerHTML = '<p class="error-message">Error loading artifacts. Please try again later.</p>';
  }
}

/**
 * Create an artifact card (helper function)
 * @param {string} label - Artifact title
 * @param {string} description - Artifact description
 * @param {boolean} available - Whether the artifact is available
 * @param {string} path - Path or URL to the artifact
 * @param {string} type - Type of artifact ('pdf' or 'video')
 * @returns {string} HTML string for the artifact card
 */
function createArtifactCard(label, description, available, path, type) {
  const icon = type === 'pdf' ? '📄' : '🎬';
  
  if (!available) {
    return `
      <div class="artifact-card">
        <div class="artifact-icon">${icon}</div>
        <h4 class="artifact-title">${label}</h4>
        <p class="artifact-description">${description}</p>
        <span class="badge badge--soon">Coming Soon</span>
      </div>
    `;
  }

  if (type === 'pdf') {
    return `
      <div class="artifact-card">
        <div class="artifact-icon">${icon}</div>
        <h4 class="artifact-title">${label}</h4>
        <p class="artifact-description">${description}</p>
        <a href="${path}" target="_blank" rel="noopener noreferrer" class="artifact-link">
          <span>View Document</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `;
  }

  // Video type
  return `
    <div class="artifact-card artifact-card--video">
      <div class="artifact-icon">${icon}</div>
      <h4 class="artifact-title">${label}</h4>
      <p class="artifact-description">${description}</p>
      <div class="video-embed">
        <iframe 
          src="${path}" 
          title="${label}"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <noscript>
        <a href="${path}" target="_blank" rel="noopener noreferrer">Watch video presentation</a>
      </noscript>
    </div>
  `;
}

/**
 * Render work experience entries
 */
function renderWorkExperience() {
  const container = document.getElementById('work-experience-container');
  if (!container) return;

  try {
    if (WORK_EXPERIENCE.length === 0) {
      container.innerHTML = '<p class="empty-message">No work experience entries yet. Check back soon!</p>';
      return;
    }

    let html = '';
    WORK_EXPERIENCE.forEach(entry => {
      html += `
        <div class="experience-card">
          <div class="experience-header">
            <h4 class="experience-role">${entry.role}</h4>
            <span class="experience-period">${entry.period}</span>
          </div>
          <p class="experience-org">${entry.organization}</p>
          <p class="experience-description">${entry.description}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering work experience:', error);
    container.innerHTML = '<p class="error-message">Error loading work experience. Please try again later.</p>';
  }
}

/**
 * Render seminars and trainings
 */
function renderSeminars() {
  const container = document.getElementById('seminars-container');
  if (!container) return;

  try {
    if (SEMINARS.length === 0) {
      container.innerHTML = '<p class="empty-message">No seminars or trainings recorded yet. Check back soon!</p>';
      return;
    }

    let html = '';
    SEMINARS.forEach(entry => {
      html += `
        <div class="list-item">
          <div class="list-item-icon">📖</div>
          <div class="list-item-content">
            <h4 class="list-item-title">${entry.name}</h4>
            <p class="list-item-meta">${entry.date}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering seminars:', error);
    container.innerHTML = '<p class="error-message">Error loading seminars. Please try again later.</p>';
  }
}

/**
 * Render awards and recognitions
 */
function renderAwards() {
  const container = document.getElementById('awards-container');
  if (!container) return;

  try {
    if (AWARDS.length === 0) {
      container.innerHTML = '<p class="empty-message">No awards or recognitions recorded yet. Check back soon!</p>';
      return;
    }

    let html = '';
    AWARDS.forEach(entry => {
      html += `
        <div class="list-item">
          <div class="list-item-icon">🏅</div>
          <div class="list-item-content">
            <h4 class="list-item-title">${entry.name}</h4>
            <p class="list-item-meta">${entry.body} • ${entry.year}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering awards:', error);
    container.innerHTML = '<p class="error-message">Error loading awards. Please try again later.</p>';
  }
}

/**
 * Render organization and community involvement
 */
function renderOrgInvolvement() {
  const container = document.getElementById('org-involvement-container');
  if (!container) return;

  try {
    if (ORG_INVOLVEMENT.length === 0) {
      container.innerHTML = '<p class="empty-message">No organization involvement recorded yet. Check back soon!</p>';
      return;
    }

    let html = '';
    ORG_INVOLVEMENT.forEach(entry => {
      const scopeBadge = entry.scope === 'on-campus' 
        ? '<span class="scope-badge scope-badge--campus">On-Campus</span>'
        : '<span class="scope-badge scope-badge--community">Off-Campus</span>';
      
      html += `
        <div class="org-card">
          <h4 class="org-name">${entry.name}</h4>
          <p class="org-role">${entry.role}</p>
          ${scopeBadge}
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering organization involvement:', error);
    container.innerHTML = '<p class="error-message">Error loading organization involvement. Please try again later.</p>';
  }
}

/**
 * Render term reflections
 * Creates beautiful reflection cards with term labels and narratives
 */
function renderReflections() {
  const container = document.getElementById('reflections-container');
  if (!container) return;

  try {
    if (REFLECTIONS.length === 0) {
      container.innerHTML = '<p class="empty-message">No reflections available yet. Check back soon!</p>';
      return;
    }

    let html = '';
    REFLECTIONS.forEach((entry, index) => {
      // Create a decorative term badge with different colors for visual variety
      const termBadgeClass = index === 0 ? 'term-badge--prelim' : 
                             index === 1 ? 'term-badge--midterm' : 
                             'term-badge--final';
      
      html += `
        <div class="reflection-card">
          <div class="reflection-header">
            <span class="term-badge ${termBadgeClass}">${entry.term}</span>
          </div>
          <h3 class="reflection-term">${entry.term}</h3>
          <p class="reflection-narrative">${entry.narrative}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering reflections:', error);
    container.innerHTML = '<p class="error-message">Error loading reflections. Please try again later.</p>';
  }
}

/**
 * Update copyright year in footer
 * Automatically sets the current year
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }
}

/**
 * Add page loaded class for CSS animations
 */
function initPageLoadedState() {
  // Add a small delay to ensure smooth initial render
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 100);
}

/**
 * Initialize external links with proper security attributes
 * Adds rel="noopener noreferrer" to external links for security
 */
function initExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(link => {
    // Only process links that don't already have target="_blank"
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
    }
    // Ensure security attributes are present
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website initialized');
  
  // Update copyright year
  try {
    updateCopyrightYear();
  } catch (error) {
    console.error('Error updating copyright year:', error);
  }
  
  try {
    initHamburger();
  } catch (error) {
    console.error('Error initializing hamburger menu:', error);
  }
  
  try {
    initActiveNav();
  } catch (error) {
    console.error('Error initializing active nav:', error);
  }
  
  try {
    initSmoothScroll();
  } catch (error) {
    console.error('Error initializing smooth scroll:', error);
  }
  
  // Render Academics section content
  try {
    renderArtifacts();
  } catch (error) {
    console.error('Error rendering artifacts:', error);
  }
  
  try {
    renderWorkExperience();
  } catch (error) {
    console.error('Error rendering work experience:', error);
  }
  
  try {
    renderSeminars();
  } catch (error) {
    console.error('Error rendering seminars:', error);
  }
  
  try {
    renderAwards();
  } catch (error) {
    console.error('Error rendering awards:', error);
  }
  
  try {
    renderOrgInvolvement();
  } catch (error) {
    console.error('Error rendering organization involvement:', error);
  }
  
  // Render Term Reflections section content
  try {
    renderReflections();
  } catch (error) {
    console.error('Error rendering reflections:', error);
  }
  
  // Mark page as fully loaded
  try {
    initPageLoadedState();
  } catch (error) {
    console.error('Error initializing page loaded state:', error);
  }
  
  // Initialize external links security
  try {
    initExternalLinks();
  } catch (error) {
    console.error('Error initializing external links:', error);
  }
  
  console.log('Portfolio website fully initialized and ready');
});
