export interface CourseCampaignConfig {
  path: `/${string}`;
  city: string;
  state: string;
  date: { dayOfWeek: string; label: string };
  schedule: string;
  venue: {
    confirmed?: boolean;
    name: string;
    label: string;
    addressLines: readonly string[];
    mapEmbedUrl?: string;
  };
  whatsapp: {
    number: string;
    messages: { presale: string; regular: string; team: string };
  };
  // Display strings preserve the campaign's approved currency/rounding copy.
  pricing: {
    regular: string;
    presale: string;
    deposit: string;
    remaining: string;
    presaleEnds?: string;
    teams: readonly {
      people: number;
      total: string;
      perPerson: string;
      approximate: boolean;
    }[];
  };
  faqIdPrefix: string;
}

// Past campaigns are retired; keep the master template ready for a future campaign.
export const courseCampaigns: Record<string, CourseCampaignConfig> = {};
