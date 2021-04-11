import dataclasses
from typing import Optional, Union

from broadcaster import Broadcast
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import Response
from starlette.routing import Route, WebSocketRoute
from starlette.websockets import WebSocket
from strawberry.asgi import GraphQL

from api.schema import schema

broadcast = Broadcast("memory://")


@dataclasses.dataclass
class Context:
    broadcast: Broadcast = broadcast


class MyGraphQL(GraphQL):
    async def get_context(
        self,
        request: Union[Request, WebSocket],
        response: Optional[Response] = None,
    ) -> Context:
        return Context()


graphql_app = MyGraphQL(schema)

routes = [
    Route("/graphql", graphql_app),
    WebSocketRoute("/graphql", graphql_app),
]


app = Starlette(
    routes=routes,
    on_startup=[broadcast.connect],
    on_shutdown=[broadcast.disconnect],
)
