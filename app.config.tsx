import { type ExpoConfig, type ConfigContext } from '@expo/config'
import { SENTRY_DSN, SENTRY_AUTH_TOKEN } from '@env'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "Klear-Frontend",
  name: "Klear-Frontend",
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "dcsil",
          project: "klear_frontend",
          authToken: SENTRY_AUTH_TOKEN
        }
      }
    ]
  },
  extra: {
    SENTRY_DNS: SENTRY_DSN
  },
})
