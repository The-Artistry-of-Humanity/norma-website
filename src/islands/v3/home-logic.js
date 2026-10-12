// @ts-nocheck
/* Shared state + data for the v3 home page islands (TwoSides, Rhythm,
   Leaders, hero). Verbatim from design_handoff_v3/reference/Norma Website v3.dc.html.
   Each island extends HomeBase and renders only its own section. */
import React from 'react';

export const PILLARS = [
  { name: 'Health & Fitness', short: 'Health', line: 'Sleep, movement, nutrition and energy. The physical base every other pillar rests on; when it slips, everything else costs more.', themes: ['Exercise', 'Nutrition', 'Body', 'Energy'], org: 'Shift patterns, hours and recovery time show up here first.' },
  { name: 'Internal Work', short: 'Internal', line: 'Reading, reflection, gratitude, forgiveness. The inner practice that decides how a person meets pressure.', themes: ['Reading', 'Reflection', 'Gratitude', 'Forgiveness'], org: 'The pillar most often lowest, and the one growth journeys lift fastest.' },
  { name: 'Love & Relationships', short: 'Love', line: 'The closest relationships and the attention they get. Usually the first thing to run on leftovers when work expands.', themes: ['Partnership', 'Attention', 'Peace'], org: 'A falling Love pillar across a team is often a workload signal in disguise.' },
  { name: 'Social Connection', short: 'Social', line: 'Friends, family, community and belonging. The pillar nobody schedules and the one that thins out first.', themes: ['Friends', 'Family', 'Community', 'Belonging'], org: 'Remote and distributed teams tend to slide here without anyone noticing.' },
  { name: 'Work & Life Flow', short: 'Flow', line: 'Purpose, enough time to do the job well, the relationship with a manager, control over the next step.', themes: ['Purpose', 'Time', 'Manager', 'Next step'], org: 'The one pillar you can most directly change. Also where culture questions live.' }
];
export const STEPS = [
  { n: '01', name: 'Check in', title: 'Once a month, twenty questions.', body: 'Four per pillar, plus three about culture: heard, valued, safe to speak. About ten minutes. The result is a Fulfilment Score that belongs to the employee.', note: 'Between check-ins nothing is required. The habit is theirs; the rhythm is yours.' },
  { n: '02', name: 'The mirror', title: 'Something back for them, first.', body: 'A written reflection that notices one specific thing and stops. It reaches the employee before the organisation receives anything at all.', note: 'No diagnosis, no lecture. A perceptive friend who has been paying attention.' },
  { n: '03', name: 'One small step', title: 'One habit, or one action.', body: 'Pointed at whatever is weakest. Habits repeat, actions are one-off, growth journeys go deeper. Voice reflections keep the thread between months.', note: 'A person who embeds one new habit a month is a success.' },
  { n: '04', name: 'The signal', title: 'The leader sees one aggregate, and one place to look.', body: 'Every check-in in the app rolls up into Fulfilment and Culture for each group of five or more. The dashboard names the one department to look at this month and why.', note: 'Nobody’s answers. Nobody’s name. A number for the group, and the lowest pillar behind it.' },
  { n: '05', name: 'Act', title: 'A session built on the team’s own score.', body: 'The platform hands the leader a ready-made Stop for Wellness session from the library, on the team’s lowest pillar. Twenty minutes, no consultant in the room. It is logged against the signal it answers.', note: 'The organisation gifts the time. The platform supplies the structure. The leader going first gives everyone permission to be honest.' },
  { n: '06', name: 'Next month', title: 'The same questions, asked again.', body: 'The next check-in shows whether what you did moved anything. What went up, what stayed quiet. Then the month starts over, and the loop keeps a dated trail.', note: 'Twelve check-ins a year is twelve chances to notice early, instead of one photograph of last year.' }
];
export const ORG = { crumb: 'Organisation', name: 'Whole organisation', people: '1,240 people', part: 71, ful: 58, fulD: '↘ 1 vs August', cul: 55, culD: '→ same as August', pillars: [60, 52, 66, 58, 51], heard: 55, valued: 56, safe: 53 };
export const DEPTS = [
  { crumb: 'Operations', name: 'Operations', people: '560 people', part: 66, ful: 52, fulD: '↘ 3 vs August', cul: 56, culD: '→ same as August', pillars: [48, 50, 63, 55, 44], heard: 57, valued: 56, safe: 55, insight: 'Fulfilment is the issue here. Health and Flow are the two lowest pillars, and both are lowest on night shift. Culture is holding, so people will say why if asked.', action: 'Shift recovery review', actionMeta: 'SESSION · 20 MIN', actionWhy: 'The crew names what makes recovery between shifts hard. One roster change agreed by the end.',
    teams: [{ name: 'Night shift', people: '140 people', pillars: [42, 46, 60, 52, 38], c: [55, 54, 52] }, { name: 'Warehouse', people: '150 people', pillars: [45, 48, 62, 54, 41], c: [56, 55, 54] }, { name: 'Day shift', people: '180 people', pillars: [52, 52, 65, 57, 48], c: [58, 57, 56] }, { name: 'Logistics', people: '90 people', pillars: [58, 55, 67, 60, 55], c: [60, 59, 58] }] },
  { crumb: 'Field services', name: 'Field services', people: '226 people', part: 58, ful: 49, fulD: '↘ 4 vs August', cul: 57, culD: '↗ 1 vs August', pillars: [52, 43, 58, 47, 44], heard: 58, valued: 57, safe: 56, insight: 'The lowest fulfilment in the organisation, and falling. Internal Work and Social Connection have dropped on the remote crews. Culture is steady, so a session will get honest answers.', action: 'One thing lighter', actionMeta: 'SESSION · 20 MIN', actionWhy: 'Each person names one task that could stop. The leader removes one by next week.',
    teams: [{ name: 'North crew', people: '72 people', pillars: [49, 38, 55, 42, 40], c: [56, 55, 54] }, { name: 'South crew', people: '64 people', pillars: [51, 42, 57, 45, 43], c: [57, 56, 55] }, { name: 'Installations', people: '58 people', pillars: [54, 46, 60, 50, 46], c: [59, 58, 57] }, { name: 'Dispatch', people: '32 people', pillars: [58, 51, 63, 56, 52], c: [61, 60, 59] }] },
  { crumb: 'Customer success', name: 'Customer success', people: '210 people', part: 77, ful: 63, fulD: '↗ 1 vs August', cul: 63, culD: '↗ 2 vs August', pillars: [66, 58, 68, 63, 61], heard: 62, valued: 66, safe: 60, insight: 'Steady across all five pillars and all three culture questions. Internal Work is the one to watch on Support tier 1.', action: 'Gratitude round', actionMeta: 'SESSION · 15 MIN', actionWhy: 'Each person names one thing a colleague did this month that helped.',
    teams: [{ name: 'Support tier 1', people: '88 people', pillars: [62, 53, 66, 60, 56], c: [60, 63, 57] }, { name: 'Support tier 2', people: '54 people', pillars: [67, 59, 69, 64, 63], c: [63, 67, 61] }, { name: 'Onboarding', people: '40 people', pillars: [70, 62, 71, 67, 66], c: [65, 70, 64] }, { name: 'Account management', people: '28 people', pillars: [66, 58, 67, 63, 62], c: [62, 66, 60] }] },
  { crumb: 'Sales', name: 'Sales', people: '138 people', part: 69, ful: 64, fulD: '→ same as August', cul: 45, culD: '↘ 6 vs August', pillars: [68, 58, 63, 66, 61], heard: 48, valued: 44, safe: 42, insight: 'Fulfilment is fine. Culture is not: Valued and Safe to speak are both in the attention band, lowest on Enterprise. People are doing well and not saying what is wrong.', action: 'Listening round', actionMeta: 'SESSION · 20 MIN', actionWhy: 'The leader speaks last. Low stakes, no agenda, one thing changed by Friday.',
    teams: [{ name: 'Enterprise', people: '42 people', pillars: [70, 60, 64, 67, 60], c: [44, 38, 36] }, { name: 'Mid-market', people: '51 people', pillars: [68, 58, 63, 66, 61], c: [49, 45, 44] }, { name: 'Inside sales', people: '33 people', pillars: [66, 56, 62, 65, 60], c: [50, 46, 45] }, { name: 'Sales ops', people: '12 people', pillars: [67, 59, 65, 64, 64], c: [58, 57, 56] }] },
  { crumb: 'Engineering', name: 'Engineering', people: '64 people', part: 82, ful: 60, fulD: '↘ 1 vs August', cul: 62, culD: '→ same as August', pillars: [61, 54, 68, 58, 45], heard: 64, valued: 66, safe: 56, insight: 'Flow has slipped two months running. Culture is holding overall, but Safe to speak fell to 40 on the Platform team.', action: 'After-hours audit', actionMeta: 'SESSION · 20 MIN', actionWhy: 'One question, everyone answers: what follows you home? One rule agreed by the end.',
    teams: [{ name: 'Platform team', people: '14 people', pillars: [61, 54, 68, 58, 49], c: [55, 62, 40] }, { name: 'Product engineering', people: '26 people', pillars: [60, 53, 68, 58, 42], c: [66, 68, 62] }, { name: 'Data', people: '13 people', pillars: [63, 56, 69, 59, 44], c: [68, 67, 63] }, { name: 'QA', people: '11 people', pillars: [62, 55, 67, 58, 47], c: [65, 66, 60] }] },
  { crumb: 'Finance', name: 'Finance', people: '38 people', part: 84, ful: 68, fulD: '↗ 2 vs August', cul: 70, culD: '↗ 1 vs August', pillars: [72, 61, 70, 66, 71], heard: 70, valued: 72, safe: 68, insight: 'Thriving on three pillars and on all three culture questions. Nothing to fix this month.', action: 'Share what works', actionMeta: 'SESSION · 15 MIN', actionWhy: 'Keep the rhythm, and pass one practice that is working to another team.',
    teams: [{ name: 'FP&A', people: '12 people', pillars: [73, 62, 71, 67, 72], c: [71, 73, 69] }, { name: 'Accounts', people: '13 people', pillars: [71, 60, 70, 65, 70], c: [69, 71, 67] }, { name: 'Payroll', people: '9 people', pillars: [72, 61, 69, 66, 71], c: [70, 72, 68] }, { name: 'Procurement', people: '4 people', withheld: true }] },
  { crumb: 'Legal', name: 'Legal', people: '4 people', withheld: true }
];
export const band = v => v >= 70 ? { bg: 'rgba(217,234,110,.16)', fg: '#E4F290' } : v >= 55 ? { bg: 'rgba(244,242,230,.035)', fg: '#F4F2E6' } : v >= 46 ? { bg: 'rgba(230,199,126,.16)', fg: '#EFDCAE' } : { bg: 'rgba(231,142,113,.18)', fg: '#EFB39B' };
export const cells = a => a.map(v => ({ v, ...band(v) }));
export const LOOP = [
  { label: 'LISTEN', title: 'Every month, everyone is asked.', body: 'Twenty questions across five pillars, three on culture. The same instrument for every team, so movement means something.', emp: 'Checks in privately. Keeps a check-in streak.', lead: 'Sees participation. Low participation is itself a signal.' },
  { label: 'IDENTIFY', title: 'The lowest pillar names itself.', body: 'For each group of five or more: the lowest pillar, the biggest drop, the quietest culture question.', emp: 'The mirror names one thing worth noticing.', lead: 'The dashboard names one thing worth acting on.' },
  { label: 'UNDERSTAND', title: 'Culture says whether people will tell you.', body: 'Heard, valued, safe to speak. When the culture ring is strong, a session gets honest answers. When it is weak, start there.', emp: 'Sees exactly what the leader sees. Nothing more, nothing less.', lead: 'Reads the ring before the pillars.' },
  { label: 'ACT', title: 'A session from the library, ready to run.', body: 'Stop for Wellness: twenty minutes, one question everyone answers, one commitment. Built on the team’s own lowest pillar.', emp: 'Takes one small step: a habit, an action or a growth journey.', lead: 'Runs the session and logs an action. Builds a leader streak.' },
  { label: 'SUPPORT', title: 'The app carries the month.', body: 'Habits, voice reflections and growth journeys keep the thread between check-ins. Nothing is required, so what happens is real.', emp: 'Growth momentum. Private, and reset each month.', lead: 'Nothing to do. The organisation has gifted the time.' },
  { label: 'MEASURE', title: 'Next month says whether it worked.', body: 'The same twenty questions, asked again. Every action is dated against the signal it answered.', emp: 'Watches their own score move.', lead: 'Watches the team’s number move, or not.' },
  { label: 'REVIEW', title: 'Did it move?', body: 'What went up, what went down, what stayed quiet. The dated trail is the evidence a regulator asks for.', emp: 'The mirror closes the loop on last month’s step.', lead: 'The dashboard closes the loop on last month’s action.' },
  { label: 'REPEAT', title: 'Both streaks continue.', body: 'A rhythm, not a programme. Twelve check-ins a year is twelve chances to notice early, instead of one photograph of last year.', emp: 'Twelve mirrors a year.', lead: 'Twelve sessions, twelve actions, twelve measurements.' }
];
export const HAZARDS = [
  { name: 'Job demands', desc: 'Workload, pace, hours or emotional load that is too high, or too low, for too long.', yn: 0, control: 'Roster review: cap back-to-back night shifts at four', owner: 'Site manager' },
  { name: 'Low job control', desc: 'Little say over how or when the work gets done.', yn: 0, control: 'Crew input on task sequencing at pre-start', owner: 'Superintendent' },
  { name: 'Poor support', desc: 'Not enough help, tools or backing from supervisors and colleagues.', yn: 0, control: 'Supervisor check-in cadence, weekly', owner: 'Supervisor' },
  { name: 'Role clarity', desc: 'Unclear, conflicting or shifting expectations about the job.', yn: 0, control: 'Refresh role cards for each crew', owner: 'HR business partner' },
  { name: 'Change management', desc: 'Change that is poorly explained, consulted on or paced.', yn: 0, control: 'Explain-and-ask briefing before every roster change', owner: 'Ops manager' },
  { name: 'Organisational justice', desc: 'Decisions, rules or processes that feel unfair or inconsistent.', yn: 0, control: 'Publish the overtime allocation rule', owner: 'Ops manager' },
  { name: 'Conflict', desc: 'Poor working relationships and disagreements that stay unresolved.', yn: 0, control: 'Facilitated crew reset session', owner: 'HR business partner' },
  { name: 'Bullying', desc: 'Repeated, unreasonable behaviour directed at a worker or group.', yn: 1, control: 'Confidential report route promoted at pre-start', owner: 'WHS lead' },
  { name: 'Harassment', desc: 'Unwelcome conduct, including sexual or gender-based harassment.', yn: 1, control: 'Respect at work refresher', owner: 'WHS lead' },
  { name: 'Violence, aggression', desc: 'Being threatened, abused or assaulted at work, by anyone.', yn: 1, control: 'Incident de-brief protocol', owner: 'WHS lead' },
  { name: 'Traumatic events', desc: 'Exposure to incidents, injuries or distressing situations at work.', yn: 1, control: 'Post-incident support within 48 hours', owner: 'WHS lead' },
  { name: 'Remote, isolated work', desc: 'Working away from others, with limited access to help.', yn: 0, control: 'Camp connection calls and rostered contact', owner: 'Camp manager' },
  { name: 'Physical environment', desc: 'Heat, noise, fatigue or conditions that add strain.', yn: 0, control: 'Heat and fatigue controls review', owner: 'WHS lead' },
  { name: 'Reward, recognition', desc: 'Effort that goes unnoticed or unrewarded.', yn: 0, monthly: 1, control: 'Recognition at every crew pre-start', owner: 'Supervisor' }
];
export const SITES = [
  { name: 'All sites', people: 1860, ful: 61, fulD: -2, v: [31, 22, 17, 12, 28, 14, 16, 6, 3, 2, 7, 21, 24, 19], d: [4, -1, 0, -2, 6, 0, 1, 1, 0, 0, -1, 2, 3, -1] },
  { name: 'Kestrel Ridge', people: 640, ful: 54, fulD: -6, v: [42, 26, 24, 14, 33, 18, 21, 11, 4, 3, 9, 29, 34, 23], d: [9, 2, 3, 0, 8, 1, 3, 4, 1, 0, 1, 4, 6, 1] },
  { name: 'Port Aldine', people: 720, ful: 63, fulD: 1, v: [27, 20, 14, 11, 26, 12, 13, 4, 2, 1, 6, 12, 18, 17], d: [1, -2, -1, -3, 5, -1, 0, 0, 0, 0, -1, 0, 1, -2] },
  { name: 'Mill Creek', people: 500, ful: 65, fulD: 0, v: [22, 19, 12, 10, 24, 11, 14, 3, 2, 1, 5, 24, 20, 16], d: [-3, -1, -2, -2, 4, 0, 0, -1, 0, 0, -2, 1, 0, -1] }
];
export const INDUSTRIES = { all: { turnover: 13.5, absence: 9, salary: 100000 }, hospitality: { turnover: 21, absence: 11.9, salary: 70000 }, retail: { turnover: 19, absence: 10, salary: 65000 }, health: { turnover: 16, absence: 11, salary: 90000 }, professional: { turnover: 14, absence: 8, salary: 120000 }, tech: { turnover: 13, absence: 7, salary: 130000 }, finance: { turnover: 12, absence: 8, salary: 130000 }, construction: { turnover: 21, absence: 9, salary: 110000 }, manufacturing: { turnover: 15, absence: 11, salary: 85000 }, public: { turnover: 12, absence: 11.4, salary: 100000 }, education: { turnover: 12, absence: 10, salary: 95000 } };
export const ANGLES = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180);
export const poly = (vals, cx, cy, R) => vals.map((v, i) => (cx + R * v / 100 * Math.cos(ANGLES[i])).toFixed(1) + ',' + (cy + R * v / 100 * Math.sin(ANGLES[i])).toFixed(1)).join(' ');
export const num = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };
export const fmtTime = t => '0:' + String(Math.floor(t)).padStart(2, '0');
export const FILM_LEN = 36;
export const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [200 + r * Math.cos(a), 200 + r * Math.sin(a)]; };

