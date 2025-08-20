import dotenv from 'dotenv';

export default async function globalSetup() {
    if (process.env.CI !== 'true') {
        dotenv.config({ path: 'env/prod.env' });
        console.log('✅ Env loaded in local environment');
    } else {
        console.log('✅ Running in CI environment');
    }

    if (!process.env.SERVICE_URL) {
        throw new Error('❌ Missing required environment variable: SERVICE_URL');
    }
}
