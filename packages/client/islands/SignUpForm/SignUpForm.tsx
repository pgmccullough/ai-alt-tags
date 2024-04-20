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

    const changeHandler = (e) => {
        setSignal(e.target.name, 'val', e.target.value);
    }

    return (
        <form class="signup__form">
            <h2 class="signup__h2">Create an Account</h2>
            {[
                {name: "name", type: "text", validator: notEmpty},
                {name: "email", type: "text", validator: emailCheck},
                {name: "password", type: "text", validator: passwordCheck},
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
                        placeholder={inputField.name}
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
            {/* <Input
                formData={formData}
                className="signup__input"
                name="email"
                value={formData.value.email}
                changeHandler={changeHandler}
                placeholder="Email"
                validation={emailCheck}
            />
            <Input
                formData={formData}
                className="signup__input"
                name="password"
                value={formData.value.password}
                changeHandler={changeHandler}
                placeholder="Password"
                validation={passwordCheck}
                type="password"
            />
            <Input
                formData={formData}
                className="signup__input"
                name="confirmpassword"
                value={formData.value.confirmpassword}
                changeHandler={changeHandler}
                placeholder="Password (confirm)"
                validation={passwordCheck}
                type="password"
            /> */}
            <button 
                class="signup__button"
            >
                SIGN UP
            </button>
        </form>
    )
}