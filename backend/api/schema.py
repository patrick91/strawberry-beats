import strawberry
from strawberry.types import Info


@strawberry.type
class Query:
    @strawberry.field
    def hi(self) -> str:
        return "👋"


@strawberry.type
class Sound:
    name: str


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def play_sound(self, info: Info, name: str) -> str:
        await info.context.broadcast.publish(channel="beats", message=name)
        return "ok"


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def on_sound(self, info: Info, target: int = 100) -> Sound:
        async with info.context.broadcast.subscribe(channel="beats") as subscriber:
            async for event in subscriber:
                yield Sound(name=event.message)


schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
