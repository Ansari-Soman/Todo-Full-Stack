let logoutHandler = null;
let logoutStatus = false;
export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

export const callLogoutHandler = () => {
  if (logoutStatus) return;
  if (logoutHandler) {
    logoutHandler();
    logoutStatus = true;
    return {success: true}
  }
  return {success: false}
};

export const resetLogoutStatus = () => {
  logoutStatus = false;
};
