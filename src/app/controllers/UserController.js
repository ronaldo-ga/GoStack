import User from '../models/User';

class UserController {
    async store(req, res, next) {
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({
                error: 'User already exists',
            });
        }

        const user = await User.create(req.body);

        return res.status(200).json({
            status: 'successs',
            data: user,
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        let user = User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res.status(400).json({
                    error: 'User already exists',
                });
            }
        }

        if (oldPassword && !(await User.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password doesnt match' });
        }

        user = await user.update(req.body);

        return res.status(200).json({
            user,
        });
    }
}

export default new UserController();
