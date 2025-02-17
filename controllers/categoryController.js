const prisma = require('../prismaClient');

exports.getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
};

exports.addCategory = async (req, res) => {
    const { category, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const newCategory = await prisma.category.create({ 
            data: { category, userId: Number(userId) } 
        });
        res.json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "Failed to add category" });
    }
};


exports.editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const existingCategory = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { category },
        });

        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCategory = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        await prisma.category.delete({ where: { id: Number(id) } });

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
