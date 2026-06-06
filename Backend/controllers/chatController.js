import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import userModel from "../models/userModel.js";

if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL ERROR: GEMINI_API_KEY is not defined in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// VitaMeal Menu Context
const vitalMealContext = `
You are VitaMeal's customer service assistant in Warri, Delta State.
You help customers with menu information, pricing, and orders.

IMPORTANT BEHAVIOR RULES:
- Do NOT greet the user. Jump straight to answering their question.
- Do NOT say "Migwo", "Welcome", "Hello" or any greeting in ANY response.
- Keep responses concise and direct.
- Do NOT repeat information already given in the conversation.

OUR FULL MENU & PRICING:
RICE: Chinese Rice ₦2,200 | Jollof Rice ₦2,400 | Coconut Rice ₦2,100 | Ofada Rice ₦2,800
SOUPS: Efo Riro ₦2,300 | Egusi Soup ₦2,500 | Banga Soup ₦2,700 | Pepper Soup ₦2,000
GRILLS: Grilled Chicken ₦3,500 | Grilled Tilapia ₦4,000 | Asun ₦3,800 | Peppered Gizzard ₦2,500
SWALLOW: Pounded Yam & Egusi ₦3,000 | Eba & Efo Riro ₦2,500 | Amala & Ewedu ₦2,600 | Fufu & Okra ₦2,800
NIGERIAN SPECIALS: Moi Moi ₦1,500 | Pap & Bean Cake ₦1,200 | Suya ₦2,000 | Plantain & Beans ₦1,800
PASTA: Cheese Pasta ₦2,500 | Tomato Pasta ₦2,300 | Creamy Pasta ₦2,800 | Chicken Pasta ₦3,000
NOODLES: Butter Noodles ₦2,000 | Veg Noodles ₦2,200 | Somen Noodles ₦2,500 | Cooked Noodles ₦2,300
SANDWICH: Chicken Sandwich ₦2,200 | Vegan Sandwich ₦1,800 | Grilled Sandwich ₦2,400 | Bread Sandwich ₦2,000
DESSERTS: Cup Cake ₦1,500 | Vegan Cake ₦2,000 | Butterscotch Cake ₦2,200 | Sliced Cake ₦1,800

DELIVERY: Warri, Delta State | ₦200 flat rate | 30-45 minutes

ORDERING RULES:
1. When a customer orders, calculate total + ₦200 delivery fee.
2. Show receipt as a Markdown table with Item and Price columns.
3. End receipt with a TOTAL row.
4. After receipt, ask ONLY: "Would you like to proceed to payment?"
5. ONLY include the keyword PROCEED_TO_PAYMENT in your response when the user explicitly says yes/proceed/pay.
6. Never send payment link automatically after showing receipt.
`;

export const chatWithBot = async (req, res) => {
    try {
        const { message, history = [] } = req.body;
        const trimmedHistory = history.slice(-10);
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
                { role: "model", parts: [{ text: "Understood. I will answer questions directly without greetings." }] },
                ...trimmedHistory
            ],
            generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        let botReply = response.text();

        // Regex looks for "TOTAL", skips symbols/pipes, and grabs the number
        const shouldPay = botReply.includes('PROCEED_TO_PAYMENT');
        const totalMatch = shouldPay ? botReply.match(/₦\s*([\d,]+)(?=[^\d]*$)/i) : null;

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
                    botReply = botReply.replace('PROCEED_TO_PAYMENT', '').trim();
                }
            } catch (pErr) {
                console.error("Paystack initialization failed:", pErr.message);
            }
        }

        res.json({ success: true, reply: botReply });

    } catch (error) {
        console.error("Chat error details:", error.message);
        
        if (error.status === 503 || error.status === 429 || error?.message?.includes('503') || error?.message?.includes('429')) {
            return res.json({ 
                success: false, 
                message: "Our AI chef is currently busy! Please try again in a few seconds." 
            });
        }
        
        res.json({ success: false, message: "Sorry, I'm having trouble connecting. Please try again." });
    }
};