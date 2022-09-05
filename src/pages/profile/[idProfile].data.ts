import { createResource } from 'solid-js'
import { useParams } from 'solid-app-router'
import getProfile from '@api/profiles/get-profile'
import getPublicationsByProfile from '@api/publications/get-publications-by-profile-id'

async function fetchProfile({ idProfile }) {
  const profile = await getProfile({ id: `${idProfile}` })
  return profile
}

async function fetchProfilePublications({ idProfile }) {
  const publications = await getPublicationsByProfile({ id: `${idProfile}` })
  return publications
}

export function ProfileData() {
  const params = useParams()
  const [profile] = createResource(
    () => ({
      idProfile: params.idProfile,
    }),
    fetchProfile,
  )

  const [publications] = createResource(
    () => ({
      idProfile: params.idProfile,
    }),
    fetchProfilePublications,
  )

  return {
    profile,
    publications,
  }
}

export default ProfileData
