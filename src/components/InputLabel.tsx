interface InputLabelProps {
    label: string;
    placeholder: string;
    type: string;
    homeDetails: any;
    setHomeDetails: any;
    name: string;
}
export default function InputLabel({ label, placeholder, type, homeDetails, setHomeDetails, name }: InputLabelProps) {
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setHomeDetails({...homeDetails, [e.target.name]:e.target.value})
    }

    return (
        <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-xl font-medium text-primary">{label}</label>
            <input type={type} placeholder={placeholder} id="default-input" required className="bg-gray-50 border border-gray-300 text-lg rounded-lg block w-full p-2.5 " name={name} value={homeDetails[name]} onChange={handleChange} />
        </div>
    )
}
