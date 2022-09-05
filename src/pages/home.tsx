import { Title } from 'solid-meta'
import { getRecommendedProfiles } from '@api/profiles/get-recommended'
import { createEffect, createResource, createSignal, For, Match, Switch } from 'solid-js'
import { ROUTE_PROFILE } from '@config/routes'
import { Link } from 'solid-app-router'

async function fetchRecommendedProfiles() {
  const result = await getRecommendedProfiles()
  return result
}

export const Home = () => {
  const [marker, setMarker] = createSignal(new Date())
  const [profiles] = createResource(marker, fetchRecommendedProfiles)

  return (
    <>
      <Title>LensBook</Title>
      <div class="pt-12 mx-auto container text-center">
        <h1 class="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
          <span class="block xl:inline">Make friends</span>{' '}
          <span class="block text-emerald-600 xl:inline">on-chain</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Browse, view, and follow recommended Lens profiles to grow your roots in a decentralized social network.
        </p>
        <Switch fallback={<>Loading...</>}>
          <Match when={profiles()?.error?.message}>
            <div>{profiles()?.error?.message}</div>
          </Match>
          <Match when={profiles()?.data?.recommendedProfiles?.length === 0}>No profiles recommended</Match>
          <Match when={profiles()?.data?.recommendedProfiles?.length > 0}>
            <div class="animate-appear my-16 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
              <For each={profiles()?.data?.recommendedProfiles}>
                {(profile) => (
                  <article class="relative flex flex-col items-center">
                    <Switch>
                      <Match when={profile?.picture?.original?.url?.includes('lens.infura-ipfs.io')}>
                        <div class="relative w-60 h-60 bg-emerald-900 rounded">
                          <img src={profile.picture.original.url} alt={profile?.handle} class="rounded" />
                        </div>
                      </Match>
                      <Match when={!profile?.picture?.original?.url?.includes('lens.infura-ipfs.io')}>
                        <div class="bg-emerald-900 w-60 h-60 rounded" />
                      </Match>
                    </Switch>
                    <div class="mt-4 text-lg leading-6 font-medium text-center space-y-1">
                      <h3>{profile.name}</h3>
                      <p class="text-emerald-600">{profile.handle}</p>
                    </div>
                    <div class="text-gray-600 mt-2 grid grid-cols-2 gap-x-2 text-sm sm:text-base text-center">
                      <p>
                        <span class="text-gray-900 font-medium">{profile.stats.totalFollowers}</span> Followers
                      </p>
                      <p>
                        <span class="text-gray-900 font-medium">{profile.stats.totalFollowing}</span> Following
                      </p>
                    </div>

                    <Link
                      class="absolute w-full h-full inset-0 z-10 cursor-pointer opacity-0"
                      href={ROUTE_PROFILE.replace(':idProfile', profile?.id)}
                    >
                      View profile page
                    </Link>
                  </article>
                )}
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </>
  )
}

export default Home
