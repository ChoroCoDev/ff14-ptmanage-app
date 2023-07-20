import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import XIVAPI, { CharacterResult } from '@/api/XIVAPI'
import Image from 'next/image'
import DCSelecter from '@/components/Selecter/DC'

type CharacterSearchProps = {
  name: string
  dcname?: string
  server?: Servers
}

const getPosts = async () => {
  const dcLists = await XIVAPI.server.get()
  console.log(dcLists)
  return dcLists
}

export const MyPage = async () => {
  const dcLists = await getPosts()
  // useEffect(() => {
  //   const apitest = async () => {
  //     const search = await XIVAPI.character.search({ name: '' })
  //     const randomLength = Math.floor(Math.random() * search.length)
  //     const id = search[randomLength].ID
  //     const char = await XIVAPI.character.get(id)
  //     console.log(char)
  //   }
  //   apitest()
  // }, [])

  return (
    <section>
      <h1 className='text-xl text-gray-900 font-medium'>キャラクター検索</h1>
      <DCSelecter {...dcLists} />

      {/* {Object.keys(dcLists).map((key, index) => (
        <p key={key + index}>{key}</p>
      ))} */}
      <input
        type='tel'
        className='border rounded hover:border-blue-400 hover:border-3 focus:border-blue-400'
        placeholder='キャラクター名（半角英のみ）'
      />
    </section>
  )
}

export default MyPage
