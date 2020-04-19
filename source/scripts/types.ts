export type Maybe<T> = T | null;
import { rootReducer } from 'scripts/store';

type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Date: any;
};

export type ModalHeadlineTextType = {
  headline: string;
  text: string;
};

export type ModalTypes = Maybe<{
  headlineText?: ModalHeadlineTextType;
  callback?: () => void;
}>;

export type AlertType = Maybe<{
  type: 'notice' | 'error';
  text: string;
  time?: number;
}>;

export type UserType = Maybe<{
  id: Scalars['ID'];
  first_name: string;
  last_name: string;
  username: string;
}>;

export type SessionType = Maybe<{
  time: Date;
  token: string;
  expires: Date;
  valid: boolean;
}>;

export type RootState = ReturnType<typeof rootReducer>;

export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
