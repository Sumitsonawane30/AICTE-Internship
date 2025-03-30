app.delete("/api/delete/:id", async (req, res) => {
    try {
      console.log("Delete request received for ID:", req.params.id); // Debugging
  
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe) {
        return res.status(404).json({ success: false, message: "Recipe not found" });
      }
  
      res.json({ success: true, message: "Recipe deleted successfully" });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
  