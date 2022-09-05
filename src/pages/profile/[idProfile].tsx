import Button from '@components/Button'
import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/solid'
import DialogModalConnectWallet from '@components/DialogModalConnectWallet'
import useAccount from '@hooks/useAccount'
import { useRouteData } from 'solid-app-router'
import { createMemo, createUniqueId, For, Match, Show, Switch } from 'solid-js'
import { Portal } from 'solid-js/web'
import ButtonFollowUser from '@components/ButtonFollowUser'
import { Title } from 'solid-meta'

const Page = () => {
  const pageData = useRouteData()
  const { accountData } = useAccount()

  const [stateDialogConnectWallet, sendDialogConnectWallet] = useMachine(
    dialog.machine({
      id: createUniqueId(),
      role: 'alertdialog',
      closeOnOutsideClick: false,
      closeOnEsc: false,
      preventScroll: true,
    }),
  )

  const apiDialogConnectWallet = createMemo(() =>
    dialog.connect(stateDialogConnectWallet, sendDialogConnectWallet, normalizeProps),
  )
  return (
    <>
      <div class="container mx-auto animate-appear">
        <Switch fallback={<>Loading...</>}>
          <Match when={pageData.profile()?.error?.message}>
            <Title>Profile - LensBook</Title>
            <div>{pageData.profile()?.error?.message}</div>
          </Match>
          <Match when={!pageData.profile()?.data?.profile}>This profile doesn't exist.</Match>
          <Match when={pageData.profile()?.data?.profile}>
            <div class="animate-appear flex flex-wrap md:flex-nowrap items-start w-full">
              <div class="w-full md:w-auto mb-4 md:mr-8">
                <Switch>
                  <Match
                    when={!pageData.profile()?.data?.profile?.picture?.original?.url?.includes('lens.infura-ipfs.io')}
                  >
                    <Title>Profile page not found - LensBook</Title>
                    <div class="bg-emerald-900 w-60 h-60 rounded mx-auto" />
                  </Match>
                  <Match
                    when={pageData.profile()?.data?.profile?.picture?.original?.url?.includes('lens.infura-ipfs.io')}
                  >
                    <Title>{pageData.profile()?.data?.profile.name}'s profile - LensBook</Title>
                    <div class="relative w-60 h-60 bg-emerald-900 rounded mx-auto">
                      <img
                        src={pageData.profile()?.data?.profile.picture.original.url}
                        alt={pageData.profile()?.data?.profile.handle}
                        class="rounded"
                      />
                    </div>
                  </Match>
                </Switch>
              </div>
              <div class="grow-1 w-full">
                <div class="text-center md:text-left">
                  <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl sm:tracking-tight mb-1">
                    {pageData.profile()?.data?.profile?.name}
                  </h1>
                  <h2 class="text-xl font-bold text-emerald-500 sm:text-2xl sm:tracking-tight mb-2">
                    {pageData.profile()?.data?.profile?.handle}
                  </h2>
                  <div class="flex flex-wrap gap-x-2 text-gray-600 text-sm sm:text-base mb-4 justify-center md:justify-start">
                    <p>
                      <span class="text-gray-900 font-medium">
                        {pageData.profile()?.data?.profile?.stats.totalFollowers}
                      </span>{' '}
                      Followers
                    </p>
                    <p>
                      <span class="text-gray-900 font-medium">
                        {pageData.profile()?.data?.profile?.stats.totalFollowing}
                      </span>{' '}
                      Following
                    </p>
                  </div>
                  <p class="mb-4">{pageData.profile()?.data?.profile?.bio}</p>
                  <Show when={!accountData()?.address}>
                    <Button onClick={() => apiDialogConnectWallet()?.open()} scale="xs">
                      Connect your wallet to follow {pageData.profile()?.data?.profile?.name}
                    </Button>
                  </Show>
                  <Show when={accountData()?.address}>
                    <ButtonFollowUser profileToFollow={pageData.profile()?.data?.profile} />
                  </Show>
                </div>
                <Switch fallback={<>Loading publications...</>}>
                  <Match when={pageData.publications()?.error?.message}>
                    <div>{pageData.publications()?.error?.message}</div>
                  </Match>
                  <Match when={pageData.publications()?.data?.publications?.items?.length === 0}>No publications</Match>
                  <Match when={pageData.publications()?.data?.publications?.items?.length > 0}>
                    <section class="border-t-2 border-gray-100 my-8 py-8 flex flex-col space-y-8">
                      <For each={pageData.publications()?.data?.publications?.items}>
                        {(publication) => (
                          <article>
                            <p class="font-bold">{publication.__typename}</p>
                            <p>{publication.metadata.content}</p>
                            <p>{publication.metadata.name}</p>
                          </article>
                        )}
                      </For>
                    </section>
                  </Match>
                </Switch>
              </div>
            </div>
          </Match>
        </Switch>
      </div>
      {apiDialogConnectWallet().isOpen && (
        <Portal>
          <DialogModalConnectWallet api={apiDialogConnectWallet} />
        </Portal>
      )}
    </>
  )
}

export default Page
