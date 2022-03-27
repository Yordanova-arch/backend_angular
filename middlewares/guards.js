module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized!' });
            } else {
                next();
            }

        };

    },

    isGuest() {
        return (req, res, next) => {
            if (req.user) {
                res.status(400).json({ message: 'You are already signed in.' });
            } else {
                next();
            }

        }
    },

    isOwner() {
        return (req, res, next) => {
            const item = req.data;

            if (req.user._id != item.author) {

                res.status(403).json({ message: 'Forbidden!' });

            }else {
                next();
            }
        }
    }
}