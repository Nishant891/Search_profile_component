interface UserCardProps {
    id : number; 
    name : string;
    avatar : string;
    removeSelect : Function;
}

const UserCard = ({id, name, avatar, removeSelect} : UserCardProps) => {
  return (
    <div onClick={() => {
      removeSelect(id)
    }} className="flex justify-between gap-x-4 items-center p-2 rounded-full custom-shadow ">
      <div className="flex justify-center items-center space-1 gap-1">
        <img src={avatar} alt="Profile Picture" className='rounded-full w-9 h-9 object-cover'/>
        <p className="font-medium">{name}</p>
      </div>
      <button className="text-white w-6 h-6 rounded-full bg-red-600 p-1 font-bold flex justify-center items-center">
        X
      </button>
    </div>
  )
}

export default UserCard
