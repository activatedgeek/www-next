import { default as nextGetConfig } from "next/config"

export function getConfig() {
  const { publicRuntimeConfig } = nextGetConfig()
  return publicRuntimeConfig
}

export function getServerConfig() {
  const { serverRuntimeConfig } = nextGetConfig()
  return serverRuntimeConfig
}
