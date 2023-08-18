import { useEffect, useState } from "react";

function List() {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/people")
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const peopleData = people.map((item) => {
    return (
      <div className="rounded-md px-1 py-2 flex items-center justify-center bg-blue-500">
        <p className="poppins text-md text-gray-50">{item.name}</p>
      </div>
    );
  });
  return (
    <div className="mt-4 border-t-2 py-8 border-teal-950/20 mx-auto w-10/12 gap-8 grid grid-cols-2 md:grid-cols-3 ">
      {peopleData}
    </div>
  );
}

export default List;
