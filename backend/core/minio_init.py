import time

from minio import Minio

from .config import (
    MINIO_ACCESS_KEY,
    MINIO_BUCKET,
    MINIO_ENDPOINT,
    MINIO_SECRET_KEY,
    MINIO_SECURE,
)


minio_client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=MINIO_SECURE,
)


def init_bucket():
    max_attempts = 10
    retry_delay_seconds = 2

    for attempt in range(1, max_attempts + 1):
        try:
            if not minio_client.bucket_exists(MINIO_BUCKET):
                minio_client.make_bucket(MINIO_BUCKET)
            return
        except Exception as exc:
            if attempt == max_attempts:
                raise RuntimeError(
                    f"MinIO is unavailable after {max_attempts} attempts: {exc}"
                ) from exc
            time.sleep(retry_delay_seconds)
