// @ts-nocheck
/* Privacy policy / Terms of use body, generated from the v3 handoff
   (reference/Norma Legal.dc.html) by dc2jsx. Text started verbatim from
   the team's drafts "03 nørma Privacy Policy (draft v1)" and "04 nørma Terms
   of Use (draft v1)". Revised 13 Oct 2026 where the draft contradicted how the
   product works; changes are logged outside the repo. 17 Oct 2026: the
   website form is now Book a demo (privacy sections 1, 3 and 5), and demo
   bookings through Google's booking calendar are listed (sections 3 and 5).
   Rendered server-side, no client JS. */
import React from 'react';
import { s } from '../lib/s';
import './LegalDoc.dc.css';

const P = t => ({ isP: true, b: '', t });
const BP = (b, t) => ({ isP: true, b: b + ' ', t });
const L = items => ({ isL: true, items: items.map(a => a.length === 2 ? { k: a[0], b: '', t: a[1] } : { k: a[0], b: a[1] + ' ', t: a[2] }) });
const T = (head, rows) => ({ isT: true, head, rows: rows.map(r => ({ cells: r.map(c => { const m = c.match(/^\*\*(.+?)\*\*\s*(.*)$/); return m ? { b: m[1] + ' ', t: m[2] } : { b: '', t: c }; }) })) });

