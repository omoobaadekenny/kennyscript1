/**
 * storyChatEngine.ts
 * Sensitive, context-aware conversational engine for Kehinde David Aderibigbe's portfolio.
 * Used for client-side execution (e.g. GitHub Pages / static deployment) and server fallback.
 */

export interface UserLeadInfo {
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
}

export interface ScriptItem {
  id: string;
  title: string;
  genre: string;
  format: string;
  logline: string;
  pages?: string;
  tone?: string;
  status?: string;
  accolade?: string;
}

export const SCRIPTS_DATA: ScriptItem[] = [
  {
    id: 'the-last-horizon',
    title: 'The Last Horizon',
    genre: 'Drama',
    format: 'Feature Film',
    pages: '108 pages',
    tone: 'Contemplative, Poignant, Grounded',
    logline:
      'In a rain-drenched coastal town on the brink of economic collapse, a quiet harbourmaster confronts his estrangement from his daughter while sheltering a fugitive who holds the deed to the city’s last heritage dock.',
  },
  {
    id: 'echoes-of-tomorrow',
    title: 'Echoes of Tomorrow',
    genre: 'Thriller',
    format: 'Feature Film',
    pages: '114 pages',
    tone: 'Tense, Neo-Noir, High-Stakes',
    logline:
      'A forensic audio analyst reconstructing the final voicemails of a missing investigative reporter uncovers an algorithmic syndicate orchestrating high-frequency political assassinations.',
  },
  {
    id: 'the-next-chapter',
    title: 'The Next Chapter',
    genre: 'Drama',
    format: 'TV Series',
    pages: '60 min pilot & Series Bible',
    tone: 'Character-Driven, Warm, Emotionally Resonant',
    logline:
      'Following the sudden death of their family patriarch, three estranged adult siblings return to their ancestral vineyard to divide the estate, only to discover their father led an entirely clandestine double life.',
  },
  {
    id: 'beyond-the-gate',
    title: 'Beyond the Gate',
    genre: 'Sci-Fi',
    format: 'Feature Film',
    pages: '116 pages',
    tone: 'Atmospheric, Visionary, Dystopian',
    logline:
      'When an atmospheric barrier sealing off a quarantined megacity sector begins to fail, an unaligned courier must escort an orphaned bio-engineer through forbidden zones to activate the failsafe generator.',
  },
  {
    id: 'echoes-of-the-caldera',
    title: 'Echoes of the Caldera',
    genre: 'Psychological Thriller / Drama',
    format: 'Feature Film',
    pages: '112 pages',
    status: 'Ready for Packaging',
    accolade: 'Nicholl Fellowship Top 10% Semifinalist',
    logline:
      'When an isolated vulcanologist discovers anomalous harmonic seismic signals beneath an ancient dormant crater, he uncovers a suppressed corporate experiment tied to his late sister’s disappearance.',
  },
  {
    id: 'the-silent-frequency',
    title: 'The Silent Frequency',
    genre: 'Sci-Fi / Neo-Noir',
    format: 'One-Hour TV Pilot & Series Bible',
    status: 'In Development',
    accolade: 'Austin Film Festival Second Rounder',
    logline:
      'In a near-future metropolis where verbal speech is monitored by predictive audio sensors, a rogue telegraphist and an ex-sound engineer transmit encrypted counter-narratives over forgotten analog frequencies.',
  },
  {
    id: 'harvest-of-solitude',
    title: 'Harvest of Solitude',
    genre: 'Coming-of-Age Drama',
    format: 'Feature Film',
    pages: '98 pages',
    status: 'Optioned / Pre-production',
    accolade: 'Black List Recommended Script (Score 8/10)',
    logline:
      'A young botanical archivist in coastal West Africa fights to preserve ancestral agricultural remedies while navigating familial friction and high-stakes pharmaceutical patent battles.',
  },
];

/**
 * Sensitive, context-aware query responder.
 * Evaluates user intent strictly and produces short, accurate, first-person responses.
 */
