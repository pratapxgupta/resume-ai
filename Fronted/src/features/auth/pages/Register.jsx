import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "../../../components/AuthLayout";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useAuth } from "../hooks/useAuth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function Register() {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const validate = () => {
    const next = {};
    if (!values.username.trim()) next.username = "Name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!emailPattern.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.password) next.password = "Password is required.";
    if (!values.confirmPassword)
      next.confirmPassword = "Confirm your password.";
    else if (values.password !== values.confirmPassword)
      next.confirmPassword = "Passwords do not match.";
    return next;
  };
  const submit = async (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;
    try {
      await handleRegister({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      navigate("/app");
    } catch (error) {
      setServerError(
        typeof error === "string"
          ? error
          : "Unable to create your account. Please try again.",
      );
    }
  };
  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };
  return (
    <AuthLayout
      title="Create your account"
      description="Start building focused preparation plans for the roles you want."
    >
      <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
        {serverError && (
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            {serverError}
          </div>
        )}
        <Field id="username" label="Name" error={errors.username}>
          <Input
            id="username"
            autoComplete="name"
            placeholder="Your name"
            value={values.username}
            onChange={(e) => update("username", e.target.value)}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
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
        <PasswordField
          id="password"
          label="Password"
          value={values.password}
          error={errors.password}
          visible={visible.password}
          onToggle={() =>
            setVisible((current) => ({
              ...current,
              password: !current.password,
            }))
          }
          onChange={(value) => update("password", value)}
          autoComplete="new-password"
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          visible={visible.confirmPassword}
          onToggle={() =>
            setVisible((current) => ({
              ...current,
              confirmPassword: !current.confirmPassword,
            }))
          }
          onChange={(value) => update("confirmPassword", value)}
          autoComplete="new-password"
        />
        <Button className="w-full" size="lg" disabled={loading}>
          {loading && <LoaderCircle className="size-4 animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
function Field({ id, label, error, children }) {
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
function PasswordField({
  id,
  label,
  value,
  error,
  visible,
  onToggle,
  onChange,
  autoComplete,
}) {
  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder="Enter your password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-11"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-1 top-1 grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </Field>
  );
}
