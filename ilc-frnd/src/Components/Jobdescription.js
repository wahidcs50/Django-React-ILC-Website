import React from 'react';
import { Link } from 'react-router-dom'; 

const JobDescription = () => {
  return (
    <div style={styles.container}>
      <div style={styles.jobDescription}>
        <h2>Python Developer</h2>
        <p>
          We are looking for a Python Developer to join our team. The ideal candidate will have experience
          in Python development, strong problem-solving skills, and the ability to work in a team environment.
        </p>
        <p><strong>Responsibilities:</strong></p>
        <ul>
          <li>Developing Python applications</li>
          <li>Collaborating with team members on projects</li>
          <li>Testing and debugging code</li>
        </ul>
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>Bachelor's degree in Computer Science or related field</li>
          <li>Proficiency in Python programming</li>
          <li>Strong communication skills</li>
        </ul>
      </div>
      <div style={styles.buttons}>
        <Link to="/joblist" style={styles.button}>Back</Link>
        <Link to="/apply" style={styles.button}>Apply</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px auto',
    padding: '20px',
    maxWidth: '600px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  jobDescription: {
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default JobDescription;