export function generateSensitiveResponse(
  userQuery: string,
  userInfo?: Partial<UserLeadInfo> | null
): string {
  const raw = (userQuery || '').trim();
  const q = raw.toLowerCase();
  const name = userInfo?.firstName ? userInfo.firstName : '';
  const prefix = name ? `${name}, ` : '';

  // 1. SPECIFIC SCRIPT INQUIRIES (Highest precedence)
  if (q.includes('last horizon')) {
    return `${prefix}*The Last Horizon* is a 108-page feature drama about a quiet harbourmaster sheltering a fugitive holding the deed to a historic dock while trying to reconcile with his estranged daughter.`;
  }

  if (q.includes('echoes of tomorrow')) {
    return `${prefix}*Echoes of Tomorrow* is a 114-page neo-noir thriller following an audio analyst who uncovers an algorithmic political assassination syndicate through a reporter's voicemails.`;
  }

  if (q.includes('next chapter')) {
    return `${prefix}*The Next Chapter* is a 60-minute drama pilot and series bible exploring three adult siblings who discover their late father's clandestine double life at their ancestral vineyard.`;
  }

  if (q.includes('beyond the gate')) {
    return `${prefix}*Beyond the Gate* is a 116-page dystopian sci-fi feature where a courier escorts an orphaned bio-engineer through quarantined zones to restore a city's failing atmospheric shield.`;
  }

  if (q.includes('caldera')) {
    return `${prefix}*Echoes of the Caldera* (Nicholl Fellowship Top 10% Semifinalist, 112 pages) is a psychological thriller about a vulcanologist investigating seismic anomalies tied to his sister's disappearance.`;
  }

  if (q.includes('silent frequency')) {
    return `${prefix}*The Silent Frequency* (Austin Film Festival Second Rounder) is a one-hour sci-fi/neo-noir pilot about underground broadcasters transmitting analog counter-narratives in a voice-monitored city.`;
  }

  if (q.includes('harvest') || q.includes('solitude')) {
    return `${prefix}*Harvest of Solitude* (Black List Recommended 8/10, 98 pages) is a drama about a West African botanical archivist defending ancestral remedies against multinational pharmaceutical patent cartels.`;
  }

  // 2. ACCOLADES & CONTEST RECOGNITION
  if (
    q.includes('accolade') ||
    q.includes('award') ||
    q.includes('nicholl') ||
    q.includes('black list') ||
    q.includes('austin') ||
    q.includes('fellowship') ||
    q.includes('contest') ||
    q.includes('competition')
  ) {
    return `${prefix}my work has been recognized by the Academy Nicholl Fellowship (*Echoes of the Caldera* — Top 10% Semifinalist), The Black List (*Harvest of Solitude* — Recommended 8/10), and the Austin Film Festival (*The Silent Frequency* — Second Rounder).`;
  }

  // 3. GENRE-SPECIFIC INQUIRIES
  const isSciFi = q.includes('sci-fi') || q.includes('scifi') || q.includes('science fiction');
  const isThriller = q.includes('thriller') || q.includes('mystery') || q.includes('noir');
  const isDrama = q.includes('drama') || q.includes('emotional') || q.includes('character-driven');
  const isComedy = q.includes('comedy') || q.includes('humor') || q.includes('funny');
  const isHorror = q.includes('horror') || q.includes('scary');

  if (isSciFi) {
    return `${prefix}for science fiction, I have *Beyond the Gate* (a 116-page dystopian feature) and *The Silent Frequency* (a one-hour neo-noir TV pilot and series bible). Both explore high-concept technology grounded in human dilemmas.`;
  }

  if (isThriller) {
    return `${prefix}in the thriller genre, I've written *Echoes of Tomorrow* (a neo-noir tech thriller, 114 pages) and *Echoes of the Caldera* (a Nicholl Semifinalist psychological thriller, 112 pages).`;
  }

  if (isDrama) {
    return `${prefix}my drama portfolio features *The Last Horizon* (poignant coastal feature, 108 pages), *Harvest of Solitude* (Black List 8/10, 98 pages), and *The Next Chapter* (one-hour family drama pilot & bible).`;
  }

  if (isComedy) {
    return `${prefix}my primary focus is on dramatic features, psychological thrillers, and speculative sci-fi. However, I incorporate sharp observational wit and levity into character dialogue across my scripts.`;
  }

  if (isHorror) {
    return `${prefix}while I don't specialize in pure creature or supernatural horror, my psychological thrillers like *Echoes of the Caldera* lean heavily into dread, isolation, and tension.`;
  }

  // 4. TV / EPISODIC / SERIES BIBLES
  if (
    q.includes('tv') ||
    q.includes('television') ||
    q.includes('pilot') ||
    q.includes('series bible') ||
    q.includes('episodic') ||
    q.includes('show')
  ) {
    return `${prefix}I write one-hour dramatic pilots accompanied by complete series bibles. My featured TV projects are *The Next Chapter* (family drama) and *The Silent Frequency* (sci-fi neo-noir).`;
  }

  // 5. SHORT FILMS & SHORT SCRIPTS
  if (
    q.includes('short film') ||
    q.includes('short script') ||
    q.includes('short screenplay') ||
    q.includes('write a short') ||
    q.includes('writing a short') ||
    q.includes('short movie') ||
    q.includes('shorts') ||
    (q.includes('short') && (q.includes('film') || q.includes('script') || q.includes('screenplay') || q.includes('story') || q.includes('project')))
  ) {
    return `${prefix}yes! Along with my feature films and TV drama pilots, I write and polish short film scripts (typically 5 to 25 pages) for indie directors, film festivals, and proofs of concept. Feel free to share your premise or reach out directly!`;
  }

  // 6. FEATURE FILMS SPECIFICALLY
  if (
    q.includes('feature film') ||
    q.includes('feature script') ||
    q.includes('feature screenplay') ||
    q.includes('full length') ||
    q.includes('feature-length')
  ) {
    return `${prefix}I write full-length feature screenplays (98–116 pages) across drama (*The Last Horizon*, *Harvest of Solitude*), thriller (*Echoes of Tomorrow*, *Echoes of the Caldera*), and dystopian sci-fi (*Beyond the Gate*).`;
  }

  // 7. WEB SERIES & DIGITAL FORMATS
  if (
    q.includes('web series') ||
    q.includes('digital series') ||
    q.includes('web show') ||
    q.includes('digital format')
  ) {
    return `${prefix}yes, I develop and script episodic concepts for web series and digital formats, crafting fast-paced story arcs, sharp dialogue, and memorable characters tailored for modern digital viewing.`;
  }

  // 8. ADAPTATIONS & BOOK-TO-SCREEN
  if (
    q.includes('adapt') ||
    q.includes('adaptation') ||
    q.includes('novel') ||
    q.includes('book') ||
    q.includes('true story') ||
    q.includes('biopic')
  ) {
    return `${prefix}yes, I work on book, article, and true-story adaptations, translating literary prose into cinematic scene structure, visual subtext, and tight dramatic pacing.`;
  }

  // 9. DIALOGUE POLISH & CHARACTER VOICE
  if (
    q.includes('dialogue') ||
    q.includes('punch-up') ||
    q.includes('punch up') ||
    q.includes('character voice')
  ) {
    return `${prefix}I offer dedicated dialogue tune-ups and character voice punch-ups to elevate conversational authenticity, heighten subtext, and make scenes compelling for actors to perform.`;
  }

  // 10. PITCH DECKS, TREATMENTS & BIBLES
  if (
    q.includes('pitch deck') ||
    q.includes('pitching') ||
    q.includes('pitch bible') ||
    q.includes('treatment') ||
    q.includes('beat sheet') ||
    q.includes('synopsis')
  ) {
    return `${prefix}I craft comprehensive pitch bibles, treatments, and beat sheets—including loglines, episodic synopses, character arcs, and multi-season worldbuilding ready for studio and investor presentations.`;
  }

  // 11. TIMELINE & TURNAROUND
  if (
    q.includes('turnaround') ||
    q.includes('how long does it take') ||
    q.includes('timeline') ||
    q.includes('deadline') ||
    q.includes('how fast')
  ) {
    return `${prefix}turnaround depends on scope: a script polish or consultation typically takes 1–2 weeks, while a full original feature screenplay or TV pilot bible generally spans 4–8 weeks with clear milestone reviews.`;
  }

  // 12. SCREENPLAY FORMATTING & SOFTWARE
  if (
    q.includes('final draft') ||
    q.includes('software') ||
    q.includes('formatting') ||
    q.includes('industry standard')
  ) {
    return `${prefix}I write using Final Draft and follow standard industry screenplay formatting (Courier 12pt, scene headings, parentheticals, and clean action beats) ready for table reads and production.`;
  }

  // 13. CONFIDENTIALITY & NDA
  if (
    q.includes('nda') ||
    q.includes('confidential') ||
    q.includes('privacy') ||
    q.includes('copyright') ||
    q.includes('intellectual property')
  ) {
    return `${prefix}all client projects and creative discussions are treated with strict confidentiality. I am happy to sign an NDA before reviewing your treatments or project materials.`;
  }

  // 14. WRITERS' ROOM & CO-WRITING
  if (
    q.includes('writers room') ||
    q.includes("writer's room") ||
    q.includes('co-write') ||
    q.includes('co-writing') ||
    q.includes('co-writer')
  ) {
    return `${prefix}yes, I am experienced with collaborative writers' rooms and co-writing setups, contributing structural beats, scene work, and character development in alignment with the showrunner's vision.`;
  }

  // 15. LENGTH & PAGE COUNTS
  if (
    q.includes('how long') ||
    q.includes('page count') ||
    q.includes('pages') ||
    q.includes('length')
  ) {
    return `${prefix}my feature screenplays range between 98 and 116 pages (industry standard ~100–115 pages), and my television drama pilots are 60-page episodic scripts accompanied by multi-season series bibles.`;
  }

  // 16. SCHEDULING & CALLS (Direct instructions, no raw URLs)
  if (
    q.includes('schedule') ||
    q.includes('book') ||
    q.includes('calendar') ||
    q.includes('call') ||
    q.includes('appointment') ||
    q.includes('meeting')
  ) {
    return `${prefix}you can click the 'Schedule Call' button right at the top of this chat window to select a convenient time on my calendar, or reach me directly at kennydaviddesigns@gmail.com.`;
  }

  // 17. SPECIFIC SERVICES
  // Rewrite / Script Doctoring
  if (
    q.includes('rewrite') ||
    q.includes('doctor') ||
    q.includes('polish') ||
    q.includes('tune-up') ||
    q.includes('tighten') ||
    q.includes('fix my script')
  ) {
    return `${prefix}my Screenplay Rewriting service covers structural tune-ups, dialogue sharpening, character arc elevation, and scene economy for scripts heading into packaging or production.`;
  }

  // Script Consultation / Coverage
  if (
    q.includes('consult') ||
    q.includes('coverage') ||
    q.includes('feedback') ||
    q.includes('notes') ||
    q.includes('review my')
  ) {
    return `${prefix}my Script Consultation provides detailed analytical notes, commercial viability assessments, and structural feedback for directors, producers, and indie filmmakers.`;
  }

  // Story Development
  if (
    q.includes('story development') ||
    q.includes('develop') ||
    q.includes('outline') ||
    q.includes('treatment') ||
    q.includes('concept')
  ) {
    return `${prefix}through Story Development, I collaborate with creators to turn raw ideas into comprehensive pitch bibles, beat sheets, and scene-by-scene blueprints ready for greenlighting.`;
  }

  // General Services query
  if (
    q.includes('service') ||
    q.includes('what do you offer') ||
    q.includes('what can you do') ||
    q.includes('how can you help')
  ) {
    return `${prefix}I offer four core services: Original Scriptwriting (Features & TV), Story Development (Outlines & Bibles), Screenplay Rewriting (Polish & Doctoring), and Script Consultation (Coverage & Creative Notes).`;
  }

  // 18. HIRING, COLLABORATION & AVAILABILITY
  if (
    q.includes('hire') ||
    q.includes('collaborate') ||
    q.includes('work together') ||
    q.includes('available') ||
    q.includes('availability') ||
    q.includes('open to work') ||
    q.includes('commission') ||
    q.includes('writers room') ||
    q.includes("writer's room")
  ) {
    return `${prefix}I am currently available for select feature screenwriting commissions, TV writers' rooms, and script doctoring projects. Feel free to use the 'Schedule Call' button above or email kennydaviddesigns@gmail.com to discuss your project.`;
  }

  // 19. RATES, PRICING & COST
  if (
    q.includes('rate') ||
    q.includes('cost') ||
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('fee') ||
    q.includes('how much') ||
    q.includes('budget')
  ) {
    return `${prefix}my rates depend on project scope—whether you need a full original draft, a dialogue polish, or comprehensive coverage. Let's discuss your timeline and budget via email (kennydaviddesigns@gmail.com) or a discovery call.`;
  }

  // 20. CREATIVE PROCESS & WORKFLOW
  if (
    q.includes('process') ||
    q.includes('workflow') ||
    q.includes('how do you write') ||
    q.includes('steps') ||
    q.includes('stages') ||
    q.includes('method')
  ) {
    return `${prefix}my creative process follows four disciplined stages: 1. Idea (identifying the emotional core) -> 2. Development (character arcs & structural beats) -> 3. Writing (cinematic scenes & dialogue) -> 4. Refinement (pacing & polish).`;
  }

  // 21. LOCATION & REMOTE WORK
  if (
    q.includes('where are you') ||
    q.includes('location') ||
    q.includes('based') ||
    q.includes('country') ||
    q.includes('city') ||
    q.includes('lagos')
  ) {
    return `${prefix}I'm based in Lagos, Nigeria, and collaborate seamlessly with directors, producers, and writers' rooms across North America, Europe, and worldwide via video and digital delivery.`;
  }

  // 22. BIO, IDENTITY & STORYTELLING PHILOSOPHY
  if (
    q.includes('who are you') ||
    q.includes('about yourself') ||
    q.includes('tell me about you') ||
    q.includes('your background') ||
    q.includes('philosophy') ||
    q.includes('bio')
  ) {
    return `${prefix}I'm Kehinde David Aderibigbe, a screenwriter and storyteller. My artistic philosophy is "Great Stories Build Better Worlds"—crafting narratives anchored in authentic emotional stakes, tight visual pacing, and multi-layered characters.`;
  }

  // 23. DIRECT SCRIPT / PORTFOLIO OVERVIEW
  if (
    q.includes('what scripts') ||
    q.includes('which scripts') ||
    q.includes('what screenplays') ||
    q.includes('portfolio') ||
    q.includes('what have you written') ||
    q.includes('scripts have you written') ||
    q.includes('list your scripts') ||
    q.includes('show me your scripts') ||
    q.includes('show me your work')
  ) {
    return `${prefix}my portfolio features dramas (*The Last Horizon*, *Harvest of Solitude*), thrillers (*Echoes of Tomorrow*, *Echoes of the Caldera*), sci-fi (*Beyond the Gate*), and TV pilots (*The Next Chapter*, *The Silent Frequency*). You can preview loglines and pages in the 'My Work' section.`;
  }

  // 24. READING / SAMPLES / REQUESTING A SCRIPT
  if (
    q.includes('read') ||
    q.includes('sample') ||
    q.includes('treatment') ||
    q.includes('pdf') ||
    q.includes('look at a script') ||
    q.includes('send me a script')
  ) {
    return `${prefix}you can preview selected excerpts in the 'My Work' section on this page, or send an inquiry to kennydaviddesigns@gmail.com with your production company details to request full reading copies.`;
  }

  // 25. CONTACT INFORMATION
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach you') ||
    q.includes('phone') ||
    q.includes('message you')
  ) {
    return `${prefix}you can reach me directly at kennydaviddesigns@gmail.com, or schedule a 1-on-1 discovery consultation using the button at the top of this window.`;
  }

  // 26. INDIE FILMMAKERS & DIRECTORS
  if (
    q.includes('indie') ||
    q.includes('director') ||
    q.includes('filmmaker') ||
    q.includes('producer')
  ) {
    return `${prefix}yes, I collaborate closely with independent directors and producers, helping develop scripts with realistic production footprints without sacrificing cinematic scale.`;
  }

  // 27. CONVERSATIONAL GREETINGS & PLEASANTRIES
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q.includes('good morning') ||
    q.includes('good afternoon') ||
    q.includes('good evening')
  ) {
    return `${prefix ? `Hello ${name}! ` : 'Hello! '}Glad you stopped by. What can I tell you about my screenplays, rewriting services, or creative process?`;
  }

  if (
    q.includes('thank') ||
    q.includes('thanks') ||
    q.includes('awesome') ||
    q.includes('great') ||
    q.includes('cool')
  ) {
    return `${prefix ? `${name}, you're` : "You're"} very welcome! Let me know if there's anything else you'd like to explore about my scripts or services.`;
  }

  // 28. YES / NO OR SIMPLE QUERIES
  if (q === 'yes' || q === 'sure' || q === 'yeah') {
    return `${prefix ? `${name}, great` : 'Great'}. Feel free to ask any specific question about my scripts, services, or process!`;
  }

  if (q === 'no' || q === 'nope') {
    return `${prefix}no problem at all. Let me know whenever you'd like to explore anything.`;
  }

  // 29. SENSITIVE DEFAULT
  return `${prefix ? `${name}, I'd` : "I'd"} be glad to help! Whether you're inquiring about feature scripts, TV pilots, short films, script rewrites, or consulting for your project, let me know what you have in mind.`;
}
