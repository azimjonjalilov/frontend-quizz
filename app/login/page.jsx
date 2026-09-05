"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully");
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <section className="container flex-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <h1 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Log In to <span className="gradient-text">IT Quiz</span>
        </h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
            <input 
              type="email" 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div style={{ margin: '1.5rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          OR
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="glass-card" 
          style={{ width: '100%', padding: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: '2px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-main)', cursor: 'pointer' }}
        >
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" width="20" height="20" />
          Continue with Google
        </button>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Don&apos;t have an account? <Link href="/signup" style={{ color: 'var(--primary-purple)', fontWeight: '500' }}>Sign up</Link>
        </div>
      </div>
    </section>
  );
}
