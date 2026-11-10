/**
 * Landing page content.
 *
 * Everything the marketing page renders comes from this file, so real copy can
 * replace the placeholders below without touching a component.
 *
 * Placeholder brand and copy: replace `brand`, the stats numbers, the
 * testimonials and the feature texts before going live.
 */

export const brand = {
  name: 'Academa',
  legalName: 'Academa Academic Consulting',
  tagline: 'We help you run your school smoothly.',
  year: 2026
}

export const nav = [
  { label: 'Features', target: 'features' },
  { label: 'Why us', target: 'pillars' },
  { label: 'Testimonials', target: 'testimonials' },
  { label: 'Contact', target: 'contact' }
]

export const hero = {
  eyebrow: 'Academic consulting',
  titleLead: 'Run your school',
  titleAccent: 'smoothly.',
  body: 'Academa brings your timetable, grades, attendance and parent communication into one calm system — so your staff spend their hours teaching, not chasing paperwork.',
  note: 'Built with school leaders, for school leaders',
  primary: { label: 'Get in touch', target: 'contact' },
  secondary: { label: 'See what we do', target: 'features' },
  // Set a path (for example '~assets/hero.jpg') to replace the CSS/SVG hero art.
  image: ''
}

export const stats = [
  { value: 20, label: 'Years in business' },
  { value: 170, label: 'Countries' },
  { value: 70000, label: 'Happy schools' },
  { value: 1, label: 'Mission' }
]

export const pillars = [
  {
    lead: 'Less',
    word: 'paperwork',
    note: 'Registers, reports and forms fill themselves in while your staff get on with teaching.'
  },
  {
    lead: 'Powerful',
    word: 'tools',
    note: 'Timetabling, substitutions and grades live in one place instead of five spreadsheets.'
  },
  {
    lead: 'Informed',
    word: 'parents',
    note: 'Parents see grades, absence and homework the moment you publish them.'
  },
  {
    lead: 'Happy',
    word: 'school',
    note: 'Less admin, fewer surprises and calmer mornings for everyone in the building.'
  }
]

export const testimonials = [
  {
    quote: 'We stopped dreading the start of term. Timetables that used to take a fortnight now take an afternoon.',
    name: 'Marta Nováková',
    role: 'Deputy Head',
    school: 'Gymnasium Banská Bystrica, Slovakia'
  },
  {
    quote: 'Parents actually read our messages now, because everything arrives in one place instead of three.',
    name: 'Peter Lechner',
    role: 'Principal',
    school: 'NMS Mayrhofen, Austria'
  },
  {
    quote: 'Attendance used to be a paper trail. Now it is a dashboard we check with our morning coffee.',
    name: 'Aisha Rahman',
    role: 'Registrar',
    school: 'Al Noor International School, UAE'
  },
  {
    quote: 'The substitution planner saved us on a Monday when four teachers called in sick before seven.',
    name: 'Tomáš Horák',
    role: 'Head of Studies',
    school: 'SPŠ Brno, Czechia'
  },
  {
    quote: 'Onboarding took one afternoon. Our most senior teacher was sending electronic grades by Friday.',
    name: 'Elena Petrova',
    role: 'IT Coordinator',
    school: 'Lycée Saint-Exupéry, France'
  }
]

export const features = [
  {
    icon: 'public',
    title: 'Web presence',
    text: 'A school website that looks as organised as you are, and updates without a developer.',
    href: ''
  },
  {
    icon: 'folder_open',
    title: 'Electronic documents',
    text: 'Share, archive and search every document without touching a filing cabinet.',
    href: ''
  },
  {
    icon: 'grading',
    title: 'Electronic grades',
    text: 'Grades reach parents the moment they are entered, on any device they own.',
    href: ''
  },
  {
    icon: 'fact_check',
    title: 'Electronic attendance',
    text: 'Mark a class in seconds and spot patterns before they become problems.',
    href: ''
  },
  {
    icon: 'calendar_month',
    title: 'Scheduling',
    text: 'Build a timetable that respects rooms, subjects and everyone’s sanity.',
    href: ''
  },
  {
    icon: 'swap_horiz',
    title: 'Substitutions',
    text: 'Absences covered before the first bell, with every affected class notified automatically.',
    href: ''
  },
  {
    icon: 'payments',
    title: 'Payments',
    text: 'Match bank transfers to school fees automatically and stop reconciling by hand.',
    href: ''
  },
  {
    icon: 'auto_awesome',
    title: 'And much more',
    text: 'Photo galleries, backups, notice boards, school calendars, the mobile app and more.',
    isCta: true
  }
]

export const contact = {
  eyebrow: 'Contact',
  title: 'Let’s talk about your school.',
  body: 'Tell us what a normal week looks like and we will show you the parts of Academa that would make it shorter. No slide deck, no pressure.',
  email: 'hello@academa.example',
  phone: '+1 (555) 010-2030',
  office: 'Remote-first, working across 12 time zones',
  success: 'Thanks — your message is on its way. We usually reply within one working day.',
  // Leave empty to run in demo mode (no request is made). Point it at a real
  // endpoint — for example '/contact' — to enable real submissions.
  endpoint: ''
}

export const footer = {
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'Features', target: 'features' },
        { label: 'Why Academa', target: 'pillars' },
        { label: 'Testimonials', target: 'testimonials' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Contact', target: 'contact' },
        { label: 'Our approach', target: 'pillars' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of service', href: '#' },
        { label: 'Privacy policy', href: '#' }
      ]
    }
  ]
}

export const languages = [
  { label: 'English', code: 'en', active: true },
  { label: 'Deutsch', code: 'de' },
  { label: 'Español', code: 'es' },
  { label: 'Français', code: 'fr' },
  { label: 'Português', code: 'pt' },
  { label: 'Čeština', code: 'cs' },
  { label: 'Slovenčina', code: 'sk' },
  { label: 'Hrvatski', code: 'hr' },
  { label: 'Magyar', code: 'hu' },
  { label: 'Polski', code: 'pl' },
  { label: 'Română', code: 'ro' },
  { label: 'Українська', code: 'uk' },
  { label: 'العربية', code: 'ar' },
  { label: '中文', code: 'zh' }
]
