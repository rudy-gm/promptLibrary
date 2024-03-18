import {Wrapper, Card, Gradient} from "./styledComponents"
import { useEffect, useState } from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Veggie() {

    const [veggie, setVeggie] = useState([])

    useEffect(() => {
        getVeggie();
    }, [])

    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');

        if(check){
            setVeggie(JSON.parse(check));
        
        }
        else{

            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);

            const data = await api.json()

            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes)

        }

        console.log(veggie)
        
    };

    return (
        <div>
            <Wrapper>
                <h3>Our Vegetarian Picks</h3>

                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
                }}>
                    {veggie.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient></Gradient>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>

        </div>
    )
}

export default Veggie