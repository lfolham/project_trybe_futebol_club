export default class Email {
  private static emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  static validate(email: string) : boolean {
    return Email.emailRegex.test(email);
  }
}
