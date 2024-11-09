from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "mongodb+srv://npatel163:b7qPkL6rwyJ7Ex5D@ewa-project.nway6.mongodb.net/?retryWrites=true&w=majority&appName=EWA-project"
    DATABASE_NAME: str = "travel"
    SECRET_KEY: str = "b7qPkL6rwyJ7Ex5D"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 360

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()