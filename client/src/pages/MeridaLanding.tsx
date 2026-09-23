import CourseLanding from "@/components/course/CourseLanding";
import { courseCampaigns } from "@/config/courseCampaigns";

export default function MeridaLanding() {
  return <CourseLanding campaign={courseCampaigns.merida} />;
}
