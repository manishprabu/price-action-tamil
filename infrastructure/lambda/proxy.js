const https = require('https');

exports.handler = async (event) => {
    // Enable CORS for all origins
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
    };

    // Handle preflight OPTIONS request
    if (event.requestContext && event.requestContext.http && event.requestContext.http.method === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({ message: "OPTIONS OK" })
        };
    }

    try {
        // Extract target URL from query parameter 'url'
        // Example: ?url=https://intradayscreener.com/api/CandlestickAnalysis/shortbo?filter=cash
        const targetUrl = event.queryStringParameters ? event.queryStringParameters.url : null;

        if (!targetUrl) {
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({ error: "Missing 'url' query parameter" })
            };
        }

        console.log(`Proxying request to: ${targetUrl}`);

        return new Promise((resolve, reject) => {
            const req = https.get(targetUrl, (res) => {
                let data = '';

                // A chunk of data has been received.
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received.
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        headers: headers, // Ensure CORS headers are included in response
                        body: data
                    });
                });
            });

            req.on('error', (e) => {
                console.error(`Error requesting ${targetUrl}: ${e.message}`);
                resolve({
                    statusCode: 500,
                    headers: headers,
                    body: JSON.stringify({ error: `Internal Server Error: ${e.message}` })
                });
            });
        });

    } catch (error) {
        console.error("Handler error:", error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
