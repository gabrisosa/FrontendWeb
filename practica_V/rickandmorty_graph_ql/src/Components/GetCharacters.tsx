import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import './GetCharacters.css'

type ResultChar = {
    name: string
    status: string
    species: string
    gender: string
    origin: {
        name: string
    }
    location: {
        name: string
    }
    image: string
}

type ICharacter = {
    characters: {
        results: Array<ResultChar>
    }
}

function GetCharacters() {

    const [pageNum, setPageNum] = useState<number>(1);

    const LOAD_CHARACTERS = gql`
    query{
        characters(page: ${pageNum}){
            results{
                name
                image
            }
        }
    }
`

    const {error, loading, data, refetch} = useQuery<ICharacter>(LOAD_CHARACTERS)

    useEffect(() => {
        refetch();
    }, [pageNum]);

    const prev = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    }

    const next = () => {
        if (pageNum < 42) {
            setPageNum(pageNum + 1);
        }
    }

    if (error) {
        console.log(`ERROR: ${error}`)
    }

    if (loading) {
        return <div>Loading ...</div>
    }

    return (
        <div>
            <div id="characters">
                {data && data.characters.results.map((elem) => {
                    return (
                            <div className="character">
                                <h2>{elem.name}</h2>
                                <img src={elem.image} alt={elem.name}/>
                            </div>
                    )
                })
                }
            
                
            </div>
            <div id="buttons">
                <button onClick={(e) => prev()}>PREV</button>
                <button onClick={(e) => next()}>NEXT</button>
            </div>
        </div>
        )
}

export default GetCharacters;