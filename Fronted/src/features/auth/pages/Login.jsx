import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "../../../components/AuthLayout";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useAuth } from "../hooks/useAuth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function Login() {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const validate = () => {
    const next = {};
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!emailPattern.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    return next;
  };
  const submit = async (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;
    try {
      await handleLogin(values);
      navigate("/app");
    } catch (error) {
      setServerError(
        typeof error === "string"
          ? error
          : "Unable to log in. Please try again.",
      );
    }
  };
  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue preparing for your next interview."
    >
      <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
        {serverError && (
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            {serverError}
          </div>
        )}
        <Field label="Email" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
        <Field label="Password" error={errors.password}>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
              className="pr-11"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-1 top-1 grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label={`${showPassword ? "Hide" : "Show"} password`}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </Field>
        <Button className="w-full" size="lg" disabled={loading}>
          {loading && <LoaderCircle className="size-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to InterviewAI?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
function Field({ label, error, children }) {
  const id = label.toLowerCase();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
