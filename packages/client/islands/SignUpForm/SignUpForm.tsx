import { useSignal } from "@preact/signals";

export const SignUpForm = () => {

    const formData = useSignal({
        name: {val: '', isError: false, isGood: false},
        email: {val: '', isError: false, isGood: false},
        password: {val: '', isError: false, isGood: false},
        confirmpassword: {val: '', isError: false, isGood: false},
    });

    const setSignal = (name: string, key: string, value: boolean | string) => {
        formData.value = {
            ...formData.value,
            [name]: {
                ...formData.value[name], 
                [key]: value
            }
        }
    };

    const emailCheck = {
        fn: (e) => {
            const { value } = e.target;
            const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setSignal(e.target.name, 'isError', !emailReg.test(value));
            setSignal(e.target.name, 'isGood', emailReg.test(value));   
        },
        err: "Please enter a valid email address."
    }
    
    const passwordCheck = {
        fn: (e) => {
            const { value } = e.target;
            const pwReg = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\\-]).{8,}$/;
            setSignal(e.target.name, 'isError', !pwReg.test(value));
            setSignal(e.target.name, 'isGood', pwReg.test(value));          
        },
        err: "Password must be at least 8 characters long, and include at least one letter, number, and special character."
    }

    const notEmpty = {
        fn: (e) => {
            const { value } = e.target;
            setSignal(e.target.name, 'isGood', value.trim() !== "");
            setSignal(e.target.name, 'isError', value.trim() === "");
        },
        err: `Complete field.`
    }

    const confirmPassword = {
        fn: (e) => {
            const { value } = e.target;
            setSignal(e.target.name, 'isGood', ((value === formData.value.password.val) && (formData.value.password.isGood)));
            setSignal(e.target.name, 'isError', ((value !== formData.value.password.val) || (formData.value.password.isError)));
        },
        err: `Passwords must match.`
    }
    

    const changeHandler = (e) => {
        setSignal(e.target.name, 'val', e.target.value);
    }

    return (
        <form 
            class="signup__form"
            method="post"
        >
            <h2 class="signup__h2">Create an Account</h2>
            {[
                {name: "name", type: "text", validator: notEmpty},
                {name: "email", type: "text", validator: emailCheck},
                {name: "password", type: "password", validator: passwordCheck},
                {name: "confirmpassword", placeholder: "password (confirm)", type: "password", validator: confirmPassword}
            ].map(inputField => 
                <div class={`input-container ${formData.value[inputField.name].isGood && 'input-container--good'}`}>
                    <input 
                        class={`
                            signup__input
                            ${formData.value[inputField.name].isError && `signup__input--error`}
                            ${formData.value[inputField.name].isGood  && `signup__input--good`}
                        `}
                        type={inputField.type}
                        name={inputField.name}
                        value={formData.value[inputField.name].val}
                        placeholder={inputField.placeholder || inputField.name}
                        onChange={changeHandler}
                        onFocus={() => {
                            setSignal(inputField.name, 'isGood', false);
                            setSignal(inputField.name, 'isError', false);
                        }}
                        onBlur={inputField.validator.fn}
                    />
                    {formData.value[inputField.name].isError &&
                        <div 
                            class="signup__message"
                        >
                            {inputField.validator.err}
                        </div>
                    }
                </div>
            )}
            <button 
                class="signup__button"
                disabled={
                    !formData.value.name.isGood
                    || !formData.value.email.isGood
                    || !formData.value.password.isGood
                    || !formData.value.confirmpassword.isGood
                }
            >
                SIGN UP
            </button>
        </form>
    )
}