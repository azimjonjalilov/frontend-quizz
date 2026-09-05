"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Signup failed");
      } else {
        toast.success("Account created! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <h1 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Create an <span className="gradient-text">Account</span>
        </h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Name</label>
            <input 
              type="text" 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
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
              minLength={6}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Confirm Password</label>
            <input 
              type="password" 
              required 
              minLength={6}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary-purple)', fontWeight: '500' }}>Log in</Link>
        </div>
      </div>
    </section>
  );
}
