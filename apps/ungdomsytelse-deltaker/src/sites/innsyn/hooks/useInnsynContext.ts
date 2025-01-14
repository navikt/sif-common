import { useContext } from 'react';
import { InnsynContext } from '../context/InnsynContext';

export const useInnsynContext = () => useContext(InnsynContext);
