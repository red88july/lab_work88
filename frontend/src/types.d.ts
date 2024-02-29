export interface Registration {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegistrationResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}

export interface GlobalError {
  message: string;
}

export interface PostMutation {
  _id: string;
  user: {
    _id: string;
    username: string;
    token: string;
  };
  title: string;
  description: string;
  image: string | null;
  datetime: string;
}

export interface Post {
  title: string;
  description: string;
  image: File | null;
}