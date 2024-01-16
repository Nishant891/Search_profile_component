import { useState } from "react";
import { users } from "../lib/data";
import UserComponent from "./components/UserComponent";
import React from "react";
import { User } from "../lib/data";
import UserCard from "./components/UserCard";
import Header from "./components/header";

type Options = boolean | "";

function App() {
  const [toggleOptions, setToggleOptions] = useState<Options>(false);
  const [userInput, setUserInput] = useState("");
  const [pinnedUsers, setPinnedUsers] = useState<User[]>([]);

  const filterArray = (user: User) => {
    const regexPattern = new RegExp(
      userInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );
    return regexPattern.test(user.name);
  };

  const handleSelect = async(id : number) => {
    await delay(60)
    const newPinnedUser = users.filter((user) => {return user.id == id})
    setPinnedUsers((pinnedUsers) => [...pinnedUsers, ...newPinnedUser]);
  }

  const removeSelect = (id : number) => {
    const removedPinnedUser = pinnedUsers.filter((user) => {return user.id !== id});
    setPinnedUsers(removedPinnedUser);
  }

  const delay = (delayInms : number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delayInms)
    })
  }

  const handleBlur = async() => {
    await delay(250)
    setToggleOptions(!toggleOptions);
  };

  const handleFocus = async() => {
    setToggleOptions(!toggleOptions);
  };

  const handleInput = (val: string) => {
    setUserInput(val);
  };

  return (
    <>
    <Header/>
    <div className="w-full h-full sm:w-[42rem] sm:max-h-[20rem] flex flex-wrap justify-start items-center gap-2 p-2 border-b-2 border-black">
      {
        pinnedUsers.map((user, index) =>
            (
              <React.Fragment key={index}>
                <UserCard id={user.id} name={user.name} avatar={user.avatar} removeSelect={removeSelect}/>
              </React.Fragment>
            )
        )
      }
      <div className="relative">
        <input
          type="text"
          className="pl-1 outline-none bg-[#f9f8f8] rounded-sm"
          placeholder=" Enter a name.."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
        />
        <div
          className={`w-[24rem] max-h-[12rem] absolute top-8 z-10 bg-[#f9f8f8] rounded-md custom-shadow overflow-scroll ${
            toggleOptions == false ? "hidden" : null
          }`}
        >
            {users.map((user, index) => {
              if (filterArray(user) && !pinnedUsers.includes(user)) {
                return (
                  <React.Fragment key={index}>
                    <UserComponent id={user.id} name={user.name} avatar={user.avatar} email={user.email} handleSelect={handleSelect}/>
                  </React.Fragment>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
