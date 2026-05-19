"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "@gravity-ui/icons";
import { Eye, EyeOff } from "lucide-react";
import { Icon } from "@iconify/react"; // Assuming you are using @iconify/react for the devicon
import { toast } from "react-toastify";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInfo = Object.fromEntries(formData.entries());
    try {
      setLoading(true);
      const { data, error } = await authClient.signIn.email({
        ...userInfo,
        callbackURL: "/",
        rememberMe: false,
      });

      if (error) {
        throw new Error(
          error?.message || "Login failed. Please check your credentials.",
        );
      }

      toast.success("🐾 Welcome back to PetNest! Redirecting...", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      router.push("/");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      });

      if (data?.session) {
        toast.success("🐾 Welcome back to PetNest! Redirecting...", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error.message || "Google authentication failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-150 items-center justify-center bg-base-300 p-6">
      <div className="w-full max-w-md rounded-2xl border border-base-100 bg-base-200 p-8 shadow-xl space-y-6">
        {/* BRANDING LOGO ACCENT BLOCK */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-base-content">
            Welcome to <span className="text-error">PetNest</span> 🐾
          </h2>
          <p className="text-sm text-base-content/60">
            Log in to manage your listings or start your adoption journey
          </p>
        </div>

        {/* GOOGLE SIGN IN BUTTON */}
        <div className="pt-1">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full"
            variant="tertiary"
          >
            <Icon icon="devicon:google" />
            <span>Sign in with Google</span>
          </Button>
        </div>

        {/* HEROUI TEXT INPUT LAYOUT */}
        <Form
          className="flex flex-col gap-4"
          render={(props) => <form {...props} />}
          onSubmit={onSubmit}
        >
          {/* EMAIL FIELD */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-base-content/80 mb-1 block">
              Email Address
            </Label>
            <Input
              placeholder="yourname@example.com"
              className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content placeholder:text-base-content/40"
            />
            <FieldError className="text-xs font-medium text-error mt-1" />
          </TextField>

          {/* PASSWORD FIELD WITH TOGGLE BUTTON */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full"
            validate={(value) => {
              if (value.length < 8)
                return "Password must be at least 8 characters long";
              if (!/[A-Z]/.test(value))
                return "Password must contain at least one uppercase letter";
              if (!/[0-9]/.test(value))
                return "Password must contain at least one number";
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-base-content/80 mb-1 block">
              Password
            </Label>
            <div className="relative flex items-center">
              <Input
                placeholder="••••••••"
                className="input input-bordered w-full pr-12 bg-base-300 border-base-100 text-sm text-base-content placeholder:text-base-content/40"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 text-base-content/40 hover:text-base-content transition focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Description className="text-[11px] text-base-content/50 mt-1 block leading-relaxed">
              Must contain 8 characters with 1 uppercase letter and 1 numeric
              token.
            </Description>
            <FieldError className="text-xs font-medium text-error mt-1" />
          </TextField>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              disabled={loading}
              type="submit"
              className={`w-full btn font-bold bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl border-0 shadow-md gap-2 normal-case ${
                loading && "cursor-not-allowed"
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{loading ? "Logging in..." : "Log In"}</span>
            </Button>
          </div>
        </Form>

        {/* Login Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-error font-bold hover:underline transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
