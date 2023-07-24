const PRODUCTION_URL = 'https://xivapi.com'

export const getRegions = async () => {
  const res = await fetch('http://localhost:3001/regions')

  if (!res.ok) throw new Error('regions を fetch 出来なかった')

  return await res.json()
}

export const getAllDCs = async () => {
  const res = await fetch(`${PRODUCTION_URL}/servers/dc`, { cache: 'force-cache' })

  if (!res.ok) throw new Error('Failed to fetch dc')

  return await res.json()
}
