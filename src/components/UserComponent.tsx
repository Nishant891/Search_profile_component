interface UserComponentProps {
  id: number;
  name: string;
  email: string;
  avatar: string;
  handleSelect: Function;
}

const UserComponent = ({id, name, email, avatar, handleSelect} : UserComponentProps) => {
  return (
      <li onClick={() => {handleSelect(id)}} key={id} className='flex cursor-pointer justify-between items-center text-sm py-2 px-2 hover:bg-[#f0ecec]'>
        <div className='w-1/2 flex justify-start items-center gap-x-2'>
            <img src={avatar} alt="Profile Picture" className='rounded-full w-9 h-9 object-cover'/>
            <p className="font-semibold">{name}</p>
        </div>
        <div className="w-1/2 flex justify-start">
            <p className="text-center">{email}</p>
        </div>
    </li>
  )
}

export default UserComponent
