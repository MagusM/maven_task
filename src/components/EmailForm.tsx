import { useRef, useState } from "react";

const EmailForm = () => {
    const [showErrorDiv, setShowErrorDiv] = useState(false);
    const [email, setEmail] = useState('');
    const emailInputRef = useRef<any>(null);

    const handleSubmit = () => {
        setShowErrorDiv(false);
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const value = emailInputRef.current.value as string;
        const result: boolean = expression.test(value);
        if (result) {
            setEmail(value);
            return;
        }
        setShowErrorDiv(true);
    }

    const handleAlertCloseClicked = () => {
        setShowErrorDiv(false);
    }

    const errorDiv = (
        <div className="alert inline-block alert-error shadow-lg w-80">
            <div>
                <svg
                    onClick={handleAlertCloseClicked}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="stroke-current flex-shrink-0 h-6 w-6 hover:cursor-pointer" 
                    fill="none" 
                    viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error! Email format is wrong.</span>
            </div>
        </div>
    );

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center text-white space-y-20">
            <div className="card inline-block flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-10">
                <div className="card-body">
                    <span className="">Please submit your email to start Game!</span>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            ref={emailInputRef}
                            type="text" 
                            placeholder="email" 
                            className="input input-bordered text-black" 
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button 
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            {showErrorDiv !== false ? errorDiv : null}
        </div>
    );
}

export {EmailForm as default};