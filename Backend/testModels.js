import 'dotenv/config';

async function listMyModels() {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error(" API Error:", data.error.message);
            return;
        }

        console.log(" YOUR AVAILABLE MODELS:");
        data.models.forEach(m => {
            if (m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`- ${m.name.replace('models/', '')}`);
            }
        });
    } catch (err) {
        console.error(" Connection failed:", err.message);
    }
}

listMyModels();