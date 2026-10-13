// Shared legal-page chrome (/privacy, /terms). The Spanish policy texts
// themselves are in ./es/PrivacyEs.tsx and ./es/TermsEs.tsx.
// Spanish: NEEDS NATIVE/LEGAL REVIEW (docs/SPANISH_REVIEW.md).

const en = {
  lastUpdated: 'Last updated:',
  /** Shown at the top of translated legal pages; empty in English. */
  governingNote: '',
  governingLink: '',
};

const es: typeof en = {
  lastUpdated: 'Última actualización:',
  governingNote: 'Esta es una traducción de cortesía. Si hay alguna diferencia entre esta traducción y la versión en inglés, la versión en inglés es la que rige.',
  governingLink: 'Ver la versión en inglés',
};

export default { en, es };
