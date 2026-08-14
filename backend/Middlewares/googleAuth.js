export const verifyGmailDomain = (email) => {
  const isGmail = email.endsWith("@gmail.com");
  return isGmail;
};
