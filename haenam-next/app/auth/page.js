import { ButtonLink } from "@/components/common/button";
import { InputGroup } from "@/components/common/input";
import { getProviders, signIn } from "next-auth/react";

export default async function Auth() {
    const providers = await getProviders();

    return (
        <div id="auth" className="box">
            <div id="auth-left">
                <h1>
                    오늘도 <span>해냄!</span>
                </h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <InputGroup type="email" />
                    <div className="mt-1 mb-4"> 
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Sign in
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a
                            href="#"
                            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                        >
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
            <div id="auth-right"></div>
        </div>
    );
}
