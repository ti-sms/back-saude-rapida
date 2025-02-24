import { AddressProps } from "../address/address";

export type LoginProps = {
  email: string;
  password: string;
};

export class Login {
  private constructor(readonly props: LoginProps) {}

  public static with(email: string, password: string) {
    return new Login({
      email,
      password,
    });
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }
}
