import React from 'react';
import './Home.css'; // Create this CSS file for custom styles
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="hero-section d-flex align-items-center justify-content-center text-center">
            <div>
                <h1 className="display-4 fw-bold text-white">Welcome to <span className="brand-shareit">share<span className="brand-it">It</span></span></h1>
                <p className="lead text-white mt-3 mb-4">
                    A MERN-based platform to explore affiliate marketing tools and projects.
                </p>
                <Link to="/dashboard">
                    <Button variant="light" size="lg" className="rounded-pill shadow">
                        Go to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}

// Add a modern, engaging content section below the hero section
document.addEventListener('DOMContentLoaded', function() {
    const home = document.querySelector('.hero-section');
    if (home) {
        const infoSection = document.createElement('section');
        infoSection.className = 'info-section';
        infoSection.innerHTML = `
            <div class="container py-5">
                <h2 class="info-title">Why Choose <span class="brand-shareit">share<span class="brand-it">It</span></span>?</h2>
                <p class="info-desc">
                    <b>shareIt</b> is your all-in-one platform for affiliate marketing and link management. Effortlessly track, analyze, and optimize your campaigns with real-time analytics, secure payments, and a user-friendly dashboard. Whether you're a marketer, business, or influencer, <b>shareIt</b> empowers you to grow your reach and maximize your earnings with modern tools and a beautiful, intuitive interface.
                </p>
                <ul class="info-features">
                    <li>🔗 Easy link management & analytics</li>
                    <li>💸 Secure, seamless payment integration</li>
                    <li>📊 Real-time dashboard for performance tracking</li>
                    <li>🛡️ Role-based access for teams & admins</li>
                    <li>🌐 Modern, responsive design for all devices</li>
                </ul>
            </div>
        `;
        home.insertAdjacentElement('afterend', infoSection);
    }
});

export default Home;
