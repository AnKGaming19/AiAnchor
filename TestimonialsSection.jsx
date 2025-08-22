import React from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    quote: "I tried a marketing agency for the first time ever with you guys and was expecting so much less and would've been ok with so less, but I can see that you guys put in the time to do great work and maintain a great relationship with the client you are working with.",
    business: "Codename X"
  },
  {
    quote: "You guys have been amazing to work with, I appreciate the effort you put into helping with my brand.",
    business: "TemperOfficial"
  },
  {
    quote: "Working with AiAnchor has been a seamless and enjoyable experience. Their team is not only knowledgeable and professional, but also friendly and responsive. They are always available to address my questions, concerns, and ideas promptly, making me feel valued as a client.",
    business: "Hearth&Haven"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <p className="testimonials-subtitle">Trusted by brands who scale smarter with AI.</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="#00D4FF"/>
                  </svg>
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-footer">
                  <div className="business-name">{testimonial.business}</div>
                  <div className="accent-line"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
