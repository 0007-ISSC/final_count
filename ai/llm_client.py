"""
HealthGPT provider-independent LLM client.

The client uses an OpenAI-compatible HTTP API.
Provider URL, API key and model are loaded from environment
variables through the application's configuration.

It can therefore be adapted to different LLM providers
without changing the rest of HealthGPT.
"""

from typing import Any

import httpx


class LLMClient:

    def __init__(
        self,
        api_key: str | None = None,
        base_url: str = "https://api.openai.com/v1",
        model: str = "gpt-4o-mini",
        timeout: float = 60.0,
    ):

        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout = timeout

    @property
    def available(self) -> bool:
        """
        Indicates whether an API key is configured.
        """

        return bool(
            self.api_key
        )

    async def generate(
        self,
        user_prompt: str,
        system_prompt: str | None = None,
        temperature: float = 0.2,
        max_tokens: int = 1000,
    ) -> str:

        if not self.api_key:

            raise RuntimeError(
                "LLM API key is not configured."
            )

        messages: list[dict[str, str]] = []

        if system_prompt:

            messages.append({
                "role": "system",
                "content": system_prompt,
            })

        messages.append({
            "role": "user",
            "content": user_prompt,
        })

        payload: dict[str, Any] = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        headers = {
            "Authorization": (
                f"Bearer {self.api_key}"
            ),
            "Content-Type": "application/json",
        }

        url = (
            f"{self.base_url}"
            "/chat/completions"
        )

        async with httpx.AsyncClient(
            timeout=self.timeout
        ) as client:

            response = await client.post(
                url,
                headers=headers,
                json=payload,
            )

            response.raise_for_status()

            data = response.json()

        try:

            return (
                data["choices"][0]["message"]["content"]
                .strip()
            )

        except (
            KeyError,
            IndexError,
            TypeError,
        ) as exc:

            raise RuntimeError(
                "Unexpected response from LLM provider."
            ) from exc