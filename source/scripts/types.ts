export type Maybe<T> = T | null;
import { rootReducer } from 'scripts/store';

export type ModalHeadlineTextType = {
  headline: string;
  text: string;
};

export type ModalTypes = Maybe<{
  headlineText?: ModalHeadlineTextType;
}>;

export type AlertType = Maybe<{
  type: 'notice' | 'error';
  text: string;
}>;

export type UserType = Maybe<{
  first_name: string;
  username: string;
  token: string;
  expires: number;
}>;

export type SessionType = Maybe<{
  time: Date;
}>;

export type RootState = ReturnType<typeof rootReducer>;
