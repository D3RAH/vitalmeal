import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import userModel from "../models/userModel.js";

if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL ERROR: GEMINI_API_KEY is not defined in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// VitaMeal Menu Context
const vitalMealContext = `
You are VitaMeal's helpful customer service assistant in Warri, Delta State. 
You provide information about healthy Nigerian and international cuisine.

OUR FULL MENU & PRICING:

RICE:
- Chinese Rice: ₦2,200 | Jollof Rice: ₦2,400 | Coconut Rice: ₦2,100 | Ofada Rice: ₦2,800

SOUPS:
- Efo Riro: ₦2,300 | Egusi Soup: ₦2,500 | Banga Soup: ₦2,700 | Pepper Soup: ₦2,000

GRILLS:
- Grilled Chicken: ₦3,500 | Grilled Tilapia: ₦4,000 | Asun (Goat Meat): ₦3,800 | Peppered Gizzard: ₦2,500

DESSERTS:
- Cup Cake: ₦1,500 | Vegan Cake: ₦2,000 | Butterscotch Cake: ₦2,200 | Sliced Cake: ₦1,800

... (Rest of my menu items)

DELIVERY INFO:
- Location: Warri, Delta State | Fee: ₦200 flat rate | Time: 30-45 minutes

ORDERING RULES:
1. CALCULATE the total cost based on the prices above.
2. ALWAYS add the ₦200 Delivery Fee.
3. FORMAT as a clear Markdown receipt with a TOTAL line.
4. Mention that payment is made via Paystack before delivery.
`;

export const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.body.userId; // Provided by authMiddleware

        if (!userId) {
            return res.json({ success: false, message: "Authentication required. Please login." });
        }

        // Fetch user from database to get their verified email
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found in our records." });
        }

        const emailForPaystack = user.email;

        if (!message) {
            return res.json({ success: false, message: "Message is required" });
        }

        // Initialize Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: vitalMealContext }] },
                { role: "model", parts: [{ text: "Understood. I am the VitaMeal assistant for Warri. I will provide menu info and calculate receipts including the ₦200 delivery fee." }] },
            ],
            generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        let botReply = response.text();

        // Regex looks for "TOTAL", skips symbols/pipes, and grabs the number
        const totalMatch = botReply.match(/TOTAL[\s*|:]*₦?\s*([\d,]+)/i);

        if (totalMatch) {
            try {
                const amountValue = parseInt(totalMatch[1].replace(/,/g, ''));
                const amountInKobo = amountValue * 100; 

                const paystackRes = await axios.post(
                    "https://api.paystack.co/transaction/initialize",
                    {
                        email: emailForPaystack,
                        amount: amountInKobo,
                        callback_url: `${process.env.FRONTEND_URL}/payment-success`,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                            "Content-Type": "application/json",
                        }
                    }
                );

                if (paystackRes.data.status) {
                    const payUrl = paystackRes.data.data.authorization_url;
                    botReply += `\n\n💳 **Secure Payment Link:**\n${payUrl}`;
                }
            } catch (pErr) {
                console.error("Paystack initialization failed:", pErr.message);
            }
        }

        res.json({ success: true, reply: botReply });

    } catch (error) {
        console.error("Chat error details:", error.message);
        
        if (error.status === 503 || error.status === 429) {
            return res.json({ 
                success: false, 
                message: "Our AI chef is currently busy! Please try again in a few seconds." 
            });
        }
        
        res.json({ success: false, message: "Sorry, I'm having trouble connecting. Please try again." });
    }
};