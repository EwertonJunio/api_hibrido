const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return sendError(res, 'Token não fornecido', 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return sendError(res, 'Formato de token inválido', 401);
    }

    const secret = process.env.AUTH_SECRET;

    if (!secret) {
        return sendError(res, 'Erro interno do servidor: A chave de autenticação não está definida.', 500);
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return sendError(res, 'Token inválido ou expirado', 401);
        }

        req.userLogged = decoded;
        next();
    });
}

function sendError(res, message, statusCode) {
    return res.status(statusCode).json({
        error: true,
        message: message
    });
}
