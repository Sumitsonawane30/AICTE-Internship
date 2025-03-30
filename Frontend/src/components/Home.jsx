import React, { useContext } from "react";
import { AppContext } from "../context/App_Context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Home.css"; // Ensure this file exists

const Home = () => {
  const navigate = useNavigate();
  const { recipe, setRecipe, savedRecipeById, deleteRecipeById } = useContext(AppContext);

  // Save Recipe Function
  const saved = async (id) => {
    try {
      const result = await savedRecipeById(id);
      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to save recipe!", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // Delete Recipe Function
  
  const deleteRecipe = async (id) => {
    try {
      console.log("Deleting recipe with ID:", id); // Debugging
      const result = await deleteRecipeById(id);
      
      console.log("Delete API Response:", result); // Debugging
  
      if (result?.data?.success) {
        toast.success("Recipe deleted successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to delete recipe! Try again.");
      }
    } catch (error) {
      console.error("Error while deleting:", error);
      toast.error("Server error while deleting recipe.");
    }
  };



  return (
    <>
      <ToastContainer />

      {/* Updated Background Section */}
      <div className="landing-container">
        <h1 className="landing-title">Welcome to Recipe Sharing</h1>
      </div>

      <div className="text-center mx-auto" style={{ width: "1200px" }}>
        <div className="row d-flex justify-content-center align-items-center">
          {recipe.map((data) => (
            <div key={data._id} className="col-md-3 my-3">
              <div className="card bg-dark text-light" style={{ width: "18rem" }}>
                <div className="d-flex justify-content-center align-items-center p-3">
                  <img
                    src={data.imgurl}
                    className="card-img-top"
                    alt="Recipe"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <div className="my-3">
                    <button className="btn btn-primary mx-2" onClick={() => saved(data._id)}>Save</button>
                    <button className="btn btn-warning mx-2" onClick={() => navigate(`/${data._id}`)}>View More</button>
                    <button className="btn btn-danger mx-3" onClick={() => deleteRecipe(data._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



export default Home;
