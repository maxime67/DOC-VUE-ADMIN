class ConfigService {
    constructor() {
        this.config = null
        this.loaded = false
    }

    async loadConfig() {
        if (this.loaded) return this.config

        try {
            const response = await fetch('/config/app-config.json')
            this.config = await response.json()
            this.loaded = true
            return this.config
        } catch (error) {
            console.error('Erreur lors du chargement de la configuration:', error)
            // Fallback avec les variables d'environnement de développement
            this.config = {
                apiUrl: import.meta.env.VITE_APIURL || 'http://localhost:3000'
            }
            this.loaded = true
            return this.config
        }
    }

    async getApiUrl() {
        const config = await this.loadConfig()
        return config.apiUrl
    }
}

export default new ConfigService()