const PRIVACY = [
  ['Who we are and what this covers', [
    P('nørma is made by The Artistry of Humanity Pty Ltd (ABN 61 676 269 579), Unit 17, 3 Alexander Street, Coogee NSW 2034, Australia. In this policy, "we", "us" and "AOH" mean The Artistry of Humanity Pty Ltd.'),
    P('This policy explains what personal information we collect when you use the nørma app, why we collect it, who can see it, and what your choices are. It applies to everything that makes up nørma: the companion app on iOS, Android and the web; the leadership dashboard and admin console used by your organisation\'s nominated leaders and administrators, including the information we collect about them in that role; and our website at joinnorma.com. The website sets no tracking cookies; it loads its fonts from Google Fonts, which sends a request to Google. If you ask for a demo through the form on the website, we collect the details you type into it (section 3).'),
    P('We are bound by the Privacy Act 1988 (Cth) and the Australian Privacy Principles. If you are in the European Union, the United Kingdom or a US state with its own privacy law, section 10 explains your additional rights.')]],
  ['The short version', [
    P('You use nørma because your organisation has made it available. Your organisation pays for it. But what you put into nørma is yours:'),
    L([['a', 'Nobody where you work can read your entries: your check-in answers, your reflections, your voice recordings, your habits, your commitments or anything else you enter. Your answers and habits reach your employer only inside group figures, never with your name. Not on request, not in a dispute. We have agreed this with your employer in writing, and we built the app so that nobody at your organisation has a way to open your entries.'],
      ['b', 'Your employer sees results for groups of at least five people, or a higher minimum your organisation sets: how a team or the organisation as a whole is doing across the Five Pillars and the culture questions, and the themes that come up across people\'s reflections, as labels and never in anyone\'s words. Smaller groups never show. The minimum counts the people in a group, not the people who have answered, so in a small team a figure can come from one person (section 8).'],
      ['c', 'The words you write or say are never shown to your employer. Themes from your reflections count towards your group\'s themes, as labels only. A leader\'s own check-in and reflections count in their team\'s figures like everyone else\'s.'],
      ['d', 'We do not monitor you, and we do not tell your employer what you enter. Your organisation\'s administrators can see who is on its roster (your name, email, team and role) and whether you have accepted your invitation and signed in.'],
      ['e', 'You can see and download everything you have entered, and delete your account and everything in it, at any time, from inside the app.'],
      ['f', 'nørma is not a medical or crisis service. If you are in danger, contact emergency services or a crisis line (section 9).']])], true],
  ['What we collect', [
    T(['Information', 'Where it comes from'], [
      ['**Account details:** your name, email address, your organisation and the team you are in, and your login details.', 'Your organisation gives us your name, email and team so it can invite you. You set your own password or sign in with a method your organisation provides.'],
      ['**Check-in answers:** your ratings and responses on the Five Pillars check-in and the culture questions (whether you feel safe to speak up, heard and valued).', 'You, when you complete a check-in.'],
      ['**Reflections:** what you write or say in the reflection feature, any life context you choose to add, and the mirror responses, themes and indicators the app generates from it.', 'You. If you use voice, your speech is turned into text on your device; nothing is sent anywhere to be transcribed. We store the text and, separately, the recording so you can play it back. Only your account can access the recording.'],
      ['**Habits, commitments and journeys:** the habits you track, the commitments you make, your progress through growth journeys, your personal fulfilment score and your growth momentum.', 'You, as you use the app.'],
      ['**Notes:** anything you type into an optional note box, such as the one on a check-in. Notes are private to you.', 'You.'],
      ['**Website enquiries:** the name, role, work email address, company, country, headcount, optional phone number and message you type into the Book a demo form on joinnorma.com.', 'You, when you send the form.'],
      ['**Demo bookings:** the name, email address and anything else you enter when you book a demo call through the booking calendar linked from joinnorma.com.', 'You, when you book a time.'],
      ['**Settings and device information:** your reminder preferences, notification token, device type, operating system, app version, language and time zone.', 'Your device and the app.'],
      ['**Usage information:** records of your sign-ins and the technical details of your sessions, kept for security, plus error and performance data. nørma contains no advertising or analytics trackers and does not follow you outside the app.', 'The app, automatically.'],
      ['**Support correspondence:** what you send us if you contact support.', 'You.']]),
    P('Some of what you enter may be information about your health or wellbeing. Under Australian law this is sensitive information, and we only collect it because you choose to give it to us when you use the app. You can use nørma without entering anything you do not want to.')]],
  ['Why we use it, and who sees what', [
    T(['Purpose', 'Who sees the information'], [
      ['To run your private companion app: show your check-ins, reflections, habits and progress back to you, send reminders you have set, and keep your account working.', 'You. AOH\'s own administration accounts cannot read your content. A small number of named engineers can reach the systems that hold it, for operations and support only, under access controls, logging and confidentiality obligations. Nobody reads it as a matter of course.'],
      ['To generate your mirror and themes using AI: when you save a reflection, the text (and any life context you added), your latest check-in answers, the names of the habits and growth work you have chosen, and a summary of your earlier themes are sent to our AI provider to produce a response that reflects back what you said, suggests small steps, and identifies themes and indicators.', 'You. The AI provider receives this without your name, email or organisation, and is contractually prohibited from training its models on it (section 5). Nothing removes names you type into a reflection yourself, so leave out anyone\'s name you would rather not have sent.'],
      ['To give your organisation an anonymised picture of how its people are doing: we combine check-in answers, and themes and indicators drawn from reflections, into results for groups of at least five people, in the same way your answers roll into a team\'s fulfilment score.', 'Your organisation\'s nominated leaders and administrators, but only the group result, for groups at or above the minimum (five, or higher if your organisation sets it). Never your name, never your reflections or voice recordings. This includes indicators of serious concerns, such as bullying or safety, that come up across reflections: your organisation sees a count or level for a group, never the reflection and never who it came from. A leader\'s own check-in and reflections count in their team\'s figures like everyone else\'s. In a small group a figure can come from one person (section 8).'],
      ['To count how many people are enrolled in nørma, so your organisation can be billed.', 'Your organisation\'s administrators manage the list of who is invited and see, by name, who has accepted their invitation and signed in. Leaders and administrators also see how many people in a group have checked in, and group counts of activity such as reflections written and habits ticked, never by name. They cannot see what you answered, wrote or said.'],
      ['To keep nørma secure, fix problems and understand how the app is used.', 'AOH and our engineering partner, using usage information and, where needed, logs.'],
      ['To improve nørma and the Five Pillars framework.', 'AOH, using information that has been de-identified so it cannot be linked back to you or your organisation.'],
      ['To respond when you contact us.', 'AOH support.']]),
    P('We do not sell your information. We do not use it for advertising. We do not use it to train third-party AI models. We do not share it with your employer, with other employers, or with anyone else except as described in section 5, or where the law requires us to, or where we reasonably believe it is necessary to protect someone\'s life or safety and the law allows it.')]],
  ['Who we share it with', [
    P('We use a small number of service providers to run nørma. Each is bound by a contract that limits what it can do with your information:'),
    T(['Provider', 'What for', 'Where'], [
      ['Amazon Web Services', 'Hosting, database, storage (including your voice recordings), backups, sign-in and email delivery', 'Australia (Sydney), unless your organisation has chosen another region, which your organisation will tell you'],
      ['Anthropic', 'The AI model that generates your mirror and classifies themes. Receives the reflection text and any life context, your latest check-in answers, the names of the habits and growth work you have chosen and a summary of earlier themes, without your name, email or organisation. Not permitted to train on it.', 'United States'],
      ['Expo, Apple and Google', 'Delivering push notifications to your device (your device token and the notification text only)', 'Global'],
      ['Tensaria', 'Engineering and operations support for the platform, under confidentiality and access controls', 'Australia'],
      ['Netlify', 'Hosting for joinnorma.com and receiving the Book a demo form', 'United States'],
      ['Notion', 'Storing demo requests so we can follow up', 'United States'],
      ['Google', 'The booking calendar for demo calls booked from joinnorma.com', 'United States']]),
    P('Your speech is turned into text on your own device. No audio is sent to anyone to be transcribed.'),
    P('Some of these providers are outside Australia. Before we disclose your information overseas, we take the steps Australian privacy law requires to make sure it stays protected.')]],
  ['How long we keep it', [
    P('We keep your information while your account is active. If you delete your account in the app, it is suspended for 30 days, during which you can change your mind and restore it. After that, everything you entered is erased: reflections, recordings, check-ins, habits, all of it. Group results your answers already contributed to are not recalculated, because they contain nothing that identifies you. Records of your sign-ins are kept for security, backups are deleted on their normal cycle, and we keep anything the law requires us to keep.'),
    P('If your organisation removes you, for example because you leave, your sign-in ends straight away and your data is erased after 30 days. During those 30 days your organisation\'s administrator can send you a copy of your data at a personal email address you give them, without seeing it; the link lasts up to seven days. If your organisation stops using nørma, your access ends; contact us (section 11) about your data.'),
    P('We may keep de-identified information that cannot be linked to you.')]],
  ['Your choices and rights', [
    L([['a', 'See and download.', 'You can view everything you have entered inside the app and export it as a single file at any time. The file lists your voice recordings but does not contain the audio.'],
      ['b', 'Correct.', 'You can edit your habits, commitments and reflections in the app. If something else about you is wrong, tell us and we will fix it.'],
      ['c', 'Delete.', 'You can delete your whole account, and everything in it, from the app at any time (under You, then "Privacy & data"). You do not need your employer\'s permission. Individual reflections can be edited but not deleted one at a time.'],
      ['d', 'Notifications.', 'You can turn reminders off in the app or in your device settings.'],
      ['e', 'Complain.', 'If you think we have mishandled your information, contact us (section 11). We will respond within 30 days. If you are not satisfied, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au.']]),
    P('Using nørma is voluntary. Your organisation has agreed with us that it will not require you to use it and will not treat you differently if you do not.')]],
  ['How we protect it', [
    P('Your information is encrypted in transit and at rest. Access to the systems that hold it is limited to named people who need it, protected by multi-factor authentication, and logged. The minimum group size of five, and the rule that stops a small group\'s result being worked out by subtracting it from the group above, are enforced on our servers, before anything reaches your organisation\'s dashboard. The dashboard only ever receives the finished group figures. Three honest limits. The minimum counts the people in a group, not the people who have answered, so a group of five shows a result from its first check-in and a figure can rest on a single answer, a leader\'s own included. Leaders also see how many people in a group have checked in, which can narrow it down further. And comparing figures over time can narrow down who might have changed. Your organisation can raise the minimum but never lower it below five, and it has agreed never to try to work out who said what. We test our security independently and we maintain an information security program aligned to ISO 27001. No system is perfectly secure, and if a breach affects your information we will tell you and the regulator as the law requires.')]],
  ['nørma is not a crisis service', [
    P('nørma supports your wellbeing and fulfilment. It does not diagnose or treat anything, it is not a substitute for a doctor, psychologist or counsellor, and it is not monitored by a person. Responses generated by AI can be wrong and are not advice.'),
    P('If you write or say something in a reflection that suggests you may be at risk, the app will show you contact details for support services. It will not alert your employer or anyone else. If you are in immediate danger, call emergency services (000 in Australia, 911 in the United States) or a crisis line such as Lifeline on 13 11 14 (Australia) or 988 (United States).')], true],
  ['If you are outside Australia', [
    BP('European Union and United Kingdom.', 'For the information you enter into the app, AOH is the controller. We rely on your consent, which you give by using the app and can withdraw by deleting your account. You have the rights to access, rectify, erase, restrict and port your data, to object, and to lodge a complaint with your local supervisory authority. Where we transfer your data outside the EU or UK, we use Standard Contractual Clauses or an equivalent safeguard.'),
    BP('United States.', 'Depending on your state, you may have the right to know what personal information we hold about you, to delete it, to correct it, and not to be discriminated against for exercising those rights. We do not sell or share personal information for targeted advertising. You can exercise these rights in the app or by contacting us.'),
    P('Wherever you are, you have the choices in section 7.')]],
  ['Contact us', [
    P('Privacy questions, requests and complaints: write to us at the address below. You do not need to go through your organisation.'),
    P('Post: The Artistry of Humanity Pty Ltd, Unit 17, 3 Alexander Street, Coogee NSW 2034, Australia')]],
  ['Changes to this policy', [
    P('If we change this policy in a way that matters, we will tell you in the app before the change takes effect. The date at the top shows when it was last updated.')]],
];

