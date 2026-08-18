import logging


def setup_logging():
    """
    Configure HealthGPT application logging.
    """

    logging.basicConfig(
        level=logging.INFO,
        format=(
            "%(asctime)s | "
            "%(levelname)s | "
            "%(name)s | "
            "%(message)s"
        )
    )


logger = logging.getLogger("healthgpt")