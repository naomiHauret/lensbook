import getDoesFollow from '@api/follow/does-follow'

export function useIsUserFollowingProfile() {
  async function checkIfCurrentUserFollows({ profileId, followerAddress }) {
    const followInfos = [
      {
        followerAddress,
        profileId,
      },
    ]
    try {
      const result = await getDoesFollow(followInfos)
      console.log(result)
    } catch (e) {
      console.error(e)
    }
  }
  return {
    checkIfCurrentUserFollows,
  }
}

export default useIsUserFollowingProfile