const TERMS = [
  ['These terms', [
    P('These terms are an agreement between you and The Artistry of Humanity Pty Ltd (ABN 61 676 269 579) of Unit 17, 3 Alexander Street, Coogee NSW 2034, Australia ("AOH", "we", "us"). They apply to your use of the nørma app on iOS, Android and the web, and to the content and services in it (together, "nørma"). If you are one of your organisation\'s nominated leaders or administrators, these terms also apply to your use of the nørma leadership dashboard and admin console, alongside the agreement between your organisation and AOH, which sets out what your organisation may and may not do with what it sees there.'),
    P('By creating an account or using nørma you agree to these terms and to our Privacy Policy, which explains how we handle your information and who can and cannot see it. If you do not agree, do not use nørma.')]],
  ['Who can use nørma', [
    P('nørma is made available to you by your organisation under an agreement between your organisation and AOH. You can use it if you have been invited by your organisation and you are at least 18 years old. Your account is personal to you. Do not share your login details or let anyone else use your account.'),
    P('Using nørma is voluntary. Your organisation has agreed with us that it will not require you to use it and will not treat you differently if you do not.')]],
  ['What nørma is, and what it is not', [
    P('nørma is a private companion that helps you check in on the Five Pillars of Fulfilment, reflect, build habits and follow growth journeys, and that gives your organisation an anonymised picture of how its people are doing as a group.'),
    P('nørma is not a medical, psychological, counselling or crisis service. It does not diagnose, treat or prevent any condition. Nothing in nørma is medical, psychological, legal or financial advice. It does not replace a doctor, psychologist, counsellor or other professional, and you should not delay seeking professional help because of anything in nørma.'),
    P('Some features use artificial intelligence to generate responses to what you write or say, and to identify themes. AI-generated content can be inaccurate, incomplete or inappropriate. It is a reflection of what you entered, not advice, and you should use your own judgement.'),
    P('nørma is not monitored by a person. If you write or say something in a reflection that suggests you may be at risk, the app will show you contact details for support services. It will not alert anyone on your behalf. If you are in immediate danger, call emergency services (000 in Australia, 911 in the United States) or a crisis line such as Lifeline on 13 11 14 (Australia) or 988 (United States).')]],
  ['Your privacy, in short', [
    P('What you enter into nørma is yours, and nobody where you work can read it. Your organisation sees results for groups only (at least five people, or a higher minimum it sets), including themes that come up across people\'s reflections as labels, and never your name. Your reflections themselves, and your voice recordings, are never shown to anyone at your organisation. The full details, including the limits of what group figures can hide, are in our Privacy Policy, which forms part of these terms.')], true],
  ['Your content and conduct', [
    P('You own what you enter into nørma, including your reflections and voice recordings. You give us permission to store it, process it (including generating your mirror with AI) and show it back to you, to fold it into anonymised group results for your organisation, and to use it in de-identified form to improve nørma, all as described in the Privacy Policy. That permission is for running nørma and nothing else. You can export or delete your content at any time.'),
    P('Where nørma lets you share something with other people, you are responsible for what you share. You agree not to use nørma to:'),
    L([['a', 'harass, bully, threaten, discriminate against or demean anyone;'], ['b', 'share anything unlawful, defamatory, obscene, or that infringes someone else\'s rights or confidentiality;'], ['c', 'try to identify who gave a particular answer, or to work out another person\'s individual results;'], ['d', 'impersonate anyone or misrepresent who you are;'], ['e', 'upload malicious code, or interfere with or try to gain unauthorised access to nørma or its systems;'], ['f', 'copy, scrape, reverse engineer, resell or build a competing product from nørma or its content.']]),
    P('If you breach these rules we may remove content and suspend or close your account. If something shared with you in nørma concerns you, you can report it to us at the address in section 12.')]],
  ['Our content', [
    P('nørma, the Five Pillars of Fulfilment framework, and all content in the app (text, animations, journeys, questions, designs and software) belong to AOH or our licensors. You may use them only within nørma and for your own personal wellbeing. You may not copy, distribute or use them for any other purpose without our written permission.')]],
  ['Your account', [
    P('You are responsible for keeping your login details secure and for everything done through your account. Tell us straight away if you think someone else has used it. You can close your account at any time from the app\'s settings. Deletion starts with a 30-day window in case you change your mind, after which your content is erased as described in the Privacy Policy. You do not need your organisation\'s permission.'),
    P('Your access to nørma depends on your organisation\'s agreement with us. If your organisation removes you, for example when you leave, your access ends straight away and your content is erased after 30 days; during that time your organisation\'s administrator can send you a copy, as described in the Privacy Policy. If its agreement with us ends, your access ends too; contact us about your content.')]],
  ['Availability and changes', [
    P('We work to keep nørma available and reliable, but we cannot promise it will be uninterrupted or error-free. We may change, add or remove features, and we may suspend nørma for maintenance or for security reasons. If we make a change that significantly reduces what nørma does, we will tell you in the app.'),
    P('We may update these terms. If the change matters, we will tell you in the app before it takes effect, and continuing to use nørma after that means you accept the updated terms.')]],
  ['App stores', [
    P('If you downloaded nørma from the Apple App Store or Google Play, their terms also apply to the download and your use of the app on your device. Apple and Google are not responsible for nørma, its content or support, and have no obligation to you under these terms. Apple and its subsidiaries are third-party beneficiaries of these terms and may enforce them against you.')]],
  ['Liability', [
    P('Nothing in these terms excludes, restricts or modifies any guarantee, right or remedy you have under the Australian Consumer Law or any other law that cannot be excluded. Where our liability for breach of such a guarantee can be limited, it is limited, at our option, to supplying the service again or paying the cost of having it supplied again.'),
    P('Subject to that, and to the extent permitted by law: nørma is provided to you free of charge, paid for by your organisation, and we will never ask you for payment in the app; it is provided "as is"; we are not liable for any loss or damage arising from your use of nørma, from reliance on any content in it (including AI-generated content), or from any decision you make because of it; and we are not liable for indirect or consequential loss. If we are liable to you for anything, our total liability is limited to A$100.'),
    P('Nothing in these terms limits our liability for fraud, or for death or personal injury caused by our negligence, or for anything else that cannot be limited by law.')]],
  ['General', [
    P('These terms are governed by the law of New South Wales, Australia. If you are a consumer in another country, you also have the protection of the mandatory laws of that country, and you may bring a claim in its courts. If any part of these terms is invalid, the rest continues to apply. These terms, together with the Privacy Policy, are the whole agreement between you and us about nørma.')]],
  ['Contact', [
    P('Questions, reports and complaints: write to us at the address below.'),
    P('The Artistry of Humanity Pty Ltd, Unit 17, 3 Alexander Street, Coogee NSW 2034, Australia')]],
];

