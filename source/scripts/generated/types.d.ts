export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Date: any,
};

export type Athlete = {
   __typename?: 'Athlete',
  id: Scalars['ID'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  school: Scalars['String'],
  position: Scalars['String'],
  school_standing: Scalars['String'],
  eligible_year?: Maybe<Scalars['String']>,
  height?: Maybe<Scalars['String']>,
  weight?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  access_token?: Maybe<Scalars['String']>,
  refresh_token?: Maybe<Scalars['String']>,
  expires_in?: Maybe<Scalars['Int']>,
  token_type?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type CreateEntryInput = {
  name: Scalars['String'],
  user_id: Scalars['ID'],
};

export type CreateEntryResponse = {
   __typename?: 'CreateEntryResponse',
  entries: Array<Entries>,
  id: Scalars['ID'],
};



export type DeleteEntryInput = {
  id: Scalars['String'],
  user_id: Scalars['ID'],
};

export type DraftOrder = {
   __typename?: 'DraftOrder',
  id: Scalars['ID'],
  team: Organization,
};

export type Entries = {
   __typename?: 'Entries',
  id: Scalars['String'],
  user_id: Scalars['String'],
  name: Scalars['String'],
  score?: Maybe<Scalars['String']>,
  selections: Array<Selection>,
  user?: Maybe<User>,
};

export type EntryInput = {
  id: Scalars['ID'],
  org_id: Scalars['ID'],
  athlete_id?: Maybe<Scalars['ID']>,
};

export type ForgotPasswordInput = {
  email: Scalars['String'],
};

export type ForgotPasswordResponse = {
   __typename?: 'ForgotPasswordResponse',
  status: Scalars['String'],
  message?: Maybe<Scalars['String']>,
};

export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type LogoutResponse = {
   __typename?: 'LogoutResponse',
  status: Scalars['String'],
  message?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  register: RegisterResponse,
  verifyEmail: AuthPayload,
  login: AuthPayload,
  forgotPassword: ForgotPasswordResponse,
  updateForgottenPassword: ForgotPasswordResponse,
  logout: LogoutResponse,
  updateEntry: UpdateEntryResponse,
  createEntry?: Maybe<CreateEntryResponse>,
  deleteEntry: Array<Entries>,
  resetEntry?: Maybe<CreateEntryResponse>,
  updateResult: Scalars['String'],
};


export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput
};


export type MutationUpdateForgottenPasswordArgs = {
  input?: Maybe<NewPasswordWithCodeInput>
};


export type MutationUpdateEntryArgs = {
  input: EntryInput
};


export type MutationCreateEntryArgs = {
  input: CreateEntryInput
};


export type MutationDeleteEntryArgs = {
  input: DeleteEntryInput
};


export type MutationResetEntryArgs = {
  input: ResetEntryInput
};


export type MutationUpdateResultArgs = {
  input: UpdateResultInput
};

export type NewPasswordWithCodeInput = {
  email: Scalars['String'],
  token: Scalars['String'],
  password: Scalars['String'],
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  field: Scalars['String'],
  /** The direction that is used for ordering. */
  order: SortOrder,
};

export type Organization = {
   __typename?: 'Organization',
  id: Scalars['ID'],
  name: Scalars['String'],
  city: Scalars['String'],
  image: Scalars['String'],
  primary_color: Scalars['String'],
};

/** A paginated list of Organization items. */
export type OrganizationPaginator = {
   __typename?: 'OrganizationPaginator',
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo,
  /** A list of Organization items. */
  data: Array<Organization>,
};

/** Pagination information about the corresponding list of items. */
export type PageInfo = {
   __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>,
  /** Total number of node in connection. */
  total?: Maybe<Scalars['Int']>,
  /** Count of nodes in current request. */
  count?: Maybe<Scalars['Int']>,
  /** Current page of request. */
  currentPage?: Maybe<Scalars['Int']>,
  /** Last page in connection. */
  lastPage?: Maybe<Scalars['Int']>,
};

/** Pagination information about the corresponding list of items. */
export type PaginatorInfo = {
   __typename?: 'PaginatorInfo',
  /** Total count of available items in the page. */
  count: Scalars['Int'],
  /** Current pagination page. */
  currentPage: Scalars['Int'],
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>,
  /** If collection has more pages. */
  hasMorePages: Scalars['Boolean'],
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>,
  /** Last page number of the collection. */
  lastPage: Scalars['Int'],
  /** Number of items per page in the collection. */
  perPage: Scalars['Int'],
  /** Total items available in the collection. */
  total: Scalars['Int'],
};

export type Query = {
   __typename?: 'Query',
  athletes: Array<Athlete>,
  athlete?: Maybe<Athlete>,
  organization?: Maybe<OrganizationPaginator>,
  users?: Maybe<User>,
  selections: Array<Selection>,
  entries: Array<Entries>,
  draftOrder: Array<DraftOrder>,
};


export type QueryAthletesArgs = {
  eligible_year: Scalars['String'],
  school?: Maybe<Scalars['String']>,
  position?: Maybe<Scalars['String']>,
  searchText?: Maybe<Scalars['String']>
};


export type QueryAthleteArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryOrganizationArgs = {
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryUsersArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QuerySelectionsArgs = {
  entry_id: Scalars['ID']
};


export type QueryEntriesArgs = {
  entry_id?: Maybe<Scalars['ID']>
};

export type RefreshTokenInput = {
  refresh_token?: Maybe<Scalars['String']>,
};

export type RefreshTokenPayload = {
   __typename?: 'RefreshTokenPayload',
  access_token: Scalars['String'],
  refresh_token: Scalars['String'],
  expires_in: Scalars['Int'],
  token_type: Scalars['String'],
};

export type RegisterInput = {
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse',
  tokens?: Maybe<AuthPayload>,
  status: RegisterStatuses,
};

export enum RegisterStatuses {
  MustVerifyEmail = 'MUST_VERIFY_EMAIL',
  Success = 'SUCCESS'
}

export type ResetEntryInput = {
  entry_id: Scalars['ID'],
  user_id: Scalars['ID'],
};

export type Selection = {
   __typename?: 'Selection',
  id: Scalars['ID'],
  entry_id: Scalars['ID'],
  score?: Maybe<Scalars['String']>,
  pick_number: Scalars['Int'],
  athlete?: Maybe<Athlete>,
  organization: Organization,
  entries?: Maybe<Entries>,
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateEntryResponse = {
   __typename?: 'UpdateEntryResponse',
  status: Scalars['String'],
  selections?: Maybe<Selection>,
};

export type UpdateResultInput = {
  id: Scalars['ID'],
  org_id: Scalars['ID'],
  athlete_id: Scalars['ID'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
  entries: Array<Entries>,
};

export type VerifyEmailInput = {
  token: Scalars['String'],
};

export type LogoutMutationVariables = {};


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', status: string, message: Maybe<string> } };

export type HeaderUserEntriesQueryVariables = {
  id: Scalars['ID']
};


export type HeaderUserEntriesQuery = { __typename?: 'Query', users: Maybe<{ __typename?: 'User', entries: Array<{ __typename?: 'Entries', id: string, name: string }> }> };

export type UpdateEntrySelectionMutationVariables = {
  input: EntryInput
};


export type UpdateEntrySelectionMutation = { __typename?: 'Mutation', updateEntry: { __typename?: 'UpdateEntryResponse', status: string, selections: Maybe<{ __typename?: 'Selection', id: string, pick_number: number, athlete: Maybe<{ __typename?: 'Athlete', id: string, first_name: string, last_name: string, school: string, position: string, school_standing: string, image: Maybe<string> }>, organization: { __typename?: 'Organization', id: string, name: string, city: string, image: string, primary_color: string } }> } };

export type ResetEntryMutationVariables = {
  input: ResetEntryInput
};


export type ResetEntryMutation = { __typename?: 'Mutation', resetEntry: Maybe<{ __typename?: 'CreateEntryResponse', id: string, entries: Array<{ __typename?: 'Entries', id: string, selections: Array<{ __typename?: 'Selection', id: string, athlete: Maybe<{ __typename?: 'Athlete', id: string }>, organization: { __typename?: 'Organization', id: string } }> }> }> };

export type CreateEntryMutationVariables = {
  input: CreateEntryInput
};


export type CreateEntryMutation = { __typename?: 'Mutation', createEntry: Maybe<{ __typename?: 'CreateEntryResponse', id: string, entries: Array<{ __typename?: 'Entries', id: string }> }> };

export type GetEntrySelectionsQueryVariables = {
  id: Scalars['ID']
};


export type GetEntrySelectionsQuery = { __typename?: 'Query', selections: Array<{ __typename?: 'Selection', id: string, pick_number: number, athlete: Maybe<{ __typename?: 'Athlete', id: string, first_name: string, last_name: string, school: string, position: string, school_standing: string, image: Maybe<string> }>, organization: { __typename?: 'Organization', id: string, name: string, city: string, image: string, primary_color: string } }> };

export type SearchPlayersQueryVariables = {
  year: Scalars['String'],
  searchText?: Maybe<Scalars['String']>
};


export type SearchPlayersQuery = { __typename?: 'Query', athletes: Array<{ __typename?: 'Athlete', id: string, first_name: string, last_name: string, image: Maybe<string>, school: string, position: string, school_standing: string, height: Maybe<string>, weight: Maybe<string>, description: Maybe<string> }> };

export type DraftOrderQueryVariables = {};


export type DraftOrderQuery = { __typename?: 'Query', draftOrder: Array<{ __typename?: 'DraftOrder', id: string, team: { __typename?: 'Organization', id: string, name: string } }> };

export type GetOrganizationsQueryVariables = {};


export type GetOrganizationsQuery = { __typename?: 'Query', organization: Maybe<{ __typename?: 'OrganizationPaginator', data: Array<{ __typename?: 'Organization', id: string, name: string, city: string, image: string, primary_color: string }> }> };

export type StageUserEntriesQueryVariables = {
  id: Scalars['ID']
};


export type StageUserEntriesQuery = { __typename?: 'Query', users: Maybe<{ __typename?: 'User', entries: Array<{ __typename?: 'Entries', id: string, name: string }> }> };

export type ForgotPasswordMutationVariables = {
  input: ForgotPasswordInput
};


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', status: string, message: Maybe<string> } };

export type UserEntriesQueryVariables = {
  id: Scalars['ID']
};


export type UserEntriesQuery = { __typename?: 'Query', users: Maybe<{ __typename?: 'User', id: string, entries: Array<{ __typename?: 'Entries', id: string, name: string }> }> };

export type DeleteEntryMutationVariables = {
  input: DeleteEntryInput
};


export type DeleteEntryMutation = { __typename?: 'Mutation', deleteEntry: Array<{ __typename?: 'Entries', id: string, name: string }> };

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', access_token: Maybe<string>, expires_in: Maybe<number>, user: Maybe<{ __typename?: 'User', id: string, first_name: string, last_name: string, username: string }> } };

export type UpdateForgottenPasswordMutationVariables = {
  input: NewPasswordWithCodeInput
};


export type UpdateForgottenPasswordMutation = { __typename?: 'Mutation', updateForgottenPassword: { __typename?: 'ForgotPasswordResponse', status: string, message: Maybe<string> } };

export type RegisterUserMutationVariables = {
  input: RegisterInput
};


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', status: RegisterStatuses } };

export type VerifyEmailMutationVariables = {
  input: VerifyEmailInput
};


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthPayload', user: Maybe<{ __typename?: 'User', id: string }> } };

export type GetEntriesQueryVariables = {};


export type GetEntriesQuery = { __typename?: 'Query', entries: Array<{ __typename?: 'Entries', id: string, score: Maybe<string>, name: string, user: Maybe<{ __typename?: 'User', username: string }>, selections: Array<{ __typename?: 'Selection', id: string, score: Maybe<string>, pick_number: number, athlete: Maybe<{ __typename?: 'Athlete', id: string, first_name: string, last_name: string, school: string, position: string, school_standing: string, image: Maybe<string> }>, organization: { __typename?: 'Organization', id: string, name: string, city: string, image: string, primary_color: string } }> }> };
