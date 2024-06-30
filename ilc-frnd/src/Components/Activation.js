import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const Activation = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activateUser = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/users/activation/', { uid: uid, token: token })
;
                // If activation is successful, navigate to the appropriate page
                const data= response.data
                console.log('Activation response:', data);
                navigate('/signintype/student');
            } catch (error) {
                // Handle activation failure
                console.error('Activation failed:', error);
            }
        };

        // Call the activateUser function when the component mounts
        activateUser();
    }, [uid, token, navigate]);

    return (
        <div>
            {/* show the spinner or message here */}
            <Button disabled>Activating...</Button>
        </div>
    );
};

export default Activation;
