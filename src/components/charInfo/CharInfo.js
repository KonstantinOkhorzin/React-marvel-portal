import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';


const CharInfo = ({ charId }) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])

    //Функция для обновления персонажа который выбрал юзер
    const updateChar = () => {
        //Если персонаж не выбран функция не срабатывает, условие будет срабатывать в самом начале
        if (!charId) {
            return;
        }
        //Если id есть отправляем запрос на сервер
        getCharacter(charId)
            .then(onCharLoaded)
    }

    //Функция для записи персонажа в состояние когда он загрузился
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>; //Начальное состояние
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'fill'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;//вывод не больше 10 комиксов
                        return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: propTypes.number
}

export default CharInfo;