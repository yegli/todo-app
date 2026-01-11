export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {
        orderBy: 'title', 
        orderDirection: -1, 
        theme: 'dark',
        showCompleted: false
    };
    const {orderBy, orderDirection, theme, showCompleted} = req.query;

    if (theme) {
        userSettings.theme = theme;
    }
    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = parseInt(orderDirection as string, 10);
    }
    if (showCompleted !== undefined) {
        userSettings.showCompleted = showCompleted === 'true';
    }
    req.userSettings = req.session.userSettings = userSettings;
    res.locals = req.userSettings;

    next();
};
