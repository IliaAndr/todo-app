/*import dotenv from 'dotenv'

if (process.env.CI !== 'true') {
    dotenv.config({ path: 'env/prod.env' })
    console.log('Running in local environment')
} else {
    console.log('Running in CI environment')
}

const required = ['URL']

// Check for missing variables
required.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`)
    }
})
*/
export const SERVICE_URL: string = process.env.URL!