import React, {useState} from "react";
import './ForgotPassword.css'; // Assuming you have some styles for form animations

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email){
            setMessage('Please enter your email address');
        } else {
            setMessage('If an account exists with this email, a recovery link will be sent.');
            // handle forgot password logic here
        }
    };

    return (
        <div className="forgot-password-container">
            <h2 className="form-title">Forgot Password</h2>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                {message && <p className="message-text">{message}</p>}
                <button type="submit" className="submit-btn">Send Recovery Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;