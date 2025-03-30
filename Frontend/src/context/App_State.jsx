import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context";
import axios from "axios";

const App_State = (props) => {
  const url = "https://backend-api-hmq1.onrender.com/api";
  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [user, setuser] = useState([])
  const [userId, setuserId] = useState("")
  const [userRecipe, setuserRecipe] = useState([])
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [reload, setreload] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.recipe);
      setrecipe(api.data.recipe);
    };
    fetchRecipe();
    getSavedRecipeById();
    profile();
    recipeByUser(userId);
    
  }, [token,userId,reload]);

  useEffect(() => {
  if(token){
    localStorage.setItem("token",token)
  }
  const tokenFromLocalStorage = localStorage.getItem("token",token)
  if(tokenFromLocalStorage)
  {
    setToken(tokenFromLocalStorage);
    setisAuthenticated(true)
  }
  }, [token,reload])
  

  // register
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      { name, gmail, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return api;
  };

  // login
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      {
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setToken(api.data.token);
    setisAuthenticated(true)
    return api;
    // console.log("login data ",api)
  };

  // addRecipe
  const addRecipe = async (title, ist, imgurl, ingredients) => {
    try {
      const api = await axios.post(
        `${url}/add`,
        {
          title,
          ist,
          imgurl,
          ingredients,  // Send the entire array instead of separate values
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
  
      setreload(!reload);
      return api;
    } catch (error) {
      console.error("Error adding recipe:", error);
      throw error;
    }
  };
  

  // recipeById
  const getRecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(api);
    return api;
  };

  // save Recipe By Id
  const savedRecipeById = async (id) => {
    const api = await axios.post(
      `${url}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log(api);
    setreload(!reload);
    return api;
  };

  // getSaved recipe
  const getSavedRecipeById = async () => {
    const api = await axios.get(
      `${url}/saved`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("getting saved recipe ", api.data.recipe);
    setsavedRecipe(api.data.recipe);
    // return api;
  };

  // profile
  const profile = async () =>{
    const api = await axios.get(`${url}/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth:token
      },
      withCredentials: true,
    });
    // console.log("This is user profile ",api.data.user)
    setuserId(api.data.user._id)
    setuser(api.data.user)
  }

  // get recipe by userId
  const recipeByUser = async (id) =>{
    const api = await axios.get(`${url}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        
      },
      withCredentials: true,
    });
    // console.log("user Specific recipe ",api)
    setuserRecipe(api.data.recipe)
  }
  const logOut = () =>{
    localStorage.removeItem("token",token)
    setToken("")
    setisAuthenticated(false)
  }

  // Delete Recipe By Id

const deleteRecipeById = async (id) => {
  try {
    const api = await axios.delete(`${url}/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token, // Ensure token is passed if needed
      },
      withCredentials: true,
    });

    if (api.data.success) {
      setrecipe((prevRecipes) => prevRecipes.filter((r) => r._id !== id));
      setreload(!reload);
    }
    return api;
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};



  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addRecipe,
        recipe,
        getRecipeById,
        savedRecipeById,
        savedRecipe,
        userRecipe,
        user,
        logOut,
        isAuthenticated,
        setisAuthenticated,
        deleteRecipeById,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};





export default App_State;
