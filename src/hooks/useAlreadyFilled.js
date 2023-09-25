import React from 'react';
import { useQuery } from 'react-query';
import useAuth from './useAuth';

const useAlreadyFilled = (stdId) => {

    const user = useAuth()

    const query = useQuery(['check-already-filled', user.username], () => {
        // get the list of forms for this student and check if the latest one is today.
    })

    return false;
}

export default useAlreadyFilled;
