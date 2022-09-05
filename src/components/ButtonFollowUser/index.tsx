import Button from '@components/Button'
import useAccount from '@hooks/useAccount'
import useBalance from '@hooks/useBalance'
import useIsUserFollowingProfile from '@hooks/useIsUserFollowingProfile'
import useNetwork from '@hooks/useNetwork'
import { createEffect, createSignal, Match, Show, Switch } from 'solid-js'
import { useParams } from 'solid-app-router'
import { useFollow } from '@hooks/useFollow'
export const ButtonFollow = (props) => {
  const params = useParams()
  const { checkIfCurrentUserFollows } = useIsUserFollowingProfile()
  const [isFollowing, setIsFolllowing] = createSignal()
  const { networkData } = useNetwork()
  const { accountData } = useAccount()
  const { balanceState } = useBalance()
  const { followProfile } = useFollow()
  createEffect(async () => {
    if (accountData()?.address) {
      const result = await checkIfCurrentUserFollows({
        profileId: params.idProfile,
        followerAddress: accountData()?.address,
      })
      if (result?.data?.doesFollow) setIsFolllowing(result?.data?.doesFollow[0].follows)
      else {
        setIsFolllowing(false)
      }
    }
  })

  return (
    <>
      <Button
        disabled={
          !networkData()?.chain ||
          networkData()?.chain?.unsupported === true ||
          props?.profileToFollow?.followModule?.type === 'RevertFollowModule' ||
          (props?.profileToFollow?.followModule?.type === 'FeeFollowModule' &&
            (balanceState.loading ||
              parseFloat(
                balanceState?.balanceOf?.[props?.profileToFollow?.followModule?.amount?.asset?.address]?.formatted,
              ) < parseFloat(props?.profileToFollow?.followModule?.amount?.value)))
        }
        onClick={async () => {
          if (isFollowing() === true) {
            console.log('...')
          } else {
            await followProfile(props?.profileToFollow?.id)
          }
        }}
        intent={isFollowing() ? 'primary-ghost' : 'primary'}
        scale="xs"
        class="w-max-content h-fit-content"
      >
        <Switch>
          <Match when={!isFollowing()}>Follow {props?.profileToFollow?.name}</Match>
          <Match when={isFollowing()}>Unfollow {props?.profileToFollow?.name}</Match>
        </Switch>
      </Button>
      <Show when={isFollowing() === false}>
        <div class="text-[0.765rem] text-gray-400 mt-1">
          <Switch>
            <Match when={props?.profileToFollow?.followModule === null}>
              Following {props?.profileToFollow?.name} is free
            </Match>
            <Match when={props?.profileToFollow?.followModule?.type === 'RevertFollowModule'}>
              No one can follow {props?.profileToFollow?.name}
            </Match>
            <Match when={props?.profileToFollow?.followModule?.type === 'FeeFollowModule'}>
              Follow {props?.profileToFollow?.name} for <br />{' '}
              <span class="font-bold">
                {props?.profileToFollow?.followModule?.amount?.value}{' '}
                {props?.profileToFollow?.followModule?.amount?.asset?.symbol}
              </span>
            </Match>
            <Match when={props?.profileToFollow?.followModule?.type === 'ProfileFollowModule'}>
              Only people with a profile <br />
              can follow {props?.profileToFollow?.name}
            </Match>
          </Switch>
        </div>
      </Show>
    </>
  )
}

export default ButtonFollow
