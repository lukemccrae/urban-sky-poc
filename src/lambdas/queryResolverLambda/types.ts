import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddBalloon = {
  cameraPayload: Scalars['Int']['input'];
  constructionArea: ConstructionAreas;
  constructionLocation: Scalars['ID']['input'];
  constructionPhase: ConstructionPhases;
  envelopeType: EnvelopeTypes;
  gasType: GasTypes;
  id: Scalars['ID']['input'];
  model: BalloonModels;
  recoverySystem: RecoverySystems;
  sciencePayload?: InputMaybe<Scalars['Int']['input']>;
  trackingPayloadId: Scalars['Int']['input'];
};

export type AddBalloonResult = {
  __typename?: 'AddBalloonResult';
  balloons?: Maybe<Array<Maybe<Balloon>>>;
  success: Scalars['Boolean']['output'];
};

export type Balloon = {
  __typename?: 'Balloon';
  cameraPayload: Scalars['Int']['output'];
  constructionArea: ConstructionAreas;
  constructionLocation: Scalars['ID']['output'];
  constructionPhase: ConstructionPhases;
  envelopeType: EnvelopeTypes;
  gasType: GasTypes;
  id: Scalars['ID']['output'];
  model: BalloonModels;
  recoverySystem: RecoverySystems;
  sciencePayload?: Maybe<Scalars['Int']['output']>;
  trackingPayloadId: Scalars['Int']['output'];
};

export enum BalloonModels {
  LowAltitude = 'LOW_ALTITUDE',
  Microballoon = 'MICROBALLOON',
  Transosonde = 'TRANSOSONDE'
}

export enum ConstructionAreas {
  Bay_1 = 'BAY_1',
  Bay_2 = 'BAY_2',
  Bay_3 = 'BAY_3',
  Bay_4 = 'BAY_4',
  Bay_5 = 'BAY_5'
}

export enum ConstructionPhases {
  EnvelopeMolding = 'ENVELOPE_MOLDING',
  Packaging = 'PACKAGING',
  PayloadIntegration = 'PAYLOAD_INTEGRATION',
  SeamSealing = 'SEAM_SEALING',
  Testing = 'TESTING'
}

export enum EnvelopeTypes {
  Chloroprene = 'CHLOROPRENE',
  Latex = 'LATEX'
}

export enum GasTypes {
  Helium = 'HELIUM',
  Hydrogen = 'HYDROGEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBalloon: AddBalloonResult;
};


export type MutationAddBalloonArgs = {
  balloon: AddBalloon;
};

export type Query = {
  __typename?: 'Query';
  balloons?: Maybe<Array<Balloon>>;
  viewer?: Maybe<Viewer>;
};


export type QueryBalloonsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryViewerArgs = {
  id: Scalars['ID']['input'];
};

export enum RecoverySystems {
  CutDown = 'CUT_DOWN',
  Parachute = 'PARACHUTE',
  SoftLanding = 'SOFT_LANDING'
}

export type Viewer = {
  __typename?: 'Viewer';
  balloons: Array<Maybe<Balloon>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};


export type ViewerBalloonsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddBalloon: AddBalloon;
  AddBalloonResult: ResolverTypeWrapper<AddBalloonResult>;
  Balloon: ResolverTypeWrapper<Balloon>;
  BalloonModels: BalloonModels;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ConstructionAreas: ConstructionAreas;
  ConstructionPhases: ConstructionPhases;
  EnvelopeTypes: EnvelopeTypes;
  GasTypes: GasTypes;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RecoverySystems: RecoverySystems;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Viewer: ResolverTypeWrapper<Viewer>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddBalloon: AddBalloon;
  AddBalloonResult: AddBalloonResult;
  Balloon: Balloon;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Viewer: Viewer;
};

export type AddBalloonResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddBalloonResult'] = ResolversParentTypes['AddBalloonResult']> = {
  balloons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Balloon']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BalloonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Balloon'] = ResolversParentTypes['Balloon']> = {
  cameraPayload?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  constructionArea?: Resolver<ResolversTypes['ConstructionAreas'], ParentType, ContextType>;
  constructionLocation?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  constructionPhase?: Resolver<ResolversTypes['ConstructionPhases'], ParentType, ContextType>;
  envelopeType?: Resolver<ResolversTypes['EnvelopeTypes'], ParentType, ContextType>;
  gasType?: Resolver<ResolversTypes['GasTypes'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  model?: Resolver<ResolversTypes['BalloonModels'], ParentType, ContextType>;
  recoverySystem?: Resolver<ResolversTypes['RecoverySystems'], ParentType, ContextType>;
  sciencePayload?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  trackingPayloadId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBalloon?: Resolver<ResolversTypes['AddBalloonResult'], ParentType, ContextType, RequireFields<MutationAddBalloonArgs, 'balloon'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  balloons?: Resolver<Maybe<Array<ResolversTypes['Balloon']>>, ParentType, ContextType, Partial<QueryBalloonsArgs>>;
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType, RequireFields<QueryViewerArgs, 'id'>>;
};

export type ViewerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = {
  balloons?: Resolver<Array<Maybe<ResolversTypes['Balloon']>>, ParentType, ContextType, Partial<ViewerBalloonsArgs>>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddBalloonResult?: AddBalloonResultResolvers<ContextType>;
  Balloon?: BalloonResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

