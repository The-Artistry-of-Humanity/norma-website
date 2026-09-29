import { useState } from 'react';
import { s } from '../lib/s';

const inputStyle = s(`height:46px;padding:0 16px;border-radius:999px;border:1px solid rgba(228,240,214,.16);background:rgba(10,19,13,.6);color:#F6F4E9;font:400 14.5px 'DM Sans',sans-serif;box-sizing:border-box`);

export default function EarlyAccess() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');

  const sendEmail = async () => {
    if (!name.trim() || !company.trim()) { setFormError('Please add your name and company.'); return; }
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setFormError('Please enter a valid email address.'); return; }
    setSending(true); setFormError('');
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ 'form-name': 'early-access', name: name.trim(), company: company.trim(), email: value, phone: phone.trim() }).toString() });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true); setSending(false);
    } catch (e) {
      setSending(false);
      setFormError('That did not go through. Please try again, or email ian@artistry-of-humanity.com.');
    }
  };

  if (sent) {
    return (
      <div style={s(`display:inline-flex;align-items:center;gap:10px;margin-top:14px;padding:12px 16px;border-radius:999px;background:rgba(217,234,110,.10);border:1px solid rgba(217,234,110,.25);font:500 14px 'DM Sans',sans-serif;color:#EAF79B`)}><span style={s('width:16px;height:16px;border-radius:999px;background:#D9EA6E;display:flex;align-items:center;justify-content:center')}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#17240F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 12.5 L10 17 L18.5 7.5" /></svg></span>You are on the list. We will be in touch soon.</div>
    );
  }

  return (
    <>
      <div style={s('display:flex;flex-direction:column;gap:10px;margin-top:14px;max-width:460px')}>
        <div style={s('display:flex;flex-wrap:wrap;gap:10px')}>
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ ...inputStyle, ...s('flex:1;min-width:140px') }} aria-label="Your name" autoComplete="name" />
          <input type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} style={{ ...inputStyle, ...s('flex:1;min-width:140px') }} aria-label="Company" autoComplete="organization" />
        </div>
        <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, ...s('width:100%') }} aria-label="Email for early access" autoComplete="email" />
        <input type="tel" placeholder="Phone (optional) · +61 400 000 000" value={phone} onChange={e => setPhone(e.target.value)} style={{ ...inputStyle, ...s('width:100%') }} aria-label="Phone, optional" autoComplete="tel" />
        <div>
          <button onClick={sendEmail} disabled={sending} className="hv-ghost2" style={s(`height:46px;padding:0 20px;border-radius:999px;border:1px solid rgba(228,240,214,.2);background:rgba(228,240,214,.06);color:#F4F2E6;font:500 14px 'DM Sans',sans-serif;cursor:pointer;transition:all .2s ease`)}>{sending ? 'Sending…' : 'Request early access'}</button>
        </div>
      </div>
      {formError && <div style={s(`margin-top:10px;font:400 13px 'DM Sans',sans-serif;color:#EFB39B`)}>{formError}</div>}
    </>
  );
}
