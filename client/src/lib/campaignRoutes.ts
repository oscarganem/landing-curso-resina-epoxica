export const playaDelCarmenCampaignPath = "/curso-playadelcarmen-sep26";
export const playaDelCarmenThankYouPath = `${playaDelCarmenCampaignPath}/gracias`;

export const getThankYouPathForLanding = (currentPath: string) =>
  currentPath === playaDelCarmenCampaignPath ? playaDelCarmenThankYouPath : "/gracias";
