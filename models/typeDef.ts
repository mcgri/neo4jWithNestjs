import { gql } from "apollo-server-express";


export enum SalaryType {
    perHour = "perHour",
    perDay = "perDay",
    perYear = "perYear",
    perWeek = "perWeek"
}
export enum ScheduleType {
    fulltime = "fulltime",
    parttime = "parttime"
}

export const typeDefs = gql`

    enum SalaryType {
        PERHOUR
        PERDAY
        PERYEAR
        PERWEEK
    }
    enum ScheduleType {
        FULLTIME
        PARTTIME
    }

    type User  @auth(
            rules: [
                {
                    operations: [READ],
                    allow: { id: "$jwt.sub" }
                }
            ]
        ){
        id: ID! @id
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime @timestamp(operations: [UPDATE])
        deletedAt: DateTime @timestamp(operations: [DELETE])

        firstName: String!
        lastName:String!

        searches: [UserSearch] @relationship(type:"HAS_SEARCHES",direction:IN)

    }

 # @auth(
    #         rules: [
    #             # {
    #             #     operations: [READ,CREATE,UPDATE,DELETE],
    #             #     allow:  { user: { id: "$jwt.sub" } }
    #             #     bind: {user:{id: "$jwt.sub"}}
    #             #     where:{user:{id: "$jwt.jst"}}
    #             # }
    #         ]
    #     )
    type UserSearch  {

        id: ID! @id
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime @timestamp(operations: [UPDATE])
        deletedAt: DateTime @timestamp(operations: [DELETE])

        name: String
        companyName: String
        location: String
        positionName: String
        user: User! @relationship(type:"BELONGS_TO",direction:OUT)
        searchResult: [SearchResult] @relationship(type:"CREATED",direction:IN)
    }

    type SearchResult {
        id: ID! @id
        createdAt: DateTime! @timestamp(operations: [CREATE])
        updatedAt: DateTime @timestamp(operations: [UPDATE])
        deletedAt: DateTime @timestamp(operations: [DELETE])

        city:String
        country:String
        salaryFrom:Float
        salaryTo:Float
        salaryType: SalaryType
        positionName: String
        positionScheduleType:ScheduleType
        advertDescription: String
        email: String
        foundByQuery: String
        customScheduleType: String
        customSalaryType: String
        user: User! @relationship(type:"BELONGS_TO",direction:OUT)
        usersearch: UserSearch @relationship(type:"CREATED_BY",direction:OUT)


    }

    # type Query {
    #     me: User
    #         @cypher(statement: "MATCH (u:User { id: $auth.jwt.sub }) RETURN u")
    #         @auth(rules: [{ isAuthenticated: true }])
    # }
    # type Mutation {
    #     search(name:String,companyName:String, location:String, positionName:String): UserSearch! ### user searches and we show them the result
    # }


`

