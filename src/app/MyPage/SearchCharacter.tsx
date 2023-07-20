'use client'
import DCSelecter from '@/components/Selecter/DC'
import React, { useEffect, useState } from 'react'
import XIVAPI, { CharacterResult } from '@/api/XIVAPI'

type Props = {
  [key in DataCentars]: Servers[]
}

const SearchCharacter = (props: Props) => {
  const [isFocus, setIsFocus] = useState(false)
  const [server, setServer] = useState<Servers>()
  const [character, setCharacter] = useState<string>('')
  const [searchs, setSearchs] = useState<XIVResult.Character[]>([])

  const textChange = (text: string) => setCharacter(text)

  useEffect(() => {
    if (!character) return
    const searchCharacter = async () => {
      const params = { name: character, server: server }
      const res = await XIVAPI.character.search(params)
      console.log(res)
      setSearchs(res)
    }
    searchCharacter()
  }, [character])
  return (
    <div>
      <DCSelecter {...{ dcLists: props, setValues: setServer }} />
      <input
        type='tel'
        className='border rounded hover:border-blue-400 hover:border-3 focus:border-blue-400'
        placeholder='キャラクター名（半角英のみ）'
        onFocus={() => setIsFocus(true)}
        onChange={e => textChange(e.target.value)}
      />
      {isFocus ? (
        <ul>
          {searchs.map(char => (
            <li key={char.ID}>{`${char.Name} [${char.Server}]`}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default SearchCharacter
