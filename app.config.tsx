import { ExpoConfig, ConfigContext } from '@expo/config';
import { SENTRY_DSN, SENTRY_AUTH_TOKEN } from '@env'


export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "Klear-Frontend",
  name: "Klear-Frontend",
  hooks: {
    "postPublish": [
      {
        "file": "sentry-expo/upload-sourcemaps",
        "config": {
          "organization": "dcsil",
          "project": "klear_frontend",
          "authToken": SENTRY_AUTH_TOKEN
        }
      }
    ]
  },
  extra: {
    "eas": {
      "projectId": "e0fb5977-b42b-48b4-a775-ce3fee9f5962"
    },
    "SENTRY_DNS": SENTRY_DSN
  },
});