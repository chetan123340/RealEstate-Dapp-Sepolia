import { useState } from "react"
import InputLabel from "../components/InputLabel"
import { PinataSDK } from "pinata-web3";
import axios from "axios";

const SELLER_ADDRESS = "0xEe9a477BDb9791FFd0D135d3e6E31d968f90dC4F"
const INSPECTOR_ADDRESS = "0x5cAa009dDb1f1ad8200C1E18F609b142f46a7Dd7"
const LENDER_ADDRESS = "0x43CAdE407dAa07F1b7eb388C7DD613f3C52E7Cee"

interface AddPropertyProps {
    totalSupply: number;
    account: string;
}

export default function AddProperty({ totalSupply, account }: AddPropertyProps) {
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
        year: 0
    }
    const [homeDetails, setHomeDetails] = useState(initialState)

    const handleSubmit = async () => {
        const metadata = {
            name: homeDetails.name,
            address: homeDetails.address,
            description: homeDetails.description,
            image: homeDetails.image,
            id: totalSupply + 1,
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
            {account == LENDER_ADDRESS || account == SELLER_ADDRESS || account == INSPECTOR_ADDRESS ? (
                <div className="m-24 p-4 rounded-2xl shadow-2xl w-[900px]">
                    <div className="flex flex-col">
                        <InputLabel label="Name" placeholder="Enter property name" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="name" />
                        <InputLabel label="Address" placeholder="Enter property address" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="address" />
                        <InputLabel label="Description" placeholder="Enter property description" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="description" />
                        <InputLabel label="Image" placeholder="Add the link to the Image of your property" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="image" />
                        <div className="flex justify-stretch">
                            <div className="w-[50%] mr-2">
                                <InputLabel label="Purchase Price" placeholder="Enter the purchase price" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="price" />
                                <InputLabel label="Type of Residence" placeholder="Enter the type of residence" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="type" />
                                <InputLabel label="Bed Rooms" placeholder="Enter the number of Bed Rooms" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="bedrooms" />
                            </div>
                            <div className="w-[50%] ml-2">
                                <InputLabel label="Bathrooms" placeholder="Enter the number of Bathrooms" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="bathrooms" />
                                <InputLabel label="Square Feet" placeholder="Enter the Square Feet" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="sqft" />
                                <InputLabel label="Year Built" placeholder="Enter the Year Built" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="year" />
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
