import Groq from "groq-sdk";
import axios from "axios";
import userModel from "../models/userModel.js";

if (!process.env.GROQ_API_KEY) {
    console.error("CRITICAL ERROR: GROQ_API_KEY is not defined in .env");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


// VitaMeal Menu Context
const vitalMealContext = `
You are VitaMeal's customer service assistant in Warri, Delta State.
You help customers with menu information, pricing, and orders.

IMPORTANT BEHAVIOR RULES:
- NEVER add text inside a Markdown table after the TOTAL row. All text must appear OUTSIDE and BELOW the table.
- Format menu categories as bold headers using ** (e.g. **RICE**) on their own separate line, followed by a bullet list. Always add a blank line before each category header.
- Do NOT greet the user. Jump straight to answering their question.
- Do NOT say "Migwo", "Welcome", "Hello" or any greeting in ANY response.
- Keep responses concise and direct.
- Be warm and friendly. Add short natural phrases like "Here's our menu!", "Here's your order summary:", "Great choice!" where appropriate, but keep it brief.
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
1. When a customer states what food they want, show a Markdown table with Item and Price columns. End the table with a TOTAL row for just the food items. After the table is fully closed, on a new line OUTSIDE the table, ask: "Please provide your delivery address or location within Warri so we can finalize your order."
2. Do NOT skip to the payment phase until the user has specified a location or address.
3. Once the user provides their location, show a new Markdown table with:
   - The selected items and prices
   - A "Delivery Fee" row (₦200)
   - A final "TOTAL" row
   After the table is fully closed, on a new line OUTSIDE the table, say: "Delivery to [User's Location] will take 25-40 minutes. Would you like to proceed to payment?"
4. When the user explicitly confirms payment (saying yes, proceed, go ahead, okay, etc.) AFTER seeing the final receipt with the delivery fee, respond with this exact text template:
   Delicious choice! Your order is being processed for delivery to your location. 🛵
   PROCEED_TO_PAYMENT
5. Only append the PROCEED_TO_PAYMENT keyword flag at the absolute end when the user is explicitly confirming checkout. Do not use it anywhere else.
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

        // Initialize Groq
        const chatHistory = trimmedHistory.map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.parts[0].text
        }));

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: vitalMealContext },
                ...chatHistory,
                { role: "user", content: message }
            ],
            max_tokens: 2048,
            temperature: 0.7,
        });

        let botReply = completion.choices[0].message.content;

        // Regex looks for "TOTAL", skips symbols/pipes, and grabs the number
        const shouldPay = botReply.includes('PROCEED_TO_PAYMENT');
        botReply = botReply.replace('PROCEED_TO_PAYMENT', '').trim();
        const fullHistoryText = JSON.stringify(trimmedHistory);
        const allTotalMatches = shouldPay ? [...fullHistoryText.matchAll(/TOTAL[^₦]*₦\s*([\d,]+)/gi)] : [];
        const lastAmount = allTotalMatches.length > 0 
            ? allTotalMatches[allTotalMatches.length - 1][1].replace(/,/g, '')
            : (shouldPay ? "2500" : null);

        if (lastAmount) {
            try {
                const amountValue = parseInt(lastAmount);
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
                botReply = `💳 **Your payment is ready!**\n\n[PROCEED TO SECURE PAYMENT](${payUrl})`;
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