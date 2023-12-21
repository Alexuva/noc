import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAIL: env.get('MAIL').required().asEmailString(),
    MAILER_KEY: env.get('MAILER_KEY').required().asString()
}