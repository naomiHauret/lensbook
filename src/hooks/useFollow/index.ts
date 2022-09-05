import { CONTRACT_LENS_HUB_PROXY } from '@config/contracts'
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import abiLensHubProxy from '@abis/lens-hub-proxy'

export function useFollow() {
  async function followProfile(profileToFollow) {
    const currentProfileId = 0x0
    try {
      const config = await prepareWriteContract({
        addressOrName: CONTRACT_LENS_HUB_PROXY,
        args: [[profileToFollow], [currentProfileId]],
        contractInterface: abiLensHubProxy,
        functionName: 'follow',
      })

      const txn = await writeContract({
        ...config,
      })
      const receipt = await waitForTransaction({
        hash: txn.hash,
      })
      alert('Profile followed successfully!')
    } catch (e) {
      console.error(e)
      console.error(e)
    }
  }

  return {
    followProfile,
  }
}

export default useFollow
