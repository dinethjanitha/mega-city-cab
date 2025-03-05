import StartJourney from './StartJourney';

interface Props{
    params : Promise<{ id : string}>
}

const page = async ({ params }:Props) => {

    const id = (await params).id;




  return (
    <div>
        <StartJourney id={id}/>
    </div>
  )
}

export default page