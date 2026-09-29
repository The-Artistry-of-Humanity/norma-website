// Sample data and shared helpers, moved verbatim from the design reference
// (`Norma Website.dc.html`, script block). Do not edit values here without a
// matching change in the design reference.

export interface Pillar { name: string; short: string; line: string; themes: string[]; org: string }
export const PILLARS: Pillar[] = [
  { name: 'Health & Fitness', short: 'Health', line: 'Sleep, movement, nutrition and energy. The physical base every other pillar rests on; when it slips, everything else costs more.', themes: ['Exercise', 'Nutrition', 'Body', 'Energy'], org: 'Shift patterns, hours and recovery time show up here first.' },
  { name: 'Internal Work', short: 'Internal', line: 'Reading, reflection, gratitude, forgiveness. The inner practice that decides how a person meets pressure.', themes: ['Reading', 'Reflection', 'Gratitude', 'Forgiveness'], org: 'The pillar most often lowest, and the one growth journeys lift fastest.' },
  { name: 'Love & Relationships', short: 'Love', line: 'The closest relationships and the attention they get. Usually the first thing to run on leftovers when work expands.', themes: ['Partnership', 'Attention', 'Peace'], org: 'A falling Love pillar across a team is often a workload signal in disguise.' },
  { name: 'Social Connection', short: 'Social', line: 'Friends, family, community and belonging. The pillar nobody schedules and the one that thins out first.', themes: ['Friends', 'Family', 'Community', 'Belonging'], org: 'Remote and distributed teams tend to slide here without anyone noticing.' },
  { name: 'Work & Life Flow', short: 'Flow', line: 'Purpose, enough time to do the job well, the relationship with a manager, control over the next step.', themes: ['Purpose', 'Time', 'Manager', 'Next step'], org: 'The one pillar you can most directly change. Also where culture questions live.' }
];

export interface Step { n: string; name: string; title: string; body: string; note: string }
export const STEPS: Step[] = [
  { n: '01', name: 'Check in', title: 'Once a month, twenty questions.', body: 'Four per pillar, plus three about culture: heard, valued, safe to speak. About ten minutes. The result is a Fulfilment Score that belongs to the employee.', note: 'Between check-ins nothing is required. The habit is theirs; the rhythm is yours.' },
  { n: '02', name: 'The mirror', title: 'Something back for them, first.', body: 'A written reflection that notices one specific thing and stops. It reaches the employee before the organisation receives anything at all.', note: 'No diagnosis, no lecture. A perceptive friend who has been paying attention.' },
  { n: '03', name: 'One small step', title: 'One habit, or one action.', body: 'Pointed at whatever is weakest. Habits repeat, actions are one-off, growth journeys go deeper. Voice reflections keep the thread between months.', note: 'A person who embeds one new habit a month is a success.' },
  { n: '04', name: 'The team pauses', title: 'A session built on the team’s own score.', body: 'The platform hands the leader a ready-made Stop for Wellness session from the library, on the team’s lowest pillar. Twenty minutes, no consultant in the room.', note: 'The organisation gifts the time. The platform supplies the structure. The leader going first gives everyone permission to be honest.' }
];

