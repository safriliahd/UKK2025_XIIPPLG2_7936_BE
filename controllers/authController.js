const prisma = require('../prismaClient');

exports.register = async (req, res) => {
    const { username, password, email, name } = req.body;
    try {
        const user = await prisma.user.create({
            data: { username, password, email, name }
        });
        res.json({ message: 'User registered', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user && user.password === password) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};


exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });
        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};