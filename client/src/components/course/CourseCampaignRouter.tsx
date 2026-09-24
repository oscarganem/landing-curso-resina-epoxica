import { useLocation } from "wouter";
import { courseCampaigns, type CourseCampaignConfig } from "@/config/courseCampaigns";
import CourseLanding from "./CourseLanding";

export default function CourseCampaignRouter({
  campaigns = courseCampaigns,
}: { campaigns?: Record<string, CourseCampaignConfig> }) {
  const [location] = useLocation();
  const pathname = location.replace(/\/$/, "");
  const campaign = Object.values(campaigns).find(({ path }) => path === pathname);

  return campaign
    ? <CourseLanding key={campaign.path} campaign={campaign} />
    : <main>Página no encontrada.</main>;
}
