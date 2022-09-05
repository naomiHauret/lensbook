import { createClient, chain, configureChains } from '@wagmi/core'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { publicProvider } from '@wagmi/core/providers/public'

const appChains = [chain.polygonMumbai]
const providers = [publicProvider()]
export const { chains, provider } = configureChains(appChains, providers)

export const client = createClient({
  provider,
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains: appChains,
    }),
  ],
})

export default client
