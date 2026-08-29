import { trackMetaLead } from "./metaPixel";

type SuccessfulWaitlistSignupActions = {
  closeForm: () => void;
  clearError: () => void;
  redirectToThankYou: () => void;
};

export const handleSuccessfulWaitlistSignup = ({
  closeForm,
  clearError,
  redirectToThankYou,
}: SuccessfulWaitlistSignupActions) => {
  trackMetaLead();
  closeForm();
  clearError();
  redirectToThankYou();
};
