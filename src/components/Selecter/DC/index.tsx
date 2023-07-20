'use client'
import { getKeys } from '@/methods'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type Props = {
  [key in DataCentars]: Servers[]
}

const DCSelecter = (props: Props) => {
  const dataCentars = useMemo((): DataCentars[] => getKeys(props), [])
  const [dataCentar, setDataCentar] = useState<DataCentars>()
  const [server, setServer] = useState<Servers>()

  const changeDC = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setDataCentar(e.target.value as DataCentars)
  }, [])

  const changeServer = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setServer(e.target.value as Servers)
    console.log(e.target.value)
  }, [])

  return (
    <div className='container flex flex-row items-center my-4'>
      <select className='border rounded w-36 mr-2' name='dc' id='select-dc' onChange={changeDC}>
        <option value=''>-----</option>
        {dataCentars.map((dc, index) => (
          <option key={'dc-' + index} value={dc}>
            {dc}
          </option>
        ))}
      </select>
      {dataCentar ? (
        <select
          className='border rounded w-48 focus-within:border-blue-400 focus:border-blue-500'
          name='server'
          id='select-server'
          onChange={changeServer}>
          <option value=''>-----</option>
          {props[dataCentar].map((server, index) => (
            <option key={'server-' + index} value={server}>
              {server}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  )
}

export default DCSelecter
