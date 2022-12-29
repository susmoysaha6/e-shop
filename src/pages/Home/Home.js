import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            home
        </div>
    );
};

export default Home;