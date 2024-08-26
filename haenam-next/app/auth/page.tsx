"use client";

import { InputGroup } from "@/components/common/input";
import { ButtonBase } from "@/components/common/button";
import { ACTION_KEY } from "@/constants/keyConstants";

import { useInputHandler } from "@/hooks/useUIHandler";

export default function Auth() {
    const { value: email, handleValue: handleEmail } = useInputHandler();
    const { value: password, handleValue: handlePassword } = useInputHandler();

    return (
        <div id="auth" className="box">
            <div id="auth-left">
                <h1>
                    오늘도 <span>해냄!</span>
                </h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <InputGroup
                        name="email"
                        type="email"
                        onChange={handleEmail}
                    />
                    <InputGroup
                        name="password"
                        type="password"
                        onChange={handlePassword}
                    />
                    <div className="mt-5">
                        <ButtonBase
                            action={ACTION_KEY.LOGIN}
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        />
                    </div>
                </div>
            </div>
            <div id="auth-right"></div>
        </div>
    );
}
