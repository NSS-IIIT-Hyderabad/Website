from uuid import uuid4

import strawberry
from pydantic import BaseModel, Field


class TestimonialModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str = Field(..., min_length=1)
    title: str = Field(...)
    period: str = Field(default="")
    quote: str = Field(...)


@strawberry.experimental.pydantic.type(model=TestimonialModel, all_fields=True)
class Testimonial:
    pass


@strawberry.experimental.pydantic.input(model=TestimonialModel, all_fields=True)
class TestimonialInput:
    pass
