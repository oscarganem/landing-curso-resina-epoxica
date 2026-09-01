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
  closeForm();
  clearError();
  redirectToThankYou();
};
