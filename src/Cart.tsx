import { Link } from "react-router-dom"
import NavBar from "./Navbar"
import { Game } from "./game"
import { useState, useEffect } from "react"

const Cart = () => {
  const [cartGames, setCartGames] = useState(
    JSON.parse(localStorage.getItem("cartGames")!)
  )
  useEffect(() => {
    try {
      localStorage.setItem("cartGames", JSON.stringify(cartGames))
    } catch {
      alert("something went wrong")
    }
  }, [cartGames])

  return (
    <>
      <NavBar />
      <div className="mx-8 mt-8">
        {cartGames.map((game: Game) => (
          <div className="pb-2 mb-8 items-center border-b-2 border-zinc-400">
            <div className="text-zinc-50 h-fit flex flex-row items-center ">
              <Link to={"/item/" + game.id}>
                <img
                  src={game.imgUrl}
                  className="ml-3 h-24 hidden sm:block"
                ></img>
              </Link>

              <div className="ml-3">{game.name}</div>
              <div className="ml-auto pl-3 mr-8">$XX.XX</div>
            </div>

            <div className="w-full  flex flex-row justify-end">
              <button
                onClick={() => {
                  setCartGames(
                    cartGames.filter((item: Game) => item.id !== game.id)
                  )
                }}
                className=" mr-4 w-20 hover:text-gray-500  text-gray-400 font-thin transition  px-2.5  text-sm  bg-zinc-700 border-zinc-400 hover:border-zinc-500 rounded-lg border  hover:bg-zinc-800"
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartGames.length == 0 ? (
        <p className="text-zinc-100 mx-auto w-fit text-3xl">Cart is empty</p>
      ) : (
        <div className="flex flex-row w-full">
          <button className="  ml-auto mr-5 w-fit hover:text-gray-500  text-gray-400 font-thin transition  px-2.5 py-2 text-sm  bg-zinc-700 border-zinc-400 hover:border-zinc-500 rounded-lg border  hover:bg-zinc-800">
            Check Out
          </button>
        </div>
      )}
    </>
  )
}

export default Cart
