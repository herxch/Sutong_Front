// Openings come from OA now, not from this file.
//
// Until 2026-08-29 this held a hand-maintained array of job titles and a link
// out to Paylocity's recruiting portal. Both are gone: HR posts a job in OA and
// it appears here, and the application is taken on this page rather than on a
// third party's.
//
// The API lives on careers.sutongctr.com rather than oa.sutongctr.com on
// purpose. Applying is the one unauthenticated file upload in the whole system,
// and it is kept on an origin of its own, away from the authenticated
// application. Nothing else on that host is reachable — every other /api path
// there answers 404.
export const CAREERS_API =
  process.env.REACT_APP_CAREERS_API ?? "https://careers.sutongctr.com/api/careers";

export const HR_EMAIL = "hr@sutongctr.com";

/** Labels for the values the API returns. */
export const EMPLOYMENT_TYPE_LABELS = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  TEMPORARY: "Temporary",
  CONTRACT: "Contract",
  INTERN: "Intern",
};

export const COUNTRY_LABELS = {
  US: "United States",
  CA: "Canada",
  CN: "Beijing",
};