export interface Team { name: string; people: string; pillars?: number[]; c?: number[]; withheld?: boolean }
export interface Dept {
  crumb: string; name: string; people: string; withheld?: boolean;
  part?: number; ful?: number; fulD?: string; cul?: number; culD?: string;
  pillars?: number[]; heard?: number; valued?: number; safe?: number;
  insight?: string; action?: string; actionMeta?: string; actionWhy?: string; teams?: Team[];
}
export const ORG = { crumb: 'Organisation', name: 'Whole organisation', people: '1,240 people', part: 71, ful: 58, fulD: '↘ 1 vs August', cul: 55, culD: '→ same as August', pillars: [60, 52, 66, 58, 51], heard: 55, valued: 56, safe: 53 };
export const DEPTS: Dept[] = [
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

export const band = (v: number) => v >= 70 ? { bg: 'rgba(217,234,110,.16)', fg: '#E4F290' } : v >= 55 ? { bg: 'rgba(244,242,230,.035)', fg: '#F4F2E6' } : v >= 46 ? { bg: 'rgba(230,199,126,.16)', fg: '#EFDCAE' } : { bg: 'rgba(231,142,113,.18)', fg: '#EFB39B' };
export const cells = (a: number[]) => a.map(v => ({ v, ...band(v) }));

export interface LoopNode { label: string; title: string; body: string; emp: string; lead: string }
export const LOOP: LoopNode[] = [
  { label: 'LISTEN', title: 'Every month, everyone is asked.', body: 'Twenty questions across five pillars, three on culture. The same instrument for every team, so movement means something.', emp: 'Checks in privately. Keeps a check-in streak.', lead: 'Sees participation. Low participation is itself a signal.' },
  { label: 'IDENTIFY', title: 'The lowest pillar names itself.', body: 'For each group of five or more: the lowest pillar, the biggest drop, the quietest culture question.', emp: 'The mirror names one thing worth noticing.', lead: 'The dashboard names one thing worth acting on.' },
  { label: 'UNDERSTAND', title: 'Culture says whether people will tell you.', body: 'Heard, valued, safe to speak. When the culture ring is strong, a session gets honest answers. When it is weak, start there.', emp: 'Sees exactly what the leader sees. Nothing more, nothing less.', lead: 'Reads the ring before the pillars.' },
  { label: 'ACT', title: 'A session from the library, ready to run.', body: 'Stop for Wellness: twenty minutes, one question everyone answers, one commitment. Built on the team’s own lowest pillar.', emp: 'Takes one small step: a habit, an action or a growth journey.', lead: 'Runs the session and logs an action. Builds a leader streak.' },
  { label: 'SUPPORT', title: 'The app carries the month.', body: 'Habits, voice reflections and growth journeys keep the thread between check-ins. Nothing is required, so what happens is real.', emp: 'Growth momentum. Private, and reset each month.', lead: 'Nothing to do. The organisation has gifted the time.' },
  { label: 'MEASURE', title: 'Next month says whether it worked.', body: 'The same twenty questions, asked again. Every action is dated against the signal it answered.', emp: 'Watches their own score move.', lead: 'Watches the team’s number move, or not.' },
  { label: 'REVIEW', title: 'Did it move?', body: 'What went up, what went down, what stayed quiet. The dated trail is the evidence a regulator asks for.', emp: 'The mirror closes the loop on last month’s step.', lead: 'The dashboard closes the loop on last month’s action.' },
  { label: 'REPEAT', title: 'Both streaks continue.', body: 'A rhythm, not a programme. Twelve check-ins a year is twelve chances to notice early, instead of one photograph of last year.', emp: 'Twelve mirrors a year.', lead: 'Twelve sessions, twelve actions, twelve measurements.' }
];

export interface Hazard { name: string; desc: string; yn: number; monthly?: number; control: string; owner: string }
export const HAZARDS: Hazard[] = [
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

export interface Site { name: string; people: number; ful: number; fulD: number; v: number[]; d: number[] }
export const SITES: Site[] = [
  { name: 'All sites', people: 1860, ful: 61, fulD: -2, v: [31, 22, 17, 12, 28, 14, 16, 6, 3, 2, 7, 21, 24, 19], d: [4, -1, 0, -2, 6, 0, 1, 1, 0, 0, -1, 2, 3, -1] },
  { name: 'Kestrel Ridge', people: 640, ful: 54, fulD: -6, v: [42, 26, 24, 14, 33, 18, 21, 11, 4, 3, 9, 29, 34, 23], d: [9, 2, 3, 0, 8, 1, 3, 4, 1, 0, 1, 4, 6, 1] },
  { name: 'Port Aldine', people: 720, ful: 63, fulD: 1, v: [27, 20, 14, 11, 26, 12, 13, 4, 2, 1, 6, 12, 18, 17], d: [1, -2, -1, -3, 5, -1, 0, 0, 0, 0, -1, 0, 1, -2] },
  { name: 'Mill Creek', people: 500, ful: 65, fulD: 0, v: [22, 19, 12, 10, 24, 11, 14, 3, 2, 1, 5, 24, 20, 16], d: [-3, -1, -2, -2, 4, 0, 0, -1, 0, 0, -2, 1, 0, -1] }
];

export const INDUSTRIES: Record<string, { turnover: number; absence: number; salary: number }> = { all: { turnover: 13.5, absence: 9, salary: 100000 }, hospitality: { turnover: 21, absence: 11.9, salary: 70000 }, retail: { turnover: 19, absence: 10, salary: 65000 }, health: { turnover: 16, absence: 11, salary: 90000 }, professional: { turnover: 14, absence: 8, salary: 120000 }, tech: { turnover: 13, absence: 7, salary: 130000 }, finance: { turnover: 12, absence: 8, salary: 130000 }, construction: { turnover: 21, absence: 9, salary: 110000 }, manufacturing: { turnover: 15, absence: 11, salary: 85000 }, public: { turnover: 12, absence: 11.4, salary: 100000 }, education: { turnover: 12, absence: 10, salary: 95000 } };

export const ANGLES = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180);
export const poly = (vals: number[], cx: number, cy: number, R: number) => vals.map((v, i) => (cx + R * v / 100 * Math.cos(ANGLES[i])).toFixed(1) + ',' + (cy + R * v / 100 * Math.sin(ANGLES[i])).toFixed(1)).join(' ');
export const num = (v: string | number, d: number) => { const n = parseFloat(String(v)); return Number.isFinite(n) ? n : d; };
export const fmtTime = (t: number) => '0:' + String(Math.floor(t)).padStart(2, '0');
export const FILM_LEN = 36;
export const pt = (deg: number, r: number): [number, number] => { const a = (deg - 90) * Math.PI / 180; return [200 + r * Math.cos(a), 200 + r * Math.sin(a)]; };
