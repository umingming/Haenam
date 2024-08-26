import { InputGroup } from "@/components/common/input";
import { ButtonBase } from "@/components/common/button";

import { ACTION_KEY } from "@/constants/keyConstants";

export default async function Auth() {
    return (
        <div id="auth" className="box">
            <div id="auth-left">
                <h1>
                    오늘도 <span>해냄!</span>
                </h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <InputGroup name="email" type="email" />
                    <InputGroup name="password" type="password" />
                    <div className="mt-5">
                        <ButtonBase action={ACTION_KEY.LOGIN} />
                    </div>
                </div>
            </div>
            <div id="auth-right"></div>
        </div>
    );
}
