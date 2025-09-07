import { useEffect } from "react";
import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error,
        sendRequest
    } = useHttp('http://localhost:3000/meals', requestConfig);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);


    if (isLoading) {
        return <p className="center">Fetching meals...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals!" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals && loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}