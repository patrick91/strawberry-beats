import asyncio
import random
import strawberry
from strawberry.types import Info


@strawberry.type
class Query:
    @strawberry.field
    def hi(self) -> str:
        return "👋"


@strawberry.type
class Alpaca:
    x: int
    y: int


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def play_sound(self, info: Info) -> str:
        await info.context.broadcast.publish(channel="beats", message="do it")
        return "ok"


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def on_alpaca(self, info: Info, target: int = 100) -> Alpaca:
        print(info)

        async with info.context.broadcast.subscribe(channel="beats") as subscriber:
            async for event in subscriber:
                yield Alpaca(random.randint(0, 100), random.randint(0, 100))


schema = strawberry.Schema(query=Query, mutation=Mutation, subscription=Subscription)
