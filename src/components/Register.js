import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useStateValue } from '../reducer/StateProvider';
import axios from 'axios';
import { actionType } from "../reducer/reducer";
import Imagen from "../img/avatarImage.png"

function Register() {

  const [{ user }, dispatch] = useStateValue()

  
  async function cerrarCesion() {
    const email = user.datosUser.email
    console.log(email)
    
        await axios.post("http://localhost:4000/api/signOut", {email})
        .then(response =>{
          console.log(response.response)            
            if(response.data.success) {
              localStorage.removeItem("token")
              dispatch({
                type:actionType.USER,
                user:null
              })
              
            }
          

           })

    }



  const [showMenu, setShowMenu] = React.useState(false);
  function mostrarMenu() {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  }
  return (
    <div className="h-registro">
      <>
        <button className="d-flex mx-5" style={{backgroundColor: "#fff", borderRadius:"50%"}} onClick={mostrarMenu}>
           <img src={Imagen} alt="..." style={{width:"50px", height:"50px", borderRadius:"50%"}}/>
        </button>
        {showMenu && (
          <div className="h-usuario">
            { !user?
              <LinkRouter to="/signin">
              <button type="button" className="btn btn-dark bg-dark text-white mt-2">
                Sign In
              </button>
            </LinkRouter> :
            <LinkRouter to="/signout">            
            <button type="button" className="btn btn-info bg-warning  text-white ms-3 mt-2"  onClick={() => cerrarCesion()}>
            Sign Out</button> 
            </LinkRouter>    
            }
            <LinkRouter to="/signup">
              <button type="button" className="btn btn-info bg-info  text-white ms-3 mt-2">
                Sign Up
              </button>
            </LinkRouter>


          </div>
        )}
      </>
    </div>
  );
}

export default Register;