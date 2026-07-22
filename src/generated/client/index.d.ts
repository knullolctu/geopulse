
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model admin
 * 
 */
export type admin = $Result.DefaultSelection<Prisma.$adminPayload>
/**
 * Model adminsession
 * 
 */
export type adminsession = $Result.DefaultSelection<Prisma.$adminsessionPayload>
/**
 * Model attendancelog
 * 
 */
export type attendancelog = $Result.DefaultSelection<Prisma.$attendancelogPayload>
/**
 * Model attendee
 * 
 */
export type attendee = $Result.DefaultSelection<Prisma.$attendeePayload>
/**
 * Model attendeesession
 * 
 */
export type attendeesession = $Result.DefaultSelection<Prisma.$attendeesessionPayload>
/**
 * Model category
 * 
 */
export type category = $Result.DefaultSelection<Prisma.$categoryPayload>
/**
 * Model client
 * 
 */
export type client = $Result.DefaultSelection<Prisma.$clientPayload>
/**
 * Model clientsession
 * 
 */
export type clientsession = $Result.DefaultSelection<Prisma.$clientsessionPayload>
/**
 * Model enrollment
 * 
 */
export type enrollment = $Result.DefaultSelection<Prisma.$enrollmentPayload>
/**
 * Model geofence
 * 
 */
export type geofence = $Result.DefaultSelection<Prisma.$geofencePayload>
/**
 * Model organization
 * 
 */
