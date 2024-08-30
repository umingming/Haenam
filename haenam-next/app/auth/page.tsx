"use client";

import { signIn } from "next-auth/react";

import { InputGroup } from "@/components/common/input";
import { ButtonBase } from "@/components/common/button";
import { ACTION_KEY } from "@/constants/keyConstants";

import { useInputHandler } from "@/hooks/useUIHandler";
import { useFetchData } from "@/hooks/useDataHandler";

export default function Auth() {
    const { value: email, handleValue: handleEmail } = useInputHandler();
    const {
        value: password,
        resetValue: resetPassword,
        handleValue: handlePassword,
    } = useInputHandler();

    const { createData } = useFetchData();

    async function registerUser() {
        const result = await createData("/api/user", { email, password });
        if (result) {
            alert("회원가입 성공!");
            resetPassword();
        }
    }

    async function loginUser() {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (result) {
            alert("로그인 성공!");
        }
    }

    return (
        <div className="box" id="auth">
            <div id="auth-left">
                <h1>
                    오늘도 <span>해냄!</span>
                </h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <InputGroup
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmail}
                    />
                    <InputGroup
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                    <div className="mt-5">
                        <ButtonBase
                            action={ACTION_KEY.LOGIN}
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                            onClick={loginUser}
                        />
                    </div>
                    <div className="mt-3">
                        <ButtonBase
                            action={ACTION_KEY.REGISTER}
                            className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                            onClick={registerUser}
                        />
                    </div>
                </div>
            </div>
            <div id="auth-right"></div>
        </div>
    );
}
