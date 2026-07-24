VitalMeal 

A full-stack food ordering platform built for the Warri, Nigeria market, featuring an AI-powered conversational chatbot that lets users place orders and complete payment entirely through natural language — no forms, no multi-step checkout.

Live demo: vitalmeal.vercel.app

Traditional food ordering apps follow the same rigid pattern: browse menu → add to cart → go to checkout → fill a delivery form → confirm payment. VitalMeal was built to test whether that entire flow could be collapsed into a single conversation. The result is an AI chatbot that understands orders, maintains context across the interaction, and drives the user straight to secure checkout — cutting out the friction of traditional multi-step ordering.

Key Features
Conversational ordering — an AI chatbot (powered by the groq-sdk and LLaMA 3.3-70B) that takes orders, maintains conversational context, and generates secure payment links directly in-chat

Integrated checkout — Paystack-based payment flow, triggered from within the conversation

Responsive, cross-platform UI — custom mobile fixes including iOS zoom prevention, scroll-lock while the chatbot is open, and Android viewport gap fixes

Persistent order and session management — dynamic order creation pipeline with reliable state handling across the user's session

End-to-end ownership — designed, built, and deployed solo, from UI/UX through backend logic to production hosting

Technology;

Frontend:	React

AI / Chatbot:	groq-sdk, LLaMA 3.3-70B

Payments:	Paystack

Hosting:	Vercel

Author

Emmanuel Chidera Okpanum (D3RA) Full-stack developer & AI engineer
