import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SkyoraWordmark from "../components/auth/SkyoraWordmark";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { login } from "../services/authService";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(signinData.email, signinData.password);
      if (user.role === "admin") {
        navigate("/admin/flights");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: call /api/auth/signup (backend later)
    console.log("Sign up:", signupData);
    alert("Account created!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative px-4 py-8">
      <img
        src="https://picsum.photos/seed/542/1440/900"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35]"
      />
      <div className="relative bg-canvas rounded-[24px] p-12 w-full max-w-[460px] shadow-auth-modal">
        <div className="text-center mb-8">
          <SkyoraWordmark size={28} />
          <h1 className="text-2xl font-extrabold mt-[18px] mb-1.5">
            {mode === "signin"
              ? "Sign in to continue your journey"
              : "Join Skyora and start exploring"}
          </h1>
        </div>

        <div className="flex bg-cloud rounded-xl p-1 mb-7">
          {[
            ["signin", "Sign In"],
            ["signup", "Create Account"],
          ].map(([value, lable]) => {
            return (
              <button
                key={value}
                onClick={() => setMode(value)}
                className={`flex-1 text-center py-2.5 rounded-[10px] text-sm font-bold transition-all ${
                  mode === value
                    ? "bg-canvas text-ink shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                    : "bg-transparent text-ash"
                }`}
              >
                {" "}
                {lable}
              </button>
            );
          })}
        </div>

        {/* forms */}
        {mode === "signin" && (
          <form onSubmit={handleSignin}>
            <div className="mb-4">
              <Input
                label="EMAIL ADDRESS"
                type="email"
                placeholder="you@email.com"
                value={signinData.email}
                onChange={(e) =>
                  setSigninData({ ...signinData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2">
              <Input
                label="PASSWORD"
                type="password"
                placeholder="••••••••••"
                value={signinData.password}
                onChange={(e) =>
                  setSigninData({ ...signinData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="flex justify-end mb-6">
              <Link
                to="/forgot-password"
                className="text-[13px] text-info font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-error text-sm font-medium mb-4 text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full mb-5"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-center text-sm font-medium">
              New to Skyora?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-rausch font-bold hover:underline"
              >
                Create an account
              </button>
            </p>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="FIRST NAME"
                placeholder="James"
                value={signupData.firstName}
                onChange={(e) =>
                  setSignupData({ ...signupData, firstName: e.target.value })
                }
                required
              />
              <Input
                label="LAST NAME"
                placeholder="Thompson"
                value={signupData.lastName}
                onChange={(e) =>
                  setSignupData({ ...signupData, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="EMAIL ADDRESS"
                type="email"
                placeholder="you@email.com"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="PASSWORD"
                type="password"
                placeholder="Min. 8 characters"
                minLength={8}
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-6">
              <Input
                label="CONFIRM PASSWORD"
                type="password"
                placeholder="Repeat password"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full mb-5"
            >
              Create Account
            </Button>
            <p className="text-center text-sm font-medium">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-rausch font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
