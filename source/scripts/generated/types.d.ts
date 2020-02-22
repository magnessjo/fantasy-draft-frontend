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
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  school: Scalars['String'],
  position: Scalars['String'],
  schoolStanding: Scalars['String'],
  eligibleYear: Scalars['String'],
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



export type Mutation = {
   __typename?: 'Mutation',
  createUser: User,
};


export type MutationCreateUserArgs = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
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
  users?: Maybe<UserPaginator>,
  user?: Maybe<User>,
  athletes?: Maybe<AthletePaginator>,
  athlete?: Maybe<Athlete>,
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryAthletesArgs = {
  eligibleYear: Scalars['String'],
  school?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryAthleteArgs = {
  id?: Maybe<Scalars['ID']>
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

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

/** A paginated list of User items. */
export type UserPaginator = {
   __typename?: 'UserPaginator',
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo,
  /** A list of User items. */
  data: Array<User>,
};

export type AthleteDataFragment = { __typename?: 'Athlete', id: string, firstName: string, lastName: string, school: string, position: string };

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

export type CreateUserMutationVariables = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String']
};


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName: string } };
