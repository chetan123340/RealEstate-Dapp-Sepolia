import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface SellerCardProps {
    IpfsHash: string;
    isListed: boolean;
    owner: string;
}

interface Attribute {
    trait_type: string;
    value: string | number;
}

interface Property {
    name: string;
    address: string;
    description: string;
    image: string;
    id: string;
    attributes: Attribute[];
}

export default function SellerCard({ IpfsHash, isListed, owner }: SellerCardProps) {
    const [details, setDetails] = useState<Property | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const d = await axios.get("https://red-official-urial-988.mypinata.cloud/ipfs/" + IpfsHash)
                setDetails(d.data)
            } catch (error) {
                console.log("Error in fetching metadata");
            }
        }

        fetchData()
    }, [])

    return (
        <div className='shadow border rounded-2xl m-3 p-4 text-primary bg-white'>
            {details && (
                <div className="flex justify-between m-3">
                    <div className='flex flex-col text-xl'>
                        <p className=' font-bold text-3xl pb-3'>{details.name}</p>
                        <p className=' font-semibold'>{details.address}</p>
                        <p>{details.attributes[1].trait_type} : {details.attributes[1].value}</p>
                        <p>{details.attributes[2].trait_type} : {details.attributes[2].value}</p>
                        <p>{details.attributes[3].trait_type} : {details.attributes[3].value}</p>
                        <p>{details.attributes[4].trait_type} : {details.attributes[4].value}</p>
                        <p>{details.attributes[5].trait_type} : {details.attributes[5].value}</p>
                        <p className=' text-2xl font-semibold'>{details.attributes[0].value} ETH</p>
                        <p className=' text-2xl'>Owner: {owner}</p>
                    </div>
                    <div>
                        <img src={details.image} alt="Home image" className='h-[250px] w-[250px] rounded-md' />
                    </div>
                </div>
            )}
            <div className=' text-2xl border p-2 rounded-full text-center font-bold'>Approve and list</div>
        </div>
    )
}
