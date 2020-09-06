module.exports = (api) => {
    // This caches the Babel config
    api.cache.using(() => {
        console.log("NODE_ENV", process.env.NODE_ENV);
        return process.env.NODE_ENV
    });
    return {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        // TODO: This line shall be used if ssr/webpack-dev-midleware is not used
        // Applies the react-refresh Babel plugin on non-production modes only
        //...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
    };
};