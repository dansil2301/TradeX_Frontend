import "./SignUpForm.css"
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {PasswordChecker} from "../../../../../Logic/TraderLogic/Utils/PasswordChecker.js";
import {TraderTransmitter} from "../../../../../Logic/TraderLogic/TraderTransmitter.js";
import {EmailChecker} from "../../../../../Logic/TraderLogic/Utils/EmailChecker.js";

const useSubmit = (initialState, onSubmit) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export function SignUpForm() {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState(null)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let status = queryParams.get('status');
    if (status === null) { status = "TRADER_BASIC"; }

    const { formData, handleChange, handleSubmit } = useSubmit({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, (data) => {
        if (!data.username) {
            setErrorText("Username can't be empty")
        }
        else if (!EmailChecker.isEmailCorrect(data.email)) {
            setErrorText("Email is not valid or empty")
        }
        else if (!PasswordChecker.isPasswordLongEnough(data.password)) {
            setErrorText("Password should be more than 9 symbols");
        }
        else if (!PasswordChecker.isPasswordStrong(data.password)) {
            setErrorText("Password should contain: upper case letters, numbers and special symbols")
        }
        else if (!PasswordChecker.isPasswordConfirmed(data.password, data.confirmPassword)) {
            setErrorText("Passwords are not matching")
        }
        else {
            TraderTransmitter.CreateTrader(data.username, data.email, data.password, status)
                .then(() => navigate("/sign-in"))
                .catch((error) => setErrorText(error.message));
        }
        console.log(data);
    });

    return (
        <div className="SignUpFormContainer">
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <span className="SignUpHeader">Sign up</span>
                {errorText && <span className="showError">{errorText}</span>}
                <div className="form-group">
                    <input className="customInput" type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                </div>
                <div className="form-group">
                    <input className="customInput" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="form-group">
                    <input className="customInput" type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                </div>
                <div className="form-group">
                    <input className="customInput" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
                </div>
                <button className="SignUpSubmit" type="submit" to="/">Sign up</button>
                <Link className="SignInLnk" to="/sign-in">Sign in</Link>
            </form>
        </div>
    );
}