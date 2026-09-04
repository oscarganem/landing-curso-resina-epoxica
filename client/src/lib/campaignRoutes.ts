export const playaDelCarmenCampaignPath = "/curso-playadelcarmen-sep26";
export const playaDelCarmenThankYouPath = `${playaDelCarmenCampaignPath}/gracias`;
export const cancunCampaignPath = "/curso-cancun-sep26";
export const academyHostname = "academia.ocares.mx";

export const getThankYouPathForLanding = (currentPath: string) =>
  playaDelCarmenThankYouPath;

export const isAcademyRootHostname = (hostname: string) => hostname.toLowerCase() === academyHostname;
