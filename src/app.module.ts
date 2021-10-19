import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import neo4j from "neo4j-driver";
import { typeDefs } from 'models/typeDef';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql-compose/lib/graphql';



const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "Qwertyui1!")
);
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,

  config: {
    jwt: {
      secret: "secret"
    }
  }
});

let graphSchema: GraphQLSchema = neoSchema.schema;
console.error(graphSchema);
@Module({
  imports: [
    GraphQLModule.forRoot({

      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      debug: false,
      disableHealthCheck: true,
      //  typePaths: ['./models/*.graphql'],
      definitions: {
        path: null
      },
      schema: graphSchema

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
