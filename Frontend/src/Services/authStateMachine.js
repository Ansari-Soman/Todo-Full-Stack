export const authStateMachine = (state, action) => {
  const transitions = {
    IDLE: {
      REGISTER_SUCCESS: "OTP_REQUIRED",
      LOGIN_SUCCESS: "AUTHENTICATED",
      RESET_LINK_SENT_SUCCESS: "NEW_PASSWORD_REQUIRED",
    },

    NEW_PASSWORD_REQUIRED: { NEW_PASSWORD_SUCCESS: "IDLE" },

    OTP_REQUIRED: { OTP_SENT_SUCCESS: "OTP_SENT" },
    OTP_SENT: { OTP_VERIFIED_SUCCESS: "PASSWORD_REQUIRED" },
    PASSWORD_REQUIRED: { PASSWORD_SET_SUCCESS: "AUTHENTICATED" },
    AUTHENTICATED: { LOGOUT_SUCCESS: "IDLE" },
  };
  const nextState = transitions[state]?.[action];
  if (!nextState) {
    throw new Error("Invalid transitions");
  }
  return nextState;
};
