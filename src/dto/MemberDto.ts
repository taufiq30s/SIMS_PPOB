export interface MemberRegisterDto {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface MemberUpdateDto {
  first_name: string;
  last_name: string;
}
