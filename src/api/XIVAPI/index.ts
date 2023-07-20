const PRODUCTION_URL = 'https://xivapi.com'
const ITEM_URL = `${PRODUCTION_URL}/Item/`
const CHAR_URL = `${PRODUCTION_URL}/character`
const PRIVATE_KEY = process.env.NEXT_PUBLIC_API_KEY

type UnlockedClassState = {
  ID: number
  Name: string
}
type ClassJob = {
  ClassID: number
  ExpLevel: number
  ExpLevelMax: number
  ExpLevelTogo: number
  IsSpesialised: boolean
  JobID: number
  Level: number
  Name: string
  UnlockedState: UnlockedClassState
}

type ClassJobsBozjan = {
  Level: number
  Mettle: number
  Name: string
}

type ClassJobsElemental = {
  ExpLevel: number
  ExpLevelMax: number
  ExpLevelTogo: number
  Level: number
  Name: string
}

type SearchCharacter = {
  name: string
  server?: Servers
}

type GetCharacter = {
  loadStoneId: number
}

export type CharacterResult = {
  ActiveClassJob: ClassJob
  Avatar: string
  Bio: string
  ClassJobs: ClassJob[]
  ClassJobsBozjan: ClassJobsBozjan
  ClassJobsElemental: ClassJobsElemental
  DC: string
  FreeCompanyID: string
  FreeCompanyName: string
  GearSet: any
  Gender: number
  GrandCompany: { NameID: number; RankID: number }
  GuardianDeity: number
  ID: number
  Lang: null
  Name: string
  Nameday: string
  ParseDate: number
  Portrait: string
  PvPTeamId: number | null
  Race: number
  Server: Servers
  Title: number
  TitleTop: boolean
  Town: number
  Tribe: number
}

const XIVAPI = {
  server: {
    async get() {
      const res = await fetch(`${PRODUCTION_URL}/servers/dc`)
      const response = await res.json()
      return response
    },
  },
  item: {
    async get(itemId: string | number) {
      const res = await fetch(`${ITEM_URL}${itemId}`)
      const response = await res.json()
      return response
    },
  },
  character: {
    async search({ name, server }: SearchCharacter): Promise<XIVResult.Character[]> {
      const url = `${CHAR_URL}/search?name=${name}${server ? '&server=' + server : ''}`
      const res = await fetch(url)
      const response = await res.json()
      return response.Results
    },
    async get(loadStoneId: number): Promise<CharacterResult> {
      const url = `${CHAR_URL}/${loadStoneId}`
      const res = await fetch(url)
      const response = await res.json()
      return response.Character
    },
  },
}

export default XIVAPI
