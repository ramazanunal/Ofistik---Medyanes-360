import { useState } from 'react';

const useAlert = () => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const showAlert = (message, alertType) => {
        setAlertMessage(message);
        setAlertVisible(true);
        setAlertType(alertType)

        // Automatically hide the alert after 2 seconds
        setTimeout(() => {
            setAlertVisible(false);
        }, 2000);
    };

    return { alertVisible, showAlert, alertMessage, setAlertVisible, alertType };
};

export default useAlert;
