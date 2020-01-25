const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/index");
    } else {
        next();
    }
};

module.exports = withAuth;
