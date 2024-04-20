import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export const Input = ({ 
    validation,
    className, 
    formData,
    name, 
    type,
    placeholder,
}) => {

useEffect(() => {
    console.log("HEEEI",formData.value[name].isGood);
},[formData.value])

    return (
        <div class={`input-container ${formData.value[name].isGood ? 'input-container--good' : ''}`}>
            <input 
                class={`
                    ${className}
                    ${formData.value[name].isError && `${className}--error`}
                    ${formData.value[name].isGood && `${className}--good`}
                `}
                type={type || "text"}
                name={name}
                value={formData.value[name].val}
                placeholder={placeholder}
                onChange={e => {formData.value[name].val = e.target.value;}}
                onFocus={() => {formData.value[name].isError = false;}}
                onBlur={validation?.fn}
            />
            {formData.value[name].isError.value &&
                <div 
                    class="signup__message"
                >
                    {validation.err}
                </div>
            }
        </div>
    )
}