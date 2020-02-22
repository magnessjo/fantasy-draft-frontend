export type Maybe<T> = T | null;
import { rootReducer } from 'scripts/store';

export type ModalHeadlineTextType = {
  headline: string;
  text: string;
};

export type ModalTypes = Maybe<{
  headlineText?: ModalHeadlineTextType;
}>;

export type RootState = ReturnType<typeof rootReducer>;
