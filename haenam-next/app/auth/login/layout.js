import { ButtonLink } from "@/components/common/button";
import { getProviders, signIn } from "next-auth/react";

export default async function AuthLayout({ children }) {
    const providers = await getProviders();
    return (
        <div id="auth" className="box">
            <div id="auth-left">
                <h1>
                    오늘도 <span>해냄!</span>
                </h1>
                <div id="auth-select">
                    <ButtonLink endPoint="login" />
                    <ButtonLink endPoint="register" />
                </div>
            </div>
            <div id="auth-right">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
