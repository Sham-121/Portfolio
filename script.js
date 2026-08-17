// Mobile menu toggle
const menuIcon = document.querySelector('#menu-icon')
const navLinks = document.querySelector('.nav-links')

function toggleMenu() {
  navLinks.classList.toggle('active')
}

menuIcon.addEventListener('click', toggleMenu)
menuIcon.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggleMenu()
  }
})

// Close mobile menu after a link is tapped
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('active'))
})

// Scroll-spy: highlight the nav link for the section in view
const sections = document.querySelectorAll('section[id]')
const navLinkEls = document.querySelectorAll('.nav-link')

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkEls.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === entry.target.id)
        })
      }
    })
  },
  { rootMargin: '-40% 0px -55% 0px' }
)

sections.forEach((section) => spyObserver.observe(section))

// Reveal-on-scroll for cards
const revealTargets = document.querySelectorAll('.grid-card, .project-card')
revealTargets.forEach((el) => el.classList.add('reveal'))

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

revealTargets.forEach((el) => revealObserver.observe(el))

// Contact form: submit via fetch so the page never reloads, show inline status
const form = document.querySelector('#contact-form')
const status = document.querySelector('#form-status')

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    status.textContent = 'Sending…'
    status.className = 'form-status'

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        status.textContent = 'Message sent — thanks for reaching out!'
        status.className = 'form-status success'
        form.reset()
      } else {
        status.textContent = 'Something went wrong. Please try again or email me directly.'
        status.className = 'form-status error'
      }
    } catch (err) {
      status.textContent = 'Network error. Please try again or email me directly.'
      status.className = 'form-status error'
    }
  })
}