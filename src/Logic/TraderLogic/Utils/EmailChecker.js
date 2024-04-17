export class EmailChecker {
    static isEmailCorrect(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return email && emailRegex.test(email);
    }
}