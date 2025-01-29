import { useEffect, useState } from "react";

interface PopupCardProps {
    toggleHome: any;
    setIsOpen: any;
    account: any;
    provider: any;
    escrow: any;
}
export default function PopupCard({ account, provider, escrow, toggleHome, setIsOpen }: PopupCardProps) {
    const [details, setDetails] = useState({
        buyer: "",
        lender: "",
        inspector: "",
        seller: "",
        hasBought: false,
        hasLended: false,
        hasInspected: false,
        hasSold: false,
    })

    const [owner, setOwner] = useState<string>("");

    const fetchDetails = async () => {
        const buyer = await escrow.buyer(toggleHome.id);
        const hasBought = await escrow.approval(toggleHome.id, buyer);

        const seller = await escrow.seller();
        const hasSold = await escrow.approval(toggleHome.id, seller);

        const lender = await escrow.lender();
        const hasLended = await escrow.approval(toggleHome.id, lender);

        const inspector = await escrow.inspector();
        const hasInspected = await escrow.inspectionPassed(toggleHome.id);

        setDetails({ buyer, seller, lender, inspector, hasBought, hasSold, hasLended, hasInspected });
    };

    const fetchOwner = async () => {
        if (await escrow.isListed(toggleHome.id)) return;

        const owner = await escrow.buyer(toggleHome.id);
        setOwner(owner);
    };

    useEffect(() => {
        fetchDetails();
        fetchOwner();

    }, []);

    const { inspector, lender, buyer, seller, hasBought, hasInspected, hasLended, hasSold } = details

    const buyHandler = () => (null)
    const sellHandler = () => (null)
    const inspectHandler = () => (null)
    const lendHandler = () => (null)


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 text-primary">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[900px] h-[600px]">
                <div className='flex justify-end m-[-15px] text-xl cursor-pointer' onClick={() => setIsOpen(false)}>X</div>
                <h2 className="text-5xl font-bold mb-4">{toggleHome.name}</h2>
                <p className='text-3xl'>{toggleHome.description}</p>
                <p className='text-3xl mb-3'> At: {toggleHome.address}</p>
                <div className="flex justify-stretch">

                    <img src={toggleHome.image} alt="house image" className=' rounded-2xl w-[415px] h-[315px]' />
                    <div className=' text-3xl bg-background shadow ml-16 p-3 rounded-2xl'>
                        <p>{toggleHome.attributes[1].trait_type} : {toggleHome.attributes[1].value}</p>
                        <p>{toggleHome.attributes[2].trait_type} : {toggleHome.attributes[2].value}</p>
                        <p>{toggleHome.attributes[3].trait_type} : {toggleHome.attributes[3].value}</p>
                        <p>{toggleHome.attributes[4].trait_type} : {toggleHome.attributes[4].value}</p>
                        <p>{toggleHome.attributes[5].trait_type} : {toggleHome.attributes[5].value}</p>
                    </div>
                </div>
                {owner ? (
                    <div className="text-lg text-gray-700 mt-4 text-center font-bold bg-green-400 rounded-md p-2">
                        Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                    </div>
                ) : (
                    <div className="space-y-4 mt-4">
                        {account === inspector ? (
                            <div className='mt-4 text-background text-3xl'>
                                <button className='bg-green-500 w-full rounded-2xl p-2 font-bold' onClick={sellHandler}
                                    disabled={hasSold}>Approve Inspection</button>
                            </div>
                        ) : account === lender ? (
                            <div className='mt-4 text-background text-3xl'>
                                <button className='bg-blue-500 w-full rounded-2xl p-2 font-bold' onClick={sellHandler}
                                    disabled={hasSold}>Approve & Lend</button>
                            </div>
                        ) : account === seller ? (
                            <div className='mt-4 text-background text-3xl'>
                                <button className='bg-red-500 w-full rounded-2xl p-2 font-bold' onClick={sellHandler}
                                    disabled={hasSold}>Approve & Sell</button>
                            </div>
                        ) : (

                            <div className='mt-4 text-background text-3xl'>
                                <button className='bg-secondary w-full rounded-2xl p-2 font-bold' onClick={buyHandler}
                                    disabled={hasBought}>Buy @ {toggleHome.attributes[0].value} ETH</button>
                            </div>
                        )}

                    </div>
                )}


            </div>
        </div>
    )
}
