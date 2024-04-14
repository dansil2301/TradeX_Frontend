import {Link} from "react-router-dom";
import {useState} from "react";
import {TraderToken} from "../../../../Logic/TraderToken.js";

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

export function SignInForm() {
    const { formData, handleChange, handleSubmit } = useSubmit({
        email: '',
        password: '',
    }, (data) => {
        TraderToken.getAndSaveToken(data.email, data.password)
            .then((token) => { TraderToken.saveToken(token); })
            .catch((error) => { console.log(error); })
    });

    return (
        <div className="SignUpFormContainer">
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <span className="SignUpHeader">Sign in</span>
                <div className="form-group">
                    <input className="customInput" type="text" id="email" name="email" value={formData.username}
                           onChange={handleChange} placeholder="Email"/>
                </div>
                <div className="form-group">
                    <input className="customInput" type="password" id="password" name="password"
                           value={formData.password} onChange={handleChange} placeholder="Password"/>
                </div>
                <button className="SignUpSubmit" type="submit">Sign in</button>
                <Link className="SignInLnk" to="/sign-up">Sign up</Link>
            </form>
        </div>
    );
}