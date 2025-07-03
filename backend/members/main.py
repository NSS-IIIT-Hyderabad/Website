from fastapi import FastAPI
import strawberry
from strawberry.fastapi import GraphQLRouter
from qnm import queries, mutations

from strawberry.tools import create_type
Query = create_type("Query", queries)
Mutation = create_type("Mutation", mutations)

schema=strawberry.Schema(query=Query, mutation=Mutation)
gqlr=GraphQLRouter(schema,graphiql=True)
app=FastAPI()
app.include_router(gqlr,prefix="/graphql")
