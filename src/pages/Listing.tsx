import { useEffect, useState } from 'react'
import Card from '../components/Card'
import PopupCard from '../components/PopupCard'

// 
interface ListingProps {
    homes: any;
    account: any;
    provider: any;
    escrow: any;
}
export default function Listing({ homes, account, provider, escrow }: ListingProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [toggleData, setToggleData] = useState<any>(null)
    const [showSold, setShowSold] = useState<boolean>(false);
    const [soldProperties, setSoldProperties] = useState<any[]>([])
    const [unsoldProperties, setUnsoldProperties] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

    useEffect(() => {
        const setPropertyData = async () => {
            const soldProperties: any[] = []
            const unsoldProperties: any[] = []
            for (const home of homes) {
                if (await escrow.isListed(home.id)) {
                    unsoldProperties.push(home)
                } else {
                    soldProperties.push(home)
                }
            }
            const updatedSoldProperties = soldProperties.filter(property => !property.name.startsWith("Cozy"));
            setSoldProperties(updatedSoldProperties)
            setUnsoldProperties(unsoldProperties)
        }
        setPropertyData()
    }, [])

    const filteredProperties = (properties: any[]) => {
        return properties.filter((home) =>
            home.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const clickHandler = (home: any) => {
        setToggleData(home)
        setIsOpen(true)
    }

    const soldHandler = () => {
        setShowSold(prev => !prev)
    }
    return (
        <section id='listing'>

            <div className='p-4'>
                <h1 className='text-center text-[50px] font-semibold text-primary mb-3'>Properties</h1>
                <div className='group flex justify-evenly my-3'>
                    <input type="text"
                        placeholder='Search Properties..'
                        className='border w-[1050px] p-2 rounded-2xl'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className={` bg-accent border rounded-2xl ml-2 p-3 w-[300px] group-hover:cursor-pointer ${showSold ? "bg-green-400" : "bg-red-400"}`}
                        onClick={soldHandler}
                    >
                        {showSold ? "Show Unsold Properties" : "Show Sold Properties"}
                    </button>

                </div>
                {showSold ? (
                    <div className="grid grid-cols-4 gap-2">
                        {filteredProperties(soldProperties).map((home: any, index: number) => (
                            <div key={index} className='flex justify-center'>
                                <Card home={home} clickHandler={clickHandler} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2">
                        {filteredProperties(unsoldProperties).map((home: any, index: number) => (
                            <div key={index} className='flex justify-center'>
                                <Card home={home} clickHandler={clickHandler} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isOpen && <PopupCard account={account} provider={provider} escrow={escrow} toggleHome={toggleData} setIsOpen={setIsOpen} />}
        </section>
    )
}
