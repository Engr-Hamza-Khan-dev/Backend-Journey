import React from 'react';



const UpdateUser = () => {

    return (

        <>

            <div>

                <h2>Update User</h2>

                <form className="space-y-5" onSubmit={fillform}>

                    <input type="text" placeholder="Username" />

                    <input type="text" placeholder="Full Name" />

                    <input type="email" placeholder="Email" />

                    <input type="password" placeholder="Password" />

                    <button type="submit">Update</button>

                </form>

            </div>

        </>

    );

}



export default UpdateUser;

