export class Patient {
  FirstName: string;
  LastName: string;
  Birthday: string;
  Gender: string;

  constructor(FirstName: string, LastName: string, Birthday: string, Gender: string) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Birthday = Birthday;
    this.Gender = Gender;
  }
}
