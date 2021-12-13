import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MainPage, ComicsPage, SinglePage } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout';
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';

const Page404 = lazy(() => import('../pages/404'));


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={Spinner}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />

                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>} />

                            <Route path="*" element={< Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;