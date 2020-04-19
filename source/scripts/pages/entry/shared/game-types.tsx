import { Athlete, Organization, Maybe } from 'scripts/generated/types';

export type EntryType = {
  id: string;
  organization: Organization;
  athlete: Maybe<Athlete>;
  pick_number: number;
  score?: Maybe<string>;
};

export type UpdateSelectionType = {
  currentSelection: EntryType;
  player?: Maybe<Athlete>;
  organization?: Maybe<Organization>;
};
