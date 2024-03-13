import 'dotenv/config';
import {get} from 'env-var';

export const envs = {
    PORT:get('PORT').required().asPortNumber(),
    // Uso el public path si viene, si no viene uso la carpeta public
    PUBLIC_PATH:get('PUBLIC_PATH').default('public').asString(),
}