import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import XIVAPI, { CharacterResult } from '@/api/XIVAPI'
import Image from 'next/image'
import DCSelecter from '@/components/Selecter/DC'
import SearchCharacter from '@/app/MyPage/SearchCharacter'
import { getAllDCs, getRegions } from '@/api'

type CharacterSearchProps = {
  name: string
  dcname?: string
  server?: Servers
}

const getPosts = async () => {
  return await XIVAPI.server.get()
}

export const MyPage = async () => {
  const regions = await getRegions()
  const dcLists = await getAllDCs()
  console.log(regions)

  return (
    <section>
      <h1 className='text-xl text-gray-900 font-medium'>キャラクター検索</h1>
      <SearchCharacter {...dcLists} />
    </section>
  )
}

export default MyPage
