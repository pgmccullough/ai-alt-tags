import { useSignal } from "@preact/signals";

export const Input = ({ 
    validation,
    className, 
    name, 
    type,
    value, 
    placeholder,
}) => {

    const inputVal = useSignal('');
    const isError = useSignal(false);
    const isGood = useSignal(false);

    const emailCheck = (e) => {
        const { value } = e.target;
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isError.value = !emailReg.test(value);
        isGood.value = emailReg.test(value);
    }
    
    const passwordCheck = (e) => {
        const { value } = e.target;
        const pwReg = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\\-]).{8,}$/;
        isError.value = !pwReg.test(value);
        isGood.value = pwReg.test(value);
    }

    const notEmpty = (e) => {
        const { value } = e.target;
        isError.value = value.trim() === "";
        isGood.value = value.trim() !== "";
    }

    let validationFn: any;

    switch(validation) {
        case("email"):
            validationFn = {
                fn: emailCheck, 
                err: "Please enter a valid email address"
            };
            break;
        case("password"):
            validationFn = {
                fn: passwordCheck, 
                err: "Password must be at least 8 characters long, and include at least one letter, number, and special character"
            };
            break;
        default: 
            validationFn = {
                fn: notEmpty, 
                err: `Complete ${placeholder} field.`
            };
    }

    return (
        <div class={`input-container ${isGood.value && 'input-container--good'}`}>
            <input 
                class={`
                    ${className}
                    ${isError.value && `${className}--error`}
                    ${isGood.value && `${className}--good`}
                `}
                type={type || "text"}
                name="name"
                value={inputVal.value}
                placeholder={placeholder}
                onChange={e => {inputVal.value = e.target.value;}}
                onFocus={() => {isError.value = false;}}
                onBlur={validationFn?.fn}
            />
            {isError.value &&
                <div 
                    class="signup__message"
                >
                    {validationFn.err}
                </div>
            }
        </div>
    )
}