export const STORIES = [
  { label: 'Fulfilment slips', lede: 'Operations is tired. Culture is holding, so people will say why if asked.', orgF: 59, orgFd: -2, orgC: 69, orgCd: 0, fS: [61, 62, 62, 61, 61, 59], cS: [68, 69, 70, 69, 69, 69],
    focusName: 'Operations', focusScore: 52, focusDelta: '↓ 6 since Sep', focusPeople: 33, focusText: 'Fulfilment 52, down 6. Work & Life Flow 44 and Health 47 are the lowest. Culture is holding, so people will say why.', runTitle: 'Shift recovery review', runMeta: 'Operations · session 1 of 3 · Thu 16 Oct',
    rows: [
      { name: 'Engineering', f: 62, fd: -1, p: [64, 58, 66, 57, 63], pd: [0, -1, 1, -2, 0], c: 67, cd: 0, q: [69, 67, 64], qd: [0, -1, -1] },
      { name: 'Operations', f: 52, fd: -6, p: [47, 51, 60, 56, 44], pd: [-5, -3, -1, -2, -9], c: 70, cd: 1, q: [72, 71, 68], qd: [1, 2, 0], look: true },
      { name: 'Customer Success', f: 63, fd: 1, p: [65, 60, 66, 63, 61], pd: [1, 0, 1, 2, 0], c: 66, cd: -1, q: [68, 66, 63], qd: [-1, -1, -2] },
      { name: 'Product', f: 66, fd: 2, p: [69, 64, 68, 64, 66], pd: [2, 1, 3, 1, 2], c: 73, cd: 1, q: [75, 73, 71], qd: [1, 2, 0] },
      { name: 'Sales', f: 64, fd: 0, p: [67, 59, 64, 66, 62], pd: [0, -1, 0, 1, -1], c: 66, cd: -1, q: [68, 67, 62], qd: [0, -1, -2] },
      { name: 'Design', f: 69, fd: 3, p: [72, 66, 71, 68, 68], pd: [4, 3, 5, 2, 5], c: 77, cd: 2, q: [79, 78, 74], qd: [3, 2, 4] },
      { name: 'Marketing', f: 63, fd: 0, p: [66, 60, 65, 62, 64], pd: [1, -1, 0, 2, -1], c: 70, cd: 1, q: [72, 71, 68], qd: [2, 1, 0] },
      { name: 'Leadership', f: 71, fd: 1, p: [73, 69, 74, 68, 72], pd: [2, 1, 3, 0, 1], c: 79, cd: 0, q: [81, 80, 76], qd: [1, 0, 0] },
    ] },
  { label: 'Culture slips', lede: 'Sales looks fine on paper. Nobody there feels safe saying what is wrong.', orgF: 63, orgFd: 1, orgC: 64, orgCd: -4, fS: [60, 61, 61, 62, 62, 63], cS: [69, 69, 70, 69, 68, 64],
    focusName: 'Sales', focusScore: 54, focusDelta: '↓ 7 since Sep', focusPeople: 19, focusText: 'Culture 54, down 7. Fulfilment is fine. Feeling safe is 46: people are doing well and not saying what is wrong.', runTitle: 'Listening round', runMeta: 'Sales · session 1 of 2 · Tue 21 Oct',
    rows: [
      { name: 'Engineering', f: 62, fd: 0, p: [64, 58, 66, 57, 63], pd: [0, -1, 1, 0, 0], c: 66, cd: -1, q: [68, 66, 63], qd: [-1, -1, -2] },
      { name: 'Operations', f: 61, fd: 1, p: [60, 58, 64, 60, 58], pd: [2, 1, 0, 1, 3], c: 69, cd: 0, q: [71, 70, 67], qd: [0, 1, -1] },
      { name: 'Customer Success', f: 63, fd: 1, p: [65, 60, 66, 63, 61], pd: [1, 0, 1, 2, 0], c: 65, cd: -2, q: [67, 65, 62], qd: [-2, -2, -3] },
      { name: 'Product', f: 66, fd: 2, p: [69, 64, 68, 64, 66], pd: [2, 1, 3, 1, 2], c: 72, cd: 0, q: [74, 72, 70], qd: [0, 1, -1] },
      { name: 'Sales', f: 66, fd: 0, p: [68, 60, 65, 67, 61], pd: [0, 1, 0, 1, -1], c: 54, cd: -7, q: [58, 52, 46], qd: [-4, -7, -9], look: true },
      { name: 'Design', f: 69, fd: 3, p: [72, 66, 71, 68, 68], pd: [4, 3, 5, 2, 5], c: 76, cd: 1, q: [78, 77, 73], qd: [2, 1, 1] },
      { name: 'Marketing', f: 63, fd: 0, p: [66, 60, 65, 62, 64], pd: [1, -1, 0, 2, -1], c: 69, cd: 0, q: [71, 70, 67], qd: [1, 0, -1] },
      { name: 'Leadership', f: 71, fd: 1, p: [73, 69, 74, 68, 72], pd: [2, 1, 3, 0, 1], c: 78, cd: -1, q: [80, 79, 75], qd: [0, -1, -1] },
    ] },
];
export const SHOTS = [['home', 'Home'], ['checkin', 'Check-in'], ['mirror', 'The mirror'], ['reflect', 'Reflect'], ['grow', 'Grow'], ['habits', 'Habits'], ['journey', 'Journeys'], ['gratitude', 'Gratitude'], ['reset', 'Reset']];
export const FEAT_PEOPLE = [
  { title: 'Check-in', line: 'Twenty questions, once a month. The score is theirs.', shot: 'checkin', d1: 'M4 4h16v16H4z', d2: 'M8 12.5 L11 15.5 L16.5 9.5' },
  { title: 'Reflect', line: 'Say it or type it. Only they ever hear it.', shot: 'reflect', d1: 'M9 3.5h6v11H9z', d2: 'M5.5 11.5 A6.5 6.5 0 0 0 18.5 11.5 M12 18 V21' },
  { title: 'Grow', line: 'Habits, journeys, growth work. A tree that grows with each one.', shot: 'grow', d1: 'M5 19 C5 11 10 6 19 5 C18 14 13 19 5 19 Z', d2: 'M5 19 C9 14 12 11 16 8' },
  { title: 'Gratitude', line: 'Three things, once a day.', shot: 'gratitude', d1: 'M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z', d2: '' },
  { title: 'Reset', line: 'Tools for the next few minutes, picked by how they feel.', shot: 'reset', d1: 'M12 4 A8 8 0 1 1 11.9 4', d2: 'M12 8.5 A3.5 3.5 0 1 1 11.9 8.5' },
];
export const FEAT_YOU = [
  { title: 'Fulfilment and Culture', line: 'Two numbers for the organisation, with six months behind them. Every one comes from the app.', d1: 'M4 17 L9 11 L13 14.5 L20 6', d2: 'M15 6 L20 6 L20 11' },
  { title: 'By department', line: 'Every group of five or more, nothing smaller, with the five pillars and three culture questions behind each.', d1: 'M4 5h16M4 12h16M4 19h16', d2: 'M9 5v14' },
  { title: 'Focus area', line: 'The one department to look at this month, named once, with the reason: which pillar dropped, and by how much.', d1: 'M12 3 A9 9 0 1 1 11.9 3', d2: 'M12 8.5 A3.5 3.5 0 1 1 11.9 8.5' },
  { title: 'Growth work', line: 'Sessions from the library you can run this week, each logged against the signal it answers, so next month shows what moved.', d1: 'M4 13 L9 18 L20 6', d2: '' },
];
export const tintCell = s => s >= 70 ? { bg: 'rgba(217,234,110,.42)', fg: '#F2FBB8', label: 'Thriving' } : s >= 55 ? { bg: 'rgba(228,240,214,.12)', fg: '#F4F2E6', label: 'Steady' } : s >= 46 ? { bg: 'rgba(230,199,126,.4)', fg: '#F8E9C9', label: 'Needs care' } : { bg: 'rgba(231,142,113,.48)', fg: '#FBDFD0', label: 'Attention' };
export const dCell = (v, d) => { const t = tintCell(v), steady = v >= 55 && v < 70; return { v, a: Math.abs(d) >= 2 ? (d > 0 ? '↑' : '↓') : '', bg: t.bg, fg: t.fg, dot: steady ? 'transparent' : t.bg, ink: steady ? 'rgba(244,242,230,.62)' : t.fg }; };
export const sparkPts = (vals, w, hgt, lo = 50, hi = 80) => vals.map((v, i) => ((i / (vals.length - 1)) * w).toFixed(1) + ',' + (hgt - ((v - lo) / (hi - lo)) * hgt).toFixed(1)).join(' ');
export const sparkLast = (vals, hgt, lo = 50, hi = 80) => (hgt - ((vals[vals.length - 1] - lo) / (hi - lo)) * hgt).toFixed(1);
export const deltaText = d => ({ text: d > 0 ? '↑ ' + d + ' since Sep' : d < 0 ? '↓ ' + Math.abs(d) + ' since Sep' : '· same as Sep', color: d > 0 ? '#E4F290' : d < 0 ? '#EFB39B' : 'rgba(201,212,194,.6)' });
export const PILLAR_HEADS = [
  { short: 'Health', tint: 'rgba(159,214,171,.14)', fg: '#A9DDB4', disc: '52% 48% 50% 50% / 50% 54% 46% 50%', d1: 'M3 12 H8 L10.5 7 L13.5 16 L15.5 12 H21', d2: '', r1: 0, r2: 0 },
  { short: 'Internal', tint: 'rgba(185,178,232,.14)', fg: '#C4BEEE', disc: '48% 52% 50% 50% / 54% 50% 50% 46%', d1: 'M12 3.5 C14.8 7 17 9.2 17 12.6 A5 5 0 0 1 7 12.6 C7 10.8 7.8 9.3 9 7.8 C9.6 9 10.4 9.8 11.2 10.2 C10.9 8 11.2 5.8 12 3.5 Z', d2: '', r1: 0, r2: 0 },
  { short: 'Love', tint: 'rgba(235,175,166,.14)', fg: '#F0BDB5', disc: '50% 50% 48% 52% / 46% 50% 54% 50%', d1: 'M12 19 C7 15 4.5 12.4 4.5 9.4 C4.5 7 6.3 5.2 8.6 5.2 C10 5.2 11.3 6 12 7.2 C12.7 6 14 5.2 15.4 5.2 C17.7 5.2 19.5 7 19.5 9.4 C19.5 12.4 17 15 12 19 Z', d2: '', r1: 0, r2: 0 },
  { short: 'Social', tint: 'rgba(239,209,154,.14)', fg: '#F2DAAC', disc: '50% 46% 54% 50% / 52% 50% 48% 50%', d1: 'M3.4 19.4 C3.4 15.8 5.9 14.1 9 14.1 C12.1 14.1 14.6 15.8 14.6 19.4', d2: 'M16.4 15.4 C18.9 15.7 20.6 17.2 20.6 19.4', r1: 3.2, r2: 2.6 },
  { short: 'Flow', tint: 'rgba(156,207,221,.14)', fg: '#AAD7E3', disc: '54% 50% 46% 50% / 50% 48% 52% 50%', d1: 'M3 9 C6 6.5 9 6.5 12 9 C15 11.5 18 11.5 21 9', d2: 'M3 15 C6 12.5 9 12.5 12 15 C15 17.5 18 17.5 21 15', r1: 0, r2: 0 },
];
export const CULTURE_HEADS = [
  { short: 'Heard', disc: '52% 48% 50% 50% / 50% 54% 46% 50%', d1: 'M7 9.2a5.4 5.4 0 0 1 10.8 0c0 3.1-2.3 4.2-3.1 6.2-.6 1.6-.9 4.1-3.5 4.1-1.4 0-2.4-.8-2.9-2', d2: 'M10.4 9.6a2.2 2.2 0 0 1 4.4 0c0 1.4-1 1.9-1.6 2.9' },
  { short: 'Valued', disc: '48% 52% 50% 50% / 54% 50% 50% 46%', d1: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8z', d2: '' },
  { short: 'Safe', disc: '50% 50% 48% 52% / 46% 50% 54% 50%', d1: 'M12 3.5l7 3v5.5c0 4.5-3 7.6-7 8.5-4-.9-7-4-7-8.5V6.5z', d2: 'M9 12l2 2 4-4' },
];
export const LEGEND = [{ bg: 'rgba(217,234,110,.42)', label: '70 and over' }, { bg: 'rgba(228,240,214,.12)', label: '55–69 steady' }, { bg: 'rgba(230,199,126,.4)', label: '46–54 needs care' }, { bg: 'rgba(231,142,113,.48)', label: '45 and under' }];
export const SHAPES = ['22px 14px 20px 12px / 14px 20px 12px 22px', '12px 22px 14px 20px / 20px 12px 22px 14px', '18px 12px 22px 16px / 12px 22px 14px 20px', '20px 18px 12px 22px / 16px 12px 22px 14px'];

export class HomeBase extends React.Component {
  state = { side: 'people', shot: 'home', story: 0, youPick: 0, pillar: 4, step: 0, drill: 0, dept: 4, loop: 3, site: 1, hazard: 0, ratesOpen: false, filmPlaying: false, headcount: '500', industry: 'all', rates: { turnover: '13.5', absence: '9', salary: '100000', replace: '0.5', pres: '10.8', moved: '10' }, email: '', sent: false, sending: false, formError: '' };
  filmCanvasRef = React.createRef(); filmSeekRef = React.createRef(); filmTimeRef = React.createRef(); dashRef = React.createRef();
  t = 0; prev = 0; raf = 0; playing = false; tries = 0;
  pickPillar = PILLARS.map((_, i) => () => this.setState({ pillar: i }));
  pickPeople = () => this.setState({ side: 'people' }); pickYou = () => this.setState({ side: 'you' });
  pickShot = Object.fromEntries(SHOTS.map(([k]) => [k, () => this.setState({ side: 'people', shot: k })]));
  pickYouFeat = FEAT_YOU.map((_, i) => () => this.setState({ youPick: i }));
  pickStory = STORIES.map((_, i) => () => this.setState({ story: i }));
  pickStep = STEPS.map((_, i) => () => this.setState({ step: i }));
  pickLevel = [0, 1].map(i => () => this.setState({ drill: i }));
  pickDept = DEPTS.map((_, i) => () => this.setState({ drill: 1, dept: i }));
  pickLoop = LOOP.map((_, i) => () => this.setState({ loop: i }));
  pickSite = SITES.map((_, i) => () => this.setState({ site: i }));
  pickHazard = HAZARDS.map((_, i) => () => this.setState({ hazard: i }));
  toggleRates = () => this.setState(s => ({ ratesOpen: !s.ratesOpen }));
  setHeadcount = e => this.setState({ headcount: e.target.value });
  setIndustry = e => { const k = e.target.value, p = INDUSTRIES[k] || INDUSTRIES.all; this.setState(s => ({ industry: k, rates: { ...s.rates, turnover: String(p.turnover), absence: String(p.absence), salary: String(p.salary) } })); };
  rate = k => e => { const v = e.target.value; this.setState(s => ({ rates: { ...s.rates, [k]: v } })); };
  setTurnover = this.rate('turnover'); setAbsence = this.rate('absence'); setSalary = this.rate('salary'); setReplace = this.rate('replace'); setPres = this.rate('pres'); setMoved = this.rate('moved');
  setEmail = e => this.setState({ email: e.target.value });
  sendEmail = async () => {
    const email = this.state.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.setState({ formError: 'Please enter a valid email address.' }); return; }
    this.setState({ sending: true, formError: '' });
    try {
      const res = await fetch('https://formsubmit.co/ajax/ian@artistry-of-humanity.com', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email, _cc: 'hendryk@artistry-of-humanity.com', _subject: 'nørma early access request', _template: 'table', _captcha: 'false', source: location.href }) });
      if (!res.ok) throw new Error(res.status);
      this.setState({ sent: true, sending: false });
    } catch (e) { this.setState({ sending: false, formError: 'That did not go through. Please try again, or email ian@artistry-of-humanity.com.' }); }
  };
  toggleFilm = () => { this.playing ? this.pauseFilm() : this.playFilm(); };
  seekFilm = e => { this.t = Math.min(FILM_LEN, Math.max(0, +e.target.value)); this.drawFilm(); };
  fitDash() {
    const el = this.dashRef.current; if (!el) return;
    const fit = () => { const inner = el.firstElementChild && el.firstElementChild.nextElementSibling ? el.firstElementChild.nextElementSibling.firstElementChild : null; const w = el.clientWidth - 2; if (w <= 0) return; const z = Math.min(1, w / 1000); if (inner) { inner.style.zoom = String(z); } };
    fit();
    if (this.dashRO) this.dashRO.disconnect();
    if ('ResizeObserver' in window) { this.dashRO = new ResizeObserver(fit); this.dashRO.observe(el); }
  }
  bootFilm() {
    if (!window.Ch00Film || !this.filmCanvasRef.current) { if (this.tries++ < 150) this.filmTimer = setTimeout(() => this.bootFilm(), 200); return; }
    this.film = window.Ch00Film; this.drawFilm();
    const c = this.filmCanvasRef.current;
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { if (this.props.filmAutoplay ?? true) this.playFilm(); } else this.pauseFilm(); }), { threshold: .3 });
      this.io.observe(c);
    }
  }
  drawFilm() {
    const c = this.filmCanvasRef.current; if (!c || !this.film) return;
    try { this.film.render(c, this.t, { captions: true }); } catch (e) { }
    if (this.filmSeekRef.current) this.filmSeekRef.current.value = String(this.t);
    if (this.filmTimeRef.current) this.filmTimeRef.current.textContent = fmtTime(this.t) + ' / 0:36';
  }
  tick = now => { if (!this.playing) return; const dt = Math.min(.1, (now - this.prev) / 1000); this.prev = now; this.t += dt; if (this.t >= FILM_LEN + 1.2) this.t = 0; this.drawFilm(); this.raf = requestAnimationFrame(this.tick); };
  playFilm = () => { if (this.playing || !this.film) return; this.playing = true; this.prev = performance.now(); this.raf = requestAnimationFrame(this.tick); this.setState({ filmPlaying: true }); };
  pauseFilm = () => { if (!this.playing) return; this.playing = false; cancelAnimationFrame(this.raf); this.setState({ filmPlaying: false }); };

  renderVals() {
    const s = this.state, cur = this.props.currency ?? 'A$';
    const money = v => { if (!Number.isFinite(v)) return cur + '0'; if (v >= 1e6) return cur + (v / 1e6).toFixed(1) + 'M'; if (v >= 1e4) return cur + Math.round(v / 1e3) + 'k'; return cur + Math.round(v).toLocaleString('en-AU'); };
    const p = PILLARS[s.pillar];
    const pillar = { ...p, index: String(s.pillar + 1).padStart(2, '0') };
    const verts = PILLARS.map((_, i) => { const on = i === s.pillar; return { pick: this.pickPillar[i], bg: on ? 'rgba(217,234,110,.16)' : 'rgba(13,24,17,.92)', bc: on ? 'rgba(217,234,110,.65)' : 'rgba(228,240,214,.16)', color: on ? '#EAF79B' : 'rgba(244,242,230,.85)' }; });
    const sample = [67, 50, 75, 67, 59];
    const radar = { points: poly(sample, 200, 200, 150), sx: (200 + 150 * sample[s.pillar] / 100 * Math.cos(ANGLES[s.pillar])).toFixed(1), sy: (200 + 150 * sample[s.pillar] / 100 * Math.sin(ANGLES[s.pillar])).toFixed(1) };
    const steps = STEPS.map((st, i) => { const on = i === s.step; return { n: st.n, name: st.name, pick: this.pickStep[i], bg: on ? 'rgba(217,234,110,.12)' : 'transparent', bc: on ? 'rgba(217,234,110,.5)' : 'rgba(228,240,214,.14)', color: on ? '#EAF79B' : 'rgba(244,242,230,.85)', num: on ? '#D9EA6E' : 'rgba(201,212,194,.78)' }; });
    const step = { ...STEPS[s.step], nameUpper: STEPS[s.step].name.toUpperCase() };
    const D = DEPTS[s.dept], isOrg = s.drill === 0, L = isOrg ? ORG : D, minV = Math.min(...L.pillars);
    const bars = L.pillars.map((v, i) => ({ name: PILLARS[i].short, v, pct: v, fill: v === minV ? 'linear-gradient(90deg,#C9A45F,#E6C77E)' : 'rgba(244,242,230,.32)', color: v === minV ? '#EFDCAE' : 'rgba(244,242,230,.85)' }));
    const drill = { ...L, points: poly(L.pillars, 75, 75, 50), dash: (L.cul / 100 * 389.6).toFixed(1), ringColor: L.cul >= 60 ? '#6EC585' : L.cul >= 50 ? '#E6C77E' : '#E78E71', culColor: L.cul >= 60 ? '#F6F4E9' : L.cul >= 50 ? '#EFDCAE' : '#F0C9AE', safeColor: L.safe < 50 ? '#EFB39B' : 'rgba(244,242,230,.85)', safeFill: L.safe < 50 ? 'linear-gradient(90deg,#C97C5F,#E78E71)' : 'rgba(244,242,230,.32)' };
    const rows = isOrg ? DEPTS.map((d, i) => ({ ...d, c: [d.heard, d.valued, d.safe], pick: this.pickDept[i], click: true })) : D.teams;
    const heat = rows.map(d => ({ name: d.name, people: d.people, withheld: !!d.withheld, open: !d.withheld && !!d.click, leaf: !d.withheld && !d.click, pick: d.pick, p: d.withheld ? [] : cells(d.pillars), c: d.withheld ? [] : cells(d.c) }));
    const heatTitle = isOrg ? 'DEPARTMENTS · CLICK ONE TO OPEN IT' : 'TEAMS IN ' + D.name.toUpperCase(), heatCol = isOrg ? 'DEPARTMENT' : 'TEAM';
    const levels = ['Organisation', D.crumb].map((name, i) => { const on = i === s.drill; return { name, pick: this.pickLevel[i], bg: on ? 'rgba(217,234,110,.12)' : 'transparent', bc: on ? 'rgba(217,234,110,.4)' : 'rgba(228,240,214,.1)', color: on ? '#EAF79B' : 'rgba(244,242,230,.8)' }; });
    const li = s.loop, endDeg = li * 45, R = 140;
    const [ex, ey] = pt(endDeg === 0 ? .01 : endDeg, R);
    const arc = 'M200,60 A140,140 0 ' + (endDeg > 180 ? 1 : 0) + ',1 ' + ex.toFixed(1) + ',' + ey.toFixed(1);
    const nodes = LOOP.map((n, i) => { const [x, y] = pt(i * 45, R); const on = i === li, done = i < li; return { label: n.label, pick: this.pickLoop[i], x: (x / 4).toFixed(2), y: (y / 4).toFixed(2), bg: on ? 'rgba(217,234,110,.16)' : 'rgba(13,24,17,.95)', bc: on ? 'rgba(217,234,110,.7)' : done ? 'rgba(217,234,110,.35)' : 'rgba(228,240,214,.16)', color: on ? '#EAF79B' : 'rgba(244,242,230,.85)', dot: on || done ? '#D9EA6E' : 'rgba(228,240,214,.3)' }; });
    const loop = { ...LOOP[li], n: String(li + 1).padStart(2, '0'), arc, nodes };
    const hc = Math.max(0, num(s.headcount, 0)), r = s.rates;
    const turnover = num(r.turnover, 0) / 100, absence = num(r.absence, 0), salary = num(r.salary, 0), replace = num(r.replace, 0), pres = num(r.pres, 0) / 100, moved = 0.10;
    const leavers = hc * turnover, turnoverCost = leavers * salary * replace, absDays = hc * absence, absenceCost = absDays * salary * 1.2 / 230, presCost = hc * salary * pres, total = turnoverCost + absenceCost + presCost;
    const people = v => v >= 1 || v === 0 ? Math.round(v).toLocaleString('en-AU') : '<1';
    const est = { leavers: Math.round(leavers).toLocaleString('en-AU'), replaceLabel: replace + '× salary', turnover: money(turnoverCost), absDays: Math.round(absDays).toLocaleString('en-AU'), absence: money(absenceCost), pres: money(presCost), total: money(total), dis: people(hc * .47), toward: people(hc * .17), burn: people(hc * .086), crisis: people(hc * .006), moved: money(total * moved), stay: people(leavers * moved), daysBack: Math.round(absDays * moved).toLocaleString('en-AU'), back: people(hc * .17 * moved) };
    const S = SITES[s.site], RAG = { red: ['#E78E71', 'rgba(231,142,113,.10)', 'rgba(231,142,113,.4)', '#F0B8A2', 'Red'], amber: ['#E6C77E', 'rgba(230,199,126,.07)', 'rgba(230,199,126,.28)', '#EFDCAE', 'Amber'], green: ['#6EC585', 'rgba(228,240,214,.035)', 'rgba(228,240,214,.10)', '#F4F2E6', 'Green'] };
    const rag = (i, v) => { const [a, b] = HAZARDS[i].yn ? [5, 10] : [15, 30]; return v >= b ? 'red' : v >= a ? 'amber' : 'green'; };
    const fmtD = d => d > 0 ? '↑ ' + d : d < 0 ? '↓ ' + (-d) : '→ 0';
    const tiles = HAZARDS.map((hz, i) => { const v = S.v[i], k = rag(i, v), c = RAG[k], on = i === s.hazard; return { name: hz.name, pct: v, delta: fmtD(S.d[i]), dColor: S.d[i] > 0 ? '#EFB39B' : S.d[i] < 0 ? '#9FD6AB' : 'rgba(201,212,194,.7)', dot: c[0], numColor: c[3], bg: on ? 'rgba(217,234,110,.10)' : c[1], bc: on ? 'rgba(217,234,110,.6)' : c[2], pick: this.pickHazard[i] }; });
    const hi = s.hazard, hz = HAZARDS[hi], hv = S.v[hi], hk = rag(hi, hv), hc2 = RAG[hk];
    const lot = Math.round(28 + hv * .4), quite = Math.round(36 - hv * .1), little = 100 - lot - quite;
    const falling = S.fulD < 0;
    const sel = { name: hz.name, desc: hz.desc, pct: hv, delta: fmtD(S.d[hi]), status: hk === 'red' && falling ? 'Red · harm' : hc2[4], numColor: hc2[3], bc: hc2[2], chipBg: hc2[1], cadence: hz.monthly ? 'FROM THE MONTHLY CHECK-IN' : hz.yn ? 'WORK CHECK · YES OR NO' : 'WORK CHECK · HOW OFTEN', little, quite, lot,
      respLabel: hk === 'red' ? 'RESPONSE · REQUIRED FOR EVERY RED' : hk === 'amber' ? 'SUGGESTED PLAYBOOK' : 'NO ACTION NEEDED', control: hk === 'green' ? 'Holding. Watch next quarter.' : hz.control, owner: hk === 'green' ? 'No owner' : 'Owner · ' + hz.owner, due: hk === 'red' ? 'Due 14 Nov · review Q4' : hk === 'amber' ? 'Optional · review Q4' : 'Review Q4' };
    const harm = hk === 'red' && falling;
    const wc = { people: S.people.toLocaleString('en-AU'), tiles, sel, ful: S.ful, harmBg: harm ? 'rgba(231,142,113,.08)' : 'rgba(228,240,214,.04)', harmBc: harm ? 'rgba(231,142,113,.3)' : 'rgba(228,240,214,.10)', harmColor: harm ? '#F0B8A2' : '#F6F4E9',
      harmText: harm ? 'Fulfilment ' + fmtD(S.fulD) + ' this quarter. Harm, not just a busy quarter: flagged first.' : 'Fulfilment ' + fmtD(S.fulD) + ' this quarter. People are coping; keep watching.',
      sites: SITES.map((st, i) => { const on = i === s.site; return { name: st.name, pick: this.pickSite[i], bg: on ? 'rgba(217,234,110,.12)' : 'transparent', bc: on ? 'rgba(217,234,110,.45)' : 'rgba(228,240,214,.12)', color: on ? '#EAF79B' : 'rgba(244,242,230,.8)' }; }) };
    const ST = STORIES[s.story];
    const fdl = deltaText(ST.orgFd), cdl = deltaText(ST.orgCd);
    const DB = { lede: ST.lede, orgF: ST.orgF, orgC: ST.orgC, orgFdText: fdl.text, orgFdColor: fdl.color, orgCdText: cdl.text, orgCdColor: cdl.color, orgFBand: tintCell(ST.orgF), orgCBand: tintCell(ST.orgC),
      orgSpark: sparkPts(ST.fS, 400, 50), orgSparkLastY: sparkLast(ST.fS, 50), orgCSpark: sparkPts(ST.cS, 400, 50), orgCSparkLastY: sparkLast(ST.cS, 50),
      focusName: ST.focusName, focusText: ST.focusText, runTitle: ST.runTitle, runMeta: ST.runMeta, focusUpper: ST.focusName.toUpperCase(), focusScore: ST.focusScore, focusDelta: ST.focusDelta, focusBand: tintCell(ST.focusScore),
      orgSpark60: sparkPts(ST.fS, 400, 60), orgSparkLastY60: sparkLast(ST.fS, 60), orgCSpark60: sparkPts(ST.cS, 400, 60), orgCSparkLastY60: sparkLast(ST.cS, 60),
      rows: ST.rows.map(r => ({ name: r.name, spark: sparkPts([r.f - r.fd * 2, r.f - r.fd * 2 + 1, r.f - r.fd - 1, r.f - r.fd, r.f - r.fd, r.f], 200, 30, 40, 85), fT: dCell(r.f, r.fd), cT: dCell(r.c, r.cd), pcells: r.p.map((v, i) => dCell(v, r.pd[i])), qcells: r.q.map((v, i) => dCell(v, r.qd[i])), lookDisplay: r.look ? 'inline-block' : 'none' })) };
    const storiesUi = STORIES.map((st, i) => { const on = i === s.story; return { label: st.label, pick: this.pickStory[i], bg: on ? 'rgba(217,234,110,.14)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.8)' }; });
    const isPeople = s.side === 'people';
    const seg = on => ({ bg: on ? 'rgba(217,234,110,.14)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.8)' });
    const featUi = (list, isOn, pick) => list.map((f, i) => { const on = isOn(f, i); return { ...f, pick: pick(f, i), r: SHAPES[i % 4], bg: on ? 'rgba(228,240,214,.06)' : 'transparent', iconBg: on ? 'rgba(217,234,110,.16)' : 'rgba(228,240,214,.08)', iconFg: on ? '#EAF79B' : 'rgba(244,242,230,.85)' }; });
    const peopleFeatures = featUi(FEAT_PEOPLE, f => f.shot === s.shot, f => this.pickShot[f.shot]), youFeatures = featUi(FEAT_YOU, (_, i) => i === s.youPick, (_, i) => this.pickYouFeat[i]);
    const navOn = on => ({ bg: on ? 'rgba(217,234,110,.1)' : 'transparent', c: on ? '#EAF79B' : 'rgba(244,242,230,.7)' });
    const yp = s.youPick, nav = { d: navOn(yp === 0), p: navOn(yp === 1), g: navOn(yp === 3), url: ['dashboard', 'departments', 'departments/' + ST.focusName.toLowerCase(), 'growth-work'][yp] };
    const ttl = ['Fulfilment and Culture', 'By department', 'Focus area · ' + ST.focusName, 'Growth work'][yp], ttlSub = ['ON THE DASHBOARD · TOP OF THE HOME PAGE', 'ON THE DASHBOARD · BELOW THE TWO SCORES', 'ON THE DASHBOARD · ONE CARD, OPENS THE DEPARTMENT', 'IN ACT · GROWTH WORK'][yp];
    const shots = SHOTS.map(([k, label]) => { const on = k === s.shot; return { label, pick: this.pickShot[k], bg: on ? 'rgba(217,234,110,.12)' : 'transparent', bc: on ? 'rgba(217,234,110,.5)' : 'rgba(228,240,214,.14)', c: on ? '#EAF79B' : 'rgba(244,242,230,.8)' }; });
    return {
      L: DB, stories: storiesUi, peopleFeatures, youFeatures, nav, ttl, ttlSub, youIs0: yp === 0, youIs1: yp === 1, youIs2: yp === 2, youIs3: yp === 3, sideIsPeople: isPeople, sideIsYou: !isPeople, sidePeople: seg(isPeople), sideYou: seg(!isPeople), pickPeople: this.pickPeople, pickYou: this.pickYou, shot: s.shot, shots, pillarHeads: PILLAR_HEADS, cultureHeads: CULTURE_HEADS, legend: LEGEND,
      wc, ratesOpen: s.ratesOpen, toggleRates: this.toggleRates, ratesLabel: s.ratesOpen ? 'Hide starting rates' : 'Adjust starting rates', ratesRot: s.ratesOpen ? 180 : 0,
      grainOn: this.props.grainOn ?? true, cur,
      pillar, v0: verts[0], v1: verts[1], v2: verts[2], v3: verts[3], v4: verts[4], radar,
      steps, step, stepIs0: s.step === 0, stepIs1: s.step === 1, stepIs2: s.step === 2, stepIs3: s.step === 3, stepIs4: s.step === 4, stepIs5: s.step === 5,
      levels, drill, bars, loop, heat, heatTitle, heatCol, isOrg, notOrg: !isOrg,
      filmCanvasRef: this.filmCanvasRef, filmSeekRef: this.filmSeekRef, filmTimeRef: this.filmTimeRef, toggleFilm: this.toggleFilm, seekFilm: this.seekFilm, filmPlaying: s.filmPlaying, filmPaused: !s.filmPlaying,
      headcount: s.headcount, setHeadcount: this.setHeadcount, industry: s.industry, setIndustry: this.setIndustry, rates: s.rates,
      setTurnover: this.setTurnover, setAbsence: this.setAbsence, setSalary: this.setSalary, setReplace: this.setReplace, setPres: this.setPres, setMoved: this.setMoved, est,
      email: s.email, setEmail: this.setEmail, sendEmail: this.sendEmail, sent: s.sent, notSent: !s.sent, sending: s.sending, formError: s.formError, sendLabel: s.sending ? 'Sending…' : 'Request early access'
    };
  }
}
