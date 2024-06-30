import React, { useState, useEffect } from 'react';
import '../Studentdashborad/styling/stepper.css'; // Assuming you have your own styles
import Sidebar from '../Components/Sidebar';
import DashboardHeader from '../Components/Dashboardheader';
import Cookies from 'js-cookie';
import axios from 'axios';
import useRefreshToken from '../Apis/Refreshtoken';
import StarRating from "../utils/SkillsRating"


function StudentProfile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData
      ? JSON.parse(savedData)
      : {
          id: null, // Add id field to hold the student profile ID
          name: '',
          phone: '',
          links: { github_url: '', linkedin_url: '' },
          education: [{ department: '', institution: '', field_of_study: '', degree: '' }],
          projects: [{ project_name: '', project_desc: '', project_technique_tools: '' }],
          skills: [{ skills: '', rating:0 }],
          experience: [{ experince_company: '', experince_explain: '' }],
        };
  });

  const { isRefreshing, refreshAccessToken } = useRefreshToken(); // Use the hook
useEffect(() => {
  const fetchStudentProfile = async () => {
    try {
      const accessToken = Cookies.get('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get('http://localhost:8000/api/profile/student-profile/', config);
      console.log('get response', response);
      if (response.data && response.data.length > 0) {
        const { id, ...profileData } = response.data[0]; // Extract ID and other profile data from the first item in the array
        console.log(id, profileData);
        console.log(profileData['education'][0]);
        setFormData({ ...formData, id, ...profileData }); // Set ID and other profile data in formData
      } else {
        console.error('No student profile data found.');
      }
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  };

  fetchStudentProfile();
}, []); // Run this effect only once on component mount


  useEffect(() => {
    // Save form data to local storage whenever it changes
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, key, updatedValue) => {
    const updatedArray = formData[key].map((item, idx) => (idx === index ? updatedValue : item));
    setFormData({ ...formData, [key]: updatedArray });
  };

  const handleSaveEducation = async () => {
    await saveFormData('education');
  };

  const handleSaveProjects = async () => {
    await saveFormData('projects');
  };

  const handleSaveSkills = async () => {
    await saveFormData('skills');
  };

  const handleSaveExperience = async () => {
    await saveFormData('experience');
  };

  const saveFormData = async (field) => {
    const accessToken = Cookies.get('access_token');
    const csrfCookieValue = Cookies.get('csrftoken');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfCookieValue,
      },
      withCredentials: true,
    };

    const updatedFieldData = { ...formData[field] }; // Copy specific field data
    const profileId = formData.id; // Get the ID from formData

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/profile/student-profile/update/${profileId}/`, // Use the ID in the URL
        updatedFieldData,
        config
      );
      console.log('Individual form update response:', response.data);
      // Handle successful update (e.g., show success message to user)
    } catch (error) {
      if (error.response.status === 401 && !isRefreshing) {
        // Refresh token and retry
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        try {
          const response = await axios.patch(
            `http://localhost:8000/api/profile/student-profile/update/${profileId}/`, // Use the ID in the URL
            updatedFieldData,
            config
          );
          console.log('Individual form update response (after refresh):', response.data);
          
          // Handle successful request after refresh
        } catch (refreshError) {
          console.error('Error after refresh:', refreshError);
          // Handle errors even after refresh attempt
        }
      } else {
        console.error(error);
        // Handle other errors (e.g., display error message to user)
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = Cookies.get('access_token');
    const csrfCookieValue = Cookies.get('csrftoken');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfCookieValue,
      },
      withCredentials: true,
    };

    try {
      const formDataWithStudent = {
        ...formData,
        // Replace yourUserId with the ID of the authenticated user
      };

      // Create new student profile
      const response = await axios.post(
        'http://localhost:8000/api/profile/student-profile/',
        formDataWithStudent, // Send formData with student field
        config
      );
      console.log('response from server:', response.data);
      // Handle successful creation (e.g., redirect or show success message)
    } catch (error) {
      if (error.response.status === 401 && !isRefreshing) {
        // Refresh token and retry if not already refreshing
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        try {
          const formDataWithStudent = {
            ...formData,
            student: 2 // Replace yourUserId with the ID of the authenticated user
          };
          const response = await axios.post(
            'http://localhost:8000/api/profile/student-profile/',
            formDataWithStudent, // Send formData with student field
            config
          );
          console.log('response from server:', response.data);
          // Handle successful request after refresh
        } catch (refreshError) {
          console.error('Error after refresh:', refreshError);
          // Handle errors even after refresh attempt
        }
      } else {
        console.error(error);
        // Handle other errors
      }
    }
  };

  return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div className="main-container">
          <DashboardHeader/>
          <div className="page-address text-dark">Home / Profile</div>
          <div className="wizard-container">
            <div className="container">
              <div className="progressbar">
                <div className="progress" id="progress" style={{ width: `${(step - 1) * 25}%` }}></div>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`progress-step ${step >= index ? 'progress-step-active' : ''}`}
                    data-title={
                      index === 1
                        ? 'Profile Information'
                        : index === 2
                        ? 'Education'
                        : index === 3
                        ? 'Projects'
                        : index === 4
                        ? 'Skills'
                        : 'Experience'
                    }
                  ></div>
                ))}
              </div>
              <form id="msform" onSubmit={handleSubmit}>
                {/* fieldsets */}
                {[1, 2, 3, 4, 5].map((index) => (
                  <fieldset key={index} style={{ display: step === index ? 'block' : 'none' }}>
                    {index === 1 && (
                      <>
                        <h2 className="fs-title">Profile Information</h2>
                        <h3 className="fs-subtitle">Provide your profile information</h3>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={formData.cell}
                          onChange={handleChange}
                          placeholder="Cell #"
                        />
                        <input
                          type="text"
                          name="github_url"
                          value={formData.links.github_url}
                          onChange={(e) =>
                            setFormData({ ...formData, links: { ...formData.links, github_url: e.target.value } })
                          }
                          placeholder="GitHub Link"
                        />
                        <input
                          type="text"
                          name="linkedin_url"
                          value={formData.links.linkedin_url}
                          onChange={(e) =>
                            setFormData({ ...formData, links: { ...formData.links, linkedin_url: e.target.value } })
                          }
                          placeholder="LinkedIn Link"
                        />
                        <button onClick={saveFormData}>Save</button>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <h2 className="fs-title">Education</h2>
                        <h3 className="fs-subtitle">Your educational background</h3>
                        {formData.education.map((edu, eduIndex) => (
                          <div key={eduIndex}>
                            <input
                              type="text"
                              value={edu.department}
                              onChange={(e) => handleArrayChange(eduIndex, 'education', { ...edu, department: e.target.value })}
                              placeholder="Department"
                            />
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => handleArrayChange(eduIndex, 'education', { ...edu, institution: e.target.value })}
                              placeholder="Institution"
                            />
                            <input
                              type="text"
                              value={edu.field_of_study}
                              onChange={(e) => handleArrayChange(eduIndex, 'education', { ...edu, field_of_study: e.target.value })}
                              placeholder="Field of Study"
                            />
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => handleArrayChange(eduIndex, 'education', { ...edu, degree: e.target.value })}
                              placeholder="Degree"
                            />
                          </div>
                        ))}
                        <button onClick={() => setFormData({ ...formData, education: [...formData.education, { department: '', institution: '', field_of_study: '', degree: '' }] })}>Add Education</button>
                        <button onClick={handleSaveEducation}>Save</button>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <h2 className="fs-title">Projects</h2>
                        <h3 className="fs-subtitle">Your projects</h3>
                        {formData.projects.map((project, projectIndex) => (
                          <div key={projectIndex}>
                            <input
                              type="text"
                              value={project.project_name}
                              onChange={(e) => handleArrayChange(projectIndex, 'projects', { ...project, project_name: e.target.value })}
                              placeholder="Project Name"
                            />
                            <textarea
                              type="text"
                              value={project.project_desc}
                              onChange={(e) => handleArrayChange(projectIndex, 'projects', { ...project, project_desc: e.target.value })}
                              placeholder="Project Description"
                            />
                            <input
                              type="text"
                              value={project.project_technique_tools}
                              onChange={(e) => handleArrayChange(projectIndex, 'projects', { ...project, project_technique_tools: e.target.value })}
                              placeholder="Techniques/Tools Used"
                            />
                          </div>
                        ))}
                        <button onClick={() => setFormData({ ...formData, projects: [...formData.projects, { project_name: '', project_desc: '', project_technique_tools: '' }] })}>Add Project</button>
                        <button onClick={handleSaveProjects}>Save</button>

                      </>
                    )}
                    {index === 4 && (
                      <>
                        <h2 className="fs-title">Skills</h2>
                        <h3 className="fs-subtitle">Your skills</h3>
                        {formData.skills.map((skill, skillIndex) => (
                          <div key={skillIndex}>
                            <input
                              type="text"
                              value={skill.skill_name}
                              onChange={(e) => handleArrayChange(skillIndex, 'skills', { ...skill, skill_name: e.target.value })}
                              placeholder="Skill"
                            />
                            <StarRating
                              value={skill.rating}
                              onChange={(rating) => handleArrayChange(skillIndex, 'skills', { ...skill, rating })}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              skills: [...formData.skills, { skill_name: '', rating: 0 }],
                            })
                          }
                        >
                          Add Skill
                        </button>
                        <button type="button" onClick={handleSaveSkills}>Save</button>
                      </>
                    )}
                    {index === 5 && (
                      <>
                        <h2 className="fs-title">Experience</h2>
                        <h3 className="fs-subtitle">Your experience</h3>
                        {formData.experience.map((exp, expIndex) => (
                          <div key={expIndex}>
                            <input
                              type="text"
                              value={exp.experince_company}
                              onChange={(e) => handleArrayChange(expIndex, 'experience', { ...exp, experince_company: e.target.value })}
                              placeholder="Company"
                            />
                            <textarea
                              type="text"
                              value={exp.experince_explain}
                              onChange={(e) => handleArrayChange(expIndex, 'experience', { ...exp, experince_explain: e.target.value })}
                              placeholder="Explanation"
                            />
                          </div>
                        ))}
                        <button onClick={() => setFormData({ ...formData, experience: [...formData.experience, { experince_from: '', experince_to: '', experince_company: '', experince_explain: '', experince_portfolio: '' }] })}>Add Experience</button>
                        <button onClick={handleSaveExperience}>Save</button>
                      </>
                    )}
                    {index !== 1 && (
                      <input
                        type="button"
                        name="previous"
                        className="previous action-button-previous"
                        value="Previous"
                        onClick={prevStep}
                      />
                    )}
                    {index !== 5 && <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />}
                    {index === 5 && <input type="submit" name="submit" className="submit action-button" value="Submit" />}
                  </fieldset>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}



export default StudentProfile;


















