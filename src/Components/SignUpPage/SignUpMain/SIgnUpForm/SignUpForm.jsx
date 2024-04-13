import "./SignUpForm.css"
import {useState} from "react";
import {Link} from "react-router-dom";

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
    const { formData, handleChange, handleSubmit } = useSubmit({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, (data) => {
        // Handle form submission
        console.log(data);
    });

    return (
        <div className="SignUpFormContainer">
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <span className="SignUpHeader">Sign up</span>
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