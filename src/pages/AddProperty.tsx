import { useState } from "react"
import InputLabel from "../components/InputLabel"

export default function AddProperty() {
    const [homeDetails, setHomeDetails] = useState({
        name: "",
        address: "",
        decription: "",
        image: "",
        price: 0,
        type: "",
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        year: 0
    })

    return (
        <div className="flex justify-center items-center ">
            <div className="m-24 p-4 rounded-2xl shadow-2xl w-[900px]">
                <div className="flex flex-col">
                    <InputLabel label="Name" placeholder="Enter your name" type="text" />
                    <InputLabel label="Address" placeholder="Enter the address" type="text" />
                    <InputLabel label="Description" placeholder="Enter the description" type="text" />
                    <InputLabel label="Image" placeholder="Add the Image of your property" type="file" />
                    <div className="flex justify-stretch">
                        <div className="w-[50%] m-2">
                            <InputLabel label="Purchase Price" placeholder="Enter the purchase price" type="number" />
                            <InputLabel label="Type of Residence" placeholder="Enter the type of residence" type="text" />
                            <InputLabel label="Bed Rooms" placeholder="Enter the number of Bed Rooms" type="number" />
                        </div>
                        <div className="w-[50%] m-2">
                            <InputLabel label="Bathrooms" placeholder="Enter the number of Bathrooms" type="number" />
                            <InputLabel label="Square Feet" placeholder="Enter the Square Feet" type="number" />
                            <InputLabel label="Year Built" placeholder="Enter the Year Built" type="number" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="p-3 bg-accent border rounded-2xl font-bold text-primary w-[200px]">Submit</button>
                </div>
            </div>
        </div>
    )
}
