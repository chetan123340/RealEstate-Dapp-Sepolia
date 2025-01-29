import { useState } from "react"
import InputLabel from "../components/InputLabel"
import { PinataSDK } from "pinata-web3";

export default function AddProperty({totalSupply} : {totalSupply: number}) {
    const pinata = new PinataSDK({
        pinataJwt: import.meta.env.JWT,
        pinataGateway: import.meta.env.pinataGateway,
      });

    const initialState = {
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

    const handleSubmit = () => {
        const metadata = {
            name: homeDetails.name,
            address: homeDetails.address,
            description: homeDetails.description,
            image: homeDetails.image,
            id: totalSupply+1,
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
        const metadataJson = JSON.stringify(metadata, null, 2)
        // try {
        //     const file = new File([metadataJson, ""], { type: "text/plain" });
        //     const upload = await pinata.upload.file(file);
        //     console.log(upload);
        //   } catch (error) {
        //     console.log(error);
        //   }
    }

    return (
        <div className="flex justify-center items-center ">
            <div className="m-24 p-4 rounded-2xl shadow-2xl w-[900px]">
                <div className="flex flex-col">
                    <InputLabel label="Name" placeholder="Enter your name" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="name" />
                    <InputLabel label="Address" placeholder="Enter the address" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="address" />
                    <InputLabel label="Description" placeholder="Enter the description" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="description" />
                    {/* <InputLabel label="Image" placeholder="Add the Image of your property" type="file" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="image"/> */}
                    <div className="flex justify-stretch">
                        <div className="w-[50%] m-2">
                            <InputLabel label="Purchase Price" placeholder="Enter the purchase price" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="price" />
                            <InputLabel label="Type of Residence" placeholder="Enter the type of residence" type="text" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="type" />
                            <InputLabel label="Bed Rooms" placeholder="Enter the number of Bed Rooms" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="bedrooms" />
                        </div>
                        <div className="w-[50%] m-2">
                            <InputLabel label="Bathrooms" placeholder="Enter the number of Bathrooms" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="bathrooms" />
                            <InputLabel label="Square Feet" placeholder="Enter the Square Feet" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="sqft" />
                            <InputLabel label="Year Built" placeholder="Enter the Year Built" type="number" homeDetails={homeDetails} setHomeDetails={setHomeDetails} name="year" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="p-3 bg-accent border rounded-2xl font-bold text-primary w-[25%]" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}
