import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = ({onCharSelected}) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);//Загрузка новых персонажей
    const [offset, setOffset] = useState(210);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    //Функция для запроса
    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError)
    }

    //Функция для записи персонажей в состояние когда они загрузилися
    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
    }

    //Функция для установки ошибки
    const onError = () => {
            setError(true)
            setLoading(false)
    }

    //Функция которая показывает что запустилась дозагрузка персонажей
    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    //Этот функция создана для оптимизации, чтобы не помещать такую конструкцию в return
    const renderItems = (arr) => {
        const items =  arr.map((item) => {

            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;