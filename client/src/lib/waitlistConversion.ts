import { trackMetaLead } from "./metaPixel";

type SuccessfulWaitlistSignupActions = {
  markLeadPending: () => void;
  closeForm: () => void;
  clearError: () => void;
  redirectToThankYou: () => void;
};

export const handleSuccessfulWaitlistSignup = ({
  markLeadPending,
  closeForm,
  clearError,
  redirectToThankYou,
}: SuccessfulWaitlistSignupActions) => {
  markLeadPending();
  closeForm();
  clearError();
  redirectToThankYou();
};
