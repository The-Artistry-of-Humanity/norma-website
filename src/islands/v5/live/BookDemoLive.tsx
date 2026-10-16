// @ts-nocheck
/* Book a demo with a real send. The generated BookDemo is the reference as
   designed, where Send only shows the thank-you. This subclass posts the eight
   fields to Netlify Forms (form "book-a-demo", detected from the hidden form in
   src/pages/book-a-demo.astro) and shows the thank-you only once the post
   succeeds. On failure the form stays and a plain error line replaces the hint,
   as the handoff README asks. Kept separate so regenerating BookDemo.tsx from
   the reference never loses it. */
import BookDemo from '../BookDemo';

// Field names as Netlify and the Notion sync see them; the form's own keys on the left.
const FIELDS = { name: 'name', role: 'role', phone: 'phone', email: 'email', company: 'company', country: 'country', size: 'headcount', message: 'message' };

export default class BookDemoLive extends BookDemo {
  submit = async (e) => {
    e.preventDefault();
    if (this.state.sending) return;
    const f = this.state.f, bad = this.check(f);
    if (Object.keys(bad).length) { this.setState({ bad, tried: true, failed: false }); return; }
    const body = new URLSearchParams({ 'form-name': 'book-a-demo' });
    for (const [k, name] of Object.entries(FIELDS)) body.append(name, String(f[k] || '').trim());
    this.setState({ sending: true, failed: false });
    let ok = false;
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      ok = res.ok;
    } catch (_) { ok = false; }
    if (!ok) { this.setState({ sending: false, failed: true }); return; }
    // Keep the card's height so the page doesn't jump, then let the thank-you bloom in.
    const h = this.cardRef.current ? this.cardRef.current.offsetHeight + 'px' : 'auto';
    this.setState({ sending: false, sent: true, cardMin: h });
    this.popT = setTimeout(() => this.setState({ pop: true }), 80);
  };

  renderVals() {
    const v = super.renderVals();
    if (this.state.failed) { v.hint = 'That didn’t send. Please try again, or pick a time above.'; v.hintCol = '#C85C44'; }
    else if (this.state.sending) { v.hint = 'Sending…'; v.hintCol = 'rgba(20,35,26,.55)'; }
    return v;
  }
}
