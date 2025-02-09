import { useState } from "react"
import InputLabel from "../components/InputLabel"
import { PinataSDK } from "pinata-web3";
import axios from "axios";

interface AddPropertyProps {
    totalSupply: number;
    account: string;
    seller: any;
    lender: any;
    inspector: any;
}

export default function AddProperty({ totalSupply, account, seller, lender, inspector }: AddPropertyProps) {
    const pinata = new PinataSDK({
        pinataJwt: import.meta.env.VITE_JWT,
        pinataGateway: import.meta.env.VITE_pinataGateway,
    });

    const initialState = {
        owner: "",
        name: "",
        address: "",
        description: "",
        image: "",
        price: 0,
        type: "",
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        year: 0,
        north: "",
        south: "",
        east: "",
        west: "",
        location: "",
        facing: ""
    }
    const [homeDetails, setHomeDetails] = useState(initialState)

    const handleSubmit = async () => {
        const metadata = {
            name: homeDetails.name,
            address: homeDetails.address,
            description: homeDetails.description,
            image: homeDetails.image,
            id: totalSupply + 1,
            location: homeDetails.location,
            facing: homeDetails.facing,
            north: homeDetails.north,
            south: homeDetails.south,
            east: homeDetails.east,
            west: homeDetails.west,
            attributes: [
                {
                    trait_type: "Purchase Price",
                    value: homeDetails.price
                },
                {
                    trait_type: "Type of Residence",
                    value: homeDetails.type
                },
                {
                    trait_type: "Bed Rooms",
                    value: homeDetails.bedrooms
                },
                {
                    trait_type: "Bathrooms",
                    value: homeDetails.bathrooms
                },
                {
                    trait_type: "Square Feet",
                    value: homeDetails.sqft
                },
                {
                    trait_type: "Year Built",
                    value: homeDetails.year
                }
            ]
        }

        try {
            const upload = await pinata.upload.json(metadata);
            setHomeDetails(initialState)
            const dbData = {
                IpfsHash: upload.IpfsHash,
                isListed: false
            }
            try {
                await axios.post("http://localhost:3000/data", dbData)
                alert("Success!!")
            } catch (error) {
                console.log("Error in json server");

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center ">
            {account == lender || account == seller || account == inspector ? (
                <div className="m-24 p-4 rounded-2xl shadow-2xl w-[900px]">
                    <div className="flex flex-col">
                        <InputLabel label="Name" placeholder="Enter property name" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="name" />
                        <InputLabel label="Address" placeholder="Enter property address" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="address" />
                        <InputLabel label="Description" placeholder="Enter property description" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="description" />
                        <InputLabel label="Image" placeholder="Add the link to the Image of your property" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="image" />
                        <div className="flex">
                            <div className="mr-4">
                                <InputLabel label="" placeholder="North" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="north" />
                            </div>
                            <div className="mr-4">
                                <InputLabel label="" placeholder="South" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="south" />
                            </div>
                            <div className="mr-4">
                                <InputLabel label="" placeholder="East" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="east" />
                            </div>
                            <InputLabel label="" placeholder="West" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="west" />
                        </div>
                        <div className="flex justify-stretch">
                            <div className="w-[50%] mr-2">
                                <InputLabel label="Purchase Price" placeholder="Enter the purchase price" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="price" />
                                <InputLabel label="Type of Residence" placeholder="Enter the type of residence" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="type" />
                                <InputLabel label="Bed Rooms" placeholder="Enter the number of Bed Rooms" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="bedrooms" />
                                <InputLabel label="Location" placeholder="Add the address link " type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="location" />
                            </div>
                            <div className="w-[50%] ml-2">
                                <InputLabel label="Bathrooms" placeholder="Enter the number of Bathrooms" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="bathrooms" />
                                <InputLabel label="Square Feet" placeholder="Enter the Square Feet" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="sqft" />
                                <InputLabel label="Year Built" placeholder="Enter the Year Built" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="year" />
                                <InputLabel label="Facing" placeholder="Enter the road facing direction" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="facing" />
                            </div>
                        </div>
                    </div>
                    <div className="group flex justify-end">
                        <button className="group-hover:cursor-pointer p-3 bg-accent border rounded-2xl font-bold text-primary w-[25%]" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            ) : (
                <div className=' bg-background text-7xl font-bold'>
                    <div className=' flex items-center justify-center h-screen'>
                        Not Authorized
                    </div>
                </div>
            )}

        </div>
    )
}
