export default class UserDto {
  constructor(
    id,
    firstName,
    lastName,
    login,
    password,
    phone,
    email,
    city,
    avatar,
    sex,
    userType,
    isBlocked,
    roles,
    verificationCode,
    oldPassword,
    newPassword,
    shelter
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.password = password;
    this.phone = phone;
    this.email = email;
    this.city = city;
    this.avatar = avatar;
    this.sex = sex;
    this.userType = userType;
    this.isBlocked = isBlocked;
    this.roles = roles;
    this.verificationCode = verificationCode;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.shelter = shelter;
  }

  toEntity() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      phone: this.phone,
      email: this.email,
      city: this.city,
      avatar: this.avatar,
      sex: this.sex,
      userType: this.userType,
    };
  }
}
