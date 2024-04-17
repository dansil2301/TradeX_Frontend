export class PasswordChecker {
    static isPasswordLongEnough(password) {
        return password.length >= 10;
    }

    static isPasswordStrong(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialSymbols = /[^A-Za-z0-9]/.test(password);

        return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialSymbols;
    }

    static isPasswordConfirmed(password, passwordConfirm) {
        return password === passwordConfirm;
    }
}