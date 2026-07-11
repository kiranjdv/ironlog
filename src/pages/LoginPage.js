import { useState } from "react";

export default function LoginPage({ store }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    if (mode === "login") {
      const e = await store.login(email, pass);
      if (e) setErr(e);
    } else {
      if (!name.trim()) return setErr("Name required");
      const e = await store.register(name.trim(), email, pass);
      if (e) setErr(e);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-bg">LIFT</div>
      <div className="login-card">
        <div className="logo">⚡ IRONLOG</div>
        <div className="logo-sub">{mode === "login" ? "Welcome back, athlete" : "Start your journey"}</div>
        {mode === "register" && (
          <div className="field">
            <label>Name</label>
            <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        {err && <div className="err">{err}</div>}
        <button className="btn-primary" onClick={submit}>{mode === "login" ? "Login" : "Create Account"}</button>
        <div className="login-switch">
          {mode === "login" ? (
            <>No account? <span onClick={() => { setMode("register"); setErr(""); }}>Sign up</span></>
          ) : (
            <>Have account? <span onClick={() => { setMode("login"); setErr(""); }}>Log in</span></>
          )}
        </div>
      </div>
    </div>
  );
}
