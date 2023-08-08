import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Game } from "./game"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import NavBar from "./Navbar"
import "./Home.css"

const Home = () => {
  const [games, setGames] = useState<Game[]>([])

  const APIKey = "d84c61f2745c4a1a985547bc97b1926d"
  const url3 = `https://api.rawg.io/api/games?key=${APIKey}&page=1&page_size=3`

  useEffect(() => {
    fetch(url3)
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)

        const tempGames: Game[] = []
        for (let i = 0; i < 3; i++) {
          const tempGame = new Game()
          tempGame.id = data.results[i].id
          tempGame.rating = data.results[i].rating
          tempGame.releaseDate = data.results[i].released
          tempGame.updateDate = data.results[i].updated.slice(0, 10)
          tempGame.imgUrl = data.results[i].background_image
          tempGame.name = data.results[i].name
          tempGame.esrb_rating = data.results[i].esrb_rating?.name
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    arrows: false,
    adaptiveHeight: true,
  }

  return (
    <>
      <NavBar />
      <div className=" text-zinc-400  text-3xl  ml-5  mb-5 ">
        Games of the day
      </div>
      <div className="w-full flex flex-row justify-center">
        <Slider {...settings} className="slider justify-center ">
          {games.map((game) => (
            <div className="flex flex-row justify-center">
              <div className="sliderContainer flex flex-col justify-center mx-auto">
                <Link to={"/item/" + game.id}>
                  <img
                    src={game.imgUrl}
                    className="sliderImg rounded-lg m-2 bg-zinc-700 object-contain"
                  ></img>
                </Link>
                <div className="text-zinc-300 m-3 p-2 px-4 bg-zinc-600 rounded">
                  <div className="font-semibold text-6xl mb-2">{game.name}</div>
                  <div className="font-semibold text-2xl mb-2">
                    Score: {game.rating} / 5
                  </div>
                  <div className="font-semibold text-lg mb-2">
                    Rating: {game.esrb_rating}
                  </div>
                  <div className="text-md ">Release: {game.releaseDate}</div>
                  <div className=" text-md">Update: {game.updateDate}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
export default Home
