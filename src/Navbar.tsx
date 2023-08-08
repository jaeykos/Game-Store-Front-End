import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  return (
    <div className="bg-zinc-800 h-full flex flex-col items-center">
      <nav className=" text-xl flex sm:flex-row  flex-col w-full items-center mb-3 ">
        <div className="ml-5"></div>
        <ul className="flex flex-row  h-20 items-center justify-left ">
          <li className="hover:text-gray-500  text-gray-300 font-thin transition px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-500  text-gray-300 font-thin transition px-4">
            <Link to="/catalog">Browse</Link>
          </li>

          <li className="px-4 pt-1">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="transition hover:fill-gray-500 fill-gray-400 stroke-0 h-6 w-6"
              >
                <path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
              </svg>
            </Link>
          </li>
        </ul>
        <div className="flex flex-row flex-1">
          <input
            type="text"
            id="simple-search"
            className="ml-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search game..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              console.log(searchTerm)
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                navigate("/search/" + searchTerm.split(" ").join("+"))
                navigate(0)
              }
            }}
          ></input>
          <button
            onClick={() => {
              navigate("/search/" + searchTerm.split(" ").join("+"))
              navigate(0)
            }}
            className=" mr-24 p-2.5 ml-2 text-sm font-medium text-white bg-zinc-700 rounded-lg border  hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
