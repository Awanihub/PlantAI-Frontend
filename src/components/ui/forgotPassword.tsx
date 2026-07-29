// ForgotPassword.tsx
import { useState, KeyboardEvent, ChangeEvent } from "react";

const API =
  "https://plantai-backend-jumt.onrender.com/api/auth";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  maxLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface BtnProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const Input = ({ label, ...props }: InputProps) => (
  <div style={{ marginBottom: "1rem" }}>
    <label
      style={{
        display: "block",
        fontSize: "0.85rem",
        fontWeight: 600,
        marginBottom: "0.4rem",
        color: "#374151",
      }}
    >
      {label}
    </label>
    <input
      style={{
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        border: "1.5px solid #d1d5db",
        fontSize: "1rem",
        outline: "none",
        transition: "border 0.2s",
        boxSizing: "border-box",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#2d6a4f")}
      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
      {...props}
    />
  </div>
);

const Btn = ({ children, loading, onClick }: BtnProps) => (
  <button
    style={{
      width: "100%",
      padding: "0.85rem",
      borderRadius: "8px",
      background: loading ? "#9ca3af" : "#2d6a4f",
      color: "white",
      fontWeight: 700,
      fontSize: "1rem",
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.2s",
    }}
    disabled={loading}
    onClick={onClick}
  >
    {loading ? "Please wait…" : children}
  </button>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPass] = useState<string>("");
  const [confirmPass, setConfirm] = useState<string>("");
  const [resetToken, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const post = async (endpoint: string, body: Record<string, string>) => {
    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  };

  // Step 1 — Send OTP
  const handleSendOtp = async (): Promise<void> => {
    if (!email) return setError("Please enter your email");
    setError("");
    setLoading(true);
    try {
      await post("/forgot-password", { email });
      setSuccess("OTP sent! Check your inbox.");
      setStep(2);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP
  const handleVerifyOtp = async (): Promise<void> => {
    if (otp.length !== 6) return setError("Enter the 6-digit OTP");
    setError("");
    setLoading(true);
    try {
      const data = await post("/verify-otp", { email, otp });
      setToken(data.resetToken);
      setSuccess("OTP verified! Set your new password.");
      setStep(3);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 — Reset Password
  const handleReset = async (): Promise<void> => {
    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (newPassword !== confirmPass) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resetToken}`,
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Password reset successfully! You can now log in.");

      setStep(4);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const steps: string[] = ["Email", "Verify OTP", "New Password"];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0fdf4",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌿</div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a1a2e",
              margin: 0,
            }}
          >
            Forgot Password
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.9rem",
              marginTop: "0.4rem",
            }}
          >
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && `OTP sent to ${email}`}
            {step === 3 && "Almost there! Set a new password"}
            {step === 4 && "All done!"}
          </p>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
            {steps.map((label, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    height: "4px",
                    borderRadius: "4px",
                    background: i < step ? "#2d6a4f" : "#e5e7eb",
                    transition: "background 0.4s",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: i < step ? "#2d6a4f" : "#9ca3af",
                    fontWeight: 600,
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              color: "#dc2626",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              color: "#16a34a",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            ✅ {success}
          </div>
        )}

        {/* Step 1 — Email */}
        {step === 1 && (
          <>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
            />
            <Btn loading={loading} onClick={handleSendOtp}>
              Send OTP
            </Btn>
          </>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <>
            <Input
              label="6-Digit OTP"
              type="text"
              placeholder="123456"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
            />
            <Btn loading={loading} onClick={handleVerifyOtp}>
              Verify OTP
            </Btn>
            <button
              onClick={handleSendOtp}
              style={{
                width: "100%",
                marginTop: "0.75rem",
                background: "none",
                border: "none",
                color: "#2d6a4f",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Resend OTP
            </button>
          </>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <>
            <Input
              label="New Password"
              type="password"
              placeholder="Min. 8 characters"
              value={newPassword}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat password"
              value={confirmPass}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReset()}
            />
            <Btn loading={loading} onClick={handleReset}>
              Reset Password
            </Btn>
          </>
        )}

        {/* Step 4 — Done */}
        {step === 4 && <Btn onClick={onBackToLogin}>Back to Login</Btn>}

        {/* Back to Login */}
        {step < 4 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontSize: "0.9rem",
              color: "#6b7280",
            }}
          >
            Remember it?{" "}
            <button
              onClick={onBackToLogin}
              style={{
                background: "none",
                border: "none",
                color: "#2d6a4f",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
