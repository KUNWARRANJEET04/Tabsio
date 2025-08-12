import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    const revealElements = (selector, options = {}) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach(el => {
            gsap.fromTo(el, {
                opacity: 0,
                y: options.y || 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: options.start || 'top 85%',
                    toggleActions: 'play none none none',
                }
            });
        });
    };

    // Hero content animation
    gsap.from(".hero-content > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.2
    });
    
    // Animate section titles
    revealElements('main h2');
    
    // Animate other elements
    revealElements('.product-card', { start: 'top 90%' });
    revealElements('.about-content p');
    revealElements('.contact-intro');
    revealElements('#contact-form > *', { start: 'top 90%'});
    revealElements('.contact-info > *', { start: 'top 90%' });
    revealElements('.page-header h1');

    // Handle smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle "View Details" button click
    const detailButtons = document.querySelectorAll('.details-button');

    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.product;
            // Store product name in session storage to be picked up by contact page
            sessionStorage.setItem('interestedProduct', productName);
        });
    });

    // On contact page, check for product interest
    if (window.location.pathname.includes('contact.html')) {
        const interestedProduct = sessionStorage.getItem('interestedProduct');
        const messageTextarea = document.getElementById('message');
        if (interestedProduct && messageTextarea) {
            messageTextarea.value = `I'm interested in learning more about your ${interestedProduct}.`;
            // Clear the item so it doesn't persist
            sessionStorage.removeItem('interestedProduct');
        }
    }

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you for your message, ${name}! We will get back to you shortly.`);
            contactForm.reset();
        });
    }
});