const build = (key, list) => list.map(([title, blocks, hl], i) => ({ id: key + '-' + (i + 1), n: String(i + 1).padStart(2, '0'), title, blocks, bg: hl ? 'linear-gradient(158deg,rgba(217,234,110,.09),rgba(217,234,110,.035))' : 'transparent', pad: hl ? '28px 30px 30px' : '0' }));
const DOCS = { privacy: build('privacy', PRIVACY), terms: build('terms', TERMS) };

export default class LegalDoc extends React.Component {
  renderVals() {
    const p = (this.props.doc ?? 'privacy') === 'privacy';
    const seg = on => ({ bg: on ? 'rgba(217,234,110,.14)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.8)' });
    const doc = p
      ? { title: 'Privacy policy', updated: '17 OCTOBER 2026', sections: DOCS.privacy, otherLine: 'The terms each person accepts when they create an account.', otherLabel: 'Read the Terms of use', otherHref: '/terms/' }
      : { title: 'Terms of use', updated: '13 OCTOBER 2026', sections: DOCS.terms, otherLine: 'What we collect, who sees what, and your choices.', otherLabel: 'Read the Privacy policy', otherHref: '/privacy/' };
    return { doc, segP: seg(p), segT: seg(!p), isPrivacy: p };
  }

  render() {
    const V = { ...this.props, ...this.renderVals() };
    return (
      <>
      <div data-r="wrap" style={s(`max-width:1180px;margin:0 auto;padding:72px 40px 120px;box-sizing:border-box;display:flex;gap:64px;align-items:flex-start`)}>
        <aside data-r="side" style={s(`flex:none;width:240px;position:sticky;top:100px;display:flex;flex-direction:column;gap:2px;max-height:calc(100vh - 120px);overflow:auto`)}>
          <div style={s(`padding:0 12px 10px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2.2px;color:rgba(201,212,194,.55)`)}>ON THIS PAGE</div>
          {(V.doc.sections || []).map((s_, $index) => (
            <React.Fragment key={$index}>
              <a href={`#${s_.id ?? ''}`} style={s(`display:flex;gap:10px;padding:7px 12px;border-radius:12px;font:400 13px/1.35 'DM Sans',sans-serif;color:rgba(244,242,230,.72);transition:all .2s ease`)} className="lgl-hofba119">
                <span style={s(`flex:none;width:18px;font:500 11px/1.6 'DM Mono',monospace;color:rgba(201,212,194,.5)`)}>{s_.n}</span>
                <span>{s_.title}</span>
              </a>
            </React.Fragment>
          ))}
        </aside>
        <main style={s(`flex:1;min-width:0;max-width:760px`)}>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px`)}>
            <span style={s(`font:600 10px 'DM Sans',sans-serif;letter-spacing:2.4px;color:#D9EA6E`)}>LEGAL</span>
            <div style={s(`display:inline-flex;padding:4px;border-radius:999px;border:1px solid rgba(228,240,214,.12);background:rgba(10,19,13,.4)`)}>
              <a href="/privacy/" aria-current={V.isPrivacy ? "page" : undefined} style={s(`padding:8px 16px;border-radius:999px;background:${V.segP.bg ?? ''};color:${V.segP.c ?? ''};font:500 13.5px 'DM Sans',sans-serif;transition:all .3s ease`)} className="lgl-ho950d73">Privacy policy</a>
              <a href="/terms/" aria-current={V.isPrivacy ? undefined : "page"} style={s(`padding:8px 16px;border-radius:999px;background:${V.segT.bg ?? ''};color:${V.segT.c ?? ''};font:500 13.5px 'DM Sans',sans-serif;transition:all .3s ease`)} className="lgl-ho950d73">Terms of use</a>
            </div>
          </div>
          <h1 style={s(`margin:16px 0 0;font:400 clamp(40px,5vw,58px)/1.05 'DM Serif Display',serif;letter-spacing:-.8px;color:#F6F4E9`)}>{V.doc.title}</h1>
          <div style={s(`margin-top:14px;font:500 12px 'DM Mono',monospace;letter-spacing:1px;color:rgba(201,212,194,.62)`)}>LAST UPDATED: {V.doc.updated}</div>
          <div style={s(`display:flex;flex-direction:column;gap:56px;margin-top:56px`)}>
            {(V.doc.sections || []).map((s_, $index) => (
              <React.Fragment key={$index}>
                <section id={s_.id} style={s(`scroll-margin-top:100px;padding:${s_.pad ?? ''};border-radius:28px 20px 30px 22px / 20px 30px 22px 28px;background:${s_.bg ?? ''}`)}>
                  <div style={s(`display:flex;align-items:baseline;gap:14px`)}>
                    <span style={s(`flex:none;font:500 12px 'DM Mono',monospace;color:#DCEC85`)}>{s_.n}</span>
                    <h2 style={s(`margin:0;font:400 28px/1.15 'DM Serif Display',serif;letter-spacing:-.3px;color:#F6F4E9;text-wrap:pretty`)}>{s_.title}</h2>
                  </div>
                  <div style={s(`display:flex;flex-direction:column;gap:16px;margin-top:18px`)}>
                    {(s_.blocks || []).map((bl, $index) => (
                      <React.Fragment key={$index}>
                        {(bl.isP) ? (
                          <>
                            <p style={s(`margin:0;font:400 16px/1.65 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>
                              <strong style={s(`font-weight:600;color:#F6F4E9`)}>{bl.b}</strong>
                              {bl.t}
                            </p>
                          </>
                        ) : null}
                        {(bl.isL) ? (
                          <>
                            <div style={s(`display:flex;flex-direction:column;gap:12px`)}>
                              {(bl.items || []).map((it, $index) => (
                                <React.Fragment key={$index}>
                                  <div style={s(`display:flex;gap:14px`)}>
                                    <span style={s(`flex:none;width:26px;font:500 12px/1.9 'DM Mono',monospace;color:rgba(220,236,133,.85)`)}>({it.k})</span>
                                    <p style={s(`margin:0;font:400 16px/1.65 'DM Sans',sans-serif;color:rgba(244,242,230,.86);text-wrap:pretty`)}>
                                      <strong style={s(`font-weight:600;color:#F6F4E9`)}>{it.b}</strong>
                                      {it.t}
                                    </p>
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                        {(bl.isT) ? (
                          <>
                            <div style={s(`border-radius:22px 16px 24px 14px / 16px 24px 14px 22px;border:1px solid rgba(228,240,214,.1);overflow:hidden`)}>
                              <div style={s(`display:flex;flex-wrap:wrap;gap:0 24px;padding:12px 20px;background:rgba(228,240,214,.05)`)}>
                                {(bl.head || []).map((hd, $index) => (
                                  <React.Fragment key={$index}>
                                    <span style={s(`flex:1 1 180px;font:600 9.5px 'DM Sans',sans-serif;letter-spacing:2px;color:rgba(201,212,194,.72)`)}>{hd}</span>
                                  </React.Fragment>
                                ))}
                              </div>
                              {(bl.rows || []).map((r, $index) => (
                                <React.Fragment key={$index}>
                                  <div style={s(`display:flex;flex-wrap:wrap;gap:8px 24px;padding:16px 20px;border-top:1px solid rgba(228,240,214,.07)`)}>
                                    {(r.cells || []).map((c, $index) => (
                                      <React.Fragment key={$index}>
                                        <span style={s(`flex:1 1 180px;min-width:0;font:400 14.5px/1.55 'DM Sans',sans-serif;color:rgba(244,242,230,.84);text-wrap:pretty`)}>
                                          <strong style={s(`font-weight:600;color:#F6F4E9`)}>{c.b}</strong>
                                          {c.t}
                                        </span>
                                      </React.Fragment>
                                    ))}
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </section>
              </React.Fragment>
            ))}
          </div>
          <div style={s(`display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-top:72px;padding:24px 28px;border-radius:24px 18px 26px 16px / 18px 26px 16px 24px;border:1px solid rgba(228,240,214,.1);background:linear-gradient(158deg,rgba(228,240,214,.085),rgba(228,240,214,.035))`)}>
            <span style={s(`font:400 15px/1.5 'DM Sans',sans-serif;color:rgba(201,212,194,.8)`)}>{V.doc.otherLine}</span>
            <a href={V.doc.otherHref} style={s(`font:500 14px 'DM Sans',sans-serif`)}>{V.doc.otherLabel}{" ›"}</a>
          </div>
        </main>
      </div>
      </>
    );
  }
}
