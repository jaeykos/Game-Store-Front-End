import { useState, useEffect } from "react"
import { Game } from "./game"
import Masonry from "react-masonry-css"
import { Link } from "react-router-dom"
import "./Catalog.css"
import NavBar from "./Navbar"

const Catalog = () => {
  const [games, setGames] = useState<Game[]>([])

  const [selectedCategory, setSelectedCategory] = useState("rating")

  const [url40byReleaseDate] = useState(
    `https://api.rawg.io/api/games?key=d84c61f2745c4a1a985547bc97b1926d&plateforms=4&dates=1980-01-01.2023-08-05&metacritic=80,100&ordering=-released`
  )
  const [url40byRating] = useState(
    `https://api.rawg.io/api/games?key=d84c61f2745c4a1a985547bc97b1926d&plateforms=4&dates=1980-01-01.2023-08-05&metacritic=80,100&ordering=-rating`
  )

  function fetchByReleaseDate() {
    console.log(url40byReleaseDate)
    fetch(url40byReleaseDate, { mode: "cors" })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)

        const tempGames: Game[] = []
        for (const result of data.results) {
          const tempGame = new Game()
          tempGame.id = result.id
          tempGame.rating = result.rating
          tempGame.releaseDate = result.released
          tempGame.updateDate = result.updated.slice(0, 10)
          tempGame.imgUrl = result.background_image
          tempGame.name = result.name
          tempGame.esrb_rating = result.esrb_rating
            ? result.esrb_rating.name
            : "NA"
          tempGames.push(tempGame)
        }
        console.log("this is data")
        console.log(data)
        console.log("this is tempgames")
        console.log(tempGames)
        setGames(tempGames)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function fetchByRating() {
    console.log(url40byRating)
    fetch(url40byRating, { mode: "cors" })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)

        const tempGames: Game[] = []
        for (const result of data.results) {
          const tempGame = new Game()
          tempGame.id = result.id
          tempGame.rating = result.rating
          tempGame.releaseDate = result.released
          tempGame.updateDate = result.updated.slice(0, 10)
          tempGame.imgUrl = result.background_image
          tempGame.name = result.name
          tempGame.esrb_rating = result.esrb_rating
            ? result.esrb_rating.name
            : "NA"
          tempGames.push(tempGame)
        }
        console.log("this is data")
        console.log(data)
        console.log("this is tempgames")
        console.log(tempGames)
        setGames(tempGames)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetch(url40byRating)
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)

        const tempGames: Game[] = []

        for (const result of data.results) {
          const tempGame = new Game()
          tempGame.id = result.id
          tempGame.rating = result.rating
          tempGame.releaseDate = result.released
          tempGame.updateDate = result.updated.slice(0, 10)
          tempGame.imgUrl = result.background_image
          tempGame.name = result.name
          tempGame.esrb_rating = result.esrb_rating
            ? result.esrb_rating.name
            : "NA"
          tempGames.push(tempGame)
        }

        console.log("this is data")
        console.log(data)
        console.log("this is tempgames")
        console.log(tempGames)
        setGames(tempGames)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 2,
    700: 1,
  }

  function switchButtonColor(category: string) {
    setSelectedCategory(category)
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-row justify-start w-full mb-3 pl-3">
        <div className="text-gray-300 pl-4">sort by: </div>
        <button
          onClick={() => {
            console.log("release button clicked")
            switchButtonColor("released")
            fetchByReleaseDate()
          }}
          className={
            selectedCategory == "released"
              ? "text-gray-500 font-thin transition py-1 px-2.5 ml-2 text-sm  bg-zinc-300 border-zinc-300  rounded-lg border"
              : "hover:text-gray-500  text-gray-300 font-thin transition py-1 px-2.5 ml-2 text-sm  bg-zinc-700 border-zinc-300 hover:border-zinc-500 rounded-lg border  hover:bg-zinc-800"
          }
        >
          released
        </button>
        <button
          onClick={() => {
            switchButtonColor("rating")
            fetchByRating()
          }}
          className={
            selectedCategory == "rating"
              ? "text-gray-500 font-thin transition py-1 px-2.5 ml-2 text-sm  bg-zinc-300 border-zinc-300  rounded-lg border"
              : "hover:text-gray-500  text-gray-300 font-thin transition py-1 px-2.5 ml-2 text-sm  bg-zinc-700 border-zinc-300 hover:border-zinc-500 rounded-lg border  hover:bg-zinc-800"
          }
        >
          rating
        </button>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {games.map((game: Game) => (
          <div className="group rounded flex flex-col bg-zinc-700">
            <Link to={"/item/" + game.id}>
              <img
                src={game.imgUrl}
                className=" catalogItemImg game rounded"
              ></img>
            </Link>

            <div className="catalogItemDescription group-hover:transition-all max-h-28  group-hover:max-h-56 text-zinc-300  p-2  rounded">
              <div className="font-semibold text-2xl mb-2  ">{game.name}</div>
              <div className="group-hover:block hidden font-semibold text-xl mb-2 ">
                Score: {game.rating} / 5
              </div>
              <div className="group-hover:block hidden font-semibold text-lg mb-2">
                Age: {game.esrb_rating}
              </div>
              <div className="group-hover:block hidden text-md ">
                Release: {game.releaseDate}
              </div>
              <div className="group-hover:block hidden text-md">
                Update: {game.updateDate}
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </>
  )
}

export default Catalog
