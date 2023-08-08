import { useState, useEffect } from "react"
import { Game } from "./game"
import "./Item.css"
import NavBar from "./Navbar"
import { useParams } from "react-router-dom"

const Item = () => {
  const { itemId } = useParams()
  const APIKey = "d84c61f2745c4a1a985547bc97b1926d"

  const urlId = `https://api.rawg.io/api/games/${itemId}?key=${APIKey}`

  const [selectedGame, setSelectedGame] = useState(new Game())
  const [cartGames, setCartGames] = useState(
    JSON.parse(localStorage.getItem("cartGames")!)
  )

  if (localStorage.getItem("cartGames") === null) {
    localStorage.setItem("cartGames", JSON.stringify([]))
  }

  useEffect(() => {
    localStorage.setItem("cartGames", JSON.stringify(cartGames))
  }, [cartGames])

  useEffect(() => {
    console.log(itemId)
    console.log(urlId)
    fetch(urlId)
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)

        const tempGame = new Game()
        tempGame.id = data.id
        tempGame.rating = data.rating
        tempGame.releaseDate = data.released
        tempGame.updateDate = data.updated.slice(0, 10)
        tempGame.imgUrl = data.background_image
        tempGame.name = data.name
        tempGame.esrb_rating = data.esrb_rating ? data.esrb_rating.name : "NA"

        console.log("this is data")
        console.log(data)
        console.log("this is tempgames")
        console.log(tempGame)
        setSelectedGame(tempGame)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <NavBar />
      <div className="flex flex-col lg:flex-row text-zinc-400 mx-auto  mb-5 p-5">
        <img
          src={selectedGame.imgUrl}
          className="itemImg catalogItemImg game rounded object-contain"
        ></img>
        <div className="ml-3">
          <div className="font-semibold text-2xl mb-2  ">
            {selectedGame.name}
          </div>
          <div className=" font-semibold text-xl mb-2 ">
            Score: {selectedGame.rating} / 5
          </div>
          <div className="  font-semibold text-lg mb-2">
            Age: {selectedGame.esrb_rating}
          </div>
          <div className="  text-md ">Release: {selectedGame.releaseDate}</div>
          <div className=" text-md mb-20">
            Update: {selectedGame.updateDate}
          </div>

          <div className="text-3xl">$ XX.XX</div>

          {cartGames.some((game: Game) => game.id == selectedGame.id) ? (
            <button className="text-gray-500 cursor-default  font-thin transition py-1 px-2.5 mt-3 text-sm    border-zinc-500 rounded-lg border  bg-zinc-800">
              Added to Cart
            </button>
          ) : (
            <button
              onClick={() => {
                setCartGames([...cartGames, selectedGame])
              }}
              className="hover:text-gray-500  text-gray-300 font-thin transition py-1 px-2.5 mt-3 text-sm  bg-zinc-700 border-zinc-300 hover:border-zinc-500 rounded-lg border  hover:bg-zinc-800"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  )
}
export default Item