export type organization = $Result.DefaultSelection<Prisma.$organizationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.adminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminsession`: Exposes CRUD operations for the **adminsession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Adminsessions
    * const adminsessions = await prisma.adminsession.findMany()
    * ```
    */
  get adminsession(): Prisma.adminsessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendancelog`: Exposes CRUD operations for the **attendancelog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendancelogs
    * const attendancelogs = await prisma.attendancelog.findMany()
    * ```
    */
  get attendancelog(): Prisma.attendancelogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendee`: Exposes CRUD operations for the **attendee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendees
    * const attendees = await prisma.attendee.findMany()
    * ```
    */
  get attendee(): Prisma.attendeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendeesession`: Exposes CRUD operations for the **attendeesession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendeesessions
    * const attendeesessions = await prisma.attendeesession.findMany()
    * ```
    */
  get attendeesession(): Prisma.attendeesessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.clientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clientsession`: Exposes CRUD operations for the **clientsession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientsessions
    * const clientsessions = await prisma.clientsession.findMany()
    * ```
    */
  get clientsession(): Prisma.clientsessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.enrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.geofence`: Exposes CRUD operations for the **geofence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Geofences
    * const geofences = await prisma.geofence.findMany()
    * ```
    */
  get geofence(): Prisma.geofenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.organizationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    admin: 'admin',
    adminsession: 'adminsession',
    attendancelog: 'attendancelog',
    attendee: 'attendee',
    attendeesession: 'attendeesession',
    category: 'category',
    client: 'client',
    clientsession: 'clientsession',
    enrollment: 'enrollment',
    geofence: 'geofence',
    organization: 'organization'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "admin" | "adminsession" | "attendancelog" | "attendee" | "attendeesession" | "category" | "client" | "clientsession" | "enrollment" | "geofence" | "organization"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      admin: {
        payload: Prisma.$adminPayload<ExtArgs>
        fields: Prisma.adminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findFirst: {
            args: Prisma.adminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findMany: {
            args: Prisma.adminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          create: {
            args: Prisma.adminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          createMany: {
            args: Prisma.adminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.adminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          update: {
            args: Prisma.adminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          deleteMany: {
            args: Prisma.adminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.adminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.adminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.adminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      adminsession: {
        payload: Prisma.$adminsessionPayload<ExtArgs>
        fields: Prisma.adminsessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminsessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminsessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>
          }
          findFirst: {
            args: Prisma.adminsessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminsessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>
          }
          findMany: {
            args: Prisma.adminsessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>[]
          }
          create: {
            args: Prisma.adminsessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>
          }
          createMany: {
            args: Prisma.adminsessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.adminsessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>
          }
          update: {
            args: Prisma.adminsessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>
          }
          deleteMany: {
            args: Prisma.adminsessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminsessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.adminsessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsessionPayload>
          }
          aggregate: {
            args: Prisma.AdminsessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminsession>
          }
          groupBy: {
            args: Prisma.adminsessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminsessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.adminsessionCountArgs<ExtArgs>
            result: $Utils.Optional<AdminsessionCountAggregateOutputType> | number
          }
        }
      }
      attendancelog: {
        payload: Prisma.$attendancelogPayload<ExtArgs>
        fields: Prisma.attendancelogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attendancelogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attendancelogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>
          }
          findFirst: {
            args: Prisma.attendancelogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attendancelogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>
          }
          findMany: {
            args: Prisma.attendancelogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>[]
          }
          create: {
            args: Prisma.attendancelogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>
          }
          createMany: {
            args: Prisma.attendancelogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.attendancelogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>
          }
          update: {
            args: Prisma.attendancelogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>
          }
          deleteMany: {
            args: Prisma.attendancelogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attendancelogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.attendancelogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendancelogPayload>
          }
          aggregate: {
            args: Prisma.AttendancelogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendancelog>
          }
          groupBy: {
            args: Prisma.attendancelogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendancelogGroupByOutputType>[]
          }
          count: {
            args: Prisma.attendancelogCountArgs<ExtArgs>
            result: $Utils.Optional<AttendancelogCountAggregateOutputType> | number
          }
        }
      }
      attendee: {
        payload: Prisma.$attendeePayload<ExtArgs>
        fields: Prisma.attendeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attendeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attendeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>
          }
          findFirst: {
            args: Prisma.attendeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attendeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>
          }
          findMany: {
            args: Prisma.attendeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>[]
          }
          create: {
            args: Prisma.attendeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>
          }
          createMany: {
            args: Prisma.attendeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.attendeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>
          }
          update: {
            args: Prisma.attendeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>
          }
          deleteMany: {
            args: Prisma.attendeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attendeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.attendeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeePayload>
          }
          aggregate: {
            args: Prisma.AttendeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendee>
          }
          groupBy: {
            args: Prisma.attendeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.attendeeCountArgs<ExtArgs>
            result: $Utils.Optional<AttendeeCountAggregateOutputType> | number
          }
        }
      }
      attendeesession: {
        payload: Prisma.$attendeesessionPayload<ExtArgs>
        fields: Prisma.attendeesessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attendeesessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attendeesessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>
          }
          findFirst: {
            args: Prisma.attendeesessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attendeesessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>
          }
          findMany: {
            args: Prisma.attendeesessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>[]
          }
          create: {
            args: Prisma.attendeesessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>
          }
          createMany: {
            args: Prisma.attendeesessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.attendeesessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>
          }
          update: {
            args: Prisma.attendeesessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>
          }
          deleteMany: {
            args: Prisma.attendeesessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attendeesessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.attendeesessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendeesessionPayload>
          }
          aggregate: {
            args: Prisma.AttendeesessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendeesession>
          }
          groupBy: {
            args: Prisma.attendeesessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendeesessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.attendeesessionCountArgs<ExtArgs>
            result: $Utils.Optional<AttendeesessionCountAggregateOutputType> | number
          }
        }
      }
      category: {
        payload: Prisma.$categoryPayload<ExtArgs>
        fields: Prisma.categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findFirst: {
            args: Prisma.categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findMany: {
            args: Prisma.categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          create: {
            args: Prisma.categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          createMany: {
            args: Prisma.categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          update: {
            args: Prisma.categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          deleteMany: {
            args: Prisma.categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      client: {
        payload: Prisma.$clientPayload<ExtArgs>
        fields: Prisma.clientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.clientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.clientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>
          }
          findFirst: {
            args: Prisma.clientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.clientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>
          }
          findMany: {
            args: Prisma.clientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>[]
          }
          create: {
            args: Prisma.clientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>
          }
          createMany: {
            args: Prisma.clientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.clientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>
          }
          update: {
            args: Prisma.clientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>
          }
          deleteMany: {
            args: Prisma.clientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.clientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.clientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.clientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.clientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      clientsession: {
        payload: Prisma.$clientsessionPayload<ExtArgs>
        fields: Prisma.clientsessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.clientsessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.clientsessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>
          }
          findFirst: {
            args: Prisma.clientsessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.clientsessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>
          }
          findMany: {
            args: Prisma.clientsessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>[]
          }
          create: {
            args: Prisma.clientsessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>
          }
          createMany: {
            args: Prisma.clientsessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.clientsessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>
          }
          update: {
            args: Prisma.clientsessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>
          }
          deleteMany: {
            args: Prisma.clientsessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.clientsessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.clientsessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientsessionPayload>
          }
          aggregate: {
            args: Prisma.ClientsessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientsession>
          }
          groupBy: {
            args: Prisma.clientsessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientsessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.clientsessionCountArgs<ExtArgs>
            result: $Utils.Optional<ClientsessionCountAggregateOutputType> | number
          }
        }
      }
      enrollment: {
        payload: Prisma.$enrollmentPayload<ExtArgs>
        fields: Prisma.enrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.enrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.enrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>
          }
          findFirst: {
            args: Prisma.enrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.enrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>
          }
          findMany: {
            args: Prisma.enrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>[]
          }
          create: {
            args: Prisma.enrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>
          }
          createMany: {
            args: Prisma.enrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.enrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>
          }
          update: {
            args: Prisma.enrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>
          }
          deleteMany: {
            args: Prisma.enrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.enrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.enrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$enrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.enrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.enrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      geofence: {
        payload: Prisma.$geofencePayload<ExtArgs>
        fields: Prisma.geofenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.geofenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.geofenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>
          }
          findFirst: {
            args: Prisma.geofenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.geofenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>
          }
          findMany: {
            args: Prisma.geofenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>[]
          }
          create: {
            args: Prisma.geofenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>
          }
          createMany: {
            args: Prisma.geofenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.geofenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>
          }
          update: {
            args: Prisma.geofenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>
          }
          deleteMany: {
            args: Prisma.geofenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.geofenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.geofenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$geofencePayload>
          }
          aggregate: {
            args: Prisma.GeofenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeofence>
          }
          groupBy: {
            args: Prisma.geofenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeofenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.geofenceCountArgs<ExtArgs>
            result: $Utils.Optional<GeofenceCountAggregateOutputType> | number
          }
        }
      }
      organization: {
        payload: Prisma.$organizationPayload<ExtArgs>
        fields: Prisma.organizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.organizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.organizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          findFirst: {
            args: Prisma.organizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.organizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          findMany: {
            args: Prisma.organizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>[]
          }
          create: {
            args: Prisma.organizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          createMany: {
            args: Prisma.organizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.organizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          update: {
            args: Prisma.organizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          deleteMany: {
            args: Prisma.organizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.organizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.organizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$organizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.organizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.organizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    admin?: adminOmit
    adminsession?: adminsessionOmit
    attendancelog?: attendancelogOmit
    attendee?: attendeeOmit
    attendeesession?: attendeesessionOmit
    category?: categoryOmit
    client?: clientOmit
    clientsession?: clientsessionOmit
    enrollment?: enrollmentOmit
    geofence?: geofenceOmit
    organization?: organizationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    adminsession: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminsession?: boolean | AdminCountOutputTypeCountAdminsessionArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountAdminsessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminsessionWhereInput
  }


  /**
   * Count Type AttendeeCountOutputType
   */

  export type AttendeeCountOutputType = {
    attendancelog: number
    attendeesession: number
    enrollment: number
  }

  export type AttendeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendancelog?: boolean | AttendeeCountOutputTypeCountAttendancelogArgs
    attendeesession?: boolean | AttendeeCountOutputTypeCountAttendeesessionArgs
    enrollment?: boolean | AttendeeCountOutputTypeCountEnrollmentArgs
  }

  // Custom InputTypes
  /**
   * AttendeeCountOutputType without action
   */
  export type AttendeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendeeCountOutputType
     */
    select?: AttendeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttendeeCountOutputType without action
   */
  export type AttendeeCountOutputTypeCountAttendancelogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendancelogWhereInput
  }

  /**
   * AttendeeCountOutputType without action
   */
  export type AttendeeCountOutputTypeCountAttendeesessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendeesessionWhereInput
  }

  /**
   * AttendeeCountOutputType without action
   */
  export type AttendeeCountOutputTypeCountEnrollmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: enrollmentWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    attendee: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | CategoryCountOutputTypeCountAttendeeArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountAttendeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendeeWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    clientsession: number
    geofence: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clientsession?: boolean | ClientCountOutputTypeCountClientsessionArgs
    geofence?: boolean | ClientCountOutputTypeCountGeofenceArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountClientsessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: clientsessionWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountGeofenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: geofenceWhereInput
  }


  /**
   * Count Type GeofenceCountOutputType
   */

  export type GeofenceCountOutputType = {
    attendancelog: number
    enrollment: number
  }

  export type GeofenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendancelog?: boolean | GeofenceCountOutputTypeCountAttendancelogArgs
    enrollment?: boolean | GeofenceCountOutputTypeCountEnrollmentArgs
  }

  // Custom InputTypes
  /**
   * GeofenceCountOutputType without action
   */
  export type GeofenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceCountOutputType
     */
    select?: GeofenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GeofenceCountOutputType without action
   */
  export type GeofenceCountOutputTypeCountAttendancelogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendancelogWhereInput
  }

  /**
   * GeofenceCountOutputType without action
   */
  export type GeofenceCountOutputTypeCountEnrollmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: enrollmentWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    attendee: number
    category: number
    client: number
    geofence_geofence_orgIdToorganization: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | OrganizationCountOutputTypeCountAttendeeArgs
    category?: boolean | OrganizationCountOutputTypeCountCategoryArgs
    client?: boolean | OrganizationCountOutputTypeCountClientArgs
    geofence_geofence_orgIdToorganization?: boolean | OrganizationCountOutputTypeCountGeofence_geofence_orgIdToorganizationArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountAttendeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendeeWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: clientWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountGeofence_geofence_orgIdToorganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: geofenceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    birthDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    birthDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    birthDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin to aggregate.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type adminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminWhereInput
    orderBy?: adminOrderByWithAggregationInput | adminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: adminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminsession?: boolean | admin$adminsessionArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>



  export type adminSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type adminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "birthDate" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>
  export type adminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminsession?: boolean | admin$adminsessionArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $adminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin"
    objects: {
      adminsession: Prisma.$adminsessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      birthDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type adminGetPayload<S extends boolean | null | undefined | adminDefaultArgs> = $Result.GetResult<Prisma.$adminPayload, S>

  type adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<adminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface adminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admin'], meta: { name: 'admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {adminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminFindUniqueArgs>(args: SelectSubset<T, adminFindUniqueArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {adminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminFindUniqueOrThrowArgs>(args: SelectSubset<T, adminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminFindFirstArgs>(args?: SelectSubset<T, adminFindFirstArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminFindFirstOrThrowArgs>(args?: SelectSubset<T, adminFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends adminFindManyArgs>(args?: SelectSubset<T, adminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {adminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends adminCreateArgs>(args: SelectSubset<T, adminCreateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {adminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminCreateManyArgs>(args?: SelectSubset<T, adminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {adminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends adminDeleteArgs>(args: SelectSubset<T, adminDeleteArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {adminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminUpdateArgs>(args: SelectSubset<T, adminUpdateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {adminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminDeleteManyArgs>(args?: SelectSubset<T, adminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminUpdateManyArgs>(args: SelectSubset<T, adminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {adminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends adminUpsertArgs>(args: SelectSubset<T, adminUpsertArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends adminCountArgs>(
      args?: Subset<T, adminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminGroupByArgs['orderBy'] }
        : { orderBy?: adminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admin model
   */
  readonly fields: adminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminsession<T extends admin$adminsessionArgs<ExtArgs> = {}>(args?: Subset<T, admin$adminsessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admin model
   */
  interface adminFieldRefs {
    readonly id: FieldRef<"admin", 'String'>
    readonly email: FieldRef<"admin", 'String'>
    readonly name: FieldRef<"admin", 'String'>
    readonly passwordHash: FieldRef<"admin", 'String'>
    readonly birthDate: FieldRef<"admin", 'DateTime'>
    readonly createdAt: FieldRef<"admin", 'DateTime'>
    readonly updatedAt: FieldRef<"admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * admin findUnique
   */
  export type adminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findUniqueOrThrow
   */
  export type adminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findFirst
   */
  export type adminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findFirstOrThrow
   */
  export type adminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findMany
   */
  export type adminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin create
   */
  export type adminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The data needed to create a admin.
     */
    data: XOR<adminCreateInput, adminUncheckedCreateInput>
  }

  /**
   * admin createMany
   */
  export type adminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin update
   */
  export type adminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The data needed to update a admin.
     */
    data: XOR<adminUpdateInput, adminUncheckedUpdateInput>
    /**
     * Choose, which admin to update.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin updateMany
   */
  export type adminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
  }

  /**
   * admin upsert
   */
  export type adminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The filter to search for the admin to update in case it exists.
     */
    where: adminWhereUniqueInput
    /**
     * In case the admin found by the `where` argument doesn't exist, create a new admin with this data.
     */
    create: XOR<adminCreateInput, adminUncheckedCreateInput>
    /**
     * In case the admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminUpdateInput, adminUncheckedUpdateInput>
  }

  /**
   * admin delete
   */
  export type adminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter which admin to delete.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin deleteMany
   */
  export type adminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to delete
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to delete.
     */
    limit?: number
  }

  /**
   * admin.adminsession
   */
  export type admin$adminsessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    where?: adminsessionWhereInput
    orderBy?: adminsessionOrderByWithRelationInput | adminsessionOrderByWithRelationInput[]
    cursor?: adminsessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminsessionScalarFieldEnum | AdminsessionScalarFieldEnum[]
  }

  /**
   * admin without action
   */
  export type adminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
  }


  /**
   * Model adminsession
   */

  export type AggregateAdminsession = {
    _count: AdminsessionCountAggregateOutputType | null
    _min: AdminsessionMinAggregateOutputType | null
    _max: AdminsessionMaxAggregateOutputType | null
  }

  export type AdminsessionMinAggregateOutputType = {
    id: string | null
    adminId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AdminsessionMaxAggregateOutputType = {
    id: string | null
    adminId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AdminsessionCountAggregateOutputType = {
    id: number
    adminId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type AdminsessionMinAggregateInputType = {
    id?: true
    adminId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AdminsessionMaxAggregateInputType = {
    id?: true
    adminId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AdminsessionCountAggregateInputType = {
    id?: true
    adminId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type AdminsessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which adminsession to aggregate.
     */
    where?: adminsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of adminsessions to fetch.
     */
    orderBy?: adminsessionOrderByWithRelationInput | adminsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` adminsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` adminsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned adminsessions
    **/
    _count?: true | AdminsessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminsessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminsessionMaxAggregateInputType
  }

  export type GetAdminsessionAggregateType<T extends AdminsessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminsession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminsession[P]>
      : GetScalarType<T[P], AggregateAdminsession[P]>
  }




  export type adminsessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminsessionWhereInput
    orderBy?: adminsessionOrderByWithAggregationInput | adminsessionOrderByWithAggregationInput[]
    by: AdminsessionScalarFieldEnum[] | AdminsessionScalarFieldEnum
    having?: adminsessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminsessionCountAggregateInputType | true
    _min?: AdminsessionMinAggregateInputType
    _max?: AdminsessionMaxAggregateInputType
  }

  export type AdminsessionGroupByOutputType = {
    id: string
    adminId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: AdminsessionCountAggregateOutputType | null
    _min: AdminsessionMinAggregateOutputType | null
    _max: AdminsessionMaxAggregateOutputType | null
  }

  type GetAdminsessionGroupByPayload<T extends adminsessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminsessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminsessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminsessionGroupByOutputType[P]>
            : GetScalarType<T[P], AdminsessionGroupByOutputType[P]>
        }
      >
    >


  export type adminsessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    admin?: boolean | adminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminsession"]>



  export type adminsessionSelectScalar = {
    id?: boolean
    adminId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type adminsessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["adminsession"]>
  export type adminsessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | adminDefaultArgs<ExtArgs>
  }

  export type $adminsessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "adminsession"
    objects: {
      admin: Prisma.$adminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["adminsession"]>
    composites: {}
  }

  type adminsessionGetPayload<S extends boolean | null | undefined | adminsessionDefaultArgs> = $Result.GetResult<Prisma.$adminsessionPayload, S>

  type adminsessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<adminsessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminsessionCountAggregateInputType | true
    }

  export interface adminsessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['adminsession'], meta: { name: 'adminsession' } }
    /**
     * Find zero or one Adminsession that matches the filter.
     * @param {adminsessionFindUniqueArgs} args - Arguments to find a Adminsession
     * @example
     * // Get one Adminsession
     * const adminsession = await prisma.adminsession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminsessionFindUniqueArgs>(args: SelectSubset<T, adminsessionFindUniqueArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Adminsession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {adminsessionFindUniqueOrThrowArgs} args - Arguments to find a Adminsession
     * @example
     * // Get one Adminsession
     * const adminsession = await prisma.adminsession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminsessionFindUniqueOrThrowArgs>(args: SelectSubset<T, adminsessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Adminsession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsessionFindFirstArgs} args - Arguments to find a Adminsession
     * @example
     * // Get one Adminsession
     * const adminsession = await prisma.adminsession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminsessionFindFirstArgs>(args?: SelectSubset<T, adminsessionFindFirstArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Adminsession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsessionFindFirstOrThrowArgs} args - Arguments to find a Adminsession
     * @example
     * // Get one Adminsession
     * const adminsession = await prisma.adminsession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminsessionFindFirstOrThrowArgs>(args?: SelectSubset<T, adminsessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Adminsessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Adminsessions
     * const adminsessions = await prisma.adminsession.findMany()
     * 
     * // Get first 10 Adminsessions
     * const adminsessions = await prisma.adminsession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminsessionWithIdOnly = await prisma.adminsession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends adminsessionFindManyArgs>(args?: SelectSubset<T, adminsessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Adminsession.
     * @param {adminsessionCreateArgs} args - Arguments to create a Adminsession.
     * @example
     * // Create one Adminsession
     * const Adminsession = await prisma.adminsession.create({
     *   data: {
     *     // ... data to create a Adminsession
     *   }
     * })
     * 
     */
    create<T extends adminsessionCreateArgs>(args: SelectSubset<T, adminsessionCreateArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Adminsessions.
     * @param {adminsessionCreateManyArgs} args - Arguments to create many Adminsessions.
     * @example
     * // Create many Adminsessions
     * const adminsession = await prisma.adminsession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminsessionCreateManyArgs>(args?: SelectSubset<T, adminsessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Adminsession.
     * @param {adminsessionDeleteArgs} args - Arguments to delete one Adminsession.
     * @example
     * // Delete one Adminsession
     * const Adminsession = await prisma.adminsession.delete({
     *   where: {
     *     // ... filter to delete one Adminsession
     *   }
     * })
     * 
     */
    delete<T extends adminsessionDeleteArgs>(args: SelectSubset<T, adminsessionDeleteArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Adminsession.
     * @param {adminsessionUpdateArgs} args - Arguments to update one Adminsession.
     * @example
     * // Update one Adminsession
     * const adminsession = await prisma.adminsession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminsessionUpdateArgs>(args: SelectSubset<T, adminsessionUpdateArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Adminsessions.
     * @param {adminsessionDeleteManyArgs} args - Arguments to filter Adminsessions to delete.
     * @example
     * // Delete a few Adminsessions
     * const { count } = await prisma.adminsession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminsessionDeleteManyArgs>(args?: SelectSubset<T, adminsessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Adminsessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Adminsessions
     * const adminsession = await prisma.adminsession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminsessionUpdateManyArgs>(args: SelectSubset<T, adminsessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Adminsession.
     * @param {adminsessionUpsertArgs} args - Arguments to update or create a Adminsession.
     * @example
     * // Update or create a Adminsession
     * const adminsession = await prisma.adminsession.upsert({
     *   create: {
     *     // ... data to create a Adminsession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Adminsession we want to update
     *   }
     * })
     */
    upsert<T extends adminsessionUpsertArgs>(args: SelectSubset<T, adminsessionUpsertArgs<ExtArgs>>): Prisma__adminsessionClient<$Result.GetResult<Prisma.$adminsessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Adminsessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsessionCountArgs} args - Arguments to filter Adminsessions to count.
     * @example
     * // Count the number of Adminsessions
     * const count = await prisma.adminsession.count({
     *   where: {
     *     // ... the filter for the Adminsessions we want to count
     *   }
     * })
    **/
    count<T extends adminsessionCountArgs>(
      args?: Subset<T, adminsessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminsessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Adminsession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminsessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminsessionAggregateArgs>(args: Subset<T, AdminsessionAggregateArgs>): Prisma.PrismaPromise<GetAdminsessionAggregateType<T>>

    /**
     * Group by Adminsession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminsessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminsessionGroupByArgs['orderBy'] }
        : { orderBy?: adminsessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminsessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminsessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the adminsession model
   */
  readonly fields: adminsessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for adminsession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminsessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends adminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, adminDefaultArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the adminsession model
   */
  interface adminsessionFieldRefs {
    readonly id: FieldRef<"adminsession", 'String'>
    readonly adminId: FieldRef<"adminsession", 'String'>
    readonly token: FieldRef<"adminsession", 'String'>
    readonly expiresAt: FieldRef<"adminsession", 'DateTime'>
    readonly createdAt: FieldRef<"adminsession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * adminsession findUnique
   */
  export type adminsessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * Filter, which adminsession to fetch.
     */
    where: adminsessionWhereUniqueInput
  }

  /**
   * adminsession findUniqueOrThrow
   */
  export type adminsessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * Filter, which adminsession to fetch.
     */
    where: adminsessionWhereUniqueInput
  }

  /**
   * adminsession findFirst
   */
  export type adminsessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * Filter, which adminsession to fetch.
     */
    where?: adminsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of adminsessions to fetch.
     */
    orderBy?: adminsessionOrderByWithRelationInput | adminsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for adminsessions.
     */
    cursor?: adminsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` adminsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` adminsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of adminsessions.
     */
    distinct?: AdminsessionScalarFieldEnum | AdminsessionScalarFieldEnum[]
  }

  /**
   * adminsession findFirstOrThrow
   */
  export type adminsessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * Filter, which adminsession to fetch.
     */
    where?: adminsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of adminsessions to fetch.
     */
    orderBy?: adminsessionOrderByWithRelationInput | adminsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for adminsessions.
     */
    cursor?: adminsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` adminsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` adminsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of adminsessions.
     */
    distinct?: AdminsessionScalarFieldEnum | AdminsessionScalarFieldEnum[]
  }

  /**
   * adminsession findMany
   */
  export type adminsessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * Filter, which adminsessions to fetch.
     */
    where?: adminsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of adminsessions to fetch.
     */
    orderBy?: adminsessionOrderByWithRelationInput | adminsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing adminsessions.
     */
    cursor?: adminsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` adminsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` adminsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of adminsessions.
     */
    distinct?: AdminsessionScalarFieldEnum | AdminsessionScalarFieldEnum[]
  }

  /**
   * adminsession create
   */
  export type adminsessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * The data needed to create a adminsession.
     */
    data: XOR<adminsessionCreateInput, adminsessionUncheckedCreateInput>
  }

  /**
   * adminsession createMany
   */
  export type adminsessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many adminsessions.
     */
    data: adminsessionCreateManyInput | adminsessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * adminsession update
   */
  export type adminsessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * The data needed to update a adminsession.
     */
    data: XOR<adminsessionUpdateInput, adminsessionUncheckedUpdateInput>
    /**
     * Choose, which adminsession to update.
     */
    where: adminsessionWhereUniqueInput
  }

  /**
   * adminsession updateMany
   */
  export type adminsessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update adminsessions.
     */
    data: XOR<adminsessionUpdateManyMutationInput, adminsessionUncheckedUpdateManyInput>
    /**
     * Filter which adminsessions to update
     */
    where?: adminsessionWhereInput
    /**
     * Limit how many adminsessions to update.
     */
    limit?: number
  }

  /**
   * adminsession upsert
   */
  export type adminsessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * The filter to search for the adminsession to update in case it exists.
     */
    where: adminsessionWhereUniqueInput
    /**
     * In case the adminsession found by the `where` argument doesn't exist, create a new adminsession with this data.
     */
    create: XOR<adminsessionCreateInput, adminsessionUncheckedCreateInput>
    /**
     * In case the adminsession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminsessionUpdateInput, adminsessionUncheckedUpdateInput>
  }

  /**
   * adminsession delete
   */
  export type adminsessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
    /**
     * Filter which adminsession to delete.
     */
    where: adminsessionWhereUniqueInput
  }

  /**
   * adminsession deleteMany
   */
  export type adminsessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which adminsessions to delete
     */
    where?: adminsessionWhereInput
    /**
     * Limit how many adminsessions to delete.
     */
    limit?: number
  }

  /**
   * adminsession without action
   */
  export type adminsessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the adminsession
     */
    select?: adminsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the adminsession
     */
    omit?: adminsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminsessionInclude<ExtArgs> | null
  }


  /**
   * Model attendancelog
   */

  export type AggregateAttendancelog = {
    _count: AttendancelogCountAggregateOutputType | null
    _avg: AttendancelogAvgAggregateOutputType | null
    _sum: AttendancelogSumAggregateOutputType | null
    _min: AttendancelogMinAggregateOutputType | null
    _max: AttendancelogMaxAggregateOutputType | null
  }

  export type AttendancelogAvgAggregateOutputType = {
    deviceLat: number | null
    deviceLng: number | null
  }

  export type AttendancelogSumAggregateOutputType = {
    deviceLat: number | null
    deviceLng: number | null
  }

  export type AttendancelogMinAggregateOutputType = {
    id: string | null
    attendeeId: string | null
    geofenceId: string | null
    deviceLat: number | null
    deviceLng: number | null
    isMock: boolean | null
    status: string | null
    timestamp: Date | null
    afternoonTimeOut: Date | null
    morningTimeIn: Date | null
    afternoonTimeIn: Date | null
    morningTimeOut: Date | null
  }

  export type AttendancelogMaxAggregateOutputType = {
    id: string | null
    attendeeId: string | null
    geofenceId: string | null
    deviceLat: number | null
    deviceLng: number | null
    isMock: boolean | null
    status: string | null
    timestamp: Date | null
    afternoonTimeOut: Date | null
    morningTimeIn: Date | null
    afternoonTimeIn: Date | null
    morningTimeOut: Date | null
  }

  export type AttendancelogCountAggregateOutputType = {
    id: number
    attendeeId: number
    geofenceId: number
    deviceLat: number
    deviceLng: number
    isMock: number
    status: number
    timestamp: number
    afternoonTimeOut: number
    morningTimeIn: number
    afternoonTimeIn: number
    morningTimeOut: number
    _all: number
  }


  export type AttendancelogAvgAggregateInputType = {
    deviceLat?: true
    deviceLng?: true
  }

  export type AttendancelogSumAggregateInputType = {
    deviceLat?: true
    deviceLng?: true
  }

  export type AttendancelogMinAggregateInputType = {
    id?: true
    attendeeId?: true
    geofenceId?: true
    deviceLat?: true
    deviceLng?: true
    isMock?: true
    status?: true
    timestamp?: true
    afternoonTimeOut?: true
    morningTimeIn?: true
    afternoonTimeIn?: true
    morningTimeOut?: true
  }

  export type AttendancelogMaxAggregateInputType = {
    id?: true
    attendeeId?: true
    geofenceId?: true
    deviceLat?: true
    deviceLng?: true
    isMock?: true
    status?: true
    timestamp?: true
    afternoonTimeOut?: true
    morningTimeIn?: true
    afternoonTimeIn?: true
    morningTimeOut?: true
  }

  export type AttendancelogCountAggregateInputType = {
    id?: true
    attendeeId?: true
    geofenceId?: true
    deviceLat?: true
    deviceLng?: true
    isMock?: true
    status?: true
    timestamp?: true
    afternoonTimeOut?: true
    morningTimeIn?: true
    afternoonTimeIn?: true
    morningTimeOut?: true
    _all?: true
  }

  export type AttendancelogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendancelog to aggregate.
     */
    where?: attendancelogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendancelogs to fetch.
     */
    orderBy?: attendancelogOrderByWithRelationInput | attendancelogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attendancelogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendancelogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendancelogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attendancelogs
    **/
    _count?: true | AttendancelogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendancelogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendancelogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendancelogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendancelogMaxAggregateInputType
  }

  export type GetAttendancelogAggregateType<T extends AttendancelogAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendancelog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendancelog[P]>
      : GetScalarType<T[P], AggregateAttendancelog[P]>
  }




  export type attendancelogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendancelogWhereInput
    orderBy?: attendancelogOrderByWithAggregationInput | attendancelogOrderByWithAggregationInput[]
    by: AttendancelogScalarFieldEnum[] | AttendancelogScalarFieldEnum
    having?: attendancelogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendancelogCountAggregateInputType | true
    _avg?: AttendancelogAvgAggregateInputType
    _sum?: AttendancelogSumAggregateInputType
    _min?: AttendancelogMinAggregateInputType
    _max?: AttendancelogMaxAggregateInputType
  }

  export type AttendancelogGroupByOutputType = {
    id: string
    attendeeId: string
    geofenceId: string
    deviceLat: number
    deviceLng: number
    isMock: boolean
    status: string
    timestamp: Date
    afternoonTimeOut: Date | null
    morningTimeIn: Date | null
    afternoonTimeIn: Date | null
    morningTimeOut: Date | null
    _count: AttendancelogCountAggregateOutputType | null
    _avg: AttendancelogAvgAggregateOutputType | null
    _sum: AttendancelogSumAggregateOutputType | null
    _min: AttendancelogMinAggregateOutputType | null
    _max: AttendancelogMaxAggregateOutputType | null
  }

  type GetAttendancelogGroupByPayload<T extends attendancelogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendancelogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendancelogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendancelogGroupByOutputType[P]>
            : GetScalarType<T[P], AttendancelogGroupByOutputType[P]>
        }
      >
    >


  export type attendancelogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attendeeId?: boolean
    geofenceId?: boolean
    deviceLat?: boolean
    deviceLng?: boolean
    isMock?: boolean
    status?: boolean
    timestamp?: boolean
    afternoonTimeOut?: boolean
    morningTimeIn?: boolean
    afternoonTimeIn?: boolean
    morningTimeOut?: boolean
    attendee?: boolean | attendeeDefaultArgs<ExtArgs>
    geofence?: boolean | geofenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendancelog"]>



  export type attendancelogSelectScalar = {
    id?: boolean
    attendeeId?: boolean
    geofenceId?: boolean
    deviceLat?: boolean
    deviceLng?: boolean
    isMock?: boolean
    status?: boolean
    timestamp?: boolean
    afternoonTimeOut?: boolean
    morningTimeIn?: boolean
    afternoonTimeIn?: boolean
    morningTimeOut?: boolean
  }

  export type attendancelogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attendeeId" | "geofenceId" | "deviceLat" | "deviceLng" | "isMock" | "status" | "timestamp" | "afternoonTimeOut" | "morningTimeIn" | "afternoonTimeIn" | "morningTimeOut", ExtArgs["result"]["attendancelog"]>
  export type attendancelogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | attendeeDefaultArgs<ExtArgs>
    geofence?: boolean | geofenceDefaultArgs<ExtArgs>
  }

  export type $attendancelogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attendancelog"
    objects: {
      attendee: Prisma.$attendeePayload<ExtArgs>
      geofence: Prisma.$geofencePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attendeeId: string
      geofenceId: string
      deviceLat: number
      deviceLng: number
      isMock: boolean
      status: string
      timestamp: Date
      afternoonTimeOut: Date | null
      morningTimeIn: Date | null
      afternoonTimeIn: Date | null
      morningTimeOut: Date | null
    }, ExtArgs["result"]["attendancelog"]>
    composites: {}
  }

  type attendancelogGetPayload<S extends boolean | null | undefined | attendancelogDefaultArgs> = $Result.GetResult<Prisma.$attendancelogPayload, S>

  type attendancelogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attendancelogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendancelogCountAggregateInputType | true
    }

  export interface attendancelogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attendancelog'], meta: { name: 'attendancelog' } }
    /**
     * Find zero or one Attendancelog that matches the filter.
     * @param {attendancelogFindUniqueArgs} args - Arguments to find a Attendancelog
     * @example
     * // Get one Attendancelog
     * const attendancelog = await prisma.attendancelog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attendancelogFindUniqueArgs>(args: SelectSubset<T, attendancelogFindUniqueArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendancelog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attendancelogFindUniqueOrThrowArgs} args - Arguments to find a Attendancelog
     * @example
     * // Get one Attendancelog
     * const attendancelog = await prisma.attendancelog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attendancelogFindUniqueOrThrowArgs>(args: SelectSubset<T, attendancelogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendancelog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancelogFindFirstArgs} args - Arguments to find a Attendancelog
     * @example
     * // Get one Attendancelog
     * const attendancelog = await prisma.attendancelog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attendancelogFindFirstArgs>(args?: SelectSubset<T, attendancelogFindFirstArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendancelog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancelogFindFirstOrThrowArgs} args - Arguments to find a Attendancelog
     * @example
     * // Get one Attendancelog
     * const attendancelog = await prisma.attendancelog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attendancelogFindFirstOrThrowArgs>(args?: SelectSubset<T, attendancelogFindFirstOrThrowArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendancelogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancelogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendancelogs
     * const attendancelogs = await prisma.attendancelog.findMany()
     * 
     * // Get first 10 Attendancelogs
     * const attendancelogs = await prisma.attendancelog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendancelogWithIdOnly = await prisma.attendancelog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attendancelogFindManyArgs>(args?: SelectSubset<T, attendancelogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendancelog.
     * @param {attendancelogCreateArgs} args - Arguments to create a Attendancelog.
     * @example
     * // Create one Attendancelog
     * const Attendancelog = await prisma.attendancelog.create({
     *   data: {
     *     // ... data to create a Attendancelog
     *   }
     * })
     * 
     */
    create<T extends attendancelogCreateArgs>(args: SelectSubset<T, attendancelogCreateArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendancelogs.
     * @param {attendancelogCreateManyArgs} args - Arguments to create many Attendancelogs.
     * @example
     * // Create many Attendancelogs
     * const attendancelog = await prisma.attendancelog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attendancelogCreateManyArgs>(args?: SelectSubset<T, attendancelogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendancelog.
     * @param {attendancelogDeleteArgs} args - Arguments to delete one Attendancelog.
     * @example
     * // Delete one Attendancelog
     * const Attendancelog = await prisma.attendancelog.delete({
     *   where: {
     *     // ... filter to delete one Attendancelog
     *   }
     * })
     * 
     */
    delete<T extends attendancelogDeleteArgs>(args: SelectSubset<T, attendancelogDeleteArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendancelog.
     * @param {attendancelogUpdateArgs} args - Arguments to update one Attendancelog.
     * @example
     * // Update one Attendancelog
     * const attendancelog = await prisma.attendancelog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attendancelogUpdateArgs>(args: SelectSubset<T, attendancelogUpdateArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendancelogs.
     * @param {attendancelogDeleteManyArgs} args - Arguments to filter Attendancelogs to delete.
     * @example
     * // Delete a few Attendancelogs
     * const { count } = await prisma.attendancelog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attendancelogDeleteManyArgs>(args?: SelectSubset<T, attendancelogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendancelogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancelogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendancelogs
     * const attendancelog = await prisma.attendancelog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attendancelogUpdateManyArgs>(args: SelectSubset<T, attendancelogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendancelog.
     * @param {attendancelogUpsertArgs} args - Arguments to update or create a Attendancelog.
     * @example
     * // Update or create a Attendancelog
     * const attendancelog = await prisma.attendancelog.upsert({
     *   create: {
     *     // ... data to create a Attendancelog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendancelog we want to update
     *   }
     * })
     */
    upsert<T extends attendancelogUpsertArgs>(args: SelectSubset<T, attendancelogUpsertArgs<ExtArgs>>): Prisma__attendancelogClient<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendancelogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancelogCountArgs} args - Arguments to filter Attendancelogs to count.
     * @example
     * // Count the number of Attendancelogs
     * const count = await prisma.attendancelog.count({
     *   where: {
     *     // ... the filter for the Attendancelogs we want to count
     *   }
     * })
    **/
    count<T extends attendancelogCountArgs>(
      args?: Subset<T, attendancelogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendancelogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendancelog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancelogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendancelogAggregateArgs>(args: Subset<T, AttendancelogAggregateArgs>): Prisma.PrismaPromise<GetAttendancelogAggregateType<T>>

    /**
     * Group by Attendancelog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendancelogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends attendancelogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attendancelogGroupByArgs['orderBy'] }
        : { orderBy?: attendancelogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, attendancelogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendancelogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attendancelog model
   */
  readonly fields: attendancelogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attendancelog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attendancelogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendee<T extends attendeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, attendeeDefaultArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    geofence<T extends geofenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, geofenceDefaultArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the attendancelog model
   */
  interface attendancelogFieldRefs {
    readonly id: FieldRef<"attendancelog", 'String'>
    readonly attendeeId: FieldRef<"attendancelog", 'String'>
    readonly geofenceId: FieldRef<"attendancelog", 'String'>
    readonly deviceLat: FieldRef<"attendancelog", 'Float'>
    readonly deviceLng: FieldRef<"attendancelog", 'Float'>
    readonly isMock: FieldRef<"attendancelog", 'Boolean'>
    readonly status: FieldRef<"attendancelog", 'String'>
    readonly timestamp: FieldRef<"attendancelog", 'DateTime'>
    readonly afternoonTimeOut: FieldRef<"attendancelog", 'DateTime'>
    readonly morningTimeIn: FieldRef<"attendancelog", 'DateTime'>
    readonly afternoonTimeIn: FieldRef<"attendancelog", 'DateTime'>
    readonly morningTimeOut: FieldRef<"attendancelog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * attendancelog findUnique
   */
  export type attendancelogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * Filter, which attendancelog to fetch.
     */
    where: attendancelogWhereUniqueInput
  }

  /**
   * attendancelog findUniqueOrThrow
   */
  export type attendancelogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * Filter, which attendancelog to fetch.
     */
    where: attendancelogWhereUniqueInput
  }

  /**
   * attendancelog findFirst
   */
  export type attendancelogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * Filter, which attendancelog to fetch.
     */
    where?: attendancelogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendancelogs to fetch.
     */
    orderBy?: attendancelogOrderByWithRelationInput | attendancelogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendancelogs.
     */
    cursor?: attendancelogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendancelogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendancelogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendancelogs.
     */
    distinct?: AttendancelogScalarFieldEnum | AttendancelogScalarFieldEnum[]
  }

  /**
   * attendancelog findFirstOrThrow
   */
  export type attendancelogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * Filter, which attendancelog to fetch.
     */
    where?: attendancelogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendancelogs to fetch.
     */
    orderBy?: attendancelogOrderByWithRelationInput | attendancelogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendancelogs.
     */
    cursor?: attendancelogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendancelogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendancelogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendancelogs.
     */
    distinct?: AttendancelogScalarFieldEnum | AttendancelogScalarFieldEnum[]
  }

  /**
   * attendancelog findMany
   */
  export type attendancelogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * Filter, which attendancelogs to fetch.
     */
    where?: attendancelogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendancelogs to fetch.
     */
    orderBy?: attendancelogOrderByWithRelationInput | attendancelogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attendancelogs.
     */
    cursor?: attendancelogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendancelogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendancelogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendancelogs.
     */
    distinct?: AttendancelogScalarFieldEnum | AttendancelogScalarFieldEnum[]
  }

  /**
   * attendancelog create
   */
  export type attendancelogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * The data needed to create a attendancelog.
     */
    data: XOR<attendancelogCreateInput, attendancelogUncheckedCreateInput>
  }

  /**
   * attendancelog createMany
   */
  export type attendancelogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attendancelogs.
     */
    data: attendancelogCreateManyInput | attendancelogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attendancelog update
   */
  export type attendancelogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * The data needed to update a attendancelog.
     */
    data: XOR<attendancelogUpdateInput, attendancelogUncheckedUpdateInput>
    /**
     * Choose, which attendancelog to update.
     */
    where: attendancelogWhereUniqueInput
  }

  /**
   * attendancelog updateMany
   */
  export type attendancelogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attendancelogs.
     */
    data: XOR<attendancelogUpdateManyMutationInput, attendancelogUncheckedUpdateManyInput>
    /**
     * Filter which attendancelogs to update
     */
    where?: attendancelogWhereInput
    /**
     * Limit how many attendancelogs to update.
     */
    limit?: number
  }

  /**
   * attendancelog upsert
   */
  export type attendancelogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * The filter to search for the attendancelog to update in case it exists.
     */
    where: attendancelogWhereUniqueInput
    /**
     * In case the attendancelog found by the `where` argument doesn't exist, create a new attendancelog with this data.
     */
    create: XOR<attendancelogCreateInput, attendancelogUncheckedCreateInput>
    /**
     * In case the attendancelog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attendancelogUpdateInput, attendancelogUncheckedUpdateInput>
  }

  /**
   * attendancelog delete
   */
  export type attendancelogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    /**
     * Filter which attendancelog to delete.
     */
    where: attendancelogWhereUniqueInput
  }

  /**
   * attendancelog deleteMany
   */
  export type attendancelogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendancelogs to delete
     */
    where?: attendancelogWhereInput
    /**
     * Limit how many attendancelogs to delete.
     */
    limit?: number
  }

  /**
   * attendancelog without action
   */
  export type attendancelogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
  }


  /**
   * Model attendee
   */

  export type AggregateAttendee = {
    _count: AttendeeCountAggregateOutputType | null
    _min: AttendeeMinAggregateOutputType | null
    _max: AttendeeMaxAggregateOutputType | null
  }

  export type AttendeeMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    birthDate: Date | null
    orgCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isVerified: boolean | null
    categoryId: string | null
  }

  export type AttendeeMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    birthDate: Date | null
    orgCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isVerified: boolean | null
    categoryId: string | null
  }

  export type AttendeeCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    birthDate: number
    orgCode: number
    createdAt: number
    updatedAt: number
    isVerified: number
    categoryId: number
    _all: number
  }


  export type AttendeeMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isVerified?: true
    categoryId?: true
  }

  export type AttendeeMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isVerified?: true
    categoryId?: true
  }

  export type AttendeeCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isVerified?: true
    categoryId?: true
    _all?: true
  }

  export type AttendeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendee to aggregate.
     */
    where?: attendeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendees to fetch.
     */
    orderBy?: attendeeOrderByWithRelationInput | attendeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attendeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attendees
    **/
    _count?: true | AttendeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendeeMaxAggregateInputType
  }

  export type GetAttendeeAggregateType<T extends AttendeeAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendee[P]>
      : GetScalarType<T[P], AggregateAttendee[P]>
  }




  export type attendeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendeeWhereInput
    orderBy?: attendeeOrderByWithAggregationInput | attendeeOrderByWithAggregationInput[]
    by: AttendeeScalarFieldEnum[] | AttendeeScalarFieldEnum
    having?: attendeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendeeCountAggregateInputType | true
    _min?: AttendeeMinAggregateInputType
    _max?: AttendeeMaxAggregateInputType
  }

  export type AttendeeGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate: Date | null
    orgCode: string | null
    createdAt: Date
    updatedAt: Date
    isVerified: boolean
    categoryId: string | null
    _count: AttendeeCountAggregateOutputType | null
    _min: AttendeeMinAggregateOutputType | null
    _max: AttendeeMaxAggregateOutputType | null
  }

  type GetAttendeeGroupByPayload<T extends attendeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendeeGroupByOutputType[P]>
            : GetScalarType<T[P], AttendeeGroupByOutputType[P]>
        }
      >
    >


  export type attendeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    birthDate?: boolean
    orgCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isVerified?: boolean
    categoryId?: boolean
    attendancelog?: boolean | attendee$attendancelogArgs<ExtArgs>
    category?: boolean | attendee$categoryArgs<ExtArgs>
    organization?: boolean | attendee$organizationArgs<ExtArgs>
    attendeesession?: boolean | attendee$attendeesessionArgs<ExtArgs>
    enrollment?: boolean | attendee$enrollmentArgs<ExtArgs>
    _count?: boolean | AttendeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendee"]>



  export type attendeeSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    birthDate?: boolean
    orgCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isVerified?: boolean
    categoryId?: boolean
  }

  export type attendeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "birthDate" | "orgCode" | "createdAt" | "updatedAt" | "isVerified" | "categoryId", ExtArgs["result"]["attendee"]>
  export type attendeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendancelog?: boolean | attendee$attendancelogArgs<ExtArgs>
    category?: boolean | attendee$categoryArgs<ExtArgs>
    organization?: boolean | attendee$organizationArgs<ExtArgs>
    attendeesession?: boolean | attendee$attendeesessionArgs<ExtArgs>
    enrollment?: boolean | attendee$enrollmentArgs<ExtArgs>
    _count?: boolean | AttendeeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $attendeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attendee"
    objects: {
      attendancelog: Prisma.$attendancelogPayload<ExtArgs>[]
      category: Prisma.$categoryPayload<ExtArgs> | null
      organization: Prisma.$organizationPayload<ExtArgs> | null
      attendeesession: Prisma.$attendeesessionPayload<ExtArgs>[]
      enrollment: Prisma.$enrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      birthDate: Date | null
      orgCode: string | null
      createdAt: Date
      updatedAt: Date
      isVerified: boolean
      categoryId: string | null
    }, ExtArgs["result"]["attendee"]>
    composites: {}
  }

  type attendeeGetPayload<S extends boolean | null | undefined | attendeeDefaultArgs> = $Result.GetResult<Prisma.$attendeePayload, S>

  type attendeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attendeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendeeCountAggregateInputType | true
    }

  export interface attendeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attendee'], meta: { name: 'attendee' } }
    /**
     * Find zero or one Attendee that matches the filter.
     * @param {attendeeFindUniqueArgs} args - Arguments to find a Attendee
     * @example
     * // Get one Attendee
     * const attendee = await prisma.attendee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attendeeFindUniqueArgs>(args: SelectSubset<T, attendeeFindUniqueArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attendeeFindUniqueOrThrowArgs} args - Arguments to find a Attendee
     * @example
     * // Get one Attendee
     * const attendee = await prisma.attendee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attendeeFindUniqueOrThrowArgs>(args: SelectSubset<T, attendeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeeFindFirstArgs} args - Arguments to find a Attendee
     * @example
     * // Get one Attendee
     * const attendee = await prisma.attendee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attendeeFindFirstArgs>(args?: SelectSubset<T, attendeeFindFirstArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeeFindFirstOrThrowArgs} args - Arguments to find a Attendee
     * @example
     * // Get one Attendee
     * const attendee = await prisma.attendee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attendeeFindFirstOrThrowArgs>(args?: SelectSubset<T, attendeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendees
     * const attendees = await prisma.attendee.findMany()
     * 
     * // Get first 10 Attendees
     * const attendees = await prisma.attendee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendeeWithIdOnly = await prisma.attendee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attendeeFindManyArgs>(args?: SelectSubset<T, attendeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendee.
     * @param {attendeeCreateArgs} args - Arguments to create a Attendee.
     * @example
     * // Create one Attendee
     * const Attendee = await prisma.attendee.create({
     *   data: {
     *     // ... data to create a Attendee
     *   }
     * })
     * 
     */
    create<T extends attendeeCreateArgs>(args: SelectSubset<T, attendeeCreateArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendees.
     * @param {attendeeCreateManyArgs} args - Arguments to create many Attendees.
     * @example
     * // Create many Attendees
     * const attendee = await prisma.attendee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attendeeCreateManyArgs>(args?: SelectSubset<T, attendeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendee.
     * @param {attendeeDeleteArgs} args - Arguments to delete one Attendee.
     * @example
     * // Delete one Attendee
     * const Attendee = await prisma.attendee.delete({
     *   where: {
     *     // ... filter to delete one Attendee
     *   }
     * })
     * 
     */
    delete<T extends attendeeDeleteArgs>(args: SelectSubset<T, attendeeDeleteArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendee.
     * @param {attendeeUpdateArgs} args - Arguments to update one Attendee.
     * @example
     * // Update one Attendee
     * const attendee = await prisma.attendee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attendeeUpdateArgs>(args: SelectSubset<T, attendeeUpdateArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendees.
     * @param {attendeeDeleteManyArgs} args - Arguments to filter Attendees to delete.
     * @example
     * // Delete a few Attendees
     * const { count } = await prisma.attendee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attendeeDeleteManyArgs>(args?: SelectSubset<T, attendeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendees
     * const attendee = await prisma.attendee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attendeeUpdateManyArgs>(args: SelectSubset<T, attendeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendee.
     * @param {attendeeUpsertArgs} args - Arguments to update or create a Attendee.
     * @example
     * // Update or create a Attendee
     * const attendee = await prisma.attendee.upsert({
     *   create: {
     *     // ... data to create a Attendee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendee we want to update
     *   }
     * })
     */
    upsert<T extends attendeeUpsertArgs>(args: SelectSubset<T, attendeeUpsertArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeeCountArgs} args - Arguments to filter Attendees to count.
     * @example
     * // Count the number of Attendees
     * const count = await prisma.attendee.count({
     *   where: {
     *     // ... the filter for the Attendees we want to count
     *   }
     * })
    **/
    count<T extends attendeeCountArgs>(
      args?: Subset<T, attendeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendeeAggregateArgs>(args: Subset<T, AttendeeAggregateArgs>): Prisma.PrismaPromise<GetAttendeeAggregateType<T>>

    /**
     * Group by Attendee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends attendeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attendeeGroupByArgs['orderBy'] }
        : { orderBy?: attendeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, attendeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attendee model
   */
  readonly fields: attendeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attendee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attendeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendancelog<T extends attendee$attendancelogArgs<ExtArgs> = {}>(args?: Subset<T, attendee$attendancelogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends attendee$categoryArgs<ExtArgs> = {}>(args?: Subset<T, attendee$categoryArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    organization<T extends attendee$organizationArgs<ExtArgs> = {}>(args?: Subset<T, attendee$organizationArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    attendeesession<T extends attendee$attendeesessionArgs<ExtArgs> = {}>(args?: Subset<T, attendee$attendeesessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollment<T extends attendee$enrollmentArgs<ExtArgs> = {}>(args?: Subset<T, attendee$enrollmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the attendee model
   */
  interface attendeeFieldRefs {
    readonly id: FieldRef<"attendee", 'String'>
    readonly email: FieldRef<"attendee", 'String'>
    readonly name: FieldRef<"attendee", 'String'>
    readonly passwordHash: FieldRef<"attendee", 'String'>
    readonly birthDate: FieldRef<"attendee", 'DateTime'>
    readonly orgCode: FieldRef<"attendee", 'String'>
    readonly createdAt: FieldRef<"attendee", 'DateTime'>
    readonly updatedAt: FieldRef<"attendee", 'DateTime'>
    readonly isVerified: FieldRef<"attendee", 'Boolean'>
    readonly categoryId: FieldRef<"attendee", 'String'>
  }
    

  // Custom InputTypes
  /**
   * attendee findUnique
   */
  export type attendeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * Filter, which attendee to fetch.
     */
    where: attendeeWhereUniqueInput
  }

  /**
   * attendee findUniqueOrThrow
   */
  export type attendeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * Filter, which attendee to fetch.
     */
    where: attendeeWhereUniqueInput
  }

  /**
   * attendee findFirst
   */
  export type attendeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * Filter, which attendee to fetch.
     */
    where?: attendeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendees to fetch.
     */
    orderBy?: attendeeOrderByWithRelationInput | attendeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendees.
     */
    cursor?: attendeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendees.
     */
    distinct?: AttendeeScalarFieldEnum | AttendeeScalarFieldEnum[]
  }

  /**
   * attendee findFirstOrThrow
   */
  export type attendeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * Filter, which attendee to fetch.
     */
    where?: attendeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendees to fetch.
     */
    orderBy?: attendeeOrderByWithRelationInput | attendeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendees.
     */
    cursor?: attendeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendees.
     */
    distinct?: AttendeeScalarFieldEnum | AttendeeScalarFieldEnum[]
  }

  /**
   * attendee findMany
   */
  export type attendeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * Filter, which attendees to fetch.
     */
    where?: attendeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendees to fetch.
     */
    orderBy?: attendeeOrderByWithRelationInput | attendeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attendees.
     */
    cursor?: attendeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendees.
     */
    distinct?: AttendeeScalarFieldEnum | AttendeeScalarFieldEnum[]
  }

  /**
   * attendee create
   */
  export type attendeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * The data needed to create a attendee.
     */
    data: XOR<attendeeCreateInput, attendeeUncheckedCreateInput>
  }

  /**
   * attendee createMany
   */
  export type attendeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attendees.
     */
    data: attendeeCreateManyInput | attendeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attendee update
   */
  export type attendeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * The data needed to update a attendee.
     */
    data: XOR<attendeeUpdateInput, attendeeUncheckedUpdateInput>
    /**
     * Choose, which attendee to update.
     */
    where: attendeeWhereUniqueInput
  }

  /**
   * attendee updateMany
   */
  export type attendeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attendees.
     */
    data: XOR<attendeeUpdateManyMutationInput, attendeeUncheckedUpdateManyInput>
    /**
     * Filter which attendees to update
     */
    where?: attendeeWhereInput
    /**
     * Limit how many attendees to update.
     */
    limit?: number
  }

  /**
   * attendee upsert
   */
  export type attendeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * The filter to search for the attendee to update in case it exists.
     */
    where: attendeeWhereUniqueInput
    /**
     * In case the attendee found by the `where` argument doesn't exist, create a new attendee with this data.
     */
    create: XOR<attendeeCreateInput, attendeeUncheckedCreateInput>
    /**
     * In case the attendee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attendeeUpdateInput, attendeeUncheckedUpdateInput>
  }

  /**
   * attendee delete
   */
  export type attendeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    /**
     * Filter which attendee to delete.
     */
    where: attendeeWhereUniqueInput
  }

  /**
   * attendee deleteMany
   */
  export type attendeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendees to delete
     */
    where?: attendeeWhereInput
    /**
     * Limit how many attendees to delete.
     */
    limit?: number
  }

  /**
   * attendee.attendancelog
   */
  export type attendee$attendancelogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    where?: attendancelogWhereInput
    orderBy?: attendancelogOrderByWithRelationInput | attendancelogOrderByWithRelationInput[]
    cursor?: attendancelogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendancelogScalarFieldEnum | AttendancelogScalarFieldEnum[]
  }

  /**
   * attendee.category
   */
  export type attendee$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    where?: categoryWhereInput
  }

  /**
   * attendee.organization
   */
  export type attendee$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    where?: organizationWhereInput
  }

  /**
   * attendee.attendeesession
   */
  export type attendee$attendeesessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    where?: attendeesessionWhereInput
    orderBy?: attendeesessionOrderByWithRelationInput | attendeesessionOrderByWithRelationInput[]
    cursor?: attendeesessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendeesessionScalarFieldEnum | AttendeesessionScalarFieldEnum[]
  }

  /**
   * attendee.enrollment
   */
  export type attendee$enrollmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    where?: enrollmentWhereInput
    orderBy?: enrollmentOrderByWithRelationInput | enrollmentOrderByWithRelationInput[]
    cursor?: enrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * attendee without action
   */
  export type attendeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
  }


  /**
   * Model attendeesession
   */

  export type AggregateAttendeesession = {
    _count: AttendeesessionCountAggregateOutputType | null
    _min: AttendeesessionMinAggregateOutputType | null
    _max: AttendeesessionMaxAggregateOutputType | null
  }

  export type AttendeesessionMinAggregateOutputType = {
    id: string | null
    attendeeId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AttendeesessionMaxAggregateOutputType = {
    id: string | null
    attendeeId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AttendeesessionCountAggregateOutputType = {
    id: number
    attendeeId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type AttendeesessionMinAggregateInputType = {
    id?: true
    attendeeId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AttendeesessionMaxAggregateInputType = {
    id?: true
    attendeeId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AttendeesessionCountAggregateInputType = {
    id?: true
    attendeeId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type AttendeesessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendeesession to aggregate.
     */
    where?: attendeesessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendeesessions to fetch.
     */
    orderBy?: attendeesessionOrderByWithRelationInput | attendeesessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attendeesessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendeesessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendeesessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attendeesessions
    **/
    _count?: true | AttendeesessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendeesessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendeesessionMaxAggregateInputType
  }

  export type GetAttendeesessionAggregateType<T extends AttendeesessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendeesession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendeesession[P]>
      : GetScalarType<T[P], AggregateAttendeesession[P]>
  }




  export type attendeesessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendeesessionWhereInput
    orderBy?: attendeesessionOrderByWithAggregationInput | attendeesessionOrderByWithAggregationInput[]
    by: AttendeesessionScalarFieldEnum[] | AttendeesessionScalarFieldEnum
    having?: attendeesessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendeesessionCountAggregateInputType | true
    _min?: AttendeesessionMinAggregateInputType
    _max?: AttendeesessionMaxAggregateInputType
  }

  export type AttendeesessionGroupByOutputType = {
    id: string
    attendeeId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: AttendeesessionCountAggregateOutputType | null
    _min: AttendeesessionMinAggregateOutputType | null
    _max: AttendeesessionMaxAggregateOutputType | null
  }

  type GetAttendeesessionGroupByPayload<T extends attendeesessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendeesessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendeesessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendeesessionGroupByOutputType[P]>
            : GetScalarType<T[P], AttendeesessionGroupByOutputType[P]>
        }
      >
    >


  export type attendeesessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attendeeId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    attendee?: boolean | attendeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendeesession"]>



  export type attendeesessionSelectScalar = {
    id?: boolean
    attendeeId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type attendeesessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attendeeId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["attendeesession"]>
  export type attendeesessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | attendeeDefaultArgs<ExtArgs>
  }

  export type $attendeesessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attendeesession"
    objects: {
      attendee: Prisma.$attendeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attendeeId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["attendeesession"]>
    composites: {}
  }

  type attendeesessionGetPayload<S extends boolean | null | undefined | attendeesessionDefaultArgs> = $Result.GetResult<Prisma.$attendeesessionPayload, S>

  type attendeesessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attendeesessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendeesessionCountAggregateInputType | true
    }

  export interface attendeesessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attendeesession'], meta: { name: 'attendeesession' } }
    /**
     * Find zero or one Attendeesession that matches the filter.
     * @param {attendeesessionFindUniqueArgs} args - Arguments to find a Attendeesession
     * @example
     * // Get one Attendeesession
     * const attendeesession = await prisma.attendeesession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attendeesessionFindUniqueArgs>(args: SelectSubset<T, attendeesessionFindUniqueArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendeesession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attendeesessionFindUniqueOrThrowArgs} args - Arguments to find a Attendeesession
     * @example
     * // Get one Attendeesession
     * const attendeesession = await prisma.attendeesession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attendeesessionFindUniqueOrThrowArgs>(args: SelectSubset<T, attendeesessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendeesession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeesessionFindFirstArgs} args - Arguments to find a Attendeesession
     * @example
     * // Get one Attendeesession
     * const attendeesession = await prisma.attendeesession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attendeesessionFindFirstArgs>(args?: SelectSubset<T, attendeesessionFindFirstArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendeesession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeesessionFindFirstOrThrowArgs} args - Arguments to find a Attendeesession
     * @example
     * // Get one Attendeesession
     * const attendeesession = await prisma.attendeesession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attendeesessionFindFirstOrThrowArgs>(args?: SelectSubset<T, attendeesessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendeesessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeesessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendeesessions
     * const attendeesessions = await prisma.attendeesession.findMany()
     * 
     * // Get first 10 Attendeesessions
     * const attendeesessions = await prisma.attendeesession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendeesessionWithIdOnly = await prisma.attendeesession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attendeesessionFindManyArgs>(args?: SelectSubset<T, attendeesessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendeesession.
     * @param {attendeesessionCreateArgs} args - Arguments to create a Attendeesession.
     * @example
     * // Create one Attendeesession
     * const Attendeesession = await prisma.attendeesession.create({
     *   data: {
     *     // ... data to create a Attendeesession
     *   }
     * })
     * 
     */
    create<T extends attendeesessionCreateArgs>(args: SelectSubset<T, attendeesessionCreateArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendeesessions.
     * @param {attendeesessionCreateManyArgs} args - Arguments to create many Attendeesessions.
     * @example
     * // Create many Attendeesessions
     * const attendeesession = await prisma.attendeesession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attendeesessionCreateManyArgs>(args?: SelectSubset<T, attendeesessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendeesession.
     * @param {attendeesessionDeleteArgs} args - Arguments to delete one Attendeesession.
     * @example
     * // Delete one Attendeesession
     * const Attendeesession = await prisma.attendeesession.delete({
     *   where: {
     *     // ... filter to delete one Attendeesession
     *   }
     * })
     * 
     */
    delete<T extends attendeesessionDeleteArgs>(args: SelectSubset<T, attendeesessionDeleteArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendeesession.
     * @param {attendeesessionUpdateArgs} args - Arguments to update one Attendeesession.
     * @example
     * // Update one Attendeesession
     * const attendeesession = await prisma.attendeesession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attendeesessionUpdateArgs>(args: SelectSubset<T, attendeesessionUpdateArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendeesessions.
     * @param {attendeesessionDeleteManyArgs} args - Arguments to filter Attendeesessions to delete.
     * @example
     * // Delete a few Attendeesessions
     * const { count } = await prisma.attendeesession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attendeesessionDeleteManyArgs>(args?: SelectSubset<T, attendeesessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendeesessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeesessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendeesessions
     * const attendeesession = await prisma.attendeesession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attendeesessionUpdateManyArgs>(args: SelectSubset<T, attendeesessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendeesession.
     * @param {attendeesessionUpsertArgs} args - Arguments to update or create a Attendeesession.
     * @example
     * // Update or create a Attendeesession
     * const attendeesession = await prisma.attendeesession.upsert({
     *   create: {
     *     // ... data to create a Attendeesession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendeesession we want to update
     *   }
     * })
     */
    upsert<T extends attendeesessionUpsertArgs>(args: SelectSubset<T, attendeesessionUpsertArgs<ExtArgs>>): Prisma__attendeesessionClient<$Result.GetResult<Prisma.$attendeesessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendeesessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeesessionCountArgs} args - Arguments to filter Attendeesessions to count.
     * @example
     * // Count the number of Attendeesessions
     * const count = await prisma.attendeesession.count({
     *   where: {
     *     // ... the filter for the Attendeesessions we want to count
     *   }
     * })
    **/
    count<T extends attendeesessionCountArgs>(
      args?: Subset<T, attendeesessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendeesessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendeesession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendeesessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendeesessionAggregateArgs>(args: Subset<T, AttendeesessionAggregateArgs>): Prisma.PrismaPromise<GetAttendeesessionAggregateType<T>>

    /**
     * Group by Attendeesession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendeesessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends attendeesessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attendeesessionGroupByArgs['orderBy'] }
        : { orderBy?: attendeesessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, attendeesessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendeesessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attendeesession model
   */
  readonly fields: attendeesessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attendeesession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attendeesessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendee<T extends attendeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, attendeeDefaultArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the attendeesession model
   */
  interface attendeesessionFieldRefs {
    readonly id: FieldRef<"attendeesession", 'String'>
    readonly attendeeId: FieldRef<"attendeesession", 'String'>
    readonly token: FieldRef<"attendeesession", 'String'>
    readonly expiresAt: FieldRef<"attendeesession", 'DateTime'>
    readonly createdAt: FieldRef<"attendeesession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * attendeesession findUnique
   */
  export type attendeesessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * Filter, which attendeesession to fetch.
     */
    where: attendeesessionWhereUniqueInput
  }

  /**
   * attendeesession findUniqueOrThrow
   */
  export type attendeesessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * Filter, which attendeesession to fetch.
     */
    where: attendeesessionWhereUniqueInput
  }

  /**
   * attendeesession findFirst
   */
  export type attendeesessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * Filter, which attendeesession to fetch.
     */
    where?: attendeesessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendeesessions to fetch.
     */
    orderBy?: attendeesessionOrderByWithRelationInput | attendeesessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendeesessions.
     */
    cursor?: attendeesessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendeesessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendeesessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendeesessions.
     */
    distinct?: AttendeesessionScalarFieldEnum | AttendeesessionScalarFieldEnum[]
  }

  /**
   * attendeesession findFirstOrThrow
   */
  export type attendeesessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * Filter, which attendeesession to fetch.
     */
    where?: attendeesessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendeesessions to fetch.
     */
    orderBy?: attendeesessionOrderByWithRelationInput | attendeesessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendeesessions.
     */
    cursor?: attendeesessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendeesessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendeesessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendeesessions.
     */
    distinct?: AttendeesessionScalarFieldEnum | AttendeesessionScalarFieldEnum[]
  }

  /**
   * attendeesession findMany
   */
  export type attendeesessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * Filter, which attendeesessions to fetch.
     */
    where?: attendeesessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendeesessions to fetch.
     */
    orderBy?: attendeesessionOrderByWithRelationInput | attendeesessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attendeesessions.
     */
    cursor?: attendeesessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendeesessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendeesessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendeesessions.
     */
    distinct?: AttendeesessionScalarFieldEnum | AttendeesessionScalarFieldEnum[]
  }

  /**
   * attendeesession create
   */
  export type attendeesessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * The data needed to create a attendeesession.
     */
    data: XOR<attendeesessionCreateInput, attendeesessionUncheckedCreateInput>
  }

  /**
   * attendeesession createMany
   */
  export type attendeesessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attendeesessions.
     */
    data: attendeesessionCreateManyInput | attendeesessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attendeesession update
   */
  export type attendeesessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * The data needed to update a attendeesession.
     */
    data: XOR<attendeesessionUpdateInput, attendeesessionUncheckedUpdateInput>
    /**
     * Choose, which attendeesession to update.
     */
    where: attendeesessionWhereUniqueInput
  }

  /**
   * attendeesession updateMany
   */
  export type attendeesessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attendeesessions.
     */
    data: XOR<attendeesessionUpdateManyMutationInput, attendeesessionUncheckedUpdateManyInput>
    /**
     * Filter which attendeesessions to update
     */
    where?: attendeesessionWhereInput
    /**
     * Limit how many attendeesessions to update.
     */
    limit?: number
  }

  /**
   * attendeesession upsert
   */
  export type attendeesessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * The filter to search for the attendeesession to update in case it exists.
     */
    where: attendeesessionWhereUniqueInput
    /**
     * In case the attendeesession found by the `where` argument doesn't exist, create a new attendeesession with this data.
     */
    create: XOR<attendeesessionCreateInput, attendeesessionUncheckedCreateInput>
    /**
     * In case the attendeesession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attendeesessionUpdateInput, attendeesessionUncheckedUpdateInput>
  }

  /**
   * attendeesession delete
   */
  export type attendeesessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
    /**
     * Filter which attendeesession to delete.
     */
    where: attendeesessionWhereUniqueInput
  }

  /**
   * attendeesession deleteMany
   */
  export type attendeesessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendeesessions to delete
     */
    where?: attendeesessionWhereInput
    /**
     * Limit how many attendeesessions to delete.
     */
    limit?: number
  }

  /**
   * attendeesession without action
   */
  export type attendeesessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendeesession
     */
    select?: attendeesessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendeesession
     */
    omit?: attendeesessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeesessionInclude<ExtArgs> | null
  }


  /**
   * Model category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    orgId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    orgId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    orgId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    orgId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which category to aggregate.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithAggregationInput | categoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    orgId: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attendee?: boolean | category$attendeeArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type categorySelectScalar = {
    id?: boolean
    name?: boolean
    orgId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "orgId" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | category$attendeeArgs<ExtArgs>
    organization?: boolean | organizationDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "category"
    objects: {
      attendee: Prisma.$attendeePayload<ExtArgs>[]
      organization: Prisma.$organizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      orgId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type categoryGetPayload<S extends boolean | null | undefined | categoryDefaultArgs> = $Result.GetResult<Prisma.$categoryPayload, S>

  type categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['category'], meta: { name: 'category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {categoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoryFindUniqueArgs>(args: SelectSubset<T, categoryFindUniqueArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoryFindFirstArgs>(args?: SelectSubset<T, categoryFindFirstArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoryFindManyArgs>(args?: SelectSubset<T, categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {categoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends categoryCreateArgs>(args: SelectSubset<T, categoryCreateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoryCreateManyArgs>(args?: SelectSubset<T, categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {categoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends categoryDeleteArgs>(args: SelectSubset<T, categoryDeleteArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {categoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoryUpdateArgs>(args: SelectSubset<T, categoryUpdateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoryDeleteManyArgs>(args?: SelectSubset<T, categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoryUpdateManyArgs>(args: SelectSubset<T, categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {categoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends categoryUpsertArgs>(args: SelectSubset<T, categoryUpsertArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoryCountArgs>(
      args?: Subset<T, categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoryGroupByArgs['orderBy'] }
        : { orderBy?: categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the category model
   */
  readonly fields: categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendee<T extends category$attendeeArgs<ExtArgs> = {}>(args?: Subset<T, category$attendeeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    organization<T extends organizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, organizationDefaultArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the category model
   */
  interface categoryFieldRefs {
    readonly id: FieldRef<"category", 'String'>
    readonly name: FieldRef<"category", 'String'>
    readonly orgId: FieldRef<"category", 'String'>
    readonly createdAt: FieldRef<"category", 'DateTime'>
    readonly updatedAt: FieldRef<"category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * category findUnique
   */
  export type categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findUniqueOrThrow
   */
  export type categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findFirst
   */
  export type categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findFirstOrThrow
   */
  export type categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findMany
   */
  export type categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category create
   */
  export type categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a category.
     */
    data: XOR<categoryCreateInput, categoryUncheckedCreateInput>
  }

  /**
   * category createMany
   */
  export type categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * category update
   */
  export type categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a category.
     */
    data: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
    /**
     * Choose, which category to update.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category updateMany
   */
  export type categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category upsert
   */
  export type categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the category to update in case it exists.
     */
    where: categoryWhereUniqueInput
    /**
     * In case the category found by the `where` argument doesn't exist, create a new category with this data.
     */
    create: XOR<categoryCreateInput, categoryUncheckedCreateInput>
    /**
     * In case the category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
  }

  /**
   * category delete
   */
  export type categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter which category to delete.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category deleteMany
   */
  export type categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * category.attendee
   */
  export type category$attendeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    where?: attendeeWhereInput
    orderBy?: attendeeOrderByWithRelationInput | attendeeOrderByWithRelationInput[]
    cursor?: attendeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendeeScalarFieldEnum | AttendeeScalarFieldEnum[]
  }

  /**
   * category without action
   */
  export type categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
  }


  /**
   * Model client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    birthDate: Date | null
    orgCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isVerified: boolean | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    birthDate: Date | null
    orgCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isVerified: boolean | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    birthDate: number
    orgCode: number
    createdAt: number
    updatedAt: number
    isVerified: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isVerified?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isVerified?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    birthDate?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isVerified?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which client to aggregate.
     */
    where?: clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clients to fetch.
     */
    orderBy?: clientOrderByWithRelationInput | clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type clientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: clientWhereInput
    orderBy?: clientOrderByWithAggregationInput | clientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: clientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate: Date | null
    orgCode: string | null
    createdAt: Date
    updatedAt: Date
    isVerified: boolean
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends clientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type clientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    birthDate?: boolean
    orgCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isVerified?: boolean
    organization?: boolean | client$organizationArgs<ExtArgs>
    clientsession?: boolean | client$clientsessionArgs<ExtArgs>
    geofence?: boolean | client$geofenceArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>



  export type clientSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    birthDate?: boolean
    orgCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isVerified?: boolean
  }

  export type clientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "birthDate" | "orgCode" | "createdAt" | "updatedAt" | "isVerified", ExtArgs["result"]["client"]>
  export type clientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | client$organizationArgs<ExtArgs>
    clientsession?: boolean | client$clientsessionArgs<ExtArgs>
    geofence?: boolean | client$geofenceArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $clientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "client"
    objects: {
      organization: Prisma.$organizationPayload<ExtArgs> | null
      clientsession: Prisma.$clientsessionPayload<ExtArgs>[]
      geofence: Prisma.$geofencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      birthDate: Date | null
      orgCode: string | null
      createdAt: Date
      updatedAt: Date
      isVerified: boolean
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type clientGetPayload<S extends boolean | null | undefined | clientDefaultArgs> = $Result.GetResult<Prisma.$clientPayload, S>

  type clientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<clientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface clientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['client'], meta: { name: 'client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {clientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends clientFindUniqueArgs>(args: SelectSubset<T, clientFindUniqueArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {clientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends clientFindUniqueOrThrowArgs>(args: SelectSubset<T, clientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends clientFindFirstArgs>(args?: SelectSubset<T, clientFindFirstArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends clientFindFirstOrThrowArgs>(args?: SelectSubset<T, clientFindFirstOrThrowArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends clientFindManyArgs>(args?: SelectSubset<T, clientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {clientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends clientCreateArgs>(args: SelectSubset<T, clientCreateArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {clientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends clientCreateManyArgs>(args?: SelectSubset<T, clientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Client.
     * @param {clientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends clientDeleteArgs>(args: SelectSubset<T, clientDeleteArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {clientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends clientUpdateArgs>(args: SelectSubset<T, clientUpdateArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {clientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends clientDeleteManyArgs>(args?: SelectSubset<T, clientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends clientUpdateManyArgs>(args: SelectSubset<T, clientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {clientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends clientUpsertArgs>(args: SelectSubset<T, clientUpsertArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends clientCountArgs>(
      args?: Subset<T, clientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends clientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: clientGroupByArgs['orderBy'] }
        : { orderBy?: clientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, clientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the client model
   */
  readonly fields: clientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__clientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends client$organizationArgs<ExtArgs> = {}>(args?: Subset<T, client$organizationArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    clientsession<T extends client$clientsessionArgs<ExtArgs> = {}>(args?: Subset<T, client$clientsessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    geofence<T extends client$geofenceArgs<ExtArgs> = {}>(args?: Subset<T, client$geofenceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the client model
   */
  interface clientFieldRefs {
    readonly id: FieldRef<"client", 'String'>
    readonly email: FieldRef<"client", 'String'>
    readonly name: FieldRef<"client", 'String'>
    readonly passwordHash: FieldRef<"client", 'String'>
    readonly birthDate: FieldRef<"client", 'DateTime'>
    readonly orgCode: FieldRef<"client", 'String'>
    readonly createdAt: FieldRef<"client", 'DateTime'>
    readonly updatedAt: FieldRef<"client", 'DateTime'>
    readonly isVerified: FieldRef<"client", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * client findUnique
   */
  export type clientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * Filter, which client to fetch.
     */
    where: clientWhereUniqueInput
  }

  /**
   * client findUniqueOrThrow
   */
  export type clientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * Filter, which client to fetch.
     */
    where: clientWhereUniqueInput
  }

  /**
   * client findFirst
   */
  export type clientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * Filter, which client to fetch.
     */
    where?: clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clients to fetch.
     */
    orderBy?: clientOrderByWithRelationInput | clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clients.
     */
    cursor?: clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * client findFirstOrThrow
   */
  export type clientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * Filter, which client to fetch.
     */
    where?: clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clients to fetch.
     */
    orderBy?: clientOrderByWithRelationInput | clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clients.
     */
    cursor?: clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * client findMany
   */
  export type clientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * Filter, which clients to fetch.
     */
    where?: clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clients to fetch.
     */
    orderBy?: clientOrderByWithRelationInput | clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing clients.
     */
    cursor?: clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * client create
   */
  export type clientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * The data needed to create a client.
     */
    data: XOR<clientCreateInput, clientUncheckedCreateInput>
  }

  /**
   * client createMany
   */
  export type clientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many clients.
     */
    data: clientCreateManyInput | clientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * client update
   */
  export type clientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * The data needed to update a client.
     */
    data: XOR<clientUpdateInput, clientUncheckedUpdateInput>
    /**
     * Choose, which client to update.
     */
    where: clientWhereUniqueInput
  }

  /**
   * client updateMany
   */
  export type clientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update clients.
     */
    data: XOR<clientUpdateManyMutationInput, clientUncheckedUpdateManyInput>
    /**
     * Filter which clients to update
     */
    where?: clientWhereInput
    /**
     * Limit how many clients to update.
     */
    limit?: number
  }

  /**
   * client upsert
   */
  export type clientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * The filter to search for the client to update in case it exists.
     */
    where: clientWhereUniqueInput
    /**
     * In case the client found by the `where` argument doesn't exist, create a new client with this data.
     */
    create: XOR<clientCreateInput, clientUncheckedCreateInput>
    /**
     * In case the client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<clientUpdateInput, clientUncheckedUpdateInput>
  }

  /**
   * client delete
   */
  export type clientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    /**
     * Filter which client to delete.
     */
    where: clientWhereUniqueInput
  }

  /**
   * client deleteMany
   */
  export type clientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clients to delete
     */
    where?: clientWhereInput
    /**
     * Limit how many clients to delete.
     */
    limit?: number
  }

  /**
   * client.organization
   */
  export type client$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    where?: organizationWhereInput
  }

  /**
   * client.clientsession
   */
  export type client$clientsessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    where?: clientsessionWhereInput
    orderBy?: clientsessionOrderByWithRelationInput | clientsessionOrderByWithRelationInput[]
    cursor?: clientsessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientsessionScalarFieldEnum | ClientsessionScalarFieldEnum[]
  }

  /**
   * client.geofence
   */
  export type client$geofenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    where?: geofenceWhereInput
    orderBy?: geofenceOrderByWithRelationInput | geofenceOrderByWithRelationInput[]
    cursor?: geofenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GeofenceScalarFieldEnum | GeofenceScalarFieldEnum[]
  }

  /**
   * client without action
   */
  export type clientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
  }


  /**
   * Model clientsession
   */

  export type AggregateClientsession = {
    _count: ClientsessionCountAggregateOutputType | null
    _min: ClientsessionMinAggregateOutputType | null
    _max: ClientsessionMaxAggregateOutputType | null
  }

  export type ClientsessionMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ClientsessionMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ClientsessionCountAggregateOutputType = {
    id: number
    clientId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type ClientsessionMinAggregateInputType = {
    id?: true
    clientId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ClientsessionMaxAggregateInputType = {
    id?: true
    clientId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ClientsessionCountAggregateInputType = {
    id?: true
    clientId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type ClientsessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clientsession to aggregate.
     */
    where?: clientsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientsessions to fetch.
     */
    orderBy?: clientsessionOrderByWithRelationInput | clientsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: clientsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned clientsessions
    **/
    _count?: true | ClientsessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientsessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientsessionMaxAggregateInputType
  }

  export type GetClientsessionAggregateType<T extends ClientsessionAggregateArgs> = {
        [P in keyof T & keyof AggregateClientsession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientsession[P]>
      : GetScalarType<T[P], AggregateClientsession[P]>
  }




  export type clientsessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: clientsessionWhereInput
    orderBy?: clientsessionOrderByWithAggregationInput | clientsessionOrderByWithAggregationInput[]
    by: ClientsessionScalarFieldEnum[] | ClientsessionScalarFieldEnum
    having?: clientsessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientsessionCountAggregateInputType | true
    _min?: ClientsessionMinAggregateInputType
    _max?: ClientsessionMaxAggregateInputType
  }

  export type ClientsessionGroupByOutputType = {
    id: string
    clientId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: ClientsessionCountAggregateOutputType | null
    _min: ClientsessionMinAggregateOutputType | null
    _max: ClientsessionMaxAggregateOutputType | null
  }

  type GetClientsessionGroupByPayload<T extends clientsessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientsessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientsessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientsessionGroupByOutputType[P]>
            : GetScalarType<T[P], ClientsessionGroupByOutputType[P]>
        }
      >
    >


  export type clientsessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    client?: boolean | clientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientsession"]>



  export type clientsessionSelectScalar = {
    id?: boolean
    clientId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type clientsessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["clientsession"]>
  export type clientsessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | clientDefaultArgs<ExtArgs>
  }

  export type $clientsessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "clientsession"
    objects: {
      client: Prisma.$clientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["clientsession"]>
    composites: {}
  }

  type clientsessionGetPayload<S extends boolean | null | undefined | clientsessionDefaultArgs> = $Result.GetResult<Prisma.$clientsessionPayload, S>

  type clientsessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<clientsessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientsessionCountAggregateInputType | true
    }

  export interface clientsessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['clientsession'], meta: { name: 'clientsession' } }
    /**
     * Find zero or one Clientsession that matches the filter.
     * @param {clientsessionFindUniqueArgs} args - Arguments to find a Clientsession
     * @example
     * // Get one Clientsession
     * const clientsession = await prisma.clientsession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends clientsessionFindUniqueArgs>(args: SelectSubset<T, clientsessionFindUniqueArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clientsession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {clientsessionFindUniqueOrThrowArgs} args - Arguments to find a Clientsession
     * @example
     * // Get one Clientsession
     * const clientsession = await prisma.clientsession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends clientsessionFindUniqueOrThrowArgs>(args: SelectSubset<T, clientsessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clientsession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientsessionFindFirstArgs} args - Arguments to find a Clientsession
     * @example
     * // Get one Clientsession
     * const clientsession = await prisma.clientsession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends clientsessionFindFirstArgs>(args?: SelectSubset<T, clientsessionFindFirstArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clientsession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientsessionFindFirstOrThrowArgs} args - Arguments to find a Clientsession
     * @example
     * // Get one Clientsession
     * const clientsession = await prisma.clientsession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends clientsessionFindFirstOrThrowArgs>(args?: SelectSubset<T, clientsessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientsessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientsessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientsessions
     * const clientsessions = await prisma.clientsession.findMany()
     * 
     * // Get first 10 Clientsessions
     * const clientsessions = await prisma.clientsession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientsessionWithIdOnly = await prisma.clientsession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends clientsessionFindManyArgs>(args?: SelectSubset<T, clientsessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clientsession.
     * @param {clientsessionCreateArgs} args - Arguments to create a Clientsession.
     * @example
     * // Create one Clientsession
     * const Clientsession = await prisma.clientsession.create({
     *   data: {
     *     // ... data to create a Clientsession
     *   }
     * })
     * 
     */
    create<T extends clientsessionCreateArgs>(args: SelectSubset<T, clientsessionCreateArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientsessions.
     * @param {clientsessionCreateManyArgs} args - Arguments to create many Clientsessions.
     * @example
     * // Create many Clientsessions
     * const clientsession = await prisma.clientsession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends clientsessionCreateManyArgs>(args?: SelectSubset<T, clientsessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Clientsession.
     * @param {clientsessionDeleteArgs} args - Arguments to delete one Clientsession.
     * @example
     * // Delete one Clientsession
     * const Clientsession = await prisma.clientsession.delete({
     *   where: {
     *     // ... filter to delete one Clientsession
     *   }
     * })
     * 
     */
    delete<T extends clientsessionDeleteArgs>(args: SelectSubset<T, clientsessionDeleteArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clientsession.
     * @param {clientsessionUpdateArgs} args - Arguments to update one Clientsession.
     * @example
     * // Update one Clientsession
     * const clientsession = await prisma.clientsession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends clientsessionUpdateArgs>(args: SelectSubset<T, clientsessionUpdateArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientsessions.
     * @param {clientsessionDeleteManyArgs} args - Arguments to filter Clientsessions to delete.
     * @example
     * // Delete a few Clientsessions
     * const { count } = await prisma.clientsession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends clientsessionDeleteManyArgs>(args?: SelectSubset<T, clientsessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientsessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientsessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientsessions
     * const clientsession = await prisma.clientsession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends clientsessionUpdateManyArgs>(args: SelectSubset<T, clientsessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Clientsession.
     * @param {clientsessionUpsertArgs} args - Arguments to update or create a Clientsession.
     * @example
     * // Update or create a Clientsession
     * const clientsession = await prisma.clientsession.upsert({
     *   create: {
     *     // ... data to create a Clientsession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clientsession we want to update
     *   }
     * })
     */
    upsert<T extends clientsessionUpsertArgs>(args: SelectSubset<T, clientsessionUpsertArgs<ExtArgs>>): Prisma__clientsessionClient<$Result.GetResult<Prisma.$clientsessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientsessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientsessionCountArgs} args - Arguments to filter Clientsessions to count.
     * @example
     * // Count the number of Clientsessions
     * const count = await prisma.clientsession.count({
     *   where: {
     *     // ... the filter for the Clientsessions we want to count
     *   }
     * })
    **/
    count<T extends clientsessionCountArgs>(
      args?: Subset<T, clientsessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientsessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clientsession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientsessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientsessionAggregateArgs>(args: Subset<T, ClientsessionAggregateArgs>): Prisma.PrismaPromise<GetClientsessionAggregateType<T>>

    /**
     * Group by Clientsession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientsessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends clientsessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: clientsessionGroupByArgs['orderBy'] }
        : { orderBy?: clientsessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, clientsessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientsessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the clientsession model
   */
  readonly fields: clientsessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for clientsession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__clientsessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends clientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, clientDefaultArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the clientsession model
   */
  interface clientsessionFieldRefs {
    readonly id: FieldRef<"clientsession", 'String'>
    readonly clientId: FieldRef<"clientsession", 'String'>
    readonly token: FieldRef<"clientsession", 'String'>
    readonly expiresAt: FieldRef<"clientsession", 'DateTime'>
    readonly createdAt: FieldRef<"clientsession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * clientsession findUnique
   */
  export type clientsessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * Filter, which clientsession to fetch.
     */
    where: clientsessionWhereUniqueInput
  }

  /**
   * clientsession findUniqueOrThrow
   */
  export type clientsessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * Filter, which clientsession to fetch.
     */
    where: clientsessionWhereUniqueInput
  }

  /**
   * clientsession findFirst
   */
  export type clientsessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * Filter, which clientsession to fetch.
     */
    where?: clientsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientsessions to fetch.
     */
    orderBy?: clientsessionOrderByWithRelationInput | clientsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clientsessions.
     */
    cursor?: clientsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clientsessions.
     */
    distinct?: ClientsessionScalarFieldEnum | ClientsessionScalarFieldEnum[]
  }

  /**
   * clientsession findFirstOrThrow
   */
  export type clientsessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * Filter, which clientsession to fetch.
     */
    where?: clientsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientsessions to fetch.
     */
    orderBy?: clientsessionOrderByWithRelationInput | clientsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clientsessions.
     */
    cursor?: clientsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clientsessions.
     */
    distinct?: ClientsessionScalarFieldEnum | ClientsessionScalarFieldEnum[]
  }

  /**
   * clientsession findMany
   */
  export type clientsessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * Filter, which clientsessions to fetch.
     */
    where?: clientsessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientsessions to fetch.
     */
    orderBy?: clientsessionOrderByWithRelationInput | clientsessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing clientsessions.
     */
    cursor?: clientsessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientsessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientsessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clientsessions.
     */
    distinct?: ClientsessionScalarFieldEnum | ClientsessionScalarFieldEnum[]
  }

  /**
   * clientsession create
   */
  export type clientsessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * The data needed to create a clientsession.
     */
    data: XOR<clientsessionCreateInput, clientsessionUncheckedCreateInput>
  }

  /**
   * clientsession createMany
   */
  export type clientsessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many clientsessions.
     */
    data: clientsessionCreateManyInput | clientsessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * clientsession update
   */
  export type clientsessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * The data needed to update a clientsession.
     */
    data: XOR<clientsessionUpdateInput, clientsessionUncheckedUpdateInput>
    /**
     * Choose, which clientsession to update.
     */
    where: clientsessionWhereUniqueInput
  }

  /**
   * clientsession updateMany
   */
  export type clientsessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update clientsessions.
     */
    data: XOR<clientsessionUpdateManyMutationInput, clientsessionUncheckedUpdateManyInput>
    /**
     * Filter which clientsessions to update
     */
    where?: clientsessionWhereInput
    /**
     * Limit how many clientsessions to update.
     */
    limit?: number
  }

  /**
   * clientsession upsert
   */
  export type clientsessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * The filter to search for the clientsession to update in case it exists.
     */
    where: clientsessionWhereUniqueInput
    /**
     * In case the clientsession found by the `where` argument doesn't exist, create a new clientsession with this data.
     */
    create: XOR<clientsessionCreateInput, clientsessionUncheckedCreateInput>
    /**
     * In case the clientsession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<clientsessionUpdateInput, clientsessionUncheckedUpdateInput>
  }

  /**
   * clientsession delete
   */
  export type clientsessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
    /**
     * Filter which clientsession to delete.
     */
    where: clientsessionWhereUniqueInput
  }

  /**
   * clientsession deleteMany
   */
  export type clientsessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clientsessions to delete
     */
    where?: clientsessionWhereInput
    /**
     * Limit how many clientsessions to delete.
     */
    limit?: number
  }

  /**
   * clientsession without action
   */
  export type clientsessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientsession
     */
    select?: clientsessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientsession
     */
    omit?: clientsessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientsessionInclude<ExtArgs> | null
  }


  /**
   * Model enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    attendeeId: string | null
    geofenceId: string | null
    createdAt: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    attendeeId: string | null
    geofenceId: string | null
    createdAt: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    attendeeId: number
    geofenceId: number
    createdAt: number
    _all: number
  }


  export type EnrollmentMinAggregateInputType = {
    id?: true
    attendeeId?: true
    geofenceId?: true
    createdAt?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    attendeeId?: true
    geofenceId?: true
    createdAt?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    attendeeId?: true
    geofenceId?: true
    createdAt?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which enrollment to aggregate.
     */
    where?: enrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrollments to fetch.
     */
    orderBy?: enrollmentOrderByWithRelationInput | enrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: enrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type enrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: enrollmentWhereInput
    orderBy?: enrollmentOrderByWithAggregationInput | enrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: enrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    attendeeId: string
    geofenceId: string
    createdAt: Date
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends enrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type enrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attendeeId?: boolean
    geofenceId?: boolean
    createdAt?: boolean
    attendee?: boolean | attendeeDefaultArgs<ExtArgs>
    geofence?: boolean | geofenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>



  export type enrollmentSelectScalar = {
    id?: boolean
    attendeeId?: boolean
    geofenceId?: boolean
    createdAt?: boolean
  }

  export type enrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attendeeId" | "geofenceId" | "createdAt", ExtArgs["result"]["enrollment"]>
  export type enrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | attendeeDefaultArgs<ExtArgs>
    geofence?: boolean | geofenceDefaultArgs<ExtArgs>
  }

  export type $enrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "enrollment"
    objects: {
      attendee: Prisma.$attendeePayload<ExtArgs>
      geofence: Prisma.$geofencePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attendeeId: string
      geofenceId: string
      createdAt: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type enrollmentGetPayload<S extends boolean | null | undefined | enrollmentDefaultArgs> = $Result.GetResult<Prisma.$enrollmentPayload, S>

  type enrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<enrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface enrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['enrollment'], meta: { name: 'enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {enrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends enrollmentFindUniqueArgs>(args: SelectSubset<T, enrollmentFindUniqueArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {enrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends enrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, enrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends enrollmentFindFirstArgs>(args?: SelectSubset<T, enrollmentFindFirstArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends enrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, enrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends enrollmentFindManyArgs>(args?: SelectSubset<T, enrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {enrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends enrollmentCreateArgs>(args: SelectSubset<T, enrollmentCreateArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {enrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends enrollmentCreateManyArgs>(args?: SelectSubset<T, enrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Enrollment.
     * @param {enrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends enrollmentDeleteArgs>(args: SelectSubset<T, enrollmentDeleteArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {enrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends enrollmentUpdateArgs>(args: SelectSubset<T, enrollmentUpdateArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {enrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends enrollmentDeleteManyArgs>(args?: SelectSubset<T, enrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends enrollmentUpdateManyArgs>(args: SelectSubset<T, enrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Enrollment.
     * @param {enrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends enrollmentUpsertArgs>(args: SelectSubset<T, enrollmentUpsertArgs<ExtArgs>>): Prisma__enrollmentClient<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends enrollmentCountArgs>(
      args?: Subset<T, enrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {enrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends enrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: enrollmentGroupByArgs['orderBy'] }
        : { orderBy?: enrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, enrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the enrollment model
   */
  readonly fields: enrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__enrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendee<T extends attendeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, attendeeDefaultArgs<ExtArgs>>): Prisma__attendeeClient<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    geofence<T extends geofenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, geofenceDefaultArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the enrollment model
   */
  interface enrollmentFieldRefs {
    readonly id: FieldRef<"enrollment", 'String'>
    readonly attendeeId: FieldRef<"enrollment", 'String'>
    readonly geofenceId: FieldRef<"enrollment", 'String'>
    readonly createdAt: FieldRef<"enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * enrollment findUnique
   */
  export type enrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * Filter, which enrollment to fetch.
     */
    where: enrollmentWhereUniqueInput
  }

  /**
   * enrollment findUniqueOrThrow
   */
  export type enrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * Filter, which enrollment to fetch.
     */
    where: enrollmentWhereUniqueInput
  }

  /**
   * enrollment findFirst
   */
  export type enrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * Filter, which enrollment to fetch.
     */
    where?: enrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrollments to fetch.
     */
    orderBy?: enrollmentOrderByWithRelationInput | enrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for enrollments.
     */
    cursor?: enrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * enrollment findFirstOrThrow
   */
  export type enrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * Filter, which enrollment to fetch.
     */
    where?: enrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrollments to fetch.
     */
    orderBy?: enrollmentOrderByWithRelationInput | enrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for enrollments.
     */
    cursor?: enrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * enrollment findMany
   */
  export type enrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * Filter, which enrollments to fetch.
     */
    where?: enrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of enrollments to fetch.
     */
    orderBy?: enrollmentOrderByWithRelationInput | enrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing enrollments.
     */
    cursor?: enrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * enrollment create
   */
  export type enrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a enrollment.
     */
    data: XOR<enrollmentCreateInput, enrollmentUncheckedCreateInput>
  }

  /**
   * enrollment createMany
   */
  export type enrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many enrollments.
     */
    data: enrollmentCreateManyInput | enrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * enrollment update
   */
  export type enrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a enrollment.
     */
    data: XOR<enrollmentUpdateInput, enrollmentUncheckedUpdateInput>
    /**
     * Choose, which enrollment to update.
     */
    where: enrollmentWhereUniqueInput
  }

  /**
   * enrollment updateMany
   */
  export type enrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update enrollments.
     */
    data: XOR<enrollmentUpdateManyMutationInput, enrollmentUncheckedUpdateManyInput>
    /**
     * Filter which enrollments to update
     */
    where?: enrollmentWhereInput
    /**
     * Limit how many enrollments to update.
     */
    limit?: number
  }

  /**
   * enrollment upsert
   */
  export type enrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the enrollment to update in case it exists.
     */
    where: enrollmentWhereUniqueInput
    /**
     * In case the enrollment found by the `where` argument doesn't exist, create a new enrollment with this data.
     */
    create: XOR<enrollmentCreateInput, enrollmentUncheckedCreateInput>
    /**
     * In case the enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<enrollmentUpdateInput, enrollmentUncheckedUpdateInput>
  }

  /**
   * enrollment delete
   */
  export type enrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    /**
     * Filter which enrollment to delete.
     */
    where: enrollmentWhereUniqueInput
  }

  /**
   * enrollment deleteMany
   */
  export type enrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which enrollments to delete
     */
    where?: enrollmentWhereInput
    /**
     * Limit how many enrollments to delete.
     */
    limit?: number
  }

  /**
   * enrollment without action
   */
  export type enrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
  }


  /**
   * Model geofence
   */

  export type AggregateGeofence = {
    _count: GeofenceCountAggregateOutputType | null
    _avg: GeofenceAvgAggregateOutputType | null
    _sum: GeofenceSumAggregateOutputType | null
    _min: GeofenceMinAggregateOutputType | null
    _max: GeofenceMaxAggregateOutputType | null
  }

  export type GeofenceAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type GeofenceSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type GeofenceMinAggregateOutputType = {
    id: string | null
    name: string | null
    latitude: number | null
    longitude: number | null
    radius: number | null
    isActive: boolean | null
    orgId: string | null
    createdByClientId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeofenceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    latitude: number | null
    longitude: number | null
    radius: number | null
    isActive: boolean | null
    orgId: string | null
    createdByClientId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeofenceCountAggregateOutputType = {
    id: number
    name: number
    latitude: number
    longitude: number
    radius: number
    isActive: number
    orgId: number
    createdByClientId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GeofenceAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type GeofenceSumAggregateInputType = {
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type GeofenceMinAggregateInputType = {
    id?: true
    name?: true
    latitude?: true
    longitude?: true
    radius?: true
    isActive?: true
    orgId?: true
    createdByClientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeofenceMaxAggregateInputType = {
    id?: true
    name?: true
    latitude?: true
    longitude?: true
    radius?: true
    isActive?: true
    orgId?: true
    createdByClientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeofenceCountAggregateInputType = {
    id?: true
    name?: true
    latitude?: true
    longitude?: true
    radius?: true
    isActive?: true
    orgId?: true
    createdByClientId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GeofenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which geofence to aggregate.
     */
    where?: geofenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of geofences to fetch.
     */
    orderBy?: geofenceOrderByWithRelationInput | geofenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: geofenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` geofences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` geofences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned geofences
    **/
    _count?: true | GeofenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeofenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeofenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeofenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeofenceMaxAggregateInputType
  }

  export type GetGeofenceAggregateType<T extends GeofenceAggregateArgs> = {
        [P in keyof T & keyof AggregateGeofence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeofence[P]>
      : GetScalarType<T[P], AggregateGeofence[P]>
  }




  export type geofenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: geofenceWhereInput
    orderBy?: geofenceOrderByWithAggregationInput | geofenceOrderByWithAggregationInput[]
    by: GeofenceScalarFieldEnum[] | GeofenceScalarFieldEnum
    having?: geofenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeofenceCountAggregateInputType | true
    _avg?: GeofenceAvgAggregateInputType
    _sum?: GeofenceSumAggregateInputType
    _min?: GeofenceMinAggregateInputType
    _max?: GeofenceMaxAggregateInputType
  }

  export type GeofenceGroupByOutputType = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive: boolean
    orgId: string
    createdByClientId: string
    createdAt: Date
    updatedAt: Date
    _count: GeofenceCountAggregateOutputType | null
    _avg: GeofenceAvgAggregateOutputType | null
    _sum: GeofenceSumAggregateOutputType | null
    _min: GeofenceMinAggregateOutputType | null
    _max: GeofenceMaxAggregateOutputType | null
  }

  type GetGeofenceGroupByPayload<T extends geofenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeofenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeofenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeofenceGroupByOutputType[P]>
            : GetScalarType<T[P], GeofenceGroupByOutputType[P]>
        }
      >
    >


  export type geofenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
    isActive?: boolean
    orgId?: boolean
    createdByClientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attendancelog?: boolean | geofence$attendancelogArgs<ExtArgs>
    enrollment?: boolean | geofence$enrollmentArgs<ExtArgs>
    client?: boolean | clientDefaultArgs<ExtArgs>
    organization_geofence_orgIdToorganization?: boolean | organizationDefaultArgs<ExtArgs>
    _count?: boolean | GeofenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["geofence"]>



  export type geofenceSelectScalar = {
    id?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
    isActive?: boolean
    orgId?: boolean
    createdByClientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type geofenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "latitude" | "longitude" | "radius" | "isActive" | "orgId" | "createdByClientId" | "createdAt" | "updatedAt", ExtArgs["result"]["geofence"]>
  export type geofenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendancelog?: boolean | geofence$attendancelogArgs<ExtArgs>
    enrollment?: boolean | geofence$enrollmentArgs<ExtArgs>
    client?: boolean | clientDefaultArgs<ExtArgs>
    organization_geofence_orgIdToorganization?: boolean | organizationDefaultArgs<ExtArgs>
    _count?: boolean | GeofenceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $geofencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "geofence"
    objects: {
      attendancelog: Prisma.$attendancelogPayload<ExtArgs>[]
      enrollment: Prisma.$enrollmentPayload<ExtArgs>[]
      client: Prisma.$clientPayload<ExtArgs>
      organization_geofence_orgIdToorganization: Prisma.$organizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      latitude: number
      longitude: number
      radius: number
      isActive: boolean
      orgId: string
      createdByClientId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["geofence"]>
    composites: {}
  }

  type geofenceGetPayload<S extends boolean | null | undefined | geofenceDefaultArgs> = $Result.GetResult<Prisma.$geofencePayload, S>

  type geofenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<geofenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GeofenceCountAggregateInputType | true
    }

  export interface geofenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['geofence'], meta: { name: 'geofence' } }
    /**
     * Find zero or one Geofence that matches the filter.
     * @param {geofenceFindUniqueArgs} args - Arguments to find a Geofence
     * @example
     * // Get one Geofence
     * const geofence = await prisma.geofence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends geofenceFindUniqueArgs>(args: SelectSubset<T, geofenceFindUniqueArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Geofence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {geofenceFindUniqueOrThrowArgs} args - Arguments to find a Geofence
     * @example
     * // Get one Geofence
     * const geofence = await prisma.geofence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends geofenceFindUniqueOrThrowArgs>(args: SelectSubset<T, geofenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Geofence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {geofenceFindFirstArgs} args - Arguments to find a Geofence
     * @example
     * // Get one Geofence
     * const geofence = await prisma.geofence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends geofenceFindFirstArgs>(args?: SelectSubset<T, geofenceFindFirstArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Geofence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {geofenceFindFirstOrThrowArgs} args - Arguments to find a Geofence
     * @example
     * // Get one Geofence
     * const geofence = await prisma.geofence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends geofenceFindFirstOrThrowArgs>(args?: SelectSubset<T, geofenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Geofences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {geofenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Geofences
     * const geofences = await prisma.geofence.findMany()
     * 
     * // Get first 10 Geofences
     * const geofences = await prisma.geofence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const geofenceWithIdOnly = await prisma.geofence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends geofenceFindManyArgs>(args?: SelectSubset<T, geofenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Geofence.
     * @param {geofenceCreateArgs} args - Arguments to create a Geofence.
     * @example
     * // Create one Geofence
     * const Geofence = await prisma.geofence.create({
     *   data: {
     *     // ... data to create a Geofence
     *   }
     * })
     * 
     */
    create<T extends geofenceCreateArgs>(args: SelectSubset<T, geofenceCreateArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Geofences.
     * @param {geofenceCreateManyArgs} args - Arguments to create many Geofences.
     * @example
     * // Create many Geofences
     * const geofence = await prisma.geofence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends geofenceCreateManyArgs>(args?: SelectSubset<T, geofenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Geofence.
     * @param {geofenceDeleteArgs} args - Arguments to delete one Geofence.
     * @example
     * // Delete one Geofence
     * const Geofence = await prisma.geofence.delete({
     *   where: {
     *     // ... filter to delete one Geofence
     *   }
     * })
     * 
     */
    delete<T extends geofenceDeleteArgs>(args: SelectSubset<T, geofenceDeleteArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Geofence.
     * @param {geofenceUpdateArgs} args - Arguments to update one Geofence.
     * @example
     * // Update one Geofence
     * const geofence = await prisma.geofence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends geofenceUpdateArgs>(args: SelectSubset<T, geofenceUpdateArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Geofences.
     * @param {geofenceDeleteManyArgs} args - Arguments to filter Geofences to delete.
     * @example
     * // Delete a few Geofences
     * const { count } = await prisma.geofence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends geofenceDeleteManyArgs>(args?: SelectSubset<T, geofenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Geofences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {geofenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Geofences
     * const geofence = await prisma.geofence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends geofenceUpdateManyArgs>(args: SelectSubset<T, geofenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Geofence.
     * @param {geofenceUpsertArgs} args - Arguments to update or create a Geofence.
     * @example
     * // Update or create a Geofence
     * const geofence = await prisma.geofence.upsert({
     *   create: {
     *     // ... data to create a Geofence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Geofence we want to update
     *   }
     * })
     */
    upsert<T extends geofenceUpsertArgs>(args: SelectSubset<T, geofenceUpsertArgs<ExtArgs>>): Prisma__geofenceClient<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Geofences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {geofenceCountArgs} args - Arguments to filter Geofences to count.
     * @example
     * // Count the number of Geofences
     * const count = await prisma.geofence.count({
     *   where: {
     *     // ... the filter for the Geofences we want to count
     *   }
     * })
    **/
    count<T extends geofenceCountArgs>(
      args?: Subset<T, geofenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeofenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Geofence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeofenceAggregateArgs>(args: Subset<T, GeofenceAggregateArgs>): Prisma.PrismaPromise<GetGeofenceAggregateType<T>>

    /**
     * Group by Geofence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {geofenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends geofenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: geofenceGroupByArgs['orderBy'] }
        : { orderBy?: geofenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, geofenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeofenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the geofence model
   */
  readonly fields: geofenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for geofence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__geofenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendancelog<T extends geofence$attendancelogArgs<ExtArgs> = {}>(args?: Subset<T, geofence$attendancelogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendancelogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollment<T extends geofence$enrollmentArgs<ExtArgs> = {}>(args?: Subset<T, geofence$enrollmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$enrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    client<T extends clientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, clientDefaultArgs<ExtArgs>>): Prisma__clientClient<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization_geofence_orgIdToorganization<T extends organizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, organizationDefaultArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the geofence model
   */
  interface geofenceFieldRefs {
    readonly id: FieldRef<"geofence", 'String'>
    readonly name: FieldRef<"geofence", 'String'>
    readonly latitude: FieldRef<"geofence", 'Float'>
    readonly longitude: FieldRef<"geofence", 'Float'>
    readonly radius: FieldRef<"geofence", 'Int'>
    readonly isActive: FieldRef<"geofence", 'Boolean'>
    readonly orgId: FieldRef<"geofence", 'String'>
    readonly createdByClientId: FieldRef<"geofence", 'String'>
    readonly createdAt: FieldRef<"geofence", 'DateTime'>
    readonly updatedAt: FieldRef<"geofence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * geofence findUnique
   */
  export type geofenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * Filter, which geofence to fetch.
     */
    where: geofenceWhereUniqueInput
  }

  /**
   * geofence findUniqueOrThrow
   */
  export type geofenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * Filter, which geofence to fetch.
     */
    where: geofenceWhereUniqueInput
  }

  /**
   * geofence findFirst
   */
  export type geofenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * Filter, which geofence to fetch.
     */
    where?: geofenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of geofences to fetch.
     */
    orderBy?: geofenceOrderByWithRelationInput | geofenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for geofences.
     */
    cursor?: geofenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` geofences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` geofences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of geofences.
     */
    distinct?: GeofenceScalarFieldEnum | GeofenceScalarFieldEnum[]
  }

  /**
   * geofence findFirstOrThrow
   */
  export type geofenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * Filter, which geofence to fetch.
     */
    where?: geofenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of geofences to fetch.
     */
    orderBy?: geofenceOrderByWithRelationInput | geofenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for geofences.
     */
    cursor?: geofenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` geofences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` geofences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of geofences.
     */
    distinct?: GeofenceScalarFieldEnum | GeofenceScalarFieldEnum[]
  }

  /**
   * geofence findMany
   */
  export type geofenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * Filter, which geofences to fetch.
     */
    where?: geofenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of geofences to fetch.
     */
    orderBy?: geofenceOrderByWithRelationInput | geofenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing geofences.
     */
    cursor?: geofenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` geofences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` geofences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of geofences.
     */
    distinct?: GeofenceScalarFieldEnum | GeofenceScalarFieldEnum[]
  }

  /**
   * geofence create
   */
  export type geofenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * The data needed to create a geofence.
     */
    data: XOR<geofenceCreateInput, geofenceUncheckedCreateInput>
  }

  /**
   * geofence createMany
   */
  export type geofenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many geofences.
     */
    data: geofenceCreateManyInput | geofenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * geofence update
   */
  export type geofenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * The data needed to update a geofence.
     */
    data: XOR<geofenceUpdateInput, geofenceUncheckedUpdateInput>
    /**
     * Choose, which geofence to update.
     */
    where: geofenceWhereUniqueInput
  }

  /**
   * geofence updateMany
   */
  export type geofenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update geofences.
     */
    data: XOR<geofenceUpdateManyMutationInput, geofenceUncheckedUpdateManyInput>
    /**
     * Filter which geofences to update
     */
    where?: geofenceWhereInput
    /**
     * Limit how many geofences to update.
     */
    limit?: number
  }

  /**
   * geofence upsert
   */
  export type geofenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * The filter to search for the geofence to update in case it exists.
     */
    where: geofenceWhereUniqueInput
    /**
     * In case the geofence found by the `where` argument doesn't exist, create a new geofence with this data.
     */
    create: XOR<geofenceCreateInput, geofenceUncheckedCreateInput>
    /**
     * In case the geofence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<geofenceUpdateInput, geofenceUncheckedUpdateInput>
  }

  /**
   * geofence delete
   */
  export type geofenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    /**
     * Filter which geofence to delete.
     */
    where: geofenceWhereUniqueInput
  }

  /**
   * geofence deleteMany
   */
  export type geofenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which geofences to delete
     */
    where?: geofenceWhereInput
    /**
     * Limit how many geofences to delete.
     */
    limit?: number
  }

  /**
   * geofence.attendancelog
   */
  export type geofence$attendancelogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendancelog
     */
    select?: attendancelogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendancelog
     */
    omit?: attendancelogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendancelogInclude<ExtArgs> | null
    where?: attendancelogWhereInput
    orderBy?: attendancelogOrderByWithRelationInput | attendancelogOrderByWithRelationInput[]
    cursor?: attendancelogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendancelogScalarFieldEnum | AttendancelogScalarFieldEnum[]
  }

  /**
   * geofence.enrollment
   */
  export type geofence$enrollmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the enrollment
     */
    select?: enrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the enrollment
     */
    omit?: enrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: enrollmentInclude<ExtArgs> | null
    where?: enrollmentWhereInput
    orderBy?: enrollmentOrderByWithRelationInput | enrollmentOrderByWithRelationInput[]
    cursor?: enrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * geofence without action
   */
  export type geofenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
  }


  /**
   * Model organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    orgCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    requestedById: string | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    orgCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    requestedById: string | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    description: number
    orgCode: number
    createdAt: number
    updatedAt: number
    isActive: number
    requestedById: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    requestedById?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    requestedById?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    orgCode?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    requestedById?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which organization to aggregate.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type organizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: organizationWhereInput
    orderBy?: organizationOrderByWithAggregationInput | organizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: organizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    description: string | null
    orgCode: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    requestedById: string | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends organizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type organizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    orgCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    requestedById?: boolean
    attendee?: boolean | organization$attendeeArgs<ExtArgs>
    category?: boolean | organization$categoryArgs<ExtArgs>
    client?: boolean | organization$clientArgs<ExtArgs>
    geofence_geofence_orgIdToorganization?: boolean | organization$geofence_geofence_orgIdToorganizationArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>



  export type organizationSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    orgCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    requestedById?: boolean
  }

  export type organizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "orgCode" | "createdAt" | "updatedAt" | "isActive" | "requestedById", ExtArgs["result"]["organization"]>
  export type organizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendee?: boolean | organization$attendeeArgs<ExtArgs>
    category?: boolean | organization$categoryArgs<ExtArgs>
    client?: boolean | organization$clientArgs<ExtArgs>
    geofence_geofence_orgIdToorganization?: boolean | organization$geofence_geofence_orgIdToorganizationArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $organizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "organization"
    objects: {
      attendee: Prisma.$attendeePayload<ExtArgs>[]
      category: Prisma.$categoryPayload<ExtArgs>[]
      client: Prisma.$clientPayload<ExtArgs>[]
      geofence_geofence_orgIdToorganization: Prisma.$geofencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      orgCode: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      requestedById: string | null
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type organizationGetPayload<S extends boolean | null | undefined | organizationDefaultArgs> = $Result.GetResult<Prisma.$organizationPayload, S>

  type organizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<organizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface organizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['organization'], meta: { name: 'organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {organizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends organizationFindUniqueArgs>(args: SelectSubset<T, organizationFindUniqueArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {organizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends organizationFindUniqueOrThrowArgs>(args: SelectSubset<T, organizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends organizationFindFirstArgs>(args?: SelectSubset<T, organizationFindFirstArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends organizationFindFirstOrThrowArgs>(args?: SelectSubset<T, organizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends organizationFindManyArgs>(args?: SelectSubset<T, organizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {organizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends organizationCreateArgs>(args: SelectSubset<T, organizationCreateArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {organizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends organizationCreateManyArgs>(args?: SelectSubset<T, organizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Organization.
     * @param {organizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends organizationDeleteArgs>(args: SelectSubset<T, organizationDeleteArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {organizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends organizationUpdateArgs>(args: SelectSubset<T, organizationUpdateArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {organizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends organizationDeleteManyArgs>(args?: SelectSubset<T, organizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends organizationUpdateManyArgs>(args: SelectSubset<T, organizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {organizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends organizationUpsertArgs>(args: SelectSubset<T, organizationUpsertArgs<ExtArgs>>): Prisma__organizationClient<$Result.GetResult<Prisma.$organizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends organizationCountArgs>(
      args?: Subset<T, organizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {organizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends organizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: organizationGroupByArgs['orderBy'] }
        : { orderBy?: organizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, organizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the organization model
   */
  readonly fields: organizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__organizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendee<T extends organization$attendeeArgs<ExtArgs> = {}>(args?: Subset<T, organization$attendeeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends organization$categoryArgs<ExtArgs> = {}>(args?: Subset<T, organization$categoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    client<T extends organization$clientArgs<ExtArgs> = {}>(args?: Subset<T, organization$clientArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    geofence_geofence_orgIdToorganization<T extends organization$geofence_geofence_orgIdToorganizationArgs<ExtArgs> = {}>(args?: Subset<T, organization$geofence_geofence_orgIdToorganizationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$geofencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the organization model
   */
  interface organizationFieldRefs {
    readonly id: FieldRef<"organization", 'String'>
    readonly name: FieldRef<"organization", 'String'>
    readonly description: FieldRef<"organization", 'String'>
    readonly orgCode: FieldRef<"organization", 'String'>
    readonly createdAt: FieldRef<"organization", 'DateTime'>
    readonly updatedAt: FieldRef<"organization", 'DateTime'>
    readonly isActive: FieldRef<"organization", 'Boolean'>
    readonly requestedById: FieldRef<"organization", 'String'>
  }
    

  // Custom InputTypes
  /**
   * organization findUnique
   */
  export type organizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization findUniqueOrThrow
   */
  export type organizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization findFirst
   */
  export type organizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for organizations.
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * organization findFirstOrThrow
   */
  export type organizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organization to fetch.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for organizations.
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * organization findMany
   */
  export type organizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter, which organizations to fetch.
     */
    where?: organizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of organizations to fetch.
     */
    orderBy?: organizationOrderByWithRelationInput | organizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing organizations.
     */
    cursor?: organizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * organization create
   */
  export type organizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * The data needed to create a organization.
     */
    data: XOR<organizationCreateInput, organizationUncheckedCreateInput>
  }

  /**
   * organization createMany
   */
  export type organizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many organizations.
     */
    data: organizationCreateManyInput | organizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * organization update
   */
  export type organizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * The data needed to update a organization.
     */
    data: XOR<organizationUpdateInput, organizationUncheckedUpdateInput>
    /**
     * Choose, which organization to update.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization updateMany
   */
  export type organizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update organizations.
     */
    data: XOR<organizationUpdateManyMutationInput, organizationUncheckedUpdateManyInput>
    /**
     * Filter which organizations to update
     */
    where?: organizationWhereInput
    /**
     * Limit how many organizations to update.
     */
    limit?: number
  }

  /**
   * organization upsert
   */
  export type organizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * The filter to search for the organization to update in case it exists.
     */
    where: organizationWhereUniqueInput
    /**
     * In case the organization found by the `where` argument doesn't exist, create a new organization with this data.
     */
    create: XOR<organizationCreateInput, organizationUncheckedCreateInput>
    /**
     * In case the organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<organizationUpdateInput, organizationUncheckedUpdateInput>
  }

  /**
   * organization delete
   */
  export type organizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
    /**
     * Filter which organization to delete.
     */
    where: organizationWhereUniqueInput
  }

  /**
   * organization deleteMany
   */
  export type organizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which organizations to delete
     */
    where?: organizationWhereInput
    /**
     * Limit how many organizations to delete.
     */
    limit?: number
  }

  /**
   * organization.attendee
   */
  export type organization$attendeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendee
     */
    select?: attendeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendee
     */
    omit?: attendeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendeeInclude<ExtArgs> | null
    where?: attendeeWhereInput
    orderBy?: attendeeOrderByWithRelationInput | attendeeOrderByWithRelationInput[]
    cursor?: attendeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendeeScalarFieldEnum | AttendeeScalarFieldEnum[]
  }

  /**
   * organization.category
   */
  export type organization$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    cursor?: categoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * organization.client
   */
  export type organization$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the client
     */
    select?: clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the client
     */
    omit?: clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientInclude<ExtArgs> | null
    where?: clientWhereInput
    orderBy?: clientOrderByWithRelationInput | clientOrderByWithRelationInput[]
    cursor?: clientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * organization.geofence_geofence_orgIdToorganization
   */
  export type organization$geofence_geofence_orgIdToorganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the geofence
     */
    select?: geofenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the geofence
     */
    omit?: geofenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: geofenceInclude<ExtArgs> | null
    where?: geofenceWhereInput
    orderBy?: geofenceOrderByWithRelationInput | geofenceOrderByWithRelationInput[]
    cursor?: geofenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GeofenceScalarFieldEnum | GeofenceScalarFieldEnum[]
  }

  /**
   * organization without action
   */
  export type organizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the organization
     */
    select?: organizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the organization
     */
    omit?: organizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: organizationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    birthDate: 'birthDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const AdminsessionScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type AdminsessionScalarFieldEnum = (typeof AdminsessionScalarFieldEnum)[keyof typeof AdminsessionScalarFieldEnum]


  export const AttendancelogScalarFieldEnum: {
    id: 'id',
    attendeeId: 'attendeeId',
    geofenceId: 'geofenceId',
    deviceLat: 'deviceLat',
    deviceLng: 'deviceLng',
    isMock: 'isMock',
    status: 'status',
    timestamp: 'timestamp',
    afternoonTimeOut: 'afternoonTimeOut',
    morningTimeIn: 'morningTimeIn',
    afternoonTimeIn: 'afternoonTimeIn',
    morningTimeOut: 'morningTimeOut'
  };

  export type AttendancelogScalarFieldEnum = (typeof AttendancelogScalarFieldEnum)[keyof typeof AttendancelogScalarFieldEnum]


  export const AttendeeScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    birthDate: 'birthDate',
    orgCode: 'orgCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isVerified: 'isVerified',
    categoryId: 'categoryId'
  };

  export type AttendeeScalarFieldEnum = (typeof AttendeeScalarFieldEnum)[keyof typeof AttendeeScalarFieldEnum]


  export const AttendeesessionScalarFieldEnum: {
    id: 'id',
    attendeeId: 'attendeeId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type AttendeesessionScalarFieldEnum = (typeof AttendeesessionScalarFieldEnum)[keyof typeof AttendeesessionScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    orgId: 'orgId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    birthDate: 'birthDate',
    orgCode: 'orgCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isVerified: 'isVerified'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ClientsessionScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type ClientsessionScalarFieldEnum = (typeof ClientsessionScalarFieldEnum)[keyof typeof ClientsessionScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    attendeeId: 'attendeeId',
    geofenceId: 'geofenceId',
    createdAt: 'createdAt'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const GeofenceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    latitude: 'latitude',
    longitude: 'longitude',
    radius: 'radius',
    isActive: 'isActive',
    orgId: 'orgId',
    createdByClientId: 'createdByClientId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GeofenceScalarFieldEnum = (typeof GeofenceScalarFieldEnum)[keyof typeof GeofenceScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    orgCode: 'orgCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    requestedById: 'requestedById'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const adminOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash'
  };

  export type adminOrderByRelevanceFieldEnum = (typeof adminOrderByRelevanceFieldEnum)[keyof typeof adminOrderByRelevanceFieldEnum]


  export const adminsessionOrderByRelevanceFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    token: 'token'
  };

  export type adminsessionOrderByRelevanceFieldEnum = (typeof adminsessionOrderByRelevanceFieldEnum)[keyof typeof adminsessionOrderByRelevanceFieldEnum]


  export const attendancelogOrderByRelevanceFieldEnum: {
    id: 'id',
    attendeeId: 'attendeeId',
    geofenceId: 'geofenceId',
    status: 'status'
  };

  export type attendancelogOrderByRelevanceFieldEnum = (typeof attendancelogOrderByRelevanceFieldEnum)[keyof typeof attendancelogOrderByRelevanceFieldEnum]


  export const attendeeOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    orgCode: 'orgCode',
    categoryId: 'categoryId'
  };

  export type attendeeOrderByRelevanceFieldEnum = (typeof attendeeOrderByRelevanceFieldEnum)[keyof typeof attendeeOrderByRelevanceFieldEnum]


  export const attendeesessionOrderByRelevanceFieldEnum: {
    id: 'id',
    attendeeId: 'attendeeId',
    token: 'token'
  };

  export type attendeesessionOrderByRelevanceFieldEnum = (typeof attendeesessionOrderByRelevanceFieldEnum)[keyof typeof attendeesessionOrderByRelevanceFieldEnum]


  export const categoryOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    orgId: 'orgId'
  };

  export type categoryOrderByRelevanceFieldEnum = (typeof categoryOrderByRelevanceFieldEnum)[keyof typeof categoryOrderByRelevanceFieldEnum]


  export const clientOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    orgCode: 'orgCode'
  };

  export type clientOrderByRelevanceFieldEnum = (typeof clientOrderByRelevanceFieldEnum)[keyof typeof clientOrderByRelevanceFieldEnum]


  export const clientsessionOrderByRelevanceFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    token: 'token'
  };

  export type clientsessionOrderByRelevanceFieldEnum = (typeof clientsessionOrderByRelevanceFieldEnum)[keyof typeof clientsessionOrderByRelevanceFieldEnum]


  export const enrollmentOrderByRelevanceFieldEnum: {
    id: 'id',
    attendeeId: 'attendeeId',
    geofenceId: 'geofenceId'
  };

  export type enrollmentOrderByRelevanceFieldEnum = (typeof enrollmentOrderByRelevanceFieldEnum)[keyof typeof enrollmentOrderByRelevanceFieldEnum]


  export const geofenceOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    orgId: 'orgId',
    createdByClientId: 'createdByClientId'
  };

  export type geofenceOrderByRelevanceFieldEnum = (typeof geofenceOrderByRelevanceFieldEnum)[keyof typeof geofenceOrderByRelevanceFieldEnum]


  export const organizationOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    orgCode: 'orgCode',
    requestedById: 'requestedById'
  };

  export type organizationOrderByRelevanceFieldEnum = (typeof organizationOrderByRelevanceFieldEnum)[keyof typeof organizationOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type adminWhereInput = {
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    id?: StringFilter<"admin"> | string
    email?: StringFilter<"admin"> | string
    name?: StringFilter<"admin"> | string
    passwordHash?: StringFilter<"admin"> | string
    birthDate?: DateTimeNullableFilter<"admin"> | Date | string | null
    createdAt?: DateTimeFilter<"admin"> | Date | string
    updatedAt?: DateTimeFilter<"admin"> | Date | string
    adminsession?: AdminsessionListRelationFilter
  }

  export type adminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminsession?: adminsessionOrderByRelationAggregateInput
    _relevance?: adminOrderByRelevanceInput
  }

  export type adminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    name?: StringFilter<"admin"> | string
    passwordHash?: StringFilter<"admin"> | string
    birthDate?: DateTimeNullableFilter<"admin"> | Date | string | null
    createdAt?: DateTimeFilter<"admin"> | Date | string
    updatedAt?: DateTimeFilter<"admin"> | Date | string
    adminsession?: AdminsessionListRelationFilter
  }, "id" | "email">

  export type adminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: adminCountOrderByAggregateInput
    _max?: adminMaxOrderByAggregateInput
    _min?: adminMinOrderByAggregateInput
  }

  export type adminScalarWhereWithAggregatesInput = {
    AND?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    OR?: adminScalarWhereWithAggregatesInput[]
    NOT?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"admin"> | string
    email?: StringWithAggregatesFilter<"admin"> | string
    name?: StringWithAggregatesFilter<"admin"> | string
    passwordHash?: StringWithAggregatesFilter<"admin"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"admin"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"admin"> | Date | string
  }

  export type adminsessionWhereInput = {
    AND?: adminsessionWhereInput | adminsessionWhereInput[]
    OR?: adminsessionWhereInput[]
    NOT?: adminsessionWhereInput | adminsessionWhereInput[]
    id?: StringFilter<"adminsession"> | string
    adminId?: StringFilter<"adminsession"> | string
    token?: StringFilter<"adminsession"> | string
    expiresAt?: DateTimeFilter<"adminsession"> | Date | string
    createdAt?: DateTimeFilter<"adminsession"> | Date | string
    admin?: XOR<AdminScalarRelationFilter, adminWhereInput>
  }

  export type adminsessionOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    admin?: adminOrderByWithRelationInput
    _relevance?: adminsessionOrderByRelevanceInput
  }

  export type adminsessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: adminsessionWhereInput | adminsessionWhereInput[]
    OR?: adminsessionWhereInput[]
    NOT?: adminsessionWhereInput | adminsessionWhereInput[]
    adminId?: StringFilter<"adminsession"> | string
    expiresAt?: DateTimeFilter<"adminsession"> | Date | string
    createdAt?: DateTimeFilter<"adminsession"> | Date | string
    admin?: XOR<AdminScalarRelationFilter, adminWhereInput>
  }, "id" | "token">

  export type adminsessionOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: adminsessionCountOrderByAggregateInput
    _max?: adminsessionMaxOrderByAggregateInput
    _min?: adminsessionMinOrderByAggregateInput
  }

  export type adminsessionScalarWhereWithAggregatesInput = {
    AND?: adminsessionScalarWhereWithAggregatesInput | adminsessionScalarWhereWithAggregatesInput[]
    OR?: adminsessionScalarWhereWithAggregatesInput[]
    NOT?: adminsessionScalarWhereWithAggregatesInput | adminsessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"adminsession"> | string
    adminId?: StringWithAggregatesFilter<"adminsession"> | string
    token?: StringWithAggregatesFilter<"adminsession"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"adminsession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"adminsession"> | Date | string
  }

  export type attendancelogWhereInput = {
    AND?: attendancelogWhereInput | attendancelogWhereInput[]
    OR?: attendancelogWhereInput[]
    NOT?: attendancelogWhereInput | attendancelogWhereInput[]
    id?: StringFilter<"attendancelog"> | string
    attendeeId?: StringFilter<"attendancelog"> | string
    geofenceId?: StringFilter<"attendancelog"> | string
    deviceLat?: FloatFilter<"attendancelog"> | number
    deviceLng?: FloatFilter<"attendancelog"> | number
    isMock?: BoolFilter<"attendancelog"> | boolean
    status?: StringFilter<"attendancelog"> | string
    timestamp?: DateTimeFilter<"attendancelog"> | Date | string
    afternoonTimeOut?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    morningTimeIn?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    afternoonTimeIn?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    morningTimeOut?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    attendee?: XOR<AttendeeScalarRelationFilter, attendeeWhereInput>
    geofence?: XOR<GeofenceScalarRelationFilter, geofenceWhereInput>
  }

  export type attendancelogOrderByWithRelationInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    deviceLat?: SortOrder
    deviceLng?: SortOrder
    isMock?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    afternoonTimeOut?: SortOrderInput | SortOrder
    morningTimeIn?: SortOrderInput | SortOrder
    afternoonTimeIn?: SortOrderInput | SortOrder
    morningTimeOut?: SortOrderInput | SortOrder
    attendee?: attendeeOrderByWithRelationInput
    geofence?: geofenceOrderByWithRelationInput
    _relevance?: attendancelogOrderByRelevanceInput
  }

  export type attendancelogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: attendancelogWhereInput | attendancelogWhereInput[]
    OR?: attendancelogWhereInput[]
    NOT?: attendancelogWhereInput | attendancelogWhereInput[]
    attendeeId?: StringFilter<"attendancelog"> | string
    geofenceId?: StringFilter<"attendancelog"> | string
    deviceLat?: FloatFilter<"attendancelog"> | number
    deviceLng?: FloatFilter<"attendancelog"> | number
    isMock?: BoolFilter<"attendancelog"> | boolean
    status?: StringFilter<"attendancelog"> | string
    timestamp?: DateTimeFilter<"attendancelog"> | Date | string
    afternoonTimeOut?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    morningTimeIn?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    afternoonTimeIn?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    morningTimeOut?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    attendee?: XOR<AttendeeScalarRelationFilter, attendeeWhereInput>
    geofence?: XOR<GeofenceScalarRelationFilter, geofenceWhereInput>
  }, "id">

  export type attendancelogOrderByWithAggregationInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    deviceLat?: SortOrder
    deviceLng?: SortOrder
    isMock?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    afternoonTimeOut?: SortOrderInput | SortOrder
    morningTimeIn?: SortOrderInput | SortOrder
    afternoonTimeIn?: SortOrderInput | SortOrder
    morningTimeOut?: SortOrderInput | SortOrder
    _count?: attendancelogCountOrderByAggregateInput
    _avg?: attendancelogAvgOrderByAggregateInput
    _max?: attendancelogMaxOrderByAggregateInput
    _min?: attendancelogMinOrderByAggregateInput
    _sum?: attendancelogSumOrderByAggregateInput
  }

  export type attendancelogScalarWhereWithAggregatesInput = {
    AND?: attendancelogScalarWhereWithAggregatesInput | attendancelogScalarWhereWithAggregatesInput[]
    OR?: attendancelogScalarWhereWithAggregatesInput[]
    NOT?: attendancelogScalarWhereWithAggregatesInput | attendancelogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"attendancelog"> | string
    attendeeId?: StringWithAggregatesFilter<"attendancelog"> | string
    geofenceId?: StringWithAggregatesFilter<"attendancelog"> | string
    deviceLat?: FloatWithAggregatesFilter<"attendancelog"> | number
    deviceLng?: FloatWithAggregatesFilter<"attendancelog"> | number
    isMock?: BoolWithAggregatesFilter<"attendancelog"> | boolean
    status?: StringWithAggregatesFilter<"attendancelog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"attendancelog"> | Date | string
    afternoonTimeOut?: DateTimeNullableWithAggregatesFilter<"attendancelog"> | Date | string | null
    morningTimeIn?: DateTimeNullableWithAggregatesFilter<"attendancelog"> | Date | string | null
    afternoonTimeIn?: DateTimeNullableWithAggregatesFilter<"attendancelog"> | Date | string | null
    morningTimeOut?: DateTimeNullableWithAggregatesFilter<"attendancelog"> | Date | string | null
  }

  export type attendeeWhereInput = {
    AND?: attendeeWhereInput | attendeeWhereInput[]
    OR?: attendeeWhereInput[]
    NOT?: attendeeWhereInput | attendeeWhereInput[]
    id?: StringFilter<"attendee"> | string
    email?: StringFilter<"attendee"> | string
    name?: StringFilter<"attendee"> | string
    passwordHash?: StringFilter<"attendee"> | string
    birthDate?: DateTimeNullableFilter<"attendee"> | Date | string | null
    orgCode?: StringNullableFilter<"attendee"> | string | null
    createdAt?: DateTimeFilter<"attendee"> | Date | string
    updatedAt?: DateTimeFilter<"attendee"> | Date | string
    isVerified?: BoolFilter<"attendee"> | boolean
    categoryId?: StringNullableFilter<"attendee"> | string | null
    attendancelog?: AttendancelogListRelationFilter
    category?: XOR<CategoryNullableScalarRelationFilter, categoryWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, organizationWhereInput> | null
    attendeesession?: AttendeesessionListRelationFilter
    enrollment?: EnrollmentListRelationFilter
  }

  export type attendeeOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    orgCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    attendancelog?: attendancelogOrderByRelationAggregateInput
    category?: categoryOrderByWithRelationInput
    organization?: organizationOrderByWithRelationInput
    attendeesession?: attendeesessionOrderByRelationAggregateInput
    enrollment?: enrollmentOrderByRelationAggregateInput
    _relevance?: attendeeOrderByRelevanceInput
  }

  export type attendeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: attendeeWhereInput | attendeeWhereInput[]
    OR?: attendeeWhereInput[]
    NOT?: attendeeWhereInput | attendeeWhereInput[]
    name?: StringFilter<"attendee"> | string
    passwordHash?: StringFilter<"attendee"> | string
    birthDate?: DateTimeNullableFilter<"attendee"> | Date | string | null
    orgCode?: StringNullableFilter<"attendee"> | string | null
    createdAt?: DateTimeFilter<"attendee"> | Date | string
    updatedAt?: DateTimeFilter<"attendee"> | Date | string
    isVerified?: BoolFilter<"attendee"> | boolean
    categoryId?: StringNullableFilter<"attendee"> | string | null
    attendancelog?: AttendancelogListRelationFilter
    category?: XOR<CategoryNullableScalarRelationFilter, categoryWhereInput> | null
    organization?: XOR<OrganizationNullableScalarRelationFilter, organizationWhereInput> | null
    attendeesession?: AttendeesessionListRelationFilter
    enrollment?: EnrollmentListRelationFilter
  }, "id" | "email">

  export type attendeeOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    orgCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    _count?: attendeeCountOrderByAggregateInput
    _max?: attendeeMaxOrderByAggregateInput
    _min?: attendeeMinOrderByAggregateInput
  }

  export type attendeeScalarWhereWithAggregatesInput = {
    AND?: attendeeScalarWhereWithAggregatesInput | attendeeScalarWhereWithAggregatesInput[]
    OR?: attendeeScalarWhereWithAggregatesInput[]
    NOT?: attendeeScalarWhereWithAggregatesInput | attendeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"attendee"> | string
    email?: StringWithAggregatesFilter<"attendee"> | string
    name?: StringWithAggregatesFilter<"attendee"> | string
    passwordHash?: StringWithAggregatesFilter<"attendee"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"attendee"> | Date | string | null
    orgCode?: StringNullableWithAggregatesFilter<"attendee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"attendee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"attendee"> | Date | string
    isVerified?: BoolWithAggregatesFilter<"attendee"> | boolean
    categoryId?: StringNullableWithAggregatesFilter<"attendee"> | string | null
  }

  export type attendeesessionWhereInput = {
    AND?: attendeesessionWhereInput | attendeesessionWhereInput[]
    OR?: attendeesessionWhereInput[]
    NOT?: attendeesessionWhereInput | attendeesessionWhereInput[]
    id?: StringFilter<"attendeesession"> | string
    attendeeId?: StringFilter<"attendeesession"> | string
    token?: StringFilter<"attendeesession"> | string
    expiresAt?: DateTimeFilter<"attendeesession"> | Date | string
    createdAt?: DateTimeFilter<"attendeesession"> | Date | string
    attendee?: XOR<AttendeeScalarRelationFilter, attendeeWhereInput>
  }

  export type attendeesessionOrderByWithRelationInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    attendee?: attendeeOrderByWithRelationInput
    _relevance?: attendeesessionOrderByRelevanceInput
  }

  export type attendeesessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: attendeesessionWhereInput | attendeesessionWhereInput[]
    OR?: attendeesessionWhereInput[]
    NOT?: attendeesessionWhereInput | attendeesessionWhereInput[]
    attendeeId?: StringFilter<"attendeesession"> | string
    expiresAt?: DateTimeFilter<"attendeesession"> | Date | string
    createdAt?: DateTimeFilter<"attendeesession"> | Date | string
    attendee?: XOR<AttendeeScalarRelationFilter, attendeeWhereInput>
  }, "id" | "token">

  export type attendeesessionOrderByWithAggregationInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: attendeesessionCountOrderByAggregateInput
    _max?: attendeesessionMaxOrderByAggregateInput
    _min?: attendeesessionMinOrderByAggregateInput
  }

  export type attendeesessionScalarWhereWithAggregatesInput = {
    AND?: attendeesessionScalarWhereWithAggregatesInput | attendeesessionScalarWhereWithAggregatesInput[]
    OR?: attendeesessionScalarWhereWithAggregatesInput[]
    NOT?: attendeesessionScalarWhereWithAggregatesInput | attendeesessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"attendeesession"> | string
    attendeeId?: StringWithAggregatesFilter<"attendeesession"> | string
    token?: StringWithAggregatesFilter<"attendeesession"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"attendeesession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"attendeesession"> | Date | string
  }

  export type categoryWhereInput = {
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    id?: StringFilter<"category"> | string
    name?: StringFilter<"category"> | string
    orgId?: StringFilter<"category"> | string
    createdAt?: DateTimeFilter<"category"> | Date | string
    updatedAt?: DateTimeFilter<"category"> | Date | string
    attendee?: AttendeeListRelationFilter
    organization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
  }

  export type categoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attendee?: attendeeOrderByRelationAggregateInput
    organization?: organizationOrderByWithRelationInput
    _relevance?: categoryOrderByRelevanceInput
  }

  export type categoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_name?: categoryOrgIdNameCompoundUniqueInput
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    name?: StringFilter<"category"> | string
    orgId?: StringFilter<"category"> | string
    createdAt?: DateTimeFilter<"category"> | Date | string
    updatedAt?: DateTimeFilter<"category"> | Date | string
    attendee?: AttendeeListRelationFilter
    organization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
  }, "id" | "orgId_name">

  export type categoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: categoryCountOrderByAggregateInput
    _max?: categoryMaxOrderByAggregateInput
    _min?: categoryMinOrderByAggregateInput
  }

  export type categoryScalarWhereWithAggregatesInput = {
    AND?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    OR?: categoryScalarWhereWithAggregatesInput[]
    NOT?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"category"> | string
    name?: StringWithAggregatesFilter<"category"> | string
    orgId?: StringWithAggregatesFilter<"category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"category"> | Date | string
  }

  export type clientWhereInput = {
    AND?: clientWhereInput | clientWhereInput[]
    OR?: clientWhereInput[]
    NOT?: clientWhereInput | clientWhereInput[]
    id?: StringFilter<"client"> | string
    email?: StringFilter<"client"> | string
    name?: StringFilter<"client"> | string
    passwordHash?: StringFilter<"client"> | string
    birthDate?: DateTimeNullableFilter<"client"> | Date | string | null
    orgCode?: StringNullableFilter<"client"> | string | null
    createdAt?: DateTimeFilter<"client"> | Date | string
    updatedAt?: DateTimeFilter<"client"> | Date | string
    isVerified?: BoolFilter<"client"> | boolean
    organization?: XOR<OrganizationNullableScalarRelationFilter, organizationWhereInput> | null
    clientsession?: ClientsessionListRelationFilter
    geofence?: GeofenceListRelationFilter
  }

  export type clientOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    orgCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    organization?: organizationOrderByWithRelationInput
    clientsession?: clientsessionOrderByRelationAggregateInput
    geofence?: geofenceOrderByRelationAggregateInput
    _relevance?: clientOrderByRelevanceInput
  }

  export type clientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: clientWhereInput | clientWhereInput[]
    OR?: clientWhereInput[]
    NOT?: clientWhereInput | clientWhereInput[]
    name?: StringFilter<"client"> | string
    passwordHash?: StringFilter<"client"> | string
    birthDate?: DateTimeNullableFilter<"client"> | Date | string | null
    orgCode?: StringNullableFilter<"client"> | string | null
    createdAt?: DateTimeFilter<"client"> | Date | string
    updatedAt?: DateTimeFilter<"client"> | Date | string
    isVerified?: BoolFilter<"client"> | boolean
    organization?: XOR<OrganizationNullableScalarRelationFilter, organizationWhereInput> | null
    clientsession?: ClientsessionListRelationFilter
    geofence?: GeofenceListRelationFilter
  }, "id" | "email">

  export type clientOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    orgCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    _count?: clientCountOrderByAggregateInput
    _max?: clientMaxOrderByAggregateInput
    _min?: clientMinOrderByAggregateInput
  }

  export type clientScalarWhereWithAggregatesInput = {
    AND?: clientScalarWhereWithAggregatesInput | clientScalarWhereWithAggregatesInput[]
    OR?: clientScalarWhereWithAggregatesInput[]
    NOT?: clientScalarWhereWithAggregatesInput | clientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"client"> | string
    email?: StringWithAggregatesFilter<"client"> | string
    name?: StringWithAggregatesFilter<"client"> | string
    passwordHash?: StringWithAggregatesFilter<"client"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"client"> | Date | string | null
    orgCode?: StringNullableWithAggregatesFilter<"client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"client"> | Date | string
    isVerified?: BoolWithAggregatesFilter<"client"> | boolean
  }

  export type clientsessionWhereInput = {
    AND?: clientsessionWhereInput | clientsessionWhereInput[]
    OR?: clientsessionWhereInput[]
    NOT?: clientsessionWhereInput | clientsessionWhereInput[]
    id?: StringFilter<"clientsession"> | string
    clientId?: StringFilter<"clientsession"> | string
    token?: StringFilter<"clientsession"> | string
    expiresAt?: DateTimeFilter<"clientsession"> | Date | string
    createdAt?: DateTimeFilter<"clientsession"> | Date | string
    client?: XOR<ClientScalarRelationFilter, clientWhereInput>
  }

  export type clientsessionOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    client?: clientOrderByWithRelationInput
    _relevance?: clientsessionOrderByRelevanceInput
  }

  export type clientsessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: clientsessionWhereInput | clientsessionWhereInput[]
    OR?: clientsessionWhereInput[]
    NOT?: clientsessionWhereInput | clientsessionWhereInput[]
    clientId?: StringFilter<"clientsession"> | string
    expiresAt?: DateTimeFilter<"clientsession"> | Date | string
    createdAt?: DateTimeFilter<"clientsession"> | Date | string
    client?: XOR<ClientScalarRelationFilter, clientWhereInput>
  }, "id" | "token">

  export type clientsessionOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: clientsessionCountOrderByAggregateInput
    _max?: clientsessionMaxOrderByAggregateInput
    _min?: clientsessionMinOrderByAggregateInput
  }

  export type clientsessionScalarWhereWithAggregatesInput = {
    AND?: clientsessionScalarWhereWithAggregatesInput | clientsessionScalarWhereWithAggregatesInput[]
    OR?: clientsessionScalarWhereWithAggregatesInput[]
    NOT?: clientsessionScalarWhereWithAggregatesInput | clientsessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"clientsession"> | string
    clientId?: StringWithAggregatesFilter<"clientsession"> | string
    token?: StringWithAggregatesFilter<"clientsession"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"clientsession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"clientsession"> | Date | string
  }

  export type enrollmentWhereInput = {
    AND?: enrollmentWhereInput | enrollmentWhereInput[]
    OR?: enrollmentWhereInput[]
    NOT?: enrollmentWhereInput | enrollmentWhereInput[]
    id?: StringFilter<"enrollment"> | string
    attendeeId?: StringFilter<"enrollment"> | string
    geofenceId?: StringFilter<"enrollment"> | string
    createdAt?: DateTimeFilter<"enrollment"> | Date | string
    attendee?: XOR<AttendeeScalarRelationFilter, attendeeWhereInput>
    geofence?: XOR<GeofenceScalarRelationFilter, geofenceWhereInput>
  }

  export type enrollmentOrderByWithRelationInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    createdAt?: SortOrder
    attendee?: attendeeOrderByWithRelationInput
    geofence?: geofenceOrderByWithRelationInput
    _relevance?: enrollmentOrderByRelevanceInput
  }

  export type enrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    attendeeId_geofenceId?: enrollmentAttendeeIdGeofenceIdCompoundUniqueInput
    AND?: enrollmentWhereInput | enrollmentWhereInput[]
    OR?: enrollmentWhereInput[]
    NOT?: enrollmentWhereInput | enrollmentWhereInput[]
    attendeeId?: StringFilter<"enrollment"> | string
    geofenceId?: StringFilter<"enrollment"> | string
    createdAt?: DateTimeFilter<"enrollment"> | Date | string
    attendee?: XOR<AttendeeScalarRelationFilter, attendeeWhereInput>
    geofence?: XOR<GeofenceScalarRelationFilter, geofenceWhereInput>
  }, "id" | "attendeeId_geofenceId">

  export type enrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    createdAt?: SortOrder
    _count?: enrollmentCountOrderByAggregateInput
    _max?: enrollmentMaxOrderByAggregateInput
    _min?: enrollmentMinOrderByAggregateInput
  }

  export type enrollmentScalarWhereWithAggregatesInput = {
    AND?: enrollmentScalarWhereWithAggregatesInput | enrollmentScalarWhereWithAggregatesInput[]
    OR?: enrollmentScalarWhereWithAggregatesInput[]
    NOT?: enrollmentScalarWhereWithAggregatesInput | enrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"enrollment"> | string
    attendeeId?: StringWithAggregatesFilter<"enrollment"> | string
    geofenceId?: StringWithAggregatesFilter<"enrollment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"enrollment"> | Date | string
  }

  export type geofenceWhereInput = {
    AND?: geofenceWhereInput | geofenceWhereInput[]
    OR?: geofenceWhereInput[]
    NOT?: geofenceWhereInput | geofenceWhereInput[]
    id?: StringFilter<"geofence"> | string
    name?: StringFilter<"geofence"> | string
    latitude?: FloatFilter<"geofence"> | number
    longitude?: FloatFilter<"geofence"> | number
    radius?: IntFilter<"geofence"> | number
    isActive?: BoolFilter<"geofence"> | boolean
    orgId?: StringFilter<"geofence"> | string
    createdByClientId?: StringFilter<"geofence"> | string
    createdAt?: DateTimeFilter<"geofence"> | Date | string
    updatedAt?: DateTimeFilter<"geofence"> | Date | string
    attendancelog?: AttendancelogListRelationFilter
    enrollment?: EnrollmentListRelationFilter
    client?: XOR<ClientScalarRelationFilter, clientWhereInput>
    organization_geofence_orgIdToorganization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
  }

  export type geofenceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    isActive?: SortOrder
    orgId?: SortOrder
    createdByClientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attendancelog?: attendancelogOrderByRelationAggregateInput
    enrollment?: enrollmentOrderByRelationAggregateInput
    client?: clientOrderByWithRelationInput
    organization_geofence_orgIdToorganization?: organizationOrderByWithRelationInput
    _relevance?: geofenceOrderByRelevanceInput
  }

  export type geofenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: geofenceWhereInput | geofenceWhereInput[]
    OR?: geofenceWhereInput[]
    NOT?: geofenceWhereInput | geofenceWhereInput[]
    name?: StringFilter<"geofence"> | string
    latitude?: FloatFilter<"geofence"> | number
    longitude?: FloatFilter<"geofence"> | number
    radius?: IntFilter<"geofence"> | number
    isActive?: BoolFilter<"geofence"> | boolean
    orgId?: StringFilter<"geofence"> | string
    createdByClientId?: StringFilter<"geofence"> | string
    createdAt?: DateTimeFilter<"geofence"> | Date | string
    updatedAt?: DateTimeFilter<"geofence"> | Date | string
    attendancelog?: AttendancelogListRelationFilter
    enrollment?: EnrollmentListRelationFilter
    client?: XOR<ClientScalarRelationFilter, clientWhereInput>
    organization_geofence_orgIdToorganization?: XOR<OrganizationScalarRelationFilter, organizationWhereInput>
  }, "id">

  export type geofenceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    isActive?: SortOrder
    orgId?: SortOrder
    createdByClientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: geofenceCountOrderByAggregateInput
    _avg?: geofenceAvgOrderByAggregateInput
    _max?: geofenceMaxOrderByAggregateInput
    _min?: geofenceMinOrderByAggregateInput
    _sum?: geofenceSumOrderByAggregateInput
  }

  export type geofenceScalarWhereWithAggregatesInput = {
    AND?: geofenceScalarWhereWithAggregatesInput | geofenceScalarWhereWithAggregatesInput[]
    OR?: geofenceScalarWhereWithAggregatesInput[]
    NOT?: geofenceScalarWhereWithAggregatesInput | geofenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"geofence"> | string
    name?: StringWithAggregatesFilter<"geofence"> | string
    latitude?: FloatWithAggregatesFilter<"geofence"> | number
    longitude?: FloatWithAggregatesFilter<"geofence"> | number
    radius?: IntWithAggregatesFilter<"geofence"> | number
    isActive?: BoolWithAggregatesFilter<"geofence"> | boolean
    orgId?: StringWithAggregatesFilter<"geofence"> | string
    createdByClientId?: StringWithAggregatesFilter<"geofence"> | string
    createdAt?: DateTimeWithAggregatesFilter<"geofence"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"geofence"> | Date | string
  }

  export type organizationWhereInput = {
    AND?: organizationWhereInput | organizationWhereInput[]
    OR?: organizationWhereInput[]
    NOT?: organizationWhereInput | organizationWhereInput[]
    id?: StringFilter<"organization"> | string
    name?: StringFilter<"organization"> | string
    description?: StringNullableFilter<"organization"> | string | null
    orgCode?: StringNullableFilter<"organization"> | string | null
    createdAt?: DateTimeFilter<"organization"> | Date | string
    updatedAt?: DateTimeFilter<"organization"> | Date | string
    isActive?: BoolFilter<"organization"> | boolean
    requestedById?: StringNullableFilter<"organization"> | string | null
    attendee?: AttendeeListRelationFilter
    category?: CategoryListRelationFilter
    client?: ClientListRelationFilter
    geofence_geofence_orgIdToorganization?: GeofenceListRelationFilter
  }

  export type organizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    orgCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    requestedById?: SortOrderInput | SortOrder
    attendee?: attendeeOrderByRelationAggregateInput
    category?: categoryOrderByRelationAggregateInput
    client?: clientOrderByRelationAggregateInput
    geofence_geofence_orgIdToorganization?: geofenceOrderByRelationAggregateInput
    _relevance?: organizationOrderByRelevanceInput
  }

  export type organizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgCode?: string
    AND?: organizationWhereInput | organizationWhereInput[]
    OR?: organizationWhereInput[]
    NOT?: organizationWhereInput | organizationWhereInput[]
    name?: StringFilter<"organization"> | string
    description?: StringNullableFilter<"organization"> | string | null
    createdAt?: DateTimeFilter<"organization"> | Date | string
    updatedAt?: DateTimeFilter<"organization"> | Date | string
    isActive?: BoolFilter<"organization"> | boolean
    requestedById?: StringNullableFilter<"organization"> | string | null
    attendee?: AttendeeListRelationFilter
    category?: CategoryListRelationFilter
    client?: ClientListRelationFilter
    geofence_geofence_orgIdToorganization?: GeofenceListRelationFilter
  }, "id" | "orgCode">

  export type organizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    orgCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    requestedById?: SortOrderInput | SortOrder
    _count?: organizationCountOrderByAggregateInput
    _max?: organizationMaxOrderByAggregateInput
    _min?: organizationMinOrderByAggregateInput
  }

  export type organizationScalarWhereWithAggregatesInput = {
    AND?: organizationScalarWhereWithAggregatesInput | organizationScalarWhereWithAggregatesInput[]
    OR?: organizationScalarWhereWithAggregatesInput[]
    NOT?: organizationScalarWhereWithAggregatesInput | organizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"organization"> | string
    name?: StringWithAggregatesFilter<"organization"> | string
    description?: StringNullableWithAggregatesFilter<"organization"> | string | null
    orgCode?: StringNullableWithAggregatesFilter<"organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"organization"> | Date | string
    isActive?: BoolWithAggregatesFilter<"organization"> | boolean
    requestedById?: StringNullableWithAggregatesFilter<"organization"> | string | null
  }

  export type adminCreateInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    adminsession?: adminsessionCreateNestedManyWithoutAdminInput
  }

  export type adminUncheckedCreateInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    adminsession?: adminsessionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type adminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminsession?: adminsessionUpdateManyWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminsession?: adminsessionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type adminCreateManyInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type adminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminsessionCreateInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    admin: adminCreateNestedOneWithoutAdminsessionInput
  }

  export type adminsessionUncheckedCreateInput = {
    id: string
    adminId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type adminsessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: adminUpdateOneRequiredWithoutAdminsessionNestedInput
  }

  export type adminsessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminsessionCreateManyInput = {
    id: string
    adminId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type adminsessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminsessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendancelogCreateInput = {
    id: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
    attendee: attendeeCreateNestedOneWithoutAttendancelogInput
    geofence: geofenceCreateNestedOneWithoutAttendancelogInput
  }

  export type attendancelogUncheckedCreateInput = {
    id: string
    attendeeId: string
    geofenceId: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
  }

  export type attendancelogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attendee?: attendeeUpdateOneRequiredWithoutAttendancelogNestedInput
    geofence?: geofenceUpdateOneRequiredWithoutAttendancelogNestedInput
  }

  export type attendancelogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type attendancelogCreateManyInput = {
    id: string
    attendeeId: string
    geofenceId: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
  }

  export type attendancelogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type attendancelogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type attendeeCreateInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    attendancelog?: attendancelogCreateNestedManyWithoutAttendeeInput
    category?: categoryCreateNestedOneWithoutAttendeeInput
    organization?: organizationCreateNestedOneWithoutAttendeeInput
    attendeesession?: attendeesessionCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUncheckedCreateInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutAttendeeInput
    attendeesession?: attendeesessionUncheckedCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    attendancelog?: attendancelogUpdateManyWithoutAttendeeNestedInput
    category?: categoryUpdateOneWithoutAttendeeNestedInput
    organization?: organizationUpdateOneWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    attendancelog?: attendancelogUncheckedUpdateManyWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUncheckedUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeCreateManyInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
  }

  export type attendeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type attendeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type attendeesessionCreateInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    attendee: attendeeCreateNestedOneWithoutAttendeesessionInput
  }

  export type attendeesessionUncheckedCreateInput = {
    id: string
    attendeeId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type attendeesessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUpdateOneRequiredWithoutAttendeesessionNestedInput
  }

  export type attendeesessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeesessionCreateManyInput = {
    id: string
    attendeeId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type attendeesessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeesessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryCreateInput = {
    id: string
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendee?: attendeeCreateNestedManyWithoutCategoryInput
    organization: organizationCreateNestedOneWithoutCategoryInput
  }

  export type categoryUncheckedCreateInput = {
    id: string
    name: string
    orgId: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendee?: attendeeUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUpdateManyWithoutCategoryNestedInput
    organization?: organizationUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryCreateManyInput = {
    id: string
    name: string
    orgId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type categoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clientCreateInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    organization?: organizationCreateNestedOneWithoutClientInput
    clientsession?: clientsessionCreateNestedManyWithoutClientInput
    geofence?: geofenceCreateNestedManyWithoutClientInput
  }

  export type clientUncheckedCreateInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    clientsession?: clientsessionUncheckedCreateNestedManyWithoutClientInput
    geofence?: geofenceUncheckedCreateNestedManyWithoutClientInput
  }

  export type clientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    organization?: organizationUpdateOneWithoutClientNestedInput
    clientsession?: clientsessionUpdateManyWithoutClientNestedInput
    geofence?: geofenceUpdateManyWithoutClientNestedInput
  }

  export type clientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    clientsession?: clientsessionUncheckedUpdateManyWithoutClientNestedInput
    geofence?: geofenceUncheckedUpdateManyWithoutClientNestedInput
  }

  export type clientCreateManyInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
  }

  export type clientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type clientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type clientsessionCreateInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    client: clientCreateNestedOneWithoutClientsessionInput
  }

  export type clientsessionUncheckedCreateInput = {
    id: string
    clientId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type clientsessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: clientUpdateOneRequiredWithoutClientsessionNestedInput
  }

  export type clientsessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clientsessionCreateManyInput = {
    id: string
    clientId: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type clientsessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clientsessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type enrollmentCreateInput = {
    id: string
    createdAt?: Date | string
    attendee: attendeeCreateNestedOneWithoutEnrollmentInput
    geofence: geofenceCreateNestedOneWithoutEnrollmentInput
  }

  export type enrollmentUncheckedCreateInput = {
    id: string
    attendeeId: string
    geofenceId: string
    createdAt?: Date | string
  }

  export type enrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUpdateOneRequiredWithoutEnrollmentNestedInput
    geofence?: geofenceUpdateOneRequiredWithoutEnrollmentNestedInput
  }

  export type enrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type enrollmentCreateManyInput = {
    id: string
    attendeeId: string
    geofenceId: string
    createdAt?: Date | string
  }

  export type enrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type enrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type geofenceCreateInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogCreateNestedManyWithoutGeofenceInput
    enrollment?: enrollmentCreateNestedManyWithoutGeofenceInput
    client: clientCreateNestedOneWithoutGeofenceInput
    organization_geofence_orgIdToorganization: organizationCreateNestedOneWithoutGeofence_geofence_orgIdToorganizationInput
  }

  export type geofenceUncheckedCreateInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    orgId: string
    createdByClientId: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutGeofenceInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutGeofenceInput
  }

  export type geofenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUpdateManyWithoutGeofenceNestedInput
    enrollment?: enrollmentUpdateManyWithoutGeofenceNestedInput
    client?: clientUpdateOneRequiredWithoutGeofenceNestedInput
    organization_geofence_orgIdToorganization?: organizationUpdateOneRequiredWithoutGeofence_geofence_orgIdToorganizationNestedInput
  }

  export type geofenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orgId?: StringFieldUpdateOperationsInput | string
    createdByClientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUncheckedUpdateManyWithoutGeofenceNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutGeofenceNestedInput
  }

  export type geofenceCreateManyInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    orgId: string
    createdByClientId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type geofenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type geofenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orgId?: StringFieldUpdateOperationsInput | string
    createdByClientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type organizationCreateInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeCreateNestedManyWithoutOrganizationInput
    category?: categoryCreateNestedManyWithoutOrganizationInput
    client?: clientCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeUncheckedCreateNestedManyWithoutOrganizationInput
    category?: categoryUncheckedCreateNestedManyWithoutOrganizationInput
    client?: clientUncheckedCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUpdateManyWithoutOrganizationNestedInput
    category?: categoryUpdateManyWithoutOrganizationNestedInput
    client?: clientUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type organizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUncheckedUpdateManyWithoutOrganizationNestedInput
    category?: categoryUncheckedUpdateManyWithoutOrganizationNestedInput
    client?: clientUncheckedUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type organizationCreateManyInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
  }

  export type organizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type organizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AdminsessionListRelationFilter = {
    every?: adminsessionWhereInput
    some?: adminsessionWhereInput
    none?: adminsessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type adminsessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type adminOrderByRelevanceInput = {
    fields: adminOrderByRelevanceFieldEnum | adminOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type adminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type adminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type adminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AdminScalarRelationFilter = {
    is?: adminWhereInput
    isNot?: adminWhereInput
  }

  export type adminsessionOrderByRelevanceInput = {
    fields: adminsessionOrderByRelevanceFieldEnum | adminsessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type adminsessionCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type adminsessionMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type adminsessionMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AttendeeScalarRelationFilter = {
    is?: attendeeWhereInput
    isNot?: attendeeWhereInput
  }

  export type GeofenceScalarRelationFilter = {
    is?: geofenceWhereInput
    isNot?: geofenceWhereInput
  }

  export type attendancelogOrderByRelevanceInput = {
    fields: attendancelogOrderByRelevanceFieldEnum | attendancelogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type attendancelogCountOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    deviceLat?: SortOrder
    deviceLng?: SortOrder
    isMock?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    afternoonTimeOut?: SortOrder
    morningTimeIn?: SortOrder
    afternoonTimeIn?: SortOrder
    morningTimeOut?: SortOrder
  }

  export type attendancelogAvgOrderByAggregateInput = {
    deviceLat?: SortOrder
    deviceLng?: SortOrder
  }

  export type attendancelogMaxOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    deviceLat?: SortOrder
    deviceLng?: SortOrder
    isMock?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    afternoonTimeOut?: SortOrder
    morningTimeIn?: SortOrder
    afternoonTimeIn?: SortOrder
    morningTimeOut?: SortOrder
  }

  export type attendancelogMinOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    deviceLat?: SortOrder
    deviceLng?: SortOrder
    isMock?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    afternoonTimeOut?: SortOrder
    morningTimeIn?: SortOrder
    afternoonTimeIn?: SortOrder
    morningTimeOut?: SortOrder
  }

  export type attendancelogSumOrderByAggregateInput = {
    deviceLat?: SortOrder
    deviceLng?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AttendancelogListRelationFilter = {
    every?: attendancelogWhereInput
    some?: attendancelogWhereInput
    none?: attendancelogWhereInput
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: categoryWhereInput | null
    isNot?: categoryWhereInput | null
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: organizationWhereInput | null
    isNot?: organizationWhereInput | null
  }

  export type AttendeesessionListRelationFilter = {
    every?: attendeesessionWhereInput
    some?: attendeesessionWhereInput
    none?: attendeesessionWhereInput
  }

  export type EnrollmentListRelationFilter = {
    every?: enrollmentWhereInput
    some?: enrollmentWhereInput
    none?: enrollmentWhereInput
  }

  export type attendancelogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type attendeesessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type enrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type attendeeOrderByRelevanceInput = {
    fields: attendeeOrderByRelevanceFieldEnum | attendeeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type attendeeCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    categoryId?: SortOrder
  }

  export type attendeeMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    categoryId?: SortOrder
  }

  export type attendeeMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    categoryId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type attendeesessionOrderByRelevanceInput = {
    fields: attendeesessionOrderByRelevanceFieldEnum | attendeesessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type attendeesessionCountOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type attendeesessionMaxOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type attendeesessionMinOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendeeListRelationFilter = {
    every?: attendeeWhereInput
    some?: attendeeWhereInput
    none?: attendeeWhereInput
  }

  export type OrganizationScalarRelationFilter = {
    is?: organizationWhereInput
    isNot?: organizationWhereInput
  }

  export type attendeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoryOrderByRelevanceInput = {
    fields: categoryOrderByRelevanceFieldEnum | categoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type categoryOrgIdNameCompoundUniqueInput = {
    orgId: string
    name: string
  }

  export type categoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type categoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type categoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    orgId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientsessionListRelationFilter = {
    every?: clientsessionWhereInput
    some?: clientsessionWhereInput
    none?: clientsessionWhereInput
  }

  export type GeofenceListRelationFilter = {
    every?: geofenceWhereInput
    some?: geofenceWhereInput
    none?: geofenceWhereInput
  }

  export type clientsessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type geofenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type clientOrderByRelevanceInput = {
    fields: clientOrderByRelevanceFieldEnum | clientOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type clientCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
  }

  export type clientMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
  }

  export type clientMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    birthDate?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
  }

  export type ClientScalarRelationFilter = {
    is?: clientWhereInput
    isNot?: clientWhereInput
  }

  export type clientsessionOrderByRelevanceInput = {
    fields: clientsessionOrderByRelevanceFieldEnum | clientsessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type clientsessionCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type clientsessionMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type clientsessionMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type enrollmentOrderByRelevanceInput = {
    fields: enrollmentOrderByRelevanceFieldEnum | enrollmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type enrollmentAttendeeIdGeofenceIdCompoundUniqueInput = {
    attendeeId: string
    geofenceId: string
  }

  export type enrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type enrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type enrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    attendeeId?: SortOrder
    geofenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type geofenceOrderByRelevanceInput = {
    fields: geofenceOrderByRelevanceFieldEnum | geofenceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type geofenceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    isActive?: SortOrder
    orgId?: SortOrder
    createdByClientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type geofenceAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type geofenceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    isActive?: SortOrder
    orgId?: SortOrder
    createdByClientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type geofenceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    isActive?: SortOrder
    orgId?: SortOrder
    createdByClientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type geofenceSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CategoryListRelationFilter = {
    every?: categoryWhereInput
    some?: categoryWhereInput
    none?: categoryWhereInput
  }

  export type ClientListRelationFilter = {
    every?: clientWhereInput
    some?: clientWhereInput
    none?: clientWhereInput
  }

  export type categoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type clientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type organizationOrderByRelevanceInput = {
    fields: organizationOrderByRelevanceFieldEnum | organizationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type organizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    requestedById?: SortOrder
  }

  export type organizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    requestedById?: SortOrder
  }

  export type organizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    orgCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    requestedById?: SortOrder
  }

  export type adminsessionCreateNestedManyWithoutAdminInput = {
    create?: XOR<adminsessionCreateWithoutAdminInput, adminsessionUncheckedCreateWithoutAdminInput> | adminsessionCreateWithoutAdminInput[] | adminsessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: adminsessionCreateOrConnectWithoutAdminInput | adminsessionCreateOrConnectWithoutAdminInput[]
    createMany?: adminsessionCreateManyAdminInputEnvelope
    connect?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
  }

  export type adminsessionUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<adminsessionCreateWithoutAdminInput, adminsessionUncheckedCreateWithoutAdminInput> | adminsessionCreateWithoutAdminInput[] | adminsessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: adminsessionCreateOrConnectWithoutAdminInput | adminsessionCreateOrConnectWithoutAdminInput[]
    createMany?: adminsessionCreateManyAdminInputEnvelope
    connect?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type adminsessionUpdateManyWithoutAdminNestedInput = {
    create?: XOR<adminsessionCreateWithoutAdminInput, adminsessionUncheckedCreateWithoutAdminInput> | adminsessionCreateWithoutAdminInput[] | adminsessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: adminsessionCreateOrConnectWithoutAdminInput | adminsessionCreateOrConnectWithoutAdminInput[]
    upsert?: adminsessionUpsertWithWhereUniqueWithoutAdminInput | adminsessionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: adminsessionCreateManyAdminInputEnvelope
    set?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    disconnect?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    delete?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    connect?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    update?: adminsessionUpdateWithWhereUniqueWithoutAdminInput | adminsessionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: adminsessionUpdateManyWithWhereWithoutAdminInput | adminsessionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: adminsessionScalarWhereInput | adminsessionScalarWhereInput[]
  }

  export type adminsessionUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<adminsessionCreateWithoutAdminInput, adminsessionUncheckedCreateWithoutAdminInput> | adminsessionCreateWithoutAdminInput[] | adminsessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: adminsessionCreateOrConnectWithoutAdminInput | adminsessionCreateOrConnectWithoutAdminInput[]
    upsert?: adminsessionUpsertWithWhereUniqueWithoutAdminInput | adminsessionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: adminsessionCreateManyAdminInputEnvelope
    set?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    disconnect?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    delete?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    connect?: adminsessionWhereUniqueInput | adminsessionWhereUniqueInput[]
    update?: adminsessionUpdateWithWhereUniqueWithoutAdminInput | adminsessionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: adminsessionUpdateManyWithWhereWithoutAdminInput | adminsessionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: adminsessionScalarWhereInput | adminsessionScalarWhereInput[]
  }

  export type adminCreateNestedOneWithoutAdminsessionInput = {
    create?: XOR<adminCreateWithoutAdminsessionInput, adminUncheckedCreateWithoutAdminsessionInput>
    connectOrCreate?: adminCreateOrConnectWithoutAdminsessionInput
    connect?: adminWhereUniqueInput
  }

  export type adminUpdateOneRequiredWithoutAdminsessionNestedInput = {
    create?: XOR<adminCreateWithoutAdminsessionInput, adminUncheckedCreateWithoutAdminsessionInput>
    connectOrCreate?: adminCreateOrConnectWithoutAdminsessionInput
    upsert?: adminUpsertWithoutAdminsessionInput
    connect?: adminWhereUniqueInput
    update?: XOR<XOR<adminUpdateToOneWithWhereWithoutAdminsessionInput, adminUpdateWithoutAdminsessionInput>, adminUncheckedUpdateWithoutAdminsessionInput>
  }

  export type attendeeCreateNestedOneWithoutAttendancelogInput = {
    create?: XOR<attendeeCreateWithoutAttendancelogInput, attendeeUncheckedCreateWithoutAttendancelogInput>
    connectOrCreate?: attendeeCreateOrConnectWithoutAttendancelogInput
    connect?: attendeeWhereUniqueInput
  }

  export type geofenceCreateNestedOneWithoutAttendancelogInput = {
    create?: XOR<geofenceCreateWithoutAttendancelogInput, geofenceUncheckedCreateWithoutAttendancelogInput>
    connectOrCreate?: geofenceCreateOrConnectWithoutAttendancelogInput
    connect?: geofenceWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type attendeeUpdateOneRequiredWithoutAttendancelogNestedInput = {
    create?: XOR<attendeeCreateWithoutAttendancelogInput, attendeeUncheckedCreateWithoutAttendancelogInput>
    connectOrCreate?: attendeeCreateOrConnectWithoutAttendancelogInput
    upsert?: attendeeUpsertWithoutAttendancelogInput
    connect?: attendeeWhereUniqueInput
    update?: XOR<XOR<attendeeUpdateToOneWithWhereWithoutAttendancelogInput, attendeeUpdateWithoutAttendancelogInput>, attendeeUncheckedUpdateWithoutAttendancelogInput>
  }

  export type geofenceUpdateOneRequiredWithoutAttendancelogNestedInput = {
    create?: XOR<geofenceCreateWithoutAttendancelogInput, geofenceUncheckedCreateWithoutAttendancelogInput>
    connectOrCreate?: geofenceCreateOrConnectWithoutAttendancelogInput
    upsert?: geofenceUpsertWithoutAttendancelogInput
    connect?: geofenceWhereUniqueInput
    update?: XOR<XOR<geofenceUpdateToOneWithWhereWithoutAttendancelogInput, geofenceUpdateWithoutAttendancelogInput>, geofenceUncheckedUpdateWithoutAttendancelogInput>
  }

  export type attendancelogCreateNestedManyWithoutAttendeeInput = {
    create?: XOR<attendancelogCreateWithoutAttendeeInput, attendancelogUncheckedCreateWithoutAttendeeInput> | attendancelogCreateWithoutAttendeeInput[] | attendancelogUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutAttendeeInput | attendancelogCreateOrConnectWithoutAttendeeInput[]
    createMany?: attendancelogCreateManyAttendeeInputEnvelope
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
  }

  export type categoryCreateNestedOneWithoutAttendeeInput = {
    create?: XOR<categoryCreateWithoutAttendeeInput, categoryUncheckedCreateWithoutAttendeeInput>
    connectOrCreate?: categoryCreateOrConnectWithoutAttendeeInput
    connect?: categoryWhereUniqueInput
  }

  export type organizationCreateNestedOneWithoutAttendeeInput = {
    create?: XOR<organizationCreateWithoutAttendeeInput, organizationUncheckedCreateWithoutAttendeeInput>
    connectOrCreate?: organizationCreateOrConnectWithoutAttendeeInput
    connect?: organizationWhereUniqueInput
  }

  export type attendeesessionCreateNestedManyWithoutAttendeeInput = {
    create?: XOR<attendeesessionCreateWithoutAttendeeInput, attendeesessionUncheckedCreateWithoutAttendeeInput> | attendeesessionCreateWithoutAttendeeInput[] | attendeesessionUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendeesessionCreateOrConnectWithoutAttendeeInput | attendeesessionCreateOrConnectWithoutAttendeeInput[]
    createMany?: attendeesessionCreateManyAttendeeInputEnvelope
    connect?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
  }

  export type enrollmentCreateNestedManyWithoutAttendeeInput = {
    create?: XOR<enrollmentCreateWithoutAttendeeInput, enrollmentUncheckedCreateWithoutAttendeeInput> | enrollmentCreateWithoutAttendeeInput[] | enrollmentUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutAttendeeInput | enrollmentCreateOrConnectWithoutAttendeeInput[]
    createMany?: enrollmentCreateManyAttendeeInputEnvelope
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
  }

  export type attendancelogUncheckedCreateNestedManyWithoutAttendeeInput = {
    create?: XOR<attendancelogCreateWithoutAttendeeInput, attendancelogUncheckedCreateWithoutAttendeeInput> | attendancelogCreateWithoutAttendeeInput[] | attendancelogUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutAttendeeInput | attendancelogCreateOrConnectWithoutAttendeeInput[]
    createMany?: attendancelogCreateManyAttendeeInputEnvelope
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
  }

  export type attendeesessionUncheckedCreateNestedManyWithoutAttendeeInput = {
    create?: XOR<attendeesessionCreateWithoutAttendeeInput, attendeesessionUncheckedCreateWithoutAttendeeInput> | attendeesessionCreateWithoutAttendeeInput[] | attendeesessionUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendeesessionCreateOrConnectWithoutAttendeeInput | attendeesessionCreateOrConnectWithoutAttendeeInput[]
    createMany?: attendeesessionCreateManyAttendeeInputEnvelope
    connect?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
  }

  export type enrollmentUncheckedCreateNestedManyWithoutAttendeeInput = {
    create?: XOR<enrollmentCreateWithoutAttendeeInput, enrollmentUncheckedCreateWithoutAttendeeInput> | enrollmentCreateWithoutAttendeeInput[] | enrollmentUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutAttendeeInput | enrollmentCreateOrConnectWithoutAttendeeInput[]
    createMany?: enrollmentCreateManyAttendeeInputEnvelope
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
  }

  export type attendancelogUpdateManyWithoutAttendeeNestedInput = {
    create?: XOR<attendancelogCreateWithoutAttendeeInput, attendancelogUncheckedCreateWithoutAttendeeInput> | attendancelogCreateWithoutAttendeeInput[] | attendancelogUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutAttendeeInput | attendancelogCreateOrConnectWithoutAttendeeInput[]
    upsert?: attendancelogUpsertWithWhereUniqueWithoutAttendeeInput | attendancelogUpsertWithWhereUniqueWithoutAttendeeInput[]
    createMany?: attendancelogCreateManyAttendeeInputEnvelope
    set?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    disconnect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    delete?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    update?: attendancelogUpdateWithWhereUniqueWithoutAttendeeInput | attendancelogUpdateWithWhereUniqueWithoutAttendeeInput[]
    updateMany?: attendancelogUpdateManyWithWhereWithoutAttendeeInput | attendancelogUpdateManyWithWhereWithoutAttendeeInput[]
    deleteMany?: attendancelogScalarWhereInput | attendancelogScalarWhereInput[]
  }

  export type categoryUpdateOneWithoutAttendeeNestedInput = {
    create?: XOR<categoryCreateWithoutAttendeeInput, categoryUncheckedCreateWithoutAttendeeInput>
    connectOrCreate?: categoryCreateOrConnectWithoutAttendeeInput
    upsert?: categoryUpsertWithoutAttendeeInput
    disconnect?: categoryWhereInput | boolean
    delete?: categoryWhereInput | boolean
    connect?: categoryWhereUniqueInput
    update?: XOR<XOR<categoryUpdateToOneWithWhereWithoutAttendeeInput, categoryUpdateWithoutAttendeeInput>, categoryUncheckedUpdateWithoutAttendeeInput>
  }

  export type organizationUpdateOneWithoutAttendeeNestedInput = {
    create?: XOR<organizationCreateWithoutAttendeeInput, organizationUncheckedCreateWithoutAttendeeInput>
    connectOrCreate?: organizationCreateOrConnectWithoutAttendeeInput
    upsert?: organizationUpsertWithoutAttendeeInput
    disconnect?: organizationWhereInput | boolean
    delete?: organizationWhereInput | boolean
    connect?: organizationWhereUniqueInput
    update?: XOR<XOR<organizationUpdateToOneWithWhereWithoutAttendeeInput, organizationUpdateWithoutAttendeeInput>, organizationUncheckedUpdateWithoutAttendeeInput>
  }

  export type attendeesessionUpdateManyWithoutAttendeeNestedInput = {
    create?: XOR<attendeesessionCreateWithoutAttendeeInput, attendeesessionUncheckedCreateWithoutAttendeeInput> | attendeesessionCreateWithoutAttendeeInput[] | attendeesessionUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendeesessionCreateOrConnectWithoutAttendeeInput | attendeesessionCreateOrConnectWithoutAttendeeInput[]
    upsert?: attendeesessionUpsertWithWhereUniqueWithoutAttendeeInput | attendeesessionUpsertWithWhereUniqueWithoutAttendeeInput[]
    createMany?: attendeesessionCreateManyAttendeeInputEnvelope
    set?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    disconnect?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    delete?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    connect?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    update?: attendeesessionUpdateWithWhereUniqueWithoutAttendeeInput | attendeesessionUpdateWithWhereUniqueWithoutAttendeeInput[]
    updateMany?: attendeesessionUpdateManyWithWhereWithoutAttendeeInput | attendeesessionUpdateManyWithWhereWithoutAttendeeInput[]
    deleteMany?: attendeesessionScalarWhereInput | attendeesessionScalarWhereInput[]
  }

  export type enrollmentUpdateManyWithoutAttendeeNestedInput = {
    create?: XOR<enrollmentCreateWithoutAttendeeInput, enrollmentUncheckedCreateWithoutAttendeeInput> | enrollmentCreateWithoutAttendeeInput[] | enrollmentUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutAttendeeInput | enrollmentCreateOrConnectWithoutAttendeeInput[]
    upsert?: enrollmentUpsertWithWhereUniqueWithoutAttendeeInput | enrollmentUpsertWithWhereUniqueWithoutAttendeeInput[]
    createMany?: enrollmentCreateManyAttendeeInputEnvelope
    set?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    disconnect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    delete?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    update?: enrollmentUpdateWithWhereUniqueWithoutAttendeeInput | enrollmentUpdateWithWhereUniqueWithoutAttendeeInput[]
    updateMany?: enrollmentUpdateManyWithWhereWithoutAttendeeInput | enrollmentUpdateManyWithWhereWithoutAttendeeInput[]
    deleteMany?: enrollmentScalarWhereInput | enrollmentScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type attendancelogUncheckedUpdateManyWithoutAttendeeNestedInput = {
    create?: XOR<attendancelogCreateWithoutAttendeeInput, attendancelogUncheckedCreateWithoutAttendeeInput> | attendancelogCreateWithoutAttendeeInput[] | attendancelogUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutAttendeeInput | attendancelogCreateOrConnectWithoutAttendeeInput[]
    upsert?: attendancelogUpsertWithWhereUniqueWithoutAttendeeInput | attendancelogUpsertWithWhereUniqueWithoutAttendeeInput[]
    createMany?: attendancelogCreateManyAttendeeInputEnvelope
    set?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    disconnect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    delete?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    update?: attendancelogUpdateWithWhereUniqueWithoutAttendeeInput | attendancelogUpdateWithWhereUniqueWithoutAttendeeInput[]
    updateMany?: attendancelogUpdateManyWithWhereWithoutAttendeeInput | attendancelogUpdateManyWithWhereWithoutAttendeeInput[]
    deleteMany?: attendancelogScalarWhereInput | attendancelogScalarWhereInput[]
  }

  export type attendeesessionUncheckedUpdateManyWithoutAttendeeNestedInput = {
    create?: XOR<attendeesessionCreateWithoutAttendeeInput, attendeesessionUncheckedCreateWithoutAttendeeInput> | attendeesessionCreateWithoutAttendeeInput[] | attendeesessionUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: attendeesessionCreateOrConnectWithoutAttendeeInput | attendeesessionCreateOrConnectWithoutAttendeeInput[]
    upsert?: attendeesessionUpsertWithWhereUniqueWithoutAttendeeInput | attendeesessionUpsertWithWhereUniqueWithoutAttendeeInput[]
    createMany?: attendeesessionCreateManyAttendeeInputEnvelope
    set?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    disconnect?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    delete?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    connect?: attendeesessionWhereUniqueInput | attendeesessionWhereUniqueInput[]
    update?: attendeesessionUpdateWithWhereUniqueWithoutAttendeeInput | attendeesessionUpdateWithWhereUniqueWithoutAttendeeInput[]
    updateMany?: attendeesessionUpdateManyWithWhereWithoutAttendeeInput | attendeesessionUpdateManyWithWhereWithoutAttendeeInput[]
    deleteMany?: attendeesessionScalarWhereInput | attendeesessionScalarWhereInput[]
  }

  export type enrollmentUncheckedUpdateManyWithoutAttendeeNestedInput = {
    create?: XOR<enrollmentCreateWithoutAttendeeInput, enrollmentUncheckedCreateWithoutAttendeeInput> | enrollmentCreateWithoutAttendeeInput[] | enrollmentUncheckedCreateWithoutAttendeeInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutAttendeeInput | enrollmentCreateOrConnectWithoutAttendeeInput[]
    upsert?: enrollmentUpsertWithWhereUniqueWithoutAttendeeInput | enrollmentUpsertWithWhereUniqueWithoutAttendeeInput[]
    createMany?: enrollmentCreateManyAttendeeInputEnvelope
    set?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    disconnect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    delete?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    update?: enrollmentUpdateWithWhereUniqueWithoutAttendeeInput | enrollmentUpdateWithWhereUniqueWithoutAttendeeInput[]
    updateMany?: enrollmentUpdateManyWithWhereWithoutAttendeeInput | enrollmentUpdateManyWithWhereWithoutAttendeeInput[]
    deleteMany?: enrollmentScalarWhereInput | enrollmentScalarWhereInput[]
  }

  export type attendeeCreateNestedOneWithoutAttendeesessionInput = {
    create?: XOR<attendeeCreateWithoutAttendeesessionInput, attendeeUncheckedCreateWithoutAttendeesessionInput>
    connectOrCreate?: attendeeCreateOrConnectWithoutAttendeesessionInput
    connect?: attendeeWhereUniqueInput
  }

  export type attendeeUpdateOneRequiredWithoutAttendeesessionNestedInput = {
    create?: XOR<attendeeCreateWithoutAttendeesessionInput, attendeeUncheckedCreateWithoutAttendeesessionInput>
    connectOrCreate?: attendeeCreateOrConnectWithoutAttendeesessionInput
    upsert?: attendeeUpsertWithoutAttendeesessionInput
    connect?: attendeeWhereUniqueInput
    update?: XOR<XOR<attendeeUpdateToOneWithWhereWithoutAttendeesessionInput, attendeeUpdateWithoutAttendeesessionInput>, attendeeUncheckedUpdateWithoutAttendeesessionInput>
  }

  export type attendeeCreateNestedManyWithoutCategoryInput = {
    create?: XOR<attendeeCreateWithoutCategoryInput, attendeeUncheckedCreateWithoutCategoryInput> | attendeeCreateWithoutCategoryInput[] | attendeeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutCategoryInput | attendeeCreateOrConnectWithoutCategoryInput[]
    createMany?: attendeeCreateManyCategoryInputEnvelope
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
  }

  export type organizationCreateNestedOneWithoutCategoryInput = {
    create?: XOR<organizationCreateWithoutCategoryInput, organizationUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: organizationCreateOrConnectWithoutCategoryInput
    connect?: organizationWhereUniqueInput
  }

  export type attendeeUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<attendeeCreateWithoutCategoryInput, attendeeUncheckedCreateWithoutCategoryInput> | attendeeCreateWithoutCategoryInput[] | attendeeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutCategoryInput | attendeeCreateOrConnectWithoutCategoryInput[]
    createMany?: attendeeCreateManyCategoryInputEnvelope
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
  }

  export type attendeeUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<attendeeCreateWithoutCategoryInput, attendeeUncheckedCreateWithoutCategoryInput> | attendeeCreateWithoutCategoryInput[] | attendeeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutCategoryInput | attendeeCreateOrConnectWithoutCategoryInput[]
    upsert?: attendeeUpsertWithWhereUniqueWithoutCategoryInput | attendeeUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: attendeeCreateManyCategoryInputEnvelope
    set?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    disconnect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    delete?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    update?: attendeeUpdateWithWhereUniqueWithoutCategoryInput | attendeeUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: attendeeUpdateManyWithWhereWithoutCategoryInput | attendeeUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: attendeeScalarWhereInput | attendeeScalarWhereInput[]
  }

  export type organizationUpdateOneRequiredWithoutCategoryNestedInput = {
    create?: XOR<organizationCreateWithoutCategoryInput, organizationUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: organizationCreateOrConnectWithoutCategoryInput
    upsert?: organizationUpsertWithoutCategoryInput
    connect?: organizationWhereUniqueInput
    update?: XOR<XOR<organizationUpdateToOneWithWhereWithoutCategoryInput, organizationUpdateWithoutCategoryInput>, organizationUncheckedUpdateWithoutCategoryInput>
  }

  export type attendeeUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<attendeeCreateWithoutCategoryInput, attendeeUncheckedCreateWithoutCategoryInput> | attendeeCreateWithoutCategoryInput[] | attendeeUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutCategoryInput | attendeeCreateOrConnectWithoutCategoryInput[]
    upsert?: attendeeUpsertWithWhereUniqueWithoutCategoryInput | attendeeUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: attendeeCreateManyCategoryInputEnvelope
    set?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    disconnect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    delete?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    update?: attendeeUpdateWithWhereUniqueWithoutCategoryInput | attendeeUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: attendeeUpdateManyWithWhereWithoutCategoryInput | attendeeUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: attendeeScalarWhereInput | attendeeScalarWhereInput[]
  }

  export type organizationCreateNestedOneWithoutClientInput = {
    create?: XOR<organizationCreateWithoutClientInput, organizationUncheckedCreateWithoutClientInput>
    connectOrCreate?: organizationCreateOrConnectWithoutClientInput
    connect?: organizationWhereUniqueInput
  }

  export type clientsessionCreateNestedManyWithoutClientInput = {
    create?: XOR<clientsessionCreateWithoutClientInput, clientsessionUncheckedCreateWithoutClientInput> | clientsessionCreateWithoutClientInput[] | clientsessionUncheckedCreateWithoutClientInput[]
    connectOrCreate?: clientsessionCreateOrConnectWithoutClientInput | clientsessionCreateOrConnectWithoutClientInput[]
    createMany?: clientsessionCreateManyClientInputEnvelope
    connect?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
  }

  export type geofenceCreateNestedManyWithoutClientInput = {
    create?: XOR<geofenceCreateWithoutClientInput, geofenceUncheckedCreateWithoutClientInput> | geofenceCreateWithoutClientInput[] | geofenceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutClientInput | geofenceCreateOrConnectWithoutClientInput[]
    createMany?: geofenceCreateManyClientInputEnvelope
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
  }

  export type clientsessionUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<clientsessionCreateWithoutClientInput, clientsessionUncheckedCreateWithoutClientInput> | clientsessionCreateWithoutClientInput[] | clientsessionUncheckedCreateWithoutClientInput[]
    connectOrCreate?: clientsessionCreateOrConnectWithoutClientInput | clientsessionCreateOrConnectWithoutClientInput[]
    createMany?: clientsessionCreateManyClientInputEnvelope
    connect?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
  }

  export type geofenceUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<geofenceCreateWithoutClientInput, geofenceUncheckedCreateWithoutClientInput> | geofenceCreateWithoutClientInput[] | geofenceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutClientInput | geofenceCreateOrConnectWithoutClientInput[]
    createMany?: geofenceCreateManyClientInputEnvelope
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
  }

  export type organizationUpdateOneWithoutClientNestedInput = {
    create?: XOR<organizationCreateWithoutClientInput, organizationUncheckedCreateWithoutClientInput>
    connectOrCreate?: organizationCreateOrConnectWithoutClientInput
    upsert?: organizationUpsertWithoutClientInput
    disconnect?: organizationWhereInput | boolean
    delete?: organizationWhereInput | boolean
    connect?: organizationWhereUniqueInput
    update?: XOR<XOR<organizationUpdateToOneWithWhereWithoutClientInput, organizationUpdateWithoutClientInput>, organizationUncheckedUpdateWithoutClientInput>
  }

  export type clientsessionUpdateManyWithoutClientNestedInput = {
    create?: XOR<clientsessionCreateWithoutClientInput, clientsessionUncheckedCreateWithoutClientInput> | clientsessionCreateWithoutClientInput[] | clientsessionUncheckedCreateWithoutClientInput[]
    connectOrCreate?: clientsessionCreateOrConnectWithoutClientInput | clientsessionCreateOrConnectWithoutClientInput[]
    upsert?: clientsessionUpsertWithWhereUniqueWithoutClientInput | clientsessionUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: clientsessionCreateManyClientInputEnvelope
    set?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    disconnect?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    delete?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    connect?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    update?: clientsessionUpdateWithWhereUniqueWithoutClientInput | clientsessionUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: clientsessionUpdateManyWithWhereWithoutClientInput | clientsessionUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: clientsessionScalarWhereInput | clientsessionScalarWhereInput[]
  }

  export type geofenceUpdateManyWithoutClientNestedInput = {
    create?: XOR<geofenceCreateWithoutClientInput, geofenceUncheckedCreateWithoutClientInput> | geofenceCreateWithoutClientInput[] | geofenceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutClientInput | geofenceCreateOrConnectWithoutClientInput[]
    upsert?: geofenceUpsertWithWhereUniqueWithoutClientInput | geofenceUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: geofenceCreateManyClientInputEnvelope
    set?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    disconnect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    delete?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    update?: geofenceUpdateWithWhereUniqueWithoutClientInput | geofenceUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: geofenceUpdateManyWithWhereWithoutClientInput | geofenceUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: geofenceScalarWhereInput | geofenceScalarWhereInput[]
  }

  export type clientsessionUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<clientsessionCreateWithoutClientInput, clientsessionUncheckedCreateWithoutClientInput> | clientsessionCreateWithoutClientInput[] | clientsessionUncheckedCreateWithoutClientInput[]
    connectOrCreate?: clientsessionCreateOrConnectWithoutClientInput | clientsessionCreateOrConnectWithoutClientInput[]
    upsert?: clientsessionUpsertWithWhereUniqueWithoutClientInput | clientsessionUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: clientsessionCreateManyClientInputEnvelope
    set?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    disconnect?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    delete?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    connect?: clientsessionWhereUniqueInput | clientsessionWhereUniqueInput[]
    update?: clientsessionUpdateWithWhereUniqueWithoutClientInput | clientsessionUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: clientsessionUpdateManyWithWhereWithoutClientInput | clientsessionUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: clientsessionScalarWhereInput | clientsessionScalarWhereInput[]
  }

  export type geofenceUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<geofenceCreateWithoutClientInput, geofenceUncheckedCreateWithoutClientInput> | geofenceCreateWithoutClientInput[] | geofenceUncheckedCreateWithoutClientInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutClientInput | geofenceCreateOrConnectWithoutClientInput[]
    upsert?: geofenceUpsertWithWhereUniqueWithoutClientInput | geofenceUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: geofenceCreateManyClientInputEnvelope
    set?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    disconnect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    delete?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    update?: geofenceUpdateWithWhereUniqueWithoutClientInput | geofenceUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: geofenceUpdateManyWithWhereWithoutClientInput | geofenceUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: geofenceScalarWhereInput | geofenceScalarWhereInput[]
  }

  export type clientCreateNestedOneWithoutClientsessionInput = {
    create?: XOR<clientCreateWithoutClientsessionInput, clientUncheckedCreateWithoutClientsessionInput>
    connectOrCreate?: clientCreateOrConnectWithoutClientsessionInput
    connect?: clientWhereUniqueInput
  }

  export type clientUpdateOneRequiredWithoutClientsessionNestedInput = {
    create?: XOR<clientCreateWithoutClientsessionInput, clientUncheckedCreateWithoutClientsessionInput>
    connectOrCreate?: clientCreateOrConnectWithoutClientsessionInput
    upsert?: clientUpsertWithoutClientsessionInput
    connect?: clientWhereUniqueInput
    update?: XOR<XOR<clientUpdateToOneWithWhereWithoutClientsessionInput, clientUpdateWithoutClientsessionInput>, clientUncheckedUpdateWithoutClientsessionInput>
  }

  export type attendeeCreateNestedOneWithoutEnrollmentInput = {
    create?: XOR<attendeeCreateWithoutEnrollmentInput, attendeeUncheckedCreateWithoutEnrollmentInput>
    connectOrCreate?: attendeeCreateOrConnectWithoutEnrollmentInput
    connect?: attendeeWhereUniqueInput
  }

  export type geofenceCreateNestedOneWithoutEnrollmentInput = {
    create?: XOR<geofenceCreateWithoutEnrollmentInput, geofenceUncheckedCreateWithoutEnrollmentInput>
    connectOrCreate?: geofenceCreateOrConnectWithoutEnrollmentInput
    connect?: geofenceWhereUniqueInput
  }

  export type attendeeUpdateOneRequiredWithoutEnrollmentNestedInput = {
    create?: XOR<attendeeCreateWithoutEnrollmentInput, attendeeUncheckedCreateWithoutEnrollmentInput>
    connectOrCreate?: attendeeCreateOrConnectWithoutEnrollmentInput
    upsert?: attendeeUpsertWithoutEnrollmentInput
    connect?: attendeeWhereUniqueInput
    update?: XOR<XOR<attendeeUpdateToOneWithWhereWithoutEnrollmentInput, attendeeUpdateWithoutEnrollmentInput>, attendeeUncheckedUpdateWithoutEnrollmentInput>
  }

  export type geofenceUpdateOneRequiredWithoutEnrollmentNestedInput = {
    create?: XOR<geofenceCreateWithoutEnrollmentInput, geofenceUncheckedCreateWithoutEnrollmentInput>
    connectOrCreate?: geofenceCreateOrConnectWithoutEnrollmentInput
    upsert?: geofenceUpsertWithoutEnrollmentInput
    connect?: geofenceWhereUniqueInput
    update?: XOR<XOR<geofenceUpdateToOneWithWhereWithoutEnrollmentInput, geofenceUpdateWithoutEnrollmentInput>, geofenceUncheckedUpdateWithoutEnrollmentInput>
  }

  export type attendancelogCreateNestedManyWithoutGeofenceInput = {
    create?: XOR<attendancelogCreateWithoutGeofenceInput, attendancelogUncheckedCreateWithoutGeofenceInput> | attendancelogCreateWithoutGeofenceInput[] | attendancelogUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutGeofenceInput | attendancelogCreateOrConnectWithoutGeofenceInput[]
    createMany?: attendancelogCreateManyGeofenceInputEnvelope
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
  }

  export type enrollmentCreateNestedManyWithoutGeofenceInput = {
    create?: XOR<enrollmentCreateWithoutGeofenceInput, enrollmentUncheckedCreateWithoutGeofenceInput> | enrollmentCreateWithoutGeofenceInput[] | enrollmentUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutGeofenceInput | enrollmentCreateOrConnectWithoutGeofenceInput[]
    createMany?: enrollmentCreateManyGeofenceInputEnvelope
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
  }

  export type clientCreateNestedOneWithoutGeofenceInput = {
    create?: XOR<clientCreateWithoutGeofenceInput, clientUncheckedCreateWithoutGeofenceInput>
    connectOrCreate?: clientCreateOrConnectWithoutGeofenceInput
    connect?: clientWhereUniqueInput
  }

  export type organizationCreateNestedOneWithoutGeofence_geofence_orgIdToorganizationInput = {
    create?: XOR<organizationCreateWithoutGeofence_geofence_orgIdToorganizationInput, organizationUncheckedCreateWithoutGeofence_geofence_orgIdToorganizationInput>
    connectOrCreate?: organizationCreateOrConnectWithoutGeofence_geofence_orgIdToorganizationInput
    connect?: organizationWhereUniqueInput
  }

  export type attendancelogUncheckedCreateNestedManyWithoutGeofenceInput = {
    create?: XOR<attendancelogCreateWithoutGeofenceInput, attendancelogUncheckedCreateWithoutGeofenceInput> | attendancelogCreateWithoutGeofenceInput[] | attendancelogUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutGeofenceInput | attendancelogCreateOrConnectWithoutGeofenceInput[]
    createMany?: attendancelogCreateManyGeofenceInputEnvelope
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
  }

  export type enrollmentUncheckedCreateNestedManyWithoutGeofenceInput = {
    create?: XOR<enrollmentCreateWithoutGeofenceInput, enrollmentUncheckedCreateWithoutGeofenceInput> | enrollmentCreateWithoutGeofenceInput[] | enrollmentUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutGeofenceInput | enrollmentCreateOrConnectWithoutGeofenceInput[]
    createMany?: enrollmentCreateManyGeofenceInputEnvelope
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type attendancelogUpdateManyWithoutGeofenceNestedInput = {
    create?: XOR<attendancelogCreateWithoutGeofenceInput, attendancelogUncheckedCreateWithoutGeofenceInput> | attendancelogCreateWithoutGeofenceInput[] | attendancelogUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutGeofenceInput | attendancelogCreateOrConnectWithoutGeofenceInput[]
    upsert?: attendancelogUpsertWithWhereUniqueWithoutGeofenceInput | attendancelogUpsertWithWhereUniqueWithoutGeofenceInput[]
    createMany?: attendancelogCreateManyGeofenceInputEnvelope
    set?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    disconnect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    delete?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    update?: attendancelogUpdateWithWhereUniqueWithoutGeofenceInput | attendancelogUpdateWithWhereUniqueWithoutGeofenceInput[]
    updateMany?: attendancelogUpdateManyWithWhereWithoutGeofenceInput | attendancelogUpdateManyWithWhereWithoutGeofenceInput[]
    deleteMany?: attendancelogScalarWhereInput | attendancelogScalarWhereInput[]
  }

  export type enrollmentUpdateManyWithoutGeofenceNestedInput = {
    create?: XOR<enrollmentCreateWithoutGeofenceInput, enrollmentUncheckedCreateWithoutGeofenceInput> | enrollmentCreateWithoutGeofenceInput[] | enrollmentUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutGeofenceInput | enrollmentCreateOrConnectWithoutGeofenceInput[]
    upsert?: enrollmentUpsertWithWhereUniqueWithoutGeofenceInput | enrollmentUpsertWithWhereUniqueWithoutGeofenceInput[]
    createMany?: enrollmentCreateManyGeofenceInputEnvelope
    set?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    disconnect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    delete?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    update?: enrollmentUpdateWithWhereUniqueWithoutGeofenceInput | enrollmentUpdateWithWhereUniqueWithoutGeofenceInput[]
    updateMany?: enrollmentUpdateManyWithWhereWithoutGeofenceInput | enrollmentUpdateManyWithWhereWithoutGeofenceInput[]
    deleteMany?: enrollmentScalarWhereInput | enrollmentScalarWhereInput[]
  }

  export type clientUpdateOneRequiredWithoutGeofenceNestedInput = {
    create?: XOR<clientCreateWithoutGeofenceInput, clientUncheckedCreateWithoutGeofenceInput>
    connectOrCreate?: clientCreateOrConnectWithoutGeofenceInput
    upsert?: clientUpsertWithoutGeofenceInput
    connect?: clientWhereUniqueInput
    update?: XOR<XOR<clientUpdateToOneWithWhereWithoutGeofenceInput, clientUpdateWithoutGeofenceInput>, clientUncheckedUpdateWithoutGeofenceInput>
  }

  export type organizationUpdateOneRequiredWithoutGeofence_geofence_orgIdToorganizationNestedInput = {
    create?: XOR<organizationCreateWithoutGeofence_geofence_orgIdToorganizationInput, organizationUncheckedCreateWithoutGeofence_geofence_orgIdToorganizationInput>
    connectOrCreate?: organizationCreateOrConnectWithoutGeofence_geofence_orgIdToorganizationInput
    upsert?: organizationUpsertWithoutGeofence_geofence_orgIdToorganizationInput
    connect?: organizationWhereUniqueInput
    update?: XOR<XOR<organizationUpdateToOneWithWhereWithoutGeofence_geofence_orgIdToorganizationInput, organizationUpdateWithoutGeofence_geofence_orgIdToorganizationInput>, organizationUncheckedUpdateWithoutGeofence_geofence_orgIdToorganizationInput>
  }

  export type attendancelogUncheckedUpdateManyWithoutGeofenceNestedInput = {
    create?: XOR<attendancelogCreateWithoutGeofenceInput, attendancelogUncheckedCreateWithoutGeofenceInput> | attendancelogCreateWithoutGeofenceInput[] | attendancelogUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: attendancelogCreateOrConnectWithoutGeofenceInput | attendancelogCreateOrConnectWithoutGeofenceInput[]
    upsert?: attendancelogUpsertWithWhereUniqueWithoutGeofenceInput | attendancelogUpsertWithWhereUniqueWithoutGeofenceInput[]
    createMany?: attendancelogCreateManyGeofenceInputEnvelope
    set?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    disconnect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    delete?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    connect?: attendancelogWhereUniqueInput | attendancelogWhereUniqueInput[]
    update?: attendancelogUpdateWithWhereUniqueWithoutGeofenceInput | attendancelogUpdateWithWhereUniqueWithoutGeofenceInput[]
    updateMany?: attendancelogUpdateManyWithWhereWithoutGeofenceInput | attendancelogUpdateManyWithWhereWithoutGeofenceInput[]
    deleteMany?: attendancelogScalarWhereInput | attendancelogScalarWhereInput[]
  }

  export type enrollmentUncheckedUpdateManyWithoutGeofenceNestedInput = {
    create?: XOR<enrollmentCreateWithoutGeofenceInput, enrollmentUncheckedCreateWithoutGeofenceInput> | enrollmentCreateWithoutGeofenceInput[] | enrollmentUncheckedCreateWithoutGeofenceInput[]
    connectOrCreate?: enrollmentCreateOrConnectWithoutGeofenceInput | enrollmentCreateOrConnectWithoutGeofenceInput[]
    upsert?: enrollmentUpsertWithWhereUniqueWithoutGeofenceInput | enrollmentUpsertWithWhereUniqueWithoutGeofenceInput[]
    createMany?: enrollmentCreateManyGeofenceInputEnvelope
    set?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    disconnect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    delete?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    connect?: enrollmentWhereUniqueInput | enrollmentWhereUniqueInput[]
    update?: enrollmentUpdateWithWhereUniqueWithoutGeofenceInput | enrollmentUpdateWithWhereUniqueWithoutGeofenceInput[]
    updateMany?: enrollmentUpdateManyWithWhereWithoutGeofenceInput | enrollmentUpdateManyWithWhereWithoutGeofenceInput[]
    deleteMany?: enrollmentScalarWhereInput | enrollmentScalarWhereInput[]
  }

  export type attendeeCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<attendeeCreateWithoutOrganizationInput, attendeeUncheckedCreateWithoutOrganizationInput> | attendeeCreateWithoutOrganizationInput[] | attendeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutOrganizationInput | attendeeCreateOrConnectWithoutOrganizationInput[]
    createMany?: attendeeCreateManyOrganizationInputEnvelope
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
  }

  export type categoryCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<categoryCreateWithoutOrganizationInput, categoryUncheckedCreateWithoutOrganizationInput> | categoryCreateWithoutOrganizationInput[] | categoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutOrganizationInput | categoryCreateOrConnectWithoutOrganizationInput[]
    createMany?: categoryCreateManyOrganizationInputEnvelope
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
  }

  export type clientCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<clientCreateWithoutOrganizationInput, clientUncheckedCreateWithoutOrganizationInput> | clientCreateWithoutOrganizationInput[] | clientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: clientCreateOrConnectWithoutOrganizationInput | clientCreateOrConnectWithoutOrganizationInput[]
    createMany?: clientCreateManyOrganizationInputEnvelope
    connect?: clientWhereUniqueInput | clientWhereUniqueInput[]
  }

  export type geofenceCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput = {
    create?: XOR<geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput> | geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput[] | geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput | geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput[]
    createMany?: geofenceCreateManyOrganization_geofence_orgIdToorganizationInputEnvelope
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
  }

  export type attendeeUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<attendeeCreateWithoutOrganizationInput, attendeeUncheckedCreateWithoutOrganizationInput> | attendeeCreateWithoutOrganizationInput[] | attendeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutOrganizationInput | attendeeCreateOrConnectWithoutOrganizationInput[]
    createMany?: attendeeCreateManyOrganizationInputEnvelope
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
  }

  export type categoryUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<categoryCreateWithoutOrganizationInput, categoryUncheckedCreateWithoutOrganizationInput> | categoryCreateWithoutOrganizationInput[] | categoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutOrganizationInput | categoryCreateOrConnectWithoutOrganizationInput[]
    createMany?: categoryCreateManyOrganizationInputEnvelope
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
  }

  export type clientUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<clientCreateWithoutOrganizationInput, clientUncheckedCreateWithoutOrganizationInput> | clientCreateWithoutOrganizationInput[] | clientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: clientCreateOrConnectWithoutOrganizationInput | clientCreateOrConnectWithoutOrganizationInput[]
    createMany?: clientCreateManyOrganizationInputEnvelope
    connect?: clientWhereUniqueInput | clientWhereUniqueInput[]
  }

  export type geofenceUncheckedCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput = {
    create?: XOR<geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput> | geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput[] | geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput | geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput[]
    createMany?: geofenceCreateManyOrganization_geofence_orgIdToorganizationInputEnvelope
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
  }

  export type attendeeUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<attendeeCreateWithoutOrganizationInput, attendeeUncheckedCreateWithoutOrganizationInput> | attendeeCreateWithoutOrganizationInput[] | attendeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutOrganizationInput | attendeeCreateOrConnectWithoutOrganizationInput[]
    upsert?: attendeeUpsertWithWhereUniqueWithoutOrganizationInput | attendeeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: attendeeCreateManyOrganizationInputEnvelope
    set?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    disconnect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    delete?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    update?: attendeeUpdateWithWhereUniqueWithoutOrganizationInput | attendeeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: attendeeUpdateManyWithWhereWithoutOrganizationInput | attendeeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: attendeeScalarWhereInput | attendeeScalarWhereInput[]
  }

  export type categoryUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<categoryCreateWithoutOrganizationInput, categoryUncheckedCreateWithoutOrganizationInput> | categoryCreateWithoutOrganizationInput[] | categoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutOrganizationInput | categoryCreateOrConnectWithoutOrganizationInput[]
    upsert?: categoryUpsertWithWhereUniqueWithoutOrganizationInput | categoryUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: categoryCreateManyOrganizationInputEnvelope
    set?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    disconnect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    delete?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    update?: categoryUpdateWithWhereUniqueWithoutOrganizationInput | categoryUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: categoryUpdateManyWithWhereWithoutOrganizationInput | categoryUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: categoryScalarWhereInput | categoryScalarWhereInput[]
  }

  export type clientUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<clientCreateWithoutOrganizationInput, clientUncheckedCreateWithoutOrganizationInput> | clientCreateWithoutOrganizationInput[] | clientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: clientCreateOrConnectWithoutOrganizationInput | clientCreateOrConnectWithoutOrganizationInput[]
    upsert?: clientUpsertWithWhereUniqueWithoutOrganizationInput | clientUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: clientCreateManyOrganizationInputEnvelope
    set?: clientWhereUniqueInput | clientWhereUniqueInput[]
    disconnect?: clientWhereUniqueInput | clientWhereUniqueInput[]
    delete?: clientWhereUniqueInput | clientWhereUniqueInput[]
    connect?: clientWhereUniqueInput | clientWhereUniqueInput[]
    update?: clientUpdateWithWhereUniqueWithoutOrganizationInput | clientUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: clientUpdateManyWithWhereWithoutOrganizationInput | clientUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: clientScalarWhereInput | clientScalarWhereInput[]
  }

  export type geofenceUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput = {
    create?: XOR<geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput> | geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput[] | geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput | geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput[]
    upsert?: geofenceUpsertWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput | geofenceUpsertWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput[]
    createMany?: geofenceCreateManyOrganization_geofence_orgIdToorganizationInputEnvelope
    set?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    disconnect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    delete?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    update?: geofenceUpdateWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput | geofenceUpdateWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput[]
    updateMany?: geofenceUpdateManyWithWhereWithoutOrganization_geofence_orgIdToorganizationInput | geofenceUpdateManyWithWhereWithoutOrganization_geofence_orgIdToorganizationInput[]
    deleteMany?: geofenceScalarWhereInput | geofenceScalarWhereInput[]
  }

  export type attendeeUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<attendeeCreateWithoutOrganizationInput, attendeeUncheckedCreateWithoutOrganizationInput> | attendeeCreateWithoutOrganizationInput[] | attendeeUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: attendeeCreateOrConnectWithoutOrganizationInput | attendeeCreateOrConnectWithoutOrganizationInput[]
    upsert?: attendeeUpsertWithWhereUniqueWithoutOrganizationInput | attendeeUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: attendeeCreateManyOrganizationInputEnvelope
    set?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    disconnect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    delete?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    connect?: attendeeWhereUniqueInput | attendeeWhereUniqueInput[]
    update?: attendeeUpdateWithWhereUniqueWithoutOrganizationInput | attendeeUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: attendeeUpdateManyWithWhereWithoutOrganizationInput | attendeeUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: attendeeScalarWhereInput | attendeeScalarWhereInput[]
  }

  export type categoryUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<categoryCreateWithoutOrganizationInput, categoryUncheckedCreateWithoutOrganizationInput> | categoryCreateWithoutOrganizationInput[] | categoryUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutOrganizationInput | categoryCreateOrConnectWithoutOrganizationInput[]
    upsert?: categoryUpsertWithWhereUniqueWithoutOrganizationInput | categoryUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: categoryCreateManyOrganizationInputEnvelope
    set?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    disconnect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    delete?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    update?: categoryUpdateWithWhereUniqueWithoutOrganizationInput | categoryUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: categoryUpdateManyWithWhereWithoutOrganizationInput | categoryUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: categoryScalarWhereInput | categoryScalarWhereInput[]
  }

  export type clientUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<clientCreateWithoutOrganizationInput, clientUncheckedCreateWithoutOrganizationInput> | clientCreateWithoutOrganizationInput[] | clientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: clientCreateOrConnectWithoutOrganizationInput | clientCreateOrConnectWithoutOrganizationInput[]
    upsert?: clientUpsertWithWhereUniqueWithoutOrganizationInput | clientUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: clientCreateManyOrganizationInputEnvelope
    set?: clientWhereUniqueInput | clientWhereUniqueInput[]
    disconnect?: clientWhereUniqueInput | clientWhereUniqueInput[]
    delete?: clientWhereUniqueInput | clientWhereUniqueInput[]
    connect?: clientWhereUniqueInput | clientWhereUniqueInput[]
    update?: clientUpdateWithWhereUniqueWithoutOrganizationInput | clientUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: clientUpdateManyWithWhereWithoutOrganizationInput | clientUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: clientScalarWhereInput | clientScalarWhereInput[]
  }

  export type geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput = {
    create?: XOR<geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput> | geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput[] | geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput[]
    connectOrCreate?: geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput | geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput[]
    upsert?: geofenceUpsertWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput | geofenceUpsertWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput[]
    createMany?: geofenceCreateManyOrganization_geofence_orgIdToorganizationInputEnvelope
    set?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    disconnect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    delete?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    connect?: geofenceWhereUniqueInput | geofenceWhereUniqueInput[]
    update?: geofenceUpdateWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput | geofenceUpdateWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput[]
    updateMany?: geofenceUpdateManyWithWhereWithoutOrganization_geofence_orgIdToorganizationInput | geofenceUpdateManyWithWhereWithoutOrganization_geofence_orgIdToorganizationInput[]
    deleteMany?: geofenceScalarWhereInput | geofenceScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type adminsessionCreateWithoutAdminInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type adminsessionUncheckedCreateWithoutAdminInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type adminsessionCreateOrConnectWithoutAdminInput = {
    where: adminsessionWhereUniqueInput
    create: XOR<adminsessionCreateWithoutAdminInput, adminsessionUncheckedCreateWithoutAdminInput>
  }

  export type adminsessionCreateManyAdminInputEnvelope = {
    data: adminsessionCreateManyAdminInput | adminsessionCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type adminsessionUpsertWithWhereUniqueWithoutAdminInput = {
    where: adminsessionWhereUniqueInput
    update: XOR<adminsessionUpdateWithoutAdminInput, adminsessionUncheckedUpdateWithoutAdminInput>
    create: XOR<adminsessionCreateWithoutAdminInput, adminsessionUncheckedCreateWithoutAdminInput>
  }

  export type adminsessionUpdateWithWhereUniqueWithoutAdminInput = {
    where: adminsessionWhereUniqueInput
    data: XOR<adminsessionUpdateWithoutAdminInput, adminsessionUncheckedUpdateWithoutAdminInput>
  }

  export type adminsessionUpdateManyWithWhereWithoutAdminInput = {
    where: adminsessionScalarWhereInput
    data: XOR<adminsessionUpdateManyMutationInput, adminsessionUncheckedUpdateManyWithoutAdminInput>
  }

  export type adminsessionScalarWhereInput = {
    AND?: adminsessionScalarWhereInput | adminsessionScalarWhereInput[]
    OR?: adminsessionScalarWhereInput[]
    NOT?: adminsessionScalarWhereInput | adminsessionScalarWhereInput[]
    id?: StringFilter<"adminsession"> | string
    adminId?: StringFilter<"adminsession"> | string
    token?: StringFilter<"adminsession"> | string
    expiresAt?: DateTimeFilter<"adminsession"> | Date | string
    createdAt?: DateTimeFilter<"adminsession"> | Date | string
  }

  export type adminCreateWithoutAdminsessionInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type adminUncheckedCreateWithoutAdminsessionInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type adminCreateOrConnectWithoutAdminsessionInput = {
    where: adminWhereUniqueInput
    create: XOR<adminCreateWithoutAdminsessionInput, adminUncheckedCreateWithoutAdminsessionInput>
  }

  export type adminUpsertWithoutAdminsessionInput = {
    update: XOR<adminUpdateWithoutAdminsessionInput, adminUncheckedUpdateWithoutAdminsessionInput>
    create: XOR<adminCreateWithoutAdminsessionInput, adminUncheckedCreateWithoutAdminsessionInput>
    where?: adminWhereInput
  }

  export type adminUpdateToOneWithWhereWithoutAdminsessionInput = {
    where?: adminWhereInput
    data: XOR<adminUpdateWithoutAdminsessionInput, adminUncheckedUpdateWithoutAdminsessionInput>
  }

  export type adminUpdateWithoutAdminsessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminUncheckedUpdateWithoutAdminsessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeeCreateWithoutAttendancelogInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    category?: categoryCreateNestedOneWithoutAttendeeInput
    organization?: organizationCreateNestedOneWithoutAttendeeInput
    attendeesession?: attendeesessionCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUncheckedCreateWithoutAttendancelogInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
    attendeesession?: attendeesessionUncheckedCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeCreateOrConnectWithoutAttendancelogInput = {
    where: attendeeWhereUniqueInput
    create: XOR<attendeeCreateWithoutAttendancelogInput, attendeeUncheckedCreateWithoutAttendancelogInput>
  }

  export type geofenceCreateWithoutAttendancelogInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    enrollment?: enrollmentCreateNestedManyWithoutGeofenceInput
    client: clientCreateNestedOneWithoutGeofenceInput
    organization_geofence_orgIdToorganization: organizationCreateNestedOneWithoutGeofence_geofence_orgIdToorganizationInput
  }

  export type geofenceUncheckedCreateWithoutAttendancelogInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    orgId: string
    createdByClientId: string
    createdAt?: Date | string
    updatedAt: Date | string
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutGeofenceInput
  }

  export type geofenceCreateOrConnectWithoutAttendancelogInput = {
    where: geofenceWhereUniqueInput
    create: XOR<geofenceCreateWithoutAttendancelogInput, geofenceUncheckedCreateWithoutAttendancelogInput>
  }

  export type attendeeUpsertWithoutAttendancelogInput = {
    update: XOR<attendeeUpdateWithoutAttendancelogInput, attendeeUncheckedUpdateWithoutAttendancelogInput>
    create: XOR<attendeeCreateWithoutAttendancelogInput, attendeeUncheckedCreateWithoutAttendancelogInput>
    where?: attendeeWhereInput
  }

  export type attendeeUpdateToOneWithWhereWithoutAttendancelogInput = {
    where?: attendeeWhereInput
    data: XOR<attendeeUpdateWithoutAttendancelogInput, attendeeUncheckedUpdateWithoutAttendancelogInput>
  }

  export type attendeeUpdateWithoutAttendancelogInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    category?: categoryUpdateOneWithoutAttendeeNestedInput
    organization?: organizationUpdateOneWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateWithoutAttendancelogInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    attendeesession?: attendeesessionUncheckedUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutAttendeeNestedInput
  }

  export type geofenceUpsertWithoutAttendancelogInput = {
    update: XOR<geofenceUpdateWithoutAttendancelogInput, geofenceUncheckedUpdateWithoutAttendancelogInput>
    create: XOR<geofenceCreateWithoutAttendancelogInput, geofenceUncheckedCreateWithoutAttendancelogInput>
    where?: geofenceWhereInput
  }

  export type geofenceUpdateToOneWithWhereWithoutAttendancelogInput = {
    where?: geofenceWhereInput
    data: XOR<geofenceUpdateWithoutAttendancelogInput, geofenceUncheckedUpdateWithoutAttendancelogInput>
  }

  export type geofenceUpdateWithoutAttendancelogInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollment?: enrollmentUpdateManyWithoutGeofenceNestedInput
    client?: clientUpdateOneRequiredWithoutGeofenceNestedInput
    organization_geofence_orgIdToorganization?: organizationUpdateOneRequiredWithoutGeofence_geofence_orgIdToorganizationNestedInput
  }

  export type geofenceUncheckedUpdateWithoutAttendancelogInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orgId?: StringFieldUpdateOperationsInput | string
    createdByClientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollment?: enrollmentUncheckedUpdateManyWithoutGeofenceNestedInput
  }

  export type attendancelogCreateWithoutAttendeeInput = {
    id: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
    geofence: geofenceCreateNestedOneWithoutAttendancelogInput
  }

  export type attendancelogUncheckedCreateWithoutAttendeeInput = {
    id: string
    geofenceId: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
  }

  export type attendancelogCreateOrConnectWithoutAttendeeInput = {
    where: attendancelogWhereUniqueInput
    create: XOR<attendancelogCreateWithoutAttendeeInput, attendancelogUncheckedCreateWithoutAttendeeInput>
  }

  export type attendancelogCreateManyAttendeeInputEnvelope = {
    data: attendancelogCreateManyAttendeeInput | attendancelogCreateManyAttendeeInput[]
    skipDuplicates?: boolean
  }

  export type categoryCreateWithoutAttendeeInput = {
    id: string
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
    organization: organizationCreateNestedOneWithoutCategoryInput
  }

  export type categoryUncheckedCreateWithoutAttendeeInput = {
    id: string
    name: string
    orgId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type categoryCreateOrConnectWithoutAttendeeInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutAttendeeInput, categoryUncheckedCreateWithoutAttendeeInput>
  }

  export type organizationCreateWithoutAttendeeInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    category?: categoryCreateNestedManyWithoutOrganizationInput
    client?: clientCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationUncheckedCreateWithoutAttendeeInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    category?: categoryUncheckedCreateNestedManyWithoutOrganizationInput
    client?: clientUncheckedCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationCreateOrConnectWithoutAttendeeInput = {
    where: organizationWhereUniqueInput
    create: XOR<organizationCreateWithoutAttendeeInput, organizationUncheckedCreateWithoutAttendeeInput>
  }

  export type attendeesessionCreateWithoutAttendeeInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type attendeesessionUncheckedCreateWithoutAttendeeInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type attendeesessionCreateOrConnectWithoutAttendeeInput = {
    where: attendeesessionWhereUniqueInput
    create: XOR<attendeesessionCreateWithoutAttendeeInput, attendeesessionUncheckedCreateWithoutAttendeeInput>
  }

  export type attendeesessionCreateManyAttendeeInputEnvelope = {
    data: attendeesessionCreateManyAttendeeInput | attendeesessionCreateManyAttendeeInput[]
    skipDuplicates?: boolean
  }

  export type enrollmentCreateWithoutAttendeeInput = {
    id: string
    createdAt?: Date | string
    geofence: geofenceCreateNestedOneWithoutEnrollmentInput
  }

  export type enrollmentUncheckedCreateWithoutAttendeeInput = {
    id: string
    geofenceId: string
    createdAt?: Date | string
  }

  export type enrollmentCreateOrConnectWithoutAttendeeInput = {
    where: enrollmentWhereUniqueInput
    create: XOR<enrollmentCreateWithoutAttendeeInput, enrollmentUncheckedCreateWithoutAttendeeInput>
  }

  export type enrollmentCreateManyAttendeeInputEnvelope = {
    data: enrollmentCreateManyAttendeeInput | enrollmentCreateManyAttendeeInput[]
    skipDuplicates?: boolean
  }

  export type attendancelogUpsertWithWhereUniqueWithoutAttendeeInput = {
    where: attendancelogWhereUniqueInput
    update: XOR<attendancelogUpdateWithoutAttendeeInput, attendancelogUncheckedUpdateWithoutAttendeeInput>
    create: XOR<attendancelogCreateWithoutAttendeeInput, attendancelogUncheckedCreateWithoutAttendeeInput>
  }

  export type attendancelogUpdateWithWhereUniqueWithoutAttendeeInput = {
    where: attendancelogWhereUniqueInput
    data: XOR<attendancelogUpdateWithoutAttendeeInput, attendancelogUncheckedUpdateWithoutAttendeeInput>
  }

  export type attendancelogUpdateManyWithWhereWithoutAttendeeInput = {
    where: attendancelogScalarWhereInput
    data: XOR<attendancelogUpdateManyMutationInput, attendancelogUncheckedUpdateManyWithoutAttendeeInput>
  }

  export type attendancelogScalarWhereInput = {
    AND?: attendancelogScalarWhereInput | attendancelogScalarWhereInput[]
    OR?: attendancelogScalarWhereInput[]
    NOT?: attendancelogScalarWhereInput | attendancelogScalarWhereInput[]
    id?: StringFilter<"attendancelog"> | string
    attendeeId?: StringFilter<"attendancelog"> | string
    geofenceId?: StringFilter<"attendancelog"> | string
    deviceLat?: FloatFilter<"attendancelog"> | number
    deviceLng?: FloatFilter<"attendancelog"> | number
    isMock?: BoolFilter<"attendancelog"> | boolean
    status?: StringFilter<"attendancelog"> | string
    timestamp?: DateTimeFilter<"attendancelog"> | Date | string
    afternoonTimeOut?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    morningTimeIn?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    afternoonTimeIn?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
    morningTimeOut?: DateTimeNullableFilter<"attendancelog"> | Date | string | null
  }

  export type categoryUpsertWithoutAttendeeInput = {
    update: XOR<categoryUpdateWithoutAttendeeInput, categoryUncheckedUpdateWithoutAttendeeInput>
    create: XOR<categoryCreateWithoutAttendeeInput, categoryUncheckedCreateWithoutAttendeeInput>
    where?: categoryWhereInput
  }

  export type categoryUpdateToOneWithWhereWithoutAttendeeInput = {
    where?: categoryWhereInput
    data: XOR<categoryUpdateWithoutAttendeeInput, categoryUncheckedUpdateWithoutAttendeeInput>
  }

  export type categoryUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: organizationUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type organizationUpsertWithoutAttendeeInput = {
    update: XOR<organizationUpdateWithoutAttendeeInput, organizationUncheckedUpdateWithoutAttendeeInput>
    create: XOR<organizationCreateWithoutAttendeeInput, organizationUncheckedCreateWithoutAttendeeInput>
    where?: organizationWhereInput
  }

  export type organizationUpdateToOneWithWhereWithoutAttendeeInput = {
    where?: organizationWhereInput
    data: XOR<organizationUpdateWithoutAttendeeInput, organizationUncheckedUpdateWithoutAttendeeInput>
  }

  export type organizationUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    category?: categoryUpdateManyWithoutOrganizationNestedInput
    client?: clientUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type organizationUncheckedUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    category?: categoryUncheckedUpdateManyWithoutOrganizationNestedInput
    client?: clientUncheckedUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type attendeesessionUpsertWithWhereUniqueWithoutAttendeeInput = {
    where: attendeesessionWhereUniqueInput
    update: XOR<attendeesessionUpdateWithoutAttendeeInput, attendeesessionUncheckedUpdateWithoutAttendeeInput>
    create: XOR<attendeesessionCreateWithoutAttendeeInput, attendeesessionUncheckedCreateWithoutAttendeeInput>
  }

  export type attendeesessionUpdateWithWhereUniqueWithoutAttendeeInput = {
    where: attendeesessionWhereUniqueInput
    data: XOR<attendeesessionUpdateWithoutAttendeeInput, attendeesessionUncheckedUpdateWithoutAttendeeInput>
  }

  export type attendeesessionUpdateManyWithWhereWithoutAttendeeInput = {
    where: attendeesessionScalarWhereInput
    data: XOR<attendeesessionUpdateManyMutationInput, attendeesessionUncheckedUpdateManyWithoutAttendeeInput>
  }

  export type attendeesessionScalarWhereInput = {
    AND?: attendeesessionScalarWhereInput | attendeesessionScalarWhereInput[]
    OR?: attendeesessionScalarWhereInput[]
    NOT?: attendeesessionScalarWhereInput | attendeesessionScalarWhereInput[]
    id?: StringFilter<"attendeesession"> | string
    attendeeId?: StringFilter<"attendeesession"> | string
    token?: StringFilter<"attendeesession"> | string
    expiresAt?: DateTimeFilter<"attendeesession"> | Date | string
    createdAt?: DateTimeFilter<"attendeesession"> | Date | string
  }

  export type enrollmentUpsertWithWhereUniqueWithoutAttendeeInput = {
    where: enrollmentWhereUniqueInput
    update: XOR<enrollmentUpdateWithoutAttendeeInput, enrollmentUncheckedUpdateWithoutAttendeeInput>
    create: XOR<enrollmentCreateWithoutAttendeeInput, enrollmentUncheckedCreateWithoutAttendeeInput>
  }

  export type enrollmentUpdateWithWhereUniqueWithoutAttendeeInput = {
    where: enrollmentWhereUniqueInput
    data: XOR<enrollmentUpdateWithoutAttendeeInput, enrollmentUncheckedUpdateWithoutAttendeeInput>
  }

  export type enrollmentUpdateManyWithWhereWithoutAttendeeInput = {
    where: enrollmentScalarWhereInput
    data: XOR<enrollmentUpdateManyMutationInput, enrollmentUncheckedUpdateManyWithoutAttendeeInput>
  }

  export type enrollmentScalarWhereInput = {
    AND?: enrollmentScalarWhereInput | enrollmentScalarWhereInput[]
    OR?: enrollmentScalarWhereInput[]
    NOT?: enrollmentScalarWhereInput | enrollmentScalarWhereInput[]
    id?: StringFilter<"enrollment"> | string
    attendeeId?: StringFilter<"enrollment"> | string
    geofenceId?: StringFilter<"enrollment"> | string
    createdAt?: DateTimeFilter<"enrollment"> | Date | string
  }

  export type attendeeCreateWithoutAttendeesessionInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    attendancelog?: attendancelogCreateNestedManyWithoutAttendeeInput
    category?: categoryCreateNestedOneWithoutAttendeeInput
    organization?: organizationCreateNestedOneWithoutAttendeeInput
    enrollment?: enrollmentCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUncheckedCreateWithoutAttendeesessionInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeCreateOrConnectWithoutAttendeesessionInput = {
    where: attendeeWhereUniqueInput
    create: XOR<attendeeCreateWithoutAttendeesessionInput, attendeeUncheckedCreateWithoutAttendeesessionInput>
  }

  export type attendeeUpsertWithoutAttendeesessionInput = {
    update: XOR<attendeeUpdateWithoutAttendeesessionInput, attendeeUncheckedUpdateWithoutAttendeesessionInput>
    create: XOR<attendeeCreateWithoutAttendeesessionInput, attendeeUncheckedCreateWithoutAttendeesessionInput>
    where?: attendeeWhereInput
  }

  export type attendeeUpdateToOneWithWhereWithoutAttendeesessionInput = {
    where?: attendeeWhereInput
    data: XOR<attendeeUpdateWithoutAttendeesessionInput, attendeeUncheckedUpdateWithoutAttendeesessionInput>
  }

  export type attendeeUpdateWithoutAttendeesessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    attendancelog?: attendancelogUpdateManyWithoutAttendeeNestedInput
    category?: categoryUpdateOneWithoutAttendeeNestedInput
    organization?: organizationUpdateOneWithoutAttendeeNestedInput
    enrollment?: enrollmentUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateWithoutAttendeesessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    attendancelog?: attendancelogUncheckedUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeCreateWithoutCategoryInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    attendancelog?: attendancelogCreateNestedManyWithoutAttendeeInput
    organization?: organizationCreateNestedOneWithoutAttendeeInput
    attendeesession?: attendeesessionCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUncheckedCreateWithoutCategoryInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutAttendeeInput
    attendeesession?: attendeesessionUncheckedCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeCreateOrConnectWithoutCategoryInput = {
    where: attendeeWhereUniqueInput
    create: XOR<attendeeCreateWithoutCategoryInput, attendeeUncheckedCreateWithoutCategoryInput>
  }

  export type attendeeCreateManyCategoryInputEnvelope = {
    data: attendeeCreateManyCategoryInput | attendeeCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type organizationCreateWithoutCategoryInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeCreateNestedManyWithoutOrganizationInput
    client?: clientCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationUncheckedCreateWithoutCategoryInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeUncheckedCreateNestedManyWithoutOrganizationInput
    client?: clientUncheckedCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationCreateOrConnectWithoutCategoryInput = {
    where: organizationWhereUniqueInput
    create: XOR<organizationCreateWithoutCategoryInput, organizationUncheckedCreateWithoutCategoryInput>
  }

  export type attendeeUpsertWithWhereUniqueWithoutCategoryInput = {
    where: attendeeWhereUniqueInput
    update: XOR<attendeeUpdateWithoutCategoryInput, attendeeUncheckedUpdateWithoutCategoryInput>
    create: XOR<attendeeCreateWithoutCategoryInput, attendeeUncheckedCreateWithoutCategoryInput>
  }

  export type attendeeUpdateWithWhereUniqueWithoutCategoryInput = {
    where: attendeeWhereUniqueInput
    data: XOR<attendeeUpdateWithoutCategoryInput, attendeeUncheckedUpdateWithoutCategoryInput>
  }

  export type attendeeUpdateManyWithWhereWithoutCategoryInput = {
    where: attendeeScalarWhereInput
    data: XOR<attendeeUpdateManyMutationInput, attendeeUncheckedUpdateManyWithoutCategoryInput>
  }

  export type attendeeScalarWhereInput = {
    AND?: attendeeScalarWhereInput | attendeeScalarWhereInput[]
    OR?: attendeeScalarWhereInput[]
    NOT?: attendeeScalarWhereInput | attendeeScalarWhereInput[]
    id?: StringFilter<"attendee"> | string
    email?: StringFilter<"attendee"> | string
    name?: StringFilter<"attendee"> | string
    passwordHash?: StringFilter<"attendee"> | string
    birthDate?: DateTimeNullableFilter<"attendee"> | Date | string | null
    orgCode?: StringNullableFilter<"attendee"> | string | null
    createdAt?: DateTimeFilter<"attendee"> | Date | string
    updatedAt?: DateTimeFilter<"attendee"> | Date | string
    isVerified?: BoolFilter<"attendee"> | boolean
    categoryId?: StringNullableFilter<"attendee"> | string | null
  }

  export type organizationUpsertWithoutCategoryInput = {
    update: XOR<organizationUpdateWithoutCategoryInput, organizationUncheckedUpdateWithoutCategoryInput>
    create: XOR<organizationCreateWithoutCategoryInput, organizationUncheckedCreateWithoutCategoryInput>
    where?: organizationWhereInput
  }

  export type organizationUpdateToOneWithWhereWithoutCategoryInput = {
    where?: organizationWhereInput
    data: XOR<organizationUpdateWithoutCategoryInput, organizationUncheckedUpdateWithoutCategoryInput>
  }

  export type organizationUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUpdateManyWithoutOrganizationNestedInput
    client?: clientUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type organizationUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUncheckedUpdateManyWithoutOrganizationNestedInput
    client?: clientUncheckedUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type organizationCreateWithoutClientInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeCreateNestedManyWithoutOrganizationInput
    category?: categoryCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationUncheckedCreateWithoutClientInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeUncheckedCreateNestedManyWithoutOrganizationInput
    category?: categoryUncheckedCreateNestedManyWithoutOrganizationInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedCreateNestedManyWithoutOrganization_geofence_orgIdToorganizationInput
  }

  export type organizationCreateOrConnectWithoutClientInput = {
    where: organizationWhereUniqueInput
    create: XOR<organizationCreateWithoutClientInput, organizationUncheckedCreateWithoutClientInput>
  }

  export type clientsessionCreateWithoutClientInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type clientsessionUncheckedCreateWithoutClientInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type clientsessionCreateOrConnectWithoutClientInput = {
    where: clientsessionWhereUniqueInput
    create: XOR<clientsessionCreateWithoutClientInput, clientsessionUncheckedCreateWithoutClientInput>
  }

  export type clientsessionCreateManyClientInputEnvelope = {
    data: clientsessionCreateManyClientInput | clientsessionCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type geofenceCreateWithoutClientInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogCreateNestedManyWithoutGeofenceInput
    enrollment?: enrollmentCreateNestedManyWithoutGeofenceInput
    organization_geofence_orgIdToorganization: organizationCreateNestedOneWithoutGeofence_geofence_orgIdToorganizationInput
  }

  export type geofenceUncheckedCreateWithoutClientInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    orgId: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutGeofenceInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutGeofenceInput
  }

  export type geofenceCreateOrConnectWithoutClientInput = {
    where: geofenceWhereUniqueInput
    create: XOR<geofenceCreateWithoutClientInput, geofenceUncheckedCreateWithoutClientInput>
  }

  export type geofenceCreateManyClientInputEnvelope = {
    data: geofenceCreateManyClientInput | geofenceCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type organizationUpsertWithoutClientInput = {
    update: XOR<organizationUpdateWithoutClientInput, organizationUncheckedUpdateWithoutClientInput>
    create: XOR<organizationCreateWithoutClientInput, organizationUncheckedCreateWithoutClientInput>
    where?: organizationWhereInput
  }

  export type organizationUpdateToOneWithWhereWithoutClientInput = {
    where?: organizationWhereInput
    data: XOR<organizationUpdateWithoutClientInput, organizationUncheckedUpdateWithoutClientInput>
  }

  export type organizationUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUpdateManyWithoutOrganizationNestedInput
    category?: categoryUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type organizationUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUncheckedUpdateManyWithoutOrganizationNestedInput
    category?: categoryUncheckedUpdateManyWithoutOrganizationNestedInput
    geofence_geofence_orgIdToorganization?: geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationNestedInput
  }

  export type clientsessionUpsertWithWhereUniqueWithoutClientInput = {
    where: clientsessionWhereUniqueInput
    update: XOR<clientsessionUpdateWithoutClientInput, clientsessionUncheckedUpdateWithoutClientInput>
    create: XOR<clientsessionCreateWithoutClientInput, clientsessionUncheckedCreateWithoutClientInput>
  }

  export type clientsessionUpdateWithWhereUniqueWithoutClientInput = {
    where: clientsessionWhereUniqueInput
    data: XOR<clientsessionUpdateWithoutClientInput, clientsessionUncheckedUpdateWithoutClientInput>
  }

  export type clientsessionUpdateManyWithWhereWithoutClientInput = {
    where: clientsessionScalarWhereInput
    data: XOR<clientsessionUpdateManyMutationInput, clientsessionUncheckedUpdateManyWithoutClientInput>
  }

  export type clientsessionScalarWhereInput = {
    AND?: clientsessionScalarWhereInput | clientsessionScalarWhereInput[]
    OR?: clientsessionScalarWhereInput[]
    NOT?: clientsessionScalarWhereInput | clientsessionScalarWhereInput[]
    id?: StringFilter<"clientsession"> | string
    clientId?: StringFilter<"clientsession"> | string
    token?: StringFilter<"clientsession"> | string
    expiresAt?: DateTimeFilter<"clientsession"> | Date | string
    createdAt?: DateTimeFilter<"clientsession"> | Date | string
  }

  export type geofenceUpsertWithWhereUniqueWithoutClientInput = {
    where: geofenceWhereUniqueInput
    update: XOR<geofenceUpdateWithoutClientInput, geofenceUncheckedUpdateWithoutClientInput>
    create: XOR<geofenceCreateWithoutClientInput, geofenceUncheckedCreateWithoutClientInput>
  }

  export type geofenceUpdateWithWhereUniqueWithoutClientInput = {
    where: geofenceWhereUniqueInput
    data: XOR<geofenceUpdateWithoutClientInput, geofenceUncheckedUpdateWithoutClientInput>
  }

  export type geofenceUpdateManyWithWhereWithoutClientInput = {
    where: geofenceScalarWhereInput
    data: XOR<geofenceUpdateManyMutationInput, geofenceUncheckedUpdateManyWithoutClientInput>
  }

  export type geofenceScalarWhereInput = {
    AND?: geofenceScalarWhereInput | geofenceScalarWhereInput[]
    OR?: geofenceScalarWhereInput[]
    NOT?: geofenceScalarWhereInput | geofenceScalarWhereInput[]
    id?: StringFilter<"geofence"> | string
    name?: StringFilter<"geofence"> | string
    latitude?: FloatFilter<"geofence"> | number
    longitude?: FloatFilter<"geofence"> | number
    radius?: IntFilter<"geofence"> | number
    isActive?: BoolFilter<"geofence"> | boolean
    orgId?: StringFilter<"geofence"> | string
    createdByClientId?: StringFilter<"geofence"> | string
    createdAt?: DateTimeFilter<"geofence"> | Date | string
    updatedAt?: DateTimeFilter<"geofence"> | Date | string
  }

  export type clientCreateWithoutClientsessionInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    organization?: organizationCreateNestedOneWithoutClientInput
    geofence?: geofenceCreateNestedManyWithoutClientInput
  }

  export type clientUncheckedCreateWithoutClientsessionInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    geofence?: geofenceUncheckedCreateNestedManyWithoutClientInput
  }

  export type clientCreateOrConnectWithoutClientsessionInput = {
    where: clientWhereUniqueInput
    create: XOR<clientCreateWithoutClientsessionInput, clientUncheckedCreateWithoutClientsessionInput>
  }

  export type clientUpsertWithoutClientsessionInput = {
    update: XOR<clientUpdateWithoutClientsessionInput, clientUncheckedUpdateWithoutClientsessionInput>
    create: XOR<clientCreateWithoutClientsessionInput, clientUncheckedCreateWithoutClientsessionInput>
    where?: clientWhereInput
  }

  export type clientUpdateToOneWithWhereWithoutClientsessionInput = {
    where?: clientWhereInput
    data: XOR<clientUpdateWithoutClientsessionInput, clientUncheckedUpdateWithoutClientsessionInput>
  }

  export type clientUpdateWithoutClientsessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    organization?: organizationUpdateOneWithoutClientNestedInput
    geofence?: geofenceUpdateManyWithoutClientNestedInput
  }

  export type clientUncheckedUpdateWithoutClientsessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    geofence?: geofenceUncheckedUpdateManyWithoutClientNestedInput
  }

  export type attendeeCreateWithoutEnrollmentInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    attendancelog?: attendancelogCreateNestedManyWithoutAttendeeInput
    category?: categoryCreateNestedOneWithoutAttendeeInput
    organization?: organizationCreateNestedOneWithoutAttendeeInput
    attendeesession?: attendeesessionCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUncheckedCreateWithoutEnrollmentInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutAttendeeInput
    attendeesession?: attendeesessionUncheckedCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeCreateOrConnectWithoutEnrollmentInput = {
    where: attendeeWhereUniqueInput
    create: XOR<attendeeCreateWithoutEnrollmentInput, attendeeUncheckedCreateWithoutEnrollmentInput>
  }

  export type geofenceCreateWithoutEnrollmentInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogCreateNestedManyWithoutGeofenceInput
    client: clientCreateNestedOneWithoutGeofenceInput
    organization_geofence_orgIdToorganization: organizationCreateNestedOneWithoutGeofence_geofence_orgIdToorganizationInput
  }

  export type geofenceUncheckedCreateWithoutEnrollmentInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    orgId: string
    createdByClientId: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutGeofenceInput
  }

  export type geofenceCreateOrConnectWithoutEnrollmentInput = {
    where: geofenceWhereUniqueInput
    create: XOR<geofenceCreateWithoutEnrollmentInput, geofenceUncheckedCreateWithoutEnrollmentInput>
  }

  export type attendeeUpsertWithoutEnrollmentInput = {
    update: XOR<attendeeUpdateWithoutEnrollmentInput, attendeeUncheckedUpdateWithoutEnrollmentInput>
    create: XOR<attendeeCreateWithoutEnrollmentInput, attendeeUncheckedCreateWithoutEnrollmentInput>
    where?: attendeeWhereInput
  }

  export type attendeeUpdateToOneWithWhereWithoutEnrollmentInput = {
    where?: attendeeWhereInput
    data: XOR<attendeeUpdateWithoutEnrollmentInput, attendeeUncheckedUpdateWithoutEnrollmentInput>
  }

  export type attendeeUpdateWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    attendancelog?: attendancelogUpdateManyWithoutAttendeeNestedInput
    category?: categoryUpdateOneWithoutAttendeeNestedInput
    organization?: organizationUpdateOneWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    attendancelog?: attendancelogUncheckedUpdateManyWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUncheckedUpdateManyWithoutAttendeeNestedInput
  }

  export type geofenceUpsertWithoutEnrollmentInput = {
    update: XOR<geofenceUpdateWithoutEnrollmentInput, geofenceUncheckedUpdateWithoutEnrollmentInput>
    create: XOR<geofenceCreateWithoutEnrollmentInput, geofenceUncheckedCreateWithoutEnrollmentInput>
    where?: geofenceWhereInput
  }

  export type geofenceUpdateToOneWithWhereWithoutEnrollmentInput = {
    where?: geofenceWhereInput
    data: XOR<geofenceUpdateWithoutEnrollmentInput, geofenceUncheckedUpdateWithoutEnrollmentInput>
  }

  export type geofenceUpdateWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUpdateManyWithoutGeofenceNestedInput
    client?: clientUpdateOneRequiredWithoutGeofenceNestedInput
    organization_geofence_orgIdToorganization?: organizationUpdateOneRequiredWithoutGeofence_geofence_orgIdToorganizationNestedInput
  }

  export type geofenceUncheckedUpdateWithoutEnrollmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orgId?: StringFieldUpdateOperationsInput | string
    createdByClientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUncheckedUpdateManyWithoutGeofenceNestedInput
  }

  export type attendancelogCreateWithoutGeofenceInput = {
    id: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
    attendee: attendeeCreateNestedOneWithoutAttendancelogInput
  }

  export type attendancelogUncheckedCreateWithoutGeofenceInput = {
    id: string
    attendeeId: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
  }

  export type attendancelogCreateOrConnectWithoutGeofenceInput = {
    where: attendancelogWhereUniqueInput
    create: XOR<attendancelogCreateWithoutGeofenceInput, attendancelogUncheckedCreateWithoutGeofenceInput>
  }

  export type attendancelogCreateManyGeofenceInputEnvelope = {
    data: attendancelogCreateManyGeofenceInput | attendancelogCreateManyGeofenceInput[]
    skipDuplicates?: boolean
  }

  export type enrollmentCreateWithoutGeofenceInput = {
    id: string
    createdAt?: Date | string
    attendee: attendeeCreateNestedOneWithoutEnrollmentInput
  }

  export type enrollmentUncheckedCreateWithoutGeofenceInput = {
    id: string
    attendeeId: string
    createdAt?: Date | string
  }

  export type enrollmentCreateOrConnectWithoutGeofenceInput = {
    where: enrollmentWhereUniqueInput
    create: XOR<enrollmentCreateWithoutGeofenceInput, enrollmentUncheckedCreateWithoutGeofenceInput>
  }

  export type enrollmentCreateManyGeofenceInputEnvelope = {
    data: enrollmentCreateManyGeofenceInput | enrollmentCreateManyGeofenceInput[]
    skipDuplicates?: boolean
  }

  export type clientCreateWithoutGeofenceInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    organization?: organizationCreateNestedOneWithoutClientInput
    clientsession?: clientsessionCreateNestedManyWithoutClientInput
  }

  export type clientUncheckedCreateWithoutGeofenceInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    clientsession?: clientsessionUncheckedCreateNestedManyWithoutClientInput
  }

  export type clientCreateOrConnectWithoutGeofenceInput = {
    where: clientWhereUniqueInput
    create: XOR<clientCreateWithoutGeofenceInput, clientUncheckedCreateWithoutGeofenceInput>
  }

  export type organizationCreateWithoutGeofence_geofence_orgIdToorganizationInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeCreateNestedManyWithoutOrganizationInput
    category?: categoryCreateNestedManyWithoutOrganizationInput
    client?: clientCreateNestedManyWithoutOrganizationInput
  }

  export type organizationUncheckedCreateWithoutGeofence_geofence_orgIdToorganizationInput = {
    id: string
    name: string
    description?: string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isActive?: boolean
    requestedById?: string | null
    attendee?: attendeeUncheckedCreateNestedManyWithoutOrganizationInput
    category?: categoryUncheckedCreateNestedManyWithoutOrganizationInput
    client?: clientUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type organizationCreateOrConnectWithoutGeofence_geofence_orgIdToorganizationInput = {
    where: organizationWhereUniqueInput
    create: XOR<organizationCreateWithoutGeofence_geofence_orgIdToorganizationInput, organizationUncheckedCreateWithoutGeofence_geofence_orgIdToorganizationInput>
  }

  export type attendancelogUpsertWithWhereUniqueWithoutGeofenceInput = {
    where: attendancelogWhereUniqueInput
    update: XOR<attendancelogUpdateWithoutGeofenceInput, attendancelogUncheckedUpdateWithoutGeofenceInput>
    create: XOR<attendancelogCreateWithoutGeofenceInput, attendancelogUncheckedCreateWithoutGeofenceInput>
  }

  export type attendancelogUpdateWithWhereUniqueWithoutGeofenceInput = {
    where: attendancelogWhereUniqueInput
    data: XOR<attendancelogUpdateWithoutGeofenceInput, attendancelogUncheckedUpdateWithoutGeofenceInput>
  }

  export type attendancelogUpdateManyWithWhereWithoutGeofenceInput = {
    where: attendancelogScalarWhereInput
    data: XOR<attendancelogUpdateManyMutationInput, attendancelogUncheckedUpdateManyWithoutGeofenceInput>
  }

  export type enrollmentUpsertWithWhereUniqueWithoutGeofenceInput = {
    where: enrollmentWhereUniqueInput
    update: XOR<enrollmentUpdateWithoutGeofenceInput, enrollmentUncheckedUpdateWithoutGeofenceInput>
    create: XOR<enrollmentCreateWithoutGeofenceInput, enrollmentUncheckedCreateWithoutGeofenceInput>
  }

  export type enrollmentUpdateWithWhereUniqueWithoutGeofenceInput = {
    where: enrollmentWhereUniqueInput
    data: XOR<enrollmentUpdateWithoutGeofenceInput, enrollmentUncheckedUpdateWithoutGeofenceInput>
  }

  export type enrollmentUpdateManyWithWhereWithoutGeofenceInput = {
    where: enrollmentScalarWhereInput
    data: XOR<enrollmentUpdateManyMutationInput, enrollmentUncheckedUpdateManyWithoutGeofenceInput>
  }

  export type clientUpsertWithoutGeofenceInput = {
    update: XOR<clientUpdateWithoutGeofenceInput, clientUncheckedUpdateWithoutGeofenceInput>
    create: XOR<clientCreateWithoutGeofenceInput, clientUncheckedCreateWithoutGeofenceInput>
    where?: clientWhereInput
  }

  export type clientUpdateToOneWithWhereWithoutGeofenceInput = {
    where?: clientWhereInput
    data: XOR<clientUpdateWithoutGeofenceInput, clientUncheckedUpdateWithoutGeofenceInput>
  }

  export type clientUpdateWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    organization?: organizationUpdateOneWithoutClientNestedInput
    clientsession?: clientsessionUpdateManyWithoutClientNestedInput
  }

  export type clientUncheckedUpdateWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    clientsession?: clientsessionUncheckedUpdateManyWithoutClientNestedInput
  }

  export type organizationUpsertWithoutGeofence_geofence_orgIdToorganizationInput = {
    update: XOR<organizationUpdateWithoutGeofence_geofence_orgIdToorganizationInput, organizationUncheckedUpdateWithoutGeofence_geofence_orgIdToorganizationInput>
    create: XOR<organizationCreateWithoutGeofence_geofence_orgIdToorganizationInput, organizationUncheckedCreateWithoutGeofence_geofence_orgIdToorganizationInput>
    where?: organizationWhereInput
  }

  export type organizationUpdateToOneWithWhereWithoutGeofence_geofence_orgIdToorganizationInput = {
    where?: organizationWhereInput
    data: XOR<organizationUpdateWithoutGeofence_geofence_orgIdToorganizationInput, organizationUncheckedUpdateWithoutGeofence_geofence_orgIdToorganizationInput>
  }

  export type organizationUpdateWithoutGeofence_geofence_orgIdToorganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUpdateManyWithoutOrganizationNestedInput
    category?: categoryUpdateManyWithoutOrganizationNestedInput
    client?: clientUpdateManyWithoutOrganizationNestedInput
  }

  export type organizationUncheckedUpdateWithoutGeofence_geofence_orgIdToorganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    requestedById?: NullableStringFieldUpdateOperationsInput | string | null
    attendee?: attendeeUncheckedUpdateManyWithoutOrganizationNestedInput
    category?: categoryUncheckedUpdateManyWithoutOrganizationNestedInput
    client?: clientUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type attendeeCreateWithoutOrganizationInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    attendancelog?: attendancelogCreateNestedManyWithoutAttendeeInput
    category?: categoryCreateNestedOneWithoutAttendeeInput
    attendeesession?: attendeesessionCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeUncheckedCreateWithoutOrganizationInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutAttendeeInput
    attendeesession?: attendeesessionUncheckedCreateNestedManyWithoutAttendeeInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutAttendeeInput
  }

  export type attendeeCreateOrConnectWithoutOrganizationInput = {
    where: attendeeWhereUniqueInput
    create: XOR<attendeeCreateWithoutOrganizationInput, attendeeUncheckedCreateWithoutOrganizationInput>
  }

  export type attendeeCreateManyOrganizationInputEnvelope = {
    data: attendeeCreateManyOrganizationInput | attendeeCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type categoryCreateWithoutOrganizationInput = {
    id: string
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendee?: attendeeCreateNestedManyWithoutCategoryInput
  }

  export type categoryUncheckedCreateWithoutOrganizationInput = {
    id: string
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendee?: attendeeUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryCreateOrConnectWithoutOrganizationInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutOrganizationInput, categoryUncheckedCreateWithoutOrganizationInput>
  }

  export type categoryCreateManyOrganizationInputEnvelope = {
    data: categoryCreateManyOrganizationInput | categoryCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type clientCreateWithoutOrganizationInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    clientsession?: clientsessionCreateNestedManyWithoutClientInput
    geofence?: geofenceCreateNestedManyWithoutClientInput
  }

  export type clientUncheckedCreateWithoutOrganizationInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    clientsession?: clientsessionUncheckedCreateNestedManyWithoutClientInput
    geofence?: geofenceUncheckedCreateNestedManyWithoutClientInput
  }

  export type clientCreateOrConnectWithoutOrganizationInput = {
    where: clientWhereUniqueInput
    create: XOR<clientCreateWithoutOrganizationInput, clientUncheckedCreateWithoutOrganizationInput>
  }

  export type clientCreateManyOrganizationInputEnvelope = {
    data: clientCreateManyOrganizationInput | clientCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogCreateNestedManyWithoutGeofenceInput
    enrollment?: enrollmentCreateNestedManyWithoutGeofenceInput
    client: clientCreateNestedOneWithoutGeofenceInput
  }

  export type geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdByClientId: string
    createdAt?: Date | string
    updatedAt: Date | string
    attendancelog?: attendancelogUncheckedCreateNestedManyWithoutGeofenceInput
    enrollment?: enrollmentUncheckedCreateNestedManyWithoutGeofenceInput
  }

  export type geofenceCreateOrConnectWithoutOrganization_geofence_orgIdToorganizationInput = {
    where: geofenceWhereUniqueInput
    create: XOR<geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput>
  }

  export type geofenceCreateManyOrganization_geofence_orgIdToorganizationInputEnvelope = {
    data: geofenceCreateManyOrganization_geofence_orgIdToorganizationInput | geofenceCreateManyOrganization_geofence_orgIdToorganizationInput[]
    skipDuplicates?: boolean
  }

  export type attendeeUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: attendeeWhereUniqueInput
    update: XOR<attendeeUpdateWithoutOrganizationInput, attendeeUncheckedUpdateWithoutOrganizationInput>
    create: XOR<attendeeCreateWithoutOrganizationInput, attendeeUncheckedCreateWithoutOrganizationInput>
  }

  export type attendeeUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: attendeeWhereUniqueInput
    data: XOR<attendeeUpdateWithoutOrganizationInput, attendeeUncheckedUpdateWithoutOrganizationInput>
  }

  export type attendeeUpdateManyWithWhereWithoutOrganizationInput = {
    where: attendeeScalarWhereInput
    data: XOR<attendeeUpdateManyMutationInput, attendeeUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type categoryUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: categoryWhereUniqueInput
    update: XOR<categoryUpdateWithoutOrganizationInput, categoryUncheckedUpdateWithoutOrganizationInput>
    create: XOR<categoryCreateWithoutOrganizationInput, categoryUncheckedCreateWithoutOrganizationInput>
  }

  export type categoryUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: categoryWhereUniqueInput
    data: XOR<categoryUpdateWithoutOrganizationInput, categoryUncheckedUpdateWithoutOrganizationInput>
  }

  export type categoryUpdateManyWithWhereWithoutOrganizationInput = {
    where: categoryScalarWhereInput
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type categoryScalarWhereInput = {
    AND?: categoryScalarWhereInput | categoryScalarWhereInput[]
    OR?: categoryScalarWhereInput[]
    NOT?: categoryScalarWhereInput | categoryScalarWhereInput[]
    id?: StringFilter<"category"> | string
    name?: StringFilter<"category"> | string
    orgId?: StringFilter<"category"> | string
    createdAt?: DateTimeFilter<"category"> | Date | string
    updatedAt?: DateTimeFilter<"category"> | Date | string
  }

  export type clientUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: clientWhereUniqueInput
    update: XOR<clientUpdateWithoutOrganizationInput, clientUncheckedUpdateWithoutOrganizationInput>
    create: XOR<clientCreateWithoutOrganizationInput, clientUncheckedCreateWithoutOrganizationInput>
  }

  export type clientUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: clientWhereUniqueInput
    data: XOR<clientUpdateWithoutOrganizationInput, clientUncheckedUpdateWithoutOrganizationInput>
  }

  export type clientUpdateManyWithWhereWithoutOrganizationInput = {
    where: clientScalarWhereInput
    data: XOR<clientUpdateManyMutationInput, clientUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type clientScalarWhereInput = {
    AND?: clientScalarWhereInput | clientScalarWhereInput[]
    OR?: clientScalarWhereInput[]
    NOT?: clientScalarWhereInput | clientScalarWhereInput[]
    id?: StringFilter<"client"> | string
    email?: StringFilter<"client"> | string
    name?: StringFilter<"client"> | string
    passwordHash?: StringFilter<"client"> | string
    birthDate?: DateTimeNullableFilter<"client"> | Date | string | null
    orgCode?: StringNullableFilter<"client"> | string | null
    createdAt?: DateTimeFilter<"client"> | Date | string
    updatedAt?: DateTimeFilter<"client"> | Date | string
    isVerified?: BoolFilter<"client"> | boolean
  }

  export type geofenceUpsertWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput = {
    where: geofenceWhereUniqueInput
    update: XOR<geofenceUpdateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedUpdateWithoutOrganization_geofence_orgIdToorganizationInput>
    create: XOR<geofenceCreateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedCreateWithoutOrganization_geofence_orgIdToorganizationInput>
  }

  export type geofenceUpdateWithWhereUniqueWithoutOrganization_geofence_orgIdToorganizationInput = {
    where: geofenceWhereUniqueInput
    data: XOR<geofenceUpdateWithoutOrganization_geofence_orgIdToorganizationInput, geofenceUncheckedUpdateWithoutOrganization_geofence_orgIdToorganizationInput>
  }

  export type geofenceUpdateManyWithWhereWithoutOrganization_geofence_orgIdToorganizationInput = {
    where: geofenceScalarWhereInput
    data: XOR<geofenceUpdateManyMutationInput, geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationInput>
  }

  export type adminsessionCreateManyAdminInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type adminsessionUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminsessionUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type adminsessionUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendancelogCreateManyAttendeeInput = {
    id: string
    geofenceId: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
  }

  export type attendeesessionCreateManyAttendeeInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type enrollmentCreateManyAttendeeInput = {
    id: string
    geofenceId: string
    createdAt?: Date | string
  }

  export type attendancelogUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    geofence?: geofenceUpdateOneRequiredWithoutAttendancelogNestedInput
  }

  export type attendancelogUncheckedUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type attendancelogUncheckedUpdateManyWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type attendeesessionUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeesessionUncheckedUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeesessionUncheckedUpdateManyWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type enrollmentUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    geofence?: geofenceUpdateOneRequiredWithoutEnrollmentNestedInput
  }

  export type enrollmentUncheckedUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type enrollmentUncheckedUpdateManyWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    geofenceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeeCreateManyCategoryInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    orgCode?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
  }

  export type attendeeUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    attendancelog?: attendancelogUpdateManyWithoutAttendeeNestedInput
    organization?: organizationUpdateOneWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    attendancelog?: attendancelogUncheckedUpdateManyWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUncheckedUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orgCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type clientsessionCreateManyClientInput = {
    id: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type geofenceCreateManyClientInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    orgId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type clientsessionUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clientsessionUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clientsessionUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type geofenceUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUpdateManyWithoutGeofenceNestedInput
    enrollment?: enrollmentUpdateManyWithoutGeofenceNestedInput
    organization_geofence_orgIdToorganization?: organizationUpdateOneRequiredWithoutGeofence_geofence_orgIdToorganizationNestedInput
  }

  export type geofenceUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUncheckedUpdateManyWithoutGeofenceNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutGeofenceNestedInput
  }

  export type geofenceUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    orgId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendancelogCreateManyGeofenceInput = {
    id: string
    attendeeId: string
    deviceLat: number
    deviceLng: number
    isMock?: boolean
    status?: string
    timestamp?: Date | string
    afternoonTimeOut?: Date | string | null
    morningTimeIn?: Date | string | null
    afternoonTimeIn?: Date | string | null
    morningTimeOut?: Date | string | null
  }

  export type enrollmentCreateManyGeofenceInput = {
    id: string
    attendeeId: string
    createdAt?: Date | string
  }

  export type attendancelogUpdateWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attendee?: attendeeUpdateOneRequiredWithoutAttendancelogNestedInput
  }

  export type attendancelogUncheckedUpdateWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type attendancelogUncheckedUpdateManyWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    deviceLat?: FloatFieldUpdateOperationsInput | number
    deviceLng?: FloatFieldUpdateOperationsInput | number
    isMock?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    afternoonTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    afternoonTimeIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    morningTimeOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type enrollmentUpdateWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUpdateOneRequiredWithoutEnrollmentNestedInput
  }

  export type enrollmentUncheckedUpdateWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type enrollmentUncheckedUpdateManyWithoutGeofenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    attendeeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attendeeCreateManyOrganizationInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
    categoryId?: string | null
  }

  export type categoryCreateManyOrganizationInput = {
    id: string
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type clientCreateManyOrganizationInput = {
    id: string
    email: string
    name: string
    passwordHash: string
    birthDate?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    isVerified?: boolean
  }

  export type geofenceCreateManyOrganization_geofence_orgIdToorganizationInput = {
    id: string
    name: string
    latitude: number
    longitude: number
    radius: number
    isActive?: boolean
    createdByClientId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type attendeeUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    attendancelog?: attendancelogUpdateManyWithoutAttendeeNestedInput
    category?: categoryUpdateOneWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    attendancelog?: attendancelogUncheckedUpdateManyWithoutAttendeeNestedInput
    attendeesession?: attendeesessionUncheckedUpdateManyWithoutAttendeeNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutAttendeeNestedInput
  }

  export type attendeeUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoryUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: attendeeUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type clientUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    clientsession?: clientsessionUpdateManyWithoutClientNestedInput
    geofence?: geofenceUpdateManyWithoutClientNestedInput
  }

  export type clientUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    clientsession?: clientsessionUncheckedUpdateManyWithoutClientNestedInput
    geofence?: geofenceUncheckedUpdateManyWithoutClientNestedInput
  }

  export type clientUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type geofenceUpdateWithoutOrganization_geofence_orgIdToorganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUpdateManyWithoutGeofenceNestedInput
    enrollment?: enrollmentUpdateManyWithoutGeofenceNestedInput
    client?: clientUpdateOneRequiredWithoutGeofenceNestedInput
  }

  export type geofenceUncheckedUpdateWithoutOrganization_geofence_orgIdToorganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdByClientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendancelog?: attendancelogUncheckedUpdateManyWithoutGeofenceNestedInput
    enrollment?: enrollmentUncheckedUpdateManyWithoutGeofenceNestedInput
  }

  export type geofenceUncheckedUpdateManyWithoutOrganization_geofence_orgIdToorganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    radius?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdByClientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}