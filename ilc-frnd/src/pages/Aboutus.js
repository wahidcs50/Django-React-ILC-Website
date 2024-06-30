import React from 'react'
import Header from '../Components/Header';
import AdvancedFooter from '../Components/Footer';

function Aboutus() {
  return (
    <div>
        <Header/>
        <div className='container-fluid bg-dark pb-4 '>
            <div className="d-flex flex-column bg-info w-100 text-white justify-content-center align-items-center text-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/assets/use-two.jpeg)`, backgroundSize: "cover",  backgroundPosition: "center"}}>
                       <div className='text-center' style={{ maxWidth: "600px" }}>
                            <h1 className="mt-4 fw-bold" style={{color: 'blueviolet'}}>Welcome to COMSATS University Islamabad</h1>
                            <p className="mt-4 fw-bold" style={{  maxHeight: "80vh", overflow: "auto",textAlign:"justify"}}>
                            COMSATS University Islamabad (CUI), formerly known as COMSATS Institute of Information Technology (CIIT), is a leading institution of higher education in Pakistan. Established in 1998, CUI has rapidly grown into a prestigious university with multiple campuses across the country. It is renowned for its focus on science, technology, engineering, and mathematics (STEM) disciplines, as well as its commitment to excellence in research, teaching, and innovation.

                            CUI offers a wide range of undergraduate, graduate, and doctoral programs, catering to the diverse academic interests and career aspirations of its students. The university is known for its state-of-the-art facilities, experienced faculty, and vibrant campus life, providing students with an enriching educational experience.

                            With a strong emphasis on research and development, CUI is actively involved in groundbreaking research projects that address pressing challenges in fields such as renewable energy, healthcare, information technology, and agriculture. The university collaborates with leading international institutions, industry partners, and government agencies to promote innovation and contribute to the socioeconomic development of Pakistan and beyond.

                            Committed to serving the community, CUI engages in various outreach initiatives, including community service programs, entrepreneurship development, and continuing education opportunities. As a result, COMSATS University Islamabad continues to be recognized as a hub of academic excellence, innovation, and social impact in Pakistan and the region.
                            </p>
                       </div>
            </div>
        </div>
        <div className='container-fluid bg-dark vh-100'>
            <div className="d-flex flex-column bg-dark justify-content-center align-items-center vh-100 pb-4">
                <div className="d-flex flex-grow-1 bg-dark justify-content-between align-items-center w-100">
                    <div className="flex-grow-1 bg-primary me-2 d-flex flex-column justify-content-center align-items-center text-white vh-100" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/assets/ms.jpg)`, backgroundSize: "cover",  backgroundPosition: "center"}}>
                        <div className='text-center' style={{ maxWidth: "400px" }}>
                            <h1 className='mt-4 fw-bold' style={{color: 'blueviolet'}}>VISION</h1>
                            <p className="mt-5 fw-bold" style={{ maxHeight: "80vh", overflow: "auto", textAlign:"justify" }}>
                                The vision of COMSATS University Islamabad (CUI) is to be a globally recognized center of excellence
                                in higher education, research, and innovation. CUI aspires to nurture a dynamic learning environment 
                                that fosters creativity, critical thinking, and leadership skills among its students. By promoting 
                                interdisciplinary collaboration and industry partnerships, CUI aims to contribute significantly to 
                                the socioeconomic development of Pakistan and beyond. With a commitment to excellence, integrity, 
                                and social responsibility, COMSATS University Islamabad seeks to empower individuals to address the
                                challenges of the modern world and make meaningful contributions to society.
                            </p>
                        </div>
                    </div>
                    <div className="flex-grow-1 bg-secondary ms-2 d-flex flex-column justify-content-center align-items-center text-white vh-100" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/assets/humanities.jpg)`, backgroundSize: "cover",  backgroundPosition: "center"}}>
                        <div className='text-center' style={{ maxWidth: "400px" }}>
                            <h1 className='mt-4 fw-bold'style={{color: 'blueviolet'}}>MISSION</h1>
                            <p className="mt-5 fw-bold" style={{ maxHeight: "80vh", overflow: "auto",textAlign:"justify" }}>
                                The mission of COMSATS University Islamabad (CUI) is to provide quality education, conduct cutting-edge research,
                                and promote innovation in order to meet the evolving needs of society. CUI is dedicated to offering accessible and 
                                affordable education to a diverse student body, empowering them with the knowledge and skills necessary for success 
                                in their chosen fields. Through its rigorous academic programs, CUI aims to cultivate a culture of inquiry, creativity,
                                and lifelong learning. The university is committed to fostering a supportive and inclusive environment that values 
                                diversity, equity, and mutual respect. By engaging with local and global communities, CUI seeks to address societal
                                challenges and contribute to sustainable development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AdvancedFooter style={{marginTop: 'auto'}}/>
    </div>
  )
}

export default Aboutus