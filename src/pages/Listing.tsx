import React, { useState } from 'react'
import Card from '../components/Card'
import test from '../metadata/1.json'

export default function Listing({ }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [toggleData, setToggleData] = useState<any>(null)

    const clickHandler = (home) => {
        setToggleData(home)
        setIsOpen(true)
    }

    return (
        <div>

            <div className='p-4'>
                <h1 className='text-center text-[50px] font-semibold text-primary mb-3'>Properties</h1>
                <div className="grid grid-cols-3 gap-4">
                    {/* {homes.map((home, index: number) => (
                    <div key={index} className='flex justify-center'>
                    <Card home={home} />
                    </div>
                    ))} */}

                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex justify-center">

                            <Card home={test} clickHandler={clickHandler}/>
                        </div>
                    ))}

                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] h-[600px]">
                    <div className='flex justify-end m-[-15px] text-xl cursor-pointer' onClick={() => setIsOpen(false)}>X</div>
                        <h2 className="text-lg font-bold mb-4">{toggleData.name}</h2>
                        <img src={toggleData.image} alt="house image" />
                        <p>{toggleData.address}</p>
                        <p>{toggleData.description}</p>
                        <p>{toggleData.attributes[0].trait_type}</p>   <p>{toggleData.attributes[0].value}</p>
                        <p>{toggleData.attributes[1].trait_type}</p>   <p>{toggleData.attributes[1].value}</p>
                        <p>{toggleData.attributes[2].trait_type}</p>   <p>{toggleData.attributes[2].value}</p>
                        <p>{toggleData.attributes[3].trait_type}</p>   <p>{toggleData.attributes[3].value}</p>
                        <p>{toggleData.attributes[4].trait_type}</p>   <p>{toggleData.attributes[4].value}</p>
                        <p>{toggleData.attributes[5].trait_type}</p>   <p>{toggleData.attributes[5].value}</p>
                        
                        <div className="flex justify-end gap-2">
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
