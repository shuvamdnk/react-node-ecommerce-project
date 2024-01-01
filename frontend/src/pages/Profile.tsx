import React,{useEffect} from 'react';

const Profile:React.FC = () => {
    useEffect(() => {
        document.title = 'Profile';
    },[])
    return (
        <>
            <p>Profile</p>
        </>
    );
}

export default Profile;