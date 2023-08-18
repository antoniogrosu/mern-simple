import { useState } from "react";
import List from "./components/List";

function App() {
  const [addPersonMenu, setAddPersonMenu] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const submitForm = (event) => {
    const newPerson = { name: currentName };
    fetch("https://mern-simple-backend.vercel.app/api/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Person added:", data);
        // Reset the input field after successful POST
        setName("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };
  return (
    <div className="bg-teal-100 py-16 h-screen">
      <div className="w-10/12 mx-auto flex items-center justify-between">
        <h1 className=" text-center poppins font-semibold text-4xl text-teal-950">
          People List
        </h1>
        <button
          className="bg-blue-200 poppins px-3 py-1 rounded-sm"
          onClick={() => {
            setAddPersonMenu(!addPersonMenu);
          }}
        >
          New person
        </button>
      </div>

      {addPersonMenu && (
        <div className="z-10 bg-gray-50 w-1/2 absolute top-1/4 left-1/4 p-4 rounded-md">
          <form onSubmit={submitForm}>
            <div className="flex items-center justify-end w-full">
              <div
                onClick={() => {
                  setAddPersonMenu(!addPersonMenu);
                }}
                className=" w-auto px-3 cursor-pointer rounded-sm py-1 poppins bg-red-200 inline-block"
              >
                x
              </div>
            </div>
            <label className="poppins text-sm block">Person name</label>
            <input
              value={currentName}
              onChange={() => {
                setCurrentName(event.target.value);
              }}
              placeholder="Eg. Antonio"
              type="text"
              className="py-2 px-4 poppins focus:outline-1 focus:outline-teal-500 text-gray-950 block w-full my-3 rounded-xl bg-teal-50 border-2 border-teal-200"
            ></input>
            <button className="poppins bg-green-300 px-4 py-2 rounded-md">
              + Add to database
            </button>
          </form>
        </div>
      )}
      <List />
    </div>
  );
}

export default App;
