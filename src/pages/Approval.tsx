import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SellerCard from '../components/SellerCard'

export default function Approval({ account }: { account: string }) {
  if (account === "0xEe9a477BDb9791FFd0D135d3e6E31d968f90dC4F") {

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:3000/data")
          setData(res.data)
        } catch (error) {
          console.log("Error in fetching data");
        }
      }

      fetchData()
    }, [])

    return (
      <div className='p-24 bg-background'>
        <div className='flex flex-col-reverse'>

        {data.map((d, index) => (
          <div key={index}>
            <SellerCard IpfsHash={d.IpfsHash} owner={d.owner} isListed={d.isListed} />
          </div>
        ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className=' bg-background text-7xl font-bold'>
        <div className=' flex items-center justify-center h-screen'>
        Not Authorized
        </div>
      </div>
    )
  }
}
