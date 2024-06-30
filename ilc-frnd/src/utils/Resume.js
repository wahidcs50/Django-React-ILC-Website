import React from 'react';
import './ResumeBuilder.css'


const Resume = ({ name, phone, github, linkedin, education, projects, skills, experience }) => {
  return (
    <div>
      <h1>{name || 'Name not provided'}</h1>
      <p>Phone: {phone || 'Phone not provided'}</p>
      <p>GitHub: {github || 'GitHub not provided'}</p>
      <p>LinkedIn: {linkedin || 'LinkedIn not provided'}</p>

      <h2>Education</h2>
      {education && education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index}>
            <p>{edu.institution || 'Institution not provided'}</p>
            <p>{edu.department || 'Department not provided'}</p>
            <p>{edu.field_of_study || 'Field of Study not provided'}</p>
            <p>{edu.degree || 'Degree not provided'}</p>
          </div>
        ))
      ) : (
        <p>No education information provided</p>
      )}

      <h2>Projects</h2>
      {projects && projects.length > 0 ? (
        projects.map((proj, index) => (
          <div key={index}>
            <p>{proj.project_name || 'Project Name not provided'}</p>
            <p>{proj.project_desc || 'Project Description not provided'}</p>
            <p>{proj.project_technique_tools || 'Techniques/Tools not provided'}</p>
          </div>
        ))
      ) : (
        <p>No projects information provided</p>
      )}

      <h2>Skills</h2>
      {skills && skills.length > 0 ? (
        skills.map((skill, index) => (
          <div key={index}>
            <p>{skill.skills || 'Skill not provided'}</p>
            <p>Rating: {skill.rating || 'Rating not provided'}</p>
          </div>
        ))
      ) : (
        <p>No skills information provided</p>
      )}

      <h2>Experience</h2>
      {experience && experience.length > 0 ? (
        experience.map((exp, index) => (
          <div key={index}>
            <p>{exp.experince_company || 'Company not provided'}</p>
            <p>{exp.experince_explain || 'Experience not provided'}</p>
          </div>
        ))
      ) : (
        <p>No experience information provided</p>
      )}
    </div>
  );
};

export default Resume;

