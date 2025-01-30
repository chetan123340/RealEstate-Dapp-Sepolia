
interface CardProps {
  home: any;
  clickHandler: any;
}

export default function Card({ home, clickHandler }: CardProps) {
  return (
    <div className="group">
      <div className='group-hover:cursor-pointer bg-accent text-primary p-3 w-[300px] rounded-md hover:bg-primary hover:text-background m-4' onClick={() => clickHandler(home)}>
        <div className='  flex flex-col items-center'>
          <p className=' font-extrabold text-xl pb-3'>{home.name}</p>
          <img src={home.image} alt="home image" className='h-[250px] w-[250px] rounded-md' />
          <p className=' font-semibold text-lg text-center pt-2'>{home.address}</p>
          <p className='font-semibold text-lg text-center pt-2'>{home.attributes[2].value}BHK {home.attributes[4].value} Sq.Ft.</p>
          <p className='font-bold text-xl bg-secondary w-full text-background rounded-md text-center'>{home.attributes[0].value} ETH</p>
        </div>
      </div>
    </div>
  )
}
