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
  eligible_year: Scalars['String'],
  height?: Maybe<Scalars['String']>,
  weight?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

/** A paginated list of Athlete items. */
export type AthletePaginator = {
   __typename?: 'AthletePaginator',
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo,
  /** A list of Athlete items. */
  data: Array<Athlete>,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  access_token?: Maybe<Scalars['String']>,
  refresh_token?: Maybe<Scalars['String']>,
  expires_in?: Maybe<Scalars['Int']>,
  token_type?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
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
  refreshToken: RefreshTokenPayload,
  logout: LogoutResponse,
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


export type MutationRefreshTokenArgs = {
  input?: Maybe<RefreshTokenInput>
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
  athletes?: Maybe<AthletePaginator>,
  athlete?: Maybe<Athlete>,
};


export type QueryAthletesArgs = {
  eligible_year: Scalars['String'],
  school?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryAthleteArgs = {
  id?: Maybe<Scalars['ID']>
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

export type User = {
   __typename?: 'User',
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
};

export type VerifyEmailInput = {
  token: Scalars['String'],
};

export type LogoutMutationVariables = {};


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', status: string, message: Maybe<string> } };

export type AthleteDataFragment = { __typename?: 'Athlete', id: string, first_name: string, last_name: string, school: string, position: string };

export type FetchAthletesQueryVariables = {
  year: Scalars['String']
};


export type FetchAthletesQuery = { __typename?: 'Query', athletes: Maybe<{ __typename?: 'AthletePaginator', data: Array<(
      { __typename?: 'Athlete' }
      & AthleteDataFragment
    )> }> };

export type FetchAthletesByIdQueryVariables = {
  id: Scalars['ID']
};


export type FetchAthletesByIdQuery = { __typename?: 'Query', athlete: Maybe<(
    { __typename?: 'Athlete', height: Maybe<string>, weight: Maybe<string>, description: Maybe<string>, image: Maybe<string> }
    & AthleteDataFragment
  )> };

export type FetchAthletesBySchoolQueryVariables = {
  year: Scalars['String'],
  school: Scalars['String']
};


export type FetchAthletesBySchoolQuery = { __typename?: 'Query', athletes: Maybe<{ __typename?: 'AthletePaginator', data: Array<(
      { __typename?: 'Athlete' }
      & AthleteDataFragment
    )> }> };

export type ForgotPasswordMutationVariables = {
  input: ForgotPasswordInput
};


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', status: string, message: Maybe<string> } };

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', access_token: Maybe<string>, expires_in: Maybe<number>, user: Maybe<{ __typename?: 'User', first_name: string, last_name: string, username: string }> } };

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


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthPayload', access_token: Maybe<string> } };
