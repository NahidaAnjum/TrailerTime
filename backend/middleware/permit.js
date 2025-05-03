const { Permit } = require('permitio');
const permit = new Permit({
    pdp: 'https://cloudpdp.api.permit.io',
    token: 'permit_key_1aByezlaAI9wmei3pZaOFVjZXZucdDSIIWS6Qq3rGG75SYWdkg6SpVz6AwoYDIhUfOD1ImEVsbwN7clCHYbIHJ',
});
const checkPermission = (action, resource) => async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            console.error('No user found in request');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.user.id.toString();
        const permissionParams = {
            user: userId,
            action: action,
            resource: resource
        };
        console.log('Permission check params:', permissionParams);

        // const allowed = await permit.check(permissionParams);
        const allowed = await permit.check(
            userId,action,resource
        );

        console.log(`Permission check result for User ${userId}:`, allowed);
        if (allowed) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    } catch (error) {
        console.error('Error checking permission:', error.message);
        res.status(500).json({ error: 'Error checking permission' });
    }
};

module.exports = { permit, checkPermission };