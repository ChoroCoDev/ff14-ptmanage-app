'use client'
import { getKeys } from '@/methods'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type Props = {
  dcLists: {
    [key in DataCentars]: Servers[]
  }
  setValues?: Function
}

export const RegionSelecter = () => {
  const regions = ['Japan', 'NorthAmerica', 'Europe', 'Oseania', 'China']
  return (
    <select className='border rounded w-36 mr-2' name='dc' id='select-dc'>
      <option value=''>-----</option>
      {regions.map((region, index) => (
        <option key={'region-' + index} value={region}>
          {region}
        </option>
      ))}
    </select>
  )
}

export const DCSelecter = ({ dcLists, setValues }: Props) => {
  const dataCentars = useMemo((): DataCentars[] => getKeys(dcLists), [])
  const regions = ['Japan', 'NorthAmerica', 'Europe', 'Oseania', 'China']
  const [region, setRegion] = useState<DataCentars>()
  const [dataCentar, setDataCentar] = useState<DataCentars>()
  const [server, setServer] = useState<Servers>()

  const changeRegion = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setRegion(e.target.value as DataCentars)
  }, [])

  const changeDC = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setDataCentar(e.target.value as DataCentars)
  }, [])

  const changeServer = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setServer(e.target.value as Servers)
    console.log(e.target.value)
  }, [])

  useEffect(() => {
    if (!server) return
    if (!setValues) return
    setValues(server)
  })

  return (
    <div className='container flex flex-row items-center my-4'>
      <select className='border rounded w-36 mr-2' name='dc' id='select-dc' onChange={changeDC}>
        {regions.map((region, index) => (
          <option key={'region-' + index} value={region}>
            {region}
          </option>
        ))}
      </select>
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
          {dcLists[dataCentar].map((server, index) => (
            <option key={'server-' + index} value={server}>
              {server}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  )
}

export const ServerSelecter = () => {}

export default DCSelecter
