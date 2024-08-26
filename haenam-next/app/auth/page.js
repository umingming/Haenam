import { InputGroup } from "@/components/common/input";

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
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
            <div id="auth-right"></div>
        </div>
    );
}
