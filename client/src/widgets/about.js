// About.js in src/widgets/
import React from 'react';
import './about.css';  // Import the CSS for styling

const About = () => {
  return (
    <div className="about-container">
      <h1 className='title'>About Our Company</h1>
      <p className='paragraph'>
        Our Company is committed to delivering exceptional software solutions. We specialize in creating 
        scalable and robust applications tailored to meet the diverse needs of our clients. With a focus 
        on innovation and quality, we aim to provide the best digital experiences and support to ensure 
        the success of your projects.
      </p>
    </div>
  );
};

export default About;
