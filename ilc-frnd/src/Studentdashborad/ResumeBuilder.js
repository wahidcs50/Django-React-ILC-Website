// utils/ResumeBuilder.js
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Resume from '../utils/Resume'
import Sidebar from '../Components/Sidebar';
import DashboardHeader from '../Components/Dashboardheader';

const ResumeBuilder = () => {
  const formData = localStorage.getItem('formData');
  console.log(formData);
  const downloadResumeAsPDF = async () => {
    const resumeElement = document.getElementById('resume-content');
    const canvas = await html2canvas(resumeElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('resume.pdf');
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div className="event-main-container">
        <DashboardHeader />
        <div className="page-address text-dark">Home / Resume</div>
        <div>
            <button onClick={downloadResumeAsPDF}>Download Resume as PDF</button>
            <div id="resume-content">
                <Resume
                name={formData.name}
                phone={formData.phone}
                github={formData.github_url}
                linkedin={formData.linkedin_url}
                education={formData.education}
                projects={formData.projects}
                skills={formData.skills}
                experience={formData.experience}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
