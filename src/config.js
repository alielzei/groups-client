const dev = {
	API_URL: 'http://localhost:3001'
};

const prod = {
	API_URL: 'http://wagroups.herokuapp.com'
}

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;