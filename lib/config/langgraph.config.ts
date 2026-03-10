/**
 * LangGraph API Configuration
 *
 * Centralized configuration for LangGraph streaming API URLs.
 * Supports three environments:
 * - Local development (localhost)
 * - Dev tunnel (for external access during development)
 * - Production (deployed LangGraph server)
 *
 * Configuration is managed via environment variables in .env file.
 */

export type LangGraphEnvironment = 'local' | 'tunnel' | 'production';

/**
 * LangGraph configuration interface
 */
export interface LangGraphConfig {
    /** Current environment type */
    environment: LangGraphEnvironment;
    /** Base URL for LangGraph API */
    baseUrl: string;
    /** Whether we're in development mode */
    isDevelopment: boolean;
    /** Whether we're in production mode */
    isProduction: boolean;
    /** Whether tunnel is active */
    isTunnelActive: boolean;
}

/**
 * Determine the current LangGraph environment
 */
function getLangGraphEnvironment(): LangGraphEnvironment {
    const tunnelActive = process.env.NEXT_PUBLIC_LANGGRAPH_TUNNEL_ACTIVE === 'true';
    const nodeEnv = process.env.NODE_ENV;

    // Check if tunnel is explicitly enabled
    if (tunnelActive) {
        return 'tunnel';
    }

    // Check if we're in production
    if (nodeEnv === 'production') {
        return 'production';
    }

    // Default to local development
    return 'local';
}

/**
 * Get the LangGraph base URL based on current environment
 *
 * Priority order:
 * 1. If tunnel is active -> use NEXT_PUBLIC_LANGGRAPH_TUNNEL_URL
 * 2. If production mode -> use NEXT_PUBLIC_LANGGRAPH_PRODUCTION_URL
 * 3. Otherwise (local dev) -> use NEXT_PUBLIC_LANGGRAPH_LOCAL_URL
 */
function getLangGraphBaseUrl(): string {
    const environment = getLangGraphEnvironment();

    switch (environment) {
        case 'tunnel':
            // Dev tunnel URL (for external access during development)
            return process.env.NEXT_PUBLIC_LANGGRAPH_TUNNEL_URL || 'https://localhost:2024';

        case 'production':
            // Production LangGraph server URL
            return process.env.NEXT_PUBLIC_LANGGRAPH_PRODUCTION_URL || '';

        case 'local':
        default:
            // Local LangGraph server (default for development)
            return process.env.NEXT_PUBLIC_LANGGRAPH_LOCAL_URL || 'http://127.0.0.1:2024';
    }
}

/**
 * Get the complete LangGraph configuration
 */
export function getLangGraphConfig(): LangGraphConfig {
    const environment = getLangGraphEnvironment();
    const baseUrl = getLangGraphBaseUrl();

    return {
        environment,
        baseUrl,
        isDevelopment: environment !== 'production',
        isProduction: environment === 'production',
        isTunnelActive: environment === 'tunnel',
    };
}

/**
 * Get the LangGraph API base URL
 * This is the main function to use when making API calls to LangGraph
 *
 * @returns The base URL for LangGraph API
 * @throws Error if production URL is not configured in production mode
 */
export function getLangGraphApiUrl(): string {
    const config = getLangGraphConfig();

    // In production, ensure URL is configured
    if (config.isProduction && !config.baseUrl) {
        console.error(
            '[LangGraph Config] Production URL not configured. ' +
            'Please set NEXT_PUBLIC_LANGGRAPH_PRODUCTION_URL in your environment.'
        );
        throw new Error('LangGraph production URL not configured');
    }

    // Log configuration for debugging (only in development)
    if (config.isDevelopment) {
        console.log('[LangGraph Config]', {
            environment: config.environment,
            baseUrl: config.baseUrl,
        });
    }

    return config.baseUrl;
}

/**
 * Build a full URL for a LangGraph API endpoint
 *
 * @param path - API path (e.g., '/threads', '/runs/stream')
 * @returns Full URL for the API endpoint
 */
export function getLangGraphEndpoint(path: string): string {
    const baseUrl = getLangGraphApiUrl();
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${normalizedPath}`;
}

/**
 * Validate that required LangGraph environment variables are set
 * Call this at app startup to catch configuration issues early
 */
export function validateLangGraphConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const config = getLangGraphConfig();

    switch (config.environment) {
        case 'tunnel':
            if (!process.env.NEXT_PUBLIC_LANGGRAPH_TUNNEL_URL) {
                errors.push('NEXT_PUBLIC_LANGGRAPH_TUNNEL_URL is not set but tunnel is active');
            }
            break;

        case 'production':
            if (!process.env.NEXT_PUBLIC_LANGGRAPH_PRODUCTION_URL) {
                errors.push('NEXT_PUBLIC_LANGGRAPH_PRODUCTION_URL is required in production');
            }
            break;

        case 'local':
            // Local has a fallback, so just warn if not set
            if (!process.env.NEXT_PUBLIC_LANGGRAPH_LOCAL_URL) {
                console.warn('[LangGraph Config] Using default local URL (http://127.0.0.1:2024)');
            }
            break;
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

// Export a singleton config for convenience
export const langGraphConfig = getLangGraphConfig();
