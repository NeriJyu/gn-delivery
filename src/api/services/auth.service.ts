export class AuthService {
  validateLogin(auth: { email: string; password: string }): {
    valid: boolean;
    message?: string;
  } {
    if (!auth.email) return { valid: false, message: "'email' not informed" };

    if (!auth.password)
      return { valid: false, message: "'password' not informed" };

    return { valid: true };
  }
}
