export interface Cert {
  title: string;
  issuer: string;
  platform: string;
  date: string;
  group: 'Cloud & DevOps' | 'AI & Data' | 'Programming' | 'Competitions';
  image: string;
  verify?: string;
  note?: string;
}

const coursera = (id: string) => `https://coursera.org/verify/${id}`;

export const certs: Cert[] = [
  { title: 'DevOps on AWS', issuer: 'Amazon Web Services', platform: 'Coursera Specialization · 4 courses', date: 'Jan 2025', group: 'Cloud & DevOps', image: '/img/certs/6GAHQDSU4X56.webp', verify: 'https://coursera.org/verify/specialization/6GAHQDSU4X56' },
  { title: 'AWS Cloud Technical Essentials', issuer: 'Amazon Web Services', platform: 'Coursera', date: 'Jan 2025', group: 'Cloud & DevOps', image: '/img/certs/14OYA4I3G62S.webp', verify: coursera('14OYA4I3G62S') },
  { title: 'DevOps on AWS: Code, Build, and Test', issuer: 'Amazon Web Services', platform: 'Coursera', date: 'Jan 2025', group: 'Cloud & DevOps', image: '/img/certs/ZLNEHQEL9R0I.webp', verify: coursera('ZLNEHQEL9R0I') },
  { title: 'DevOps on AWS: Release and Deploy', issuer: 'Amazon Web Services', platform: 'Coursera', date: 'Jan 2025', group: 'Cloud & DevOps', image: '/img/certs/F81EC05LD3Z6.webp', verify: coursera('F81EC05LD3Z6') },
  { title: 'Supervised Machine Learning: Regression and Classification', issuer: 'DeepLearning.AI & Stanford University', platform: 'Coursera', date: 'Jul 2024', group: 'AI & Data', image: '/img/certs/MJTQECSZXPRE.webp', verify: coursera('MJTQECSZXPRE') },
  { title: 'Getting Started with Machine Learning with PyTorch', issuer: 'IBM Developer', platform: 'Cognitive Class', date: 'Jan 2025', group: 'AI & Data', image: '/img/certs/ibm_pytorch.webp' },
  { title: 'Python for Data Science, AI & Development', issuer: 'IBM', platform: 'Coursera', date: 'May 2024', group: 'AI & Data', image: '/img/certs/4KBTUZW4X2GM.webp', verify: coursera('4KBTUZW4X2GM') },
  { title: 'Python Data Structures', issuer: 'University of Michigan', platform: 'Coursera', date: 'Jul 2024', group: 'Programming', image: '/img/certs/UZE4DQ7N92BV.webp', verify: coursera('UZE4DQ7N92BV') },
  { title: 'Programming for Everybody (Getting Started with Python)', issuer: 'University of Michigan', platform: 'Coursera', date: 'Jun 2024', group: 'Programming', image: '/img/certs/NQNERNWD356A.webp', verify: coursera('NQNERNWD356A') },
  { title: 'CodeSprint 8 — Certificate of Participation', issuer: 'IEEE Student Branch of IIT', platform: 'Inter-university startup battle · team CodeXCrew', date: 'CodeSprint 8', group: 'Competitions', image: '/img/certs/codesprint8.webp' },
];
