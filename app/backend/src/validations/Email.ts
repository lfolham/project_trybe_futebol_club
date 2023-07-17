export default class Email {
  private static emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;

  static validateEmail(email: string) : boolean {
    return Email.emailRegex.test(email);
  }
}
