import { useState } from 'react'
import Card from '../components/Card'
import PopupCard from '../components/PopupCard'

// 
interface ListingProps{
    homes: any;
    account: any;
    provider: any;
    escrow: any;
}
export default function Listing({homes, account, provider, escrow }: ListingProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [toggleData, setToggleData] = useState<any>(null)

    const clickHandler = (home: any) => {
        setToggleData(home)
        setIsOpen(true)
    }

    return (
        <section id='listing'>

            <div className='p-4'>
                <h1 className='text-center text-[50px] font-semibold text-primary mb-3'>Properties</h1>
                <div className="grid grid-cols-3 gap-4">
                    {homes.map((home: any, index: number) => (
                    <div key={index} className='flex justify-center'>
                    <Card home={home} clickHandler={clickHandler} />
                    </div>
                    ))}

                </div>
            </div>
            {isOpen && <PopupCard account={account} provider={provider} escrow={escrow} toggleHome={toggleData} setIsOpen={setIsOpen}/>}
        </section>
    )
}
