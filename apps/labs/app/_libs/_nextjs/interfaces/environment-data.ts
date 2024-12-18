export enum AuthProviders {
  MagicLogin = 'MagicLogin',
  EmailAndPassword = 'EmailAndPassword',
}

export interface EnvironmentData {
  authProvider: AuthProviders;
  enableSignUp: boolean;
  enableSignUpB2BOnly: boolean;
}
