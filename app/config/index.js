import app from "../app.js";
import message from "./message.js";

const caseEntorno = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            message(`Front listo en el puerto http://localhost:${app.get("port")}/`,"danger");
            break;

        case 'develop':
            message(`Front listo en el puerto http://localhost:${app.get("port")}/`,"success");
            break;

        case 'qa':
            message(`Front listo en el puerto http://localhost:${app.get("port")}/`,"warning");
            break;

        default:
            message(`Front listo en el puerto http://localhost:${app.get("port")}/`,"success");
            break;

    }
};

export default caseEntorno;