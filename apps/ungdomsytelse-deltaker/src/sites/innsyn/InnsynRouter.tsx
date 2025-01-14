import { Route, Routes } from 'react-router-dom';
import Innsyn from './Innsyn';

const InnsynRouter = () => {
    return (
        <Routes>
            <Route index element={<Innsyn />} />
        </Routes>
    );
};

export default InnsynRouter;
