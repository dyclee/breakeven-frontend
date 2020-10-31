import React, { useState, useEffect } from 'react';

import FriendSelect from './FriendSelect';
import AddFriendForm from './AddFriendForm';

const Dashboard = () => {
    return (
        <>
        <h1>Dashboard</h1>
        <FriendSelect></FriendSelect>
        <AddFriendForm />
        </>
    )
}

export default Dashboard;
