export const updateUserData = (userData) => {
  if (!userData) return;

  window.digitalData.user = {
    ...window.digitalData.user,
    UserID: userData.id || "",
    status: userData.status || "",
    email: userData.email || "",
  };

  console.log("DigitalData updated for user:", window.digitalData.user);
};