import React, { useContext, useState } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
   const navigate = useNavigate();
   const { addRecipe } = useContext(AppContext);

   const [formData, setformData] = useState({
     title:"",
     ist:"",
     imgurl:"",
   });

   const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

   const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
   };


   const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
   };

   const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
   };

   const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
   };

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, ist, imgurl } = formData;
    const result = await addRecipe(title, ist, imgurl, ingredients);

    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
   };

  return (
    <>
      <ToastContainer />
      <div className="container my-5 p-5" style={{ width: "500px", border: "2px solid yellow", borderRadius: "10px" }}>
        <h2 className="text-center">Add Recipe</h2>
        <form onSubmit={onSubmitHandler} style={{ width: "400px", margin: "auto" }} className="my-3 p-3">
          <div className="mb-3">
            <label className="form-label">Recipe Name</label>
            <input value={formData.title} onChange={onChangeHandler} name="title" type="text" className="form-control" required />
          </div>
          <h6>📝Ingredients:</h6>
          {ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: "flex", gap: "5px", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                required
                className="form-control"
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                required
                className="form-control"
              />
              <button type="button" onClick={() => removeIngredient(index)} className="btn btn-danger">❌</button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="btn btn-success my-2">➕ Add Ingredient</button>
          
          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <input value={formData.ist} onChange={onChangeHandler} name="ist" type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input value={formData.imgurl} onChange={onChangeHandler} name="imgurl" type="text" className="form-control" required />
          </div>
          <div className="container d-grid col-6">
            <button type="submit" className="btn btn-primary mt-3">Add Recipe</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;





