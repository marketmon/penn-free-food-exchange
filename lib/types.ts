export type FormInput = {
  name: string;
  label: string;
  type: string;
};

export type SignUp = {
  create: (credentials: {
    emailAddress: string;
    password: string;
    unsafeMetadata: { [key: string]: string };
  }) => Promise<any>;
  prepareEmailAddressVerification: (config: {
    strategy: "email_code";
  }) => Promise<any>;
  attemptEmailAddressVerification: (config: { code: string }) => Promise<any>;
};

export type SignIn = {
  create: (credentials: {
    identifier: string;
    strategy?: "reset_password_email_code";
    password?: string;
  }) => Promise<any>;
  attemptFirstFactor: (credentials: {
    strategy: "reset_password_email_code";
    code: string;
  }) => Promise<any>;
  resetPassword: (credentials: { password: string }) => Promise<any>;
};
