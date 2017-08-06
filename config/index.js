import { config } from '../package'

let { env } = config

const envConfig = {
	DEV: require('./dev').default
}

export default envConfig[env || 'DEV']