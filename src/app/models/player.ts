import { Signin } from './signin';

export interface Player {
  _id: string;
  name: string;
  position?: string;
  thumbnail?: string;
  born?: string;
  team?: string;
  signin?: Signin;
}
