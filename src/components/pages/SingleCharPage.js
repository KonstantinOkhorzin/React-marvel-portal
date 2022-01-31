import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {

    const { characterId } = useParams();
    console.log(characterId);
    const [character, setCharacter] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacter()
    }, [characterId])

    const updateCharacter = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !character) ? <View character={character} /> : null;

    return (
        <>
            {<AppBanner/>}
            {errorMessage}
            {spinner}
            {content}
        </>
    );

};

const View = ({ character }) => {
    const { name, thumbnail, description } = character;

    return (
        <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__char-img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
    </div>
    )
}

export default SingleCharPage;