export interface AudioPhrase {
  id: string;
  english: string;
  spanish: string;
  category: string;
}

// Audio Pack 1 - 100 Core Phrases
export const corePhrases: AudioPhrase[] = [
  // Greetings (1-10)
  { id: "core-1", english: "Hello", spanish: "Hola", category: "greetings" },
  { id: "core-2", english: "Good morning", spanish: "Buenos días", category: "greetings" },
  { id: "core-3", english: "Good afternoon", spanish: "Buenas tardes", category: "greetings" },
  { id: "core-4", english: "Good evening", spanish: "Buenas noches", category: "greetings" },
  { id: "core-5", english: "Goodbye", spanish: "Adiós", category: "greetings" },
  { id: "core-6", english: "See you later", spanish: "Hasta luego", category: "greetings" },
  { id: "core-7", english: "See you tomorrow", spanish: "Hasta mañana", category: "greetings" },
  { id: "core-8", english: "How are you?", spanish: "¿Cómo estás?", category: "greetings" },
  { id: "core-9", english: "I'm fine, thank you", spanish: "Estoy bien, gracias", category: "greetings" },
  { id: "core-10", english: "Nice to meet you", spanish: "Mucho gusto", category: "greetings" },
  
  // Polite phrases (11-20)
  { id: "core-11", english: "Please", spanish: "Por favor", category: "polite" },
  { id: "core-12", english: "Thank you", spanish: "Gracias", category: "polite" },
  { id: "core-13", english: "Thank you very much", spanish: "Muchas gracias", category: "polite" },
  { id: "core-14", english: "You're welcome", spanish: "De nada", category: "polite" },
  { id: "core-15", english: "Excuse me", spanish: "Disculpe", category: "polite" },
  { id: "core-16", english: "I'm sorry", spanish: "Lo siento", category: "polite" },
  { id: "core-17", english: "Pardon me", spanish: "Perdón", category: "polite" },
  { id: "core-18", english: "No problem", spanish: "No hay problema", category: "polite" },
  { id: "core-19", english: "Of course", spanish: "Por supuesto", category: "polite" },
  { id: "core-20", english: "With pleasure", spanish: "Con mucho gusto", category: "polite" },
  
  // Basic responses (21-30)
  { id: "core-21", english: "Yes", spanish: "Sí", category: "responses" },
  { id: "core-22", english: "No", spanish: "No", category: "responses" },
  { id: "core-23", english: "Maybe", spanish: "Quizás", category: "responses" },
  { id: "core-24", english: "I don't know", spanish: "No sé", category: "responses" },
  { id: "core-25", english: "I think so", spanish: "Creo que sí", category: "responses" },
  { id: "core-26", english: "I don't think so", spanish: "Creo que no", category: "responses" },
  { id: "core-27", english: "That's right", spanish: "Así es", category: "responses" },
  { id: "core-28", english: "Of course not", spanish: "Claro que no", category: "responses" },
  { id: "core-29", english: "Exactly", spanish: "Exactamente", category: "responses" },
  { id: "core-30", english: "More or less", spanish: "Más o menos", category: "responses" },
  
  // Help phrases (31-40)
  { id: "core-31", english: "I need help", spanish: "Necesito ayuda", category: "help" },
  { id: "core-32", english: "I don't understand", spanish: "No entiendo", category: "help" },
  { id: "core-33", english: "Can you help me?", spanish: "¿Puede ayudarme?", category: "help" },
  { id: "core-34", english: "Can you repeat that?", spanish: "¿Puede repetir?", category: "help" },
  { id: "core-35", english: "Please speak slowly", spanish: "Hable despacio, por favor", category: "help" },
  { id: "core-36", english: "I don't speak Spanish well", spanish: "No hablo español bien", category: "help" },
  { id: "core-37", english: "Do you speak English?", spanish: "¿Habla inglés?", category: "help" },
  { id: "core-38", english: "What does this mean?", spanish: "¿Qué significa esto?", category: "help" },
  { id: "core-39", english: "How do you say...?", spanish: "¿Cómo se dice...?", category: "help" },
  { id: "core-40", english: "I'm learning Spanish", spanish: "Estoy aprendiendo español", category: "help" },
  
  // Questions (41-50)
  { id: "core-41", english: "What?", spanish: "¿Qué?", category: "questions" },
  { id: "core-42", english: "Who?", spanish: "¿Quién?", category: "questions" },
  { id: "core-43", english: "Where?", spanish: "¿Dónde?", category: "questions" },
  { id: "core-44", english: "When?", spanish: "¿Cuándo?", category: "questions" },
  { id: "core-45", english: "Why?", spanish: "¿Por qué?", category: "questions" },
  { id: "core-46", english: "How?", spanish: "¿Cómo?", category: "questions" },
  { id: "core-47", english: "How much?", spanish: "¿Cuánto?", category: "questions" },
  { id: "core-48", english: "How many?", spanish: "¿Cuántos?", category: "questions" },
  { id: "core-49", english: "Where is the bathroom?", spanish: "¿Dónde está el baño?", category: "questions" },
  { id: "core-50", english: "What time is it?", spanish: "¿Qué hora es?", category: "questions" },
  
  // Numbers 1-10 (51-60)
  { id: "core-51", english: "One", spanish: "Uno", category: "numbers" },
  { id: "core-52", english: "Two", spanish: "Dos", category: "numbers" },
  { id: "core-53", english: "Three", spanish: "Tres", category: "numbers" },
  { id: "core-54", english: "Four", spanish: "Cuatro", category: "numbers" },
  { id: "core-55", english: "Five", spanish: "Cinco", category: "numbers" },
  { id: "core-56", english: "Six", spanish: "Seis", category: "numbers" },
  { id: "core-57", english: "Seven", spanish: "Siete", category: "numbers" },
  { id: "core-58", english: "Eight", spanish: "Ocho", category: "numbers" },
  { id: "core-59", english: "Nine", spanish: "Nueve", category: "numbers" },
  { id: "core-60", english: "Ten", spanish: "Diez", category: "numbers" },
  
  // Numbers 11-20 (61-70)
  { id: "core-61", english: "Eleven", spanish: "Once", category: "numbers" },
  { id: "core-62", english: "Twelve", spanish: "Doce", category: "numbers" },
  { id: "core-63", english: "Thirteen", spanish: "Trece", category: "numbers" },
  { id: "core-64", english: "Fourteen", spanish: "Catorce", category: "numbers" },
  { id: "core-65", english: "Fifteen", spanish: "Quince", category: "numbers" },
  { id: "core-66", english: "Sixteen", spanish: "Dieciséis", category: "numbers" },
  { id: "core-67", english: "Seventeen", spanish: "Diecisiete", category: "numbers" },
  { id: "core-68", english: "Eighteen", spanish: "Dieciocho", category: "numbers" },
  { id: "core-69", english: "Nineteen", spanish: "Diecinueve", category: "numbers" },
  { id: "core-70", english: "Twenty", spanish: "Veinte", category: "numbers" },
  
  // Days of week (71-77)
  { id: "core-71", english: "Monday", spanish: "Lunes", category: "days" },
  { id: "core-72", english: "Tuesday", spanish: "Martes", category: "days" },
  { id: "core-73", english: "Wednesday", spanish: "Miércoles", category: "days" },
  { id: "core-74", english: "Thursday", spanish: "Jueves", category: "days" },
  { id: "core-75", english: "Friday", spanish: "Viernes", category: "days" },
  { id: "core-76", english: "Saturday", spanish: "Sábado", category: "days" },
  { id: "core-77", english: "Sunday", spanish: "Domingo", category: "days" },
  
  // Time expressions (78-85)
  { id: "core-78", english: "Today", spanish: "Hoy", category: "time" },
  { id: "core-79", english: "Tomorrow", spanish: "Mañana", category: "time" },
  { id: "core-80", english: "Yesterday", spanish: "Ayer", category: "time" },
  { id: "core-81", english: "Now", spanish: "Ahora", category: "time" },
  { id: "core-82", english: "Later", spanish: "Después", category: "time" },
  { id: "core-83", english: "Always", spanish: "Siempre", category: "time" },
  { id: "core-84", english: "Never", spanish: "Nunca", category: "time" },
  { id: "core-85", english: "Sometimes", spanish: "A veces", category: "time" },
  
  // Basic verbs (86-95)
  { id: "core-86", english: "I want", spanish: "Quiero", category: "verbs" },
  { id: "core-87", english: "I need", spanish: "Necesito", category: "verbs" },
  { id: "core-88", english: "I have", spanish: "Tengo", category: "verbs" },
  { id: "core-89", english: "I like", spanish: "Me gusta", category: "verbs" },
  { id: "core-90", english: "I can", spanish: "Puedo", category: "verbs" },
  { id: "core-91", english: "I am going", spanish: "Voy", category: "verbs" },
  { id: "core-92", english: "I am", spanish: "Soy / Estoy", category: "verbs" },
  { id: "core-93", english: "There is / There are", spanish: "Hay", category: "verbs" },
  { id: "core-94", english: "I would like", spanish: "Me gustaría", category: "verbs" },
  { id: "core-95", english: "I'm looking for", spanish: "Estoy buscando", category: "verbs" },
  
  // Common adjectives (96-100)
  { id: "core-96", english: "Good", spanish: "Bueno/a", category: "adjectives" },
  { id: "core-97", english: "Bad", spanish: "Malo/a", category: "adjectives" },
  { id: "core-98", english: "Big", spanish: "Grande", category: "adjectives" },
  { id: "core-99", english: "Small", spanish: "Pequeño/a", category: "adjectives" },
  { id: "core-100", english: "Hot / Cold", spanish: "Caliente / Frío", category: "adjectives" },
];

// Audio Pack 2 - Restaurant & Food (25+ phrases)
export const restaurantPhrases: AudioPhrase[] = [
  { id: "rest-1", english: "A table for two, please", spanish: "Una mesa para dos, por favor", category: "restaurant" },
  { id: "rest-2", english: "Can I see the menu?", spanish: "¿Puedo ver el menú?", category: "restaurant" },
  { id: "rest-3", english: "I'll take the chicken", spanish: "Voy a llevar el pollo", category: "restaurant" },
  { id: "rest-4", english: "Can I have water?", spanish: "¿Me puede dar agua?", category: "restaurant" },
  { id: "rest-5", english: "The check, please", spanish: "La cuenta, por favor", category: "restaurant" },
  { id: "rest-6", english: "What do you recommend?", spanish: "¿Qué me recomienda?", category: "restaurant" },
  { id: "rest-7", english: "I'm vegetarian", spanish: "Soy vegetariano/a", category: "restaurant" },
  { id: "rest-8", english: "I'm allergic to...", spanish: "Soy alérgico/a a...", category: "restaurant" },
  { id: "rest-9", english: "Without onion, please", spanish: "Sin cebolla, por favor", category: "restaurant" },
  { id: "rest-10", english: "The food is delicious", spanish: "La comida está deliciosa", category: "restaurant" },
  { id: "rest-11", english: "I would like a coffee", spanish: "Me gustaría un café", category: "restaurant" },
  { id: "rest-12", english: "Another one, please", spanish: "Otro, por favor", category: "restaurant" },
  { id: "rest-13", english: "Is it spicy?", spanish: "¿Es picante?", category: "restaurant" },
  { id: "rest-14", english: "How long will it take?", spanish: "¿Cuánto tiempo tardará?", category: "restaurant" },
  { id: "rest-15", english: "I have a reservation", spanish: "Tengo una reservación", category: "restaurant" },
  { id: "rest-16", english: "Can I pay by card?", spanish: "¿Puedo pagar con tarjeta?", category: "restaurant" },
  { id: "rest-17", english: "Keep the change", spanish: "Quédese con el cambio", category: "restaurant" },
  { id: "rest-18", english: "I'm still looking", spanish: "Todavía estoy mirando", category: "restaurant" },
  { id: "rest-19", english: "To go, please", spanish: "Para llevar, por favor", category: "restaurant" },
  { id: "rest-20", english: "For here", spanish: "Para comer aquí", category: "restaurant" },
  { id: "rest-21", english: "Can I have some more bread?", spanish: "¿Me puede dar más pan?", category: "restaurant" },
  { id: "rest-22", english: "That was excellent!", spanish: "¡Eso estuvo excelente!", category: "restaurant" },
  { id: "rest-23", english: "Where is the restroom?", spanish: "¿Dónde está el baño?", category: "restaurant" },
  { id: "rest-24", english: "I need a napkin", spanish: "Necesito una servilleta", category: "restaurant" },
  { id: "rest-25", english: "Could I have the dessert menu?", spanish: "¿Podría darme el menú de postres?", category: "restaurant" },
];

// Audio Pack 3 - Travel & Hotels (28+ phrases)
export const travelPhrases: AudioPhrase[] = [
  { id: "travel-1", english: "Where is the bus station?", spanish: "¿Dónde está la estación de autobuses?", category: "travel" },
  { id: "travel-2", english: "I have a reservation", spanish: "Tengo una reservación", category: "travel" },
  { id: "travel-3", english: "I'd like to check in", spanish: "Me gustaría registrarme", category: "travel" },
  { id: "travel-4", english: "I'd like to check out", spanish: "Me gustaría hacer el check-out", category: "travel" },
  { id: "travel-5", english: "Where is gate number...?", spanish: "¿Dónde está la puerta número...?", category: "travel" },
  { id: "travel-6", english: "My flight is delayed", spanish: "Mi vuelo está retrasado", category: "travel" },
  { id: "travel-7", english: "I lost my luggage", spanish: "Perdí mi equipaje", category: "travel" },
  { id: "travel-8", english: "How do I get to...?", spanish: "¿Cómo llego a...?", category: "travel" },
  { id: "travel-9", english: "Is breakfast included?", spanish: "¿El desayuno está incluido?", category: "travel" },
  { id: "travel-10", english: "Is there WiFi?", spanish: "¿Hay WiFi?", category: "travel" },
  { id: "travel-11", english: "What's the WiFi password?", spanish: "¿Cuál es la contraseña del WiFi?", category: "travel" },
  { id: "travel-12", english: "Can I have a room with a view?", spanish: "¿Puedo tener una habitación con vista?", category: "travel" },
  { id: "travel-13", english: "The room is not clean", spanish: "La habitación no está limpia", category: "travel" },
  { id: "travel-14", english: "I need extra towels", spanish: "Necesito más toallas", category: "travel" },
  { id: "travel-15", english: "What time is checkout?", spanish: "¿A qué hora es el check-out?", category: "travel" },
  { id: "travel-16", english: "How far is it?", spanish: "¿Qué tan lejos está?", category: "travel" },
  { id: "travel-17", english: "One ticket to..., please", spanish: "Un boleto a..., por favor", category: "travel" },
  { id: "travel-18", english: "Round trip or one way?", spanish: "¿Ida y vuelta o solo ida?", category: "travel" },
  { id: "travel-19", english: "What platform?", spanish: "¿Qué andén?", category: "travel" },
  { id: "travel-20", english: "Is this seat taken?", spanish: "¿Está ocupado este asiento?", category: "travel" },
  { id: "travel-21", english: "Can you take me to this address?", spanish: "¿Puede llevarme a esta dirección?", category: "travel" },
  { id: "travel-22", english: "Please stop here", spanish: "Pare aquí, por favor", category: "travel" },
  { id: "travel-23", english: "How much to the airport?", spanish: "¿Cuánto cuesta al aeropuerto?", category: "travel" },
  { id: "travel-24", english: "I need a taxi", spanish: "Necesito un taxi", category: "travel" },
  { id: "travel-25", english: "Where can I rent a car?", spanish: "¿Dónde puedo alquilar un carro?", category: "travel" },
  { id: "travel-26", english: "I have a connecting flight", spanish: "Tengo un vuelo de conexión", category: "travel" },
  { id: "travel-27", english: "Where is the hotel lobby?", spanish: "¿Dónde está el vestíbulo del hotel?", category: "travel" },
  { id: "travel-28", english: "Can you call room service?", spanish: "¿Puede llamar al servicio de habitación?", category: "travel" },
];

// Audio Pack 4 - Emergencies (18+ phrases)
export const emergencyPhrases: AudioPhrase[] = [
  { id: "emerg-1", english: "Call the police!", spanish: "¡Llame a la policía!", category: "emergency" },
  { id: "emerg-2", english: "I need a doctor", spanish: "Necesito un doctor", category: "emergency" },
  { id: "emerg-3", english: "Call an ambulance", spanish: "Llame una ambulancia", category: "emergency" },
  { id: "emerg-4", english: "Help!", spanish: "¡Ayuda!", category: "emergency" },
  { id: "emerg-5", english: "There's been an accident", spanish: "Ha habido un accidente", category: "emergency" },
  { id: "emerg-6", english: "I'm lost", spanish: "Estoy perdido/a", category: "emergency" },
  { id: "emerg-7", english: "I lost my passport", spanish: "Perdí mi pasaporte", category: "emergency" },
  { id: "emerg-8", english: "I was robbed", spanish: "Me robaron", category: "emergency" },
  { id: "emerg-9", english: "It's an emergency", spanish: "Es una emergencia", category: "emergency" },
  { id: "emerg-10", english: "Where is the hospital?", spanish: "¿Dónde está el hospital?", category: "emergency" },
  { id: "emerg-11", english: "I feel sick", spanish: "Me siento mal", category: "emergency" },
  { id: "emerg-12", english: "I need medicine", spanish: "Necesito medicina", category: "emergency" },
  { id: "emerg-13", english: "It hurts here", spanish: "Me duele aquí", category: "emergency" },
  { id: "emerg-14", english: "Where is the embassy?", spanish: "¿Dónde está la embajada?", category: "emergency" },
  { id: "emerg-15", english: "I need to report a theft", spanish: "Necesito reportar un robo", category: "emergency" },
  { id: "emerg-16", english: "Please call for help", spanish: "Por favor llame por ayuda", category: "emergency" },
  { id: "emerg-17", english: "I have an allergy", spanish: "Tengo una alergia", category: "emergency" },
  { id: "emerg-18", english: "Is there a pharmacy nearby?", spanish: "¿Hay una farmacia cerca?", category: "emergency" },
];

// Audio Pack 5 - Shopping (22+ phrases)
export const shoppingPhrases: AudioPhrase[] = [
  { id: "shop-1", english: "How much does this cost?", spanish: "¿Cuánto cuesta esto?", category: "shopping" },
  { id: "shop-2", english: "Can I try this on?", spanish: "¿Puedo probarme esto?", category: "shopping" },
  { id: "shop-3", english: "Do you have this in a larger size?", spanish: "¿Tiene esto en una talla más grande?", category: "shopping" },
  { id: "shop-4", english: "Do you have this in another color?", spanish: "¿Tiene esto en otro color?", category: "shopping" },
  { id: "shop-5", english: "Where is the fitting room?", spanish: "¿Dónde está el probador?", category: "shopping" },
  { id: "shop-6", english: "I'm just looking", spanish: "Solo estoy mirando", category: "shopping" },
  { id: "shop-7", english: "I'll take it", spanish: "Me lo llevo", category: "shopping" },
  { id: "shop-8", english: "Do you accept credit cards?", spanish: "¿Aceptan tarjetas de crédito?", category: "shopping" },
  { id: "shop-9", english: "Can I pay in cash?", spanish: "¿Puedo pagar en efectivo?", category: "shopping" },
  { id: "shop-10", english: "Is there a discount?", spanish: "¿Hay descuento?", category: "shopping" },
  { id: "shop-11", english: "It's too expensive", spanish: "Es muy caro", category: "shopping" },
  { id: "shop-12", english: "Can you give me a better price?", spanish: "¿Puede darme un mejor precio?", category: "shopping" },
  { id: "shop-13", english: "I need a receipt", spanish: "Necesito un recibo", category: "shopping" },
  { id: "shop-14", english: "Can I return this?", spanish: "¿Puedo devolver esto?", category: "shopping" },
  { id: "shop-15", english: "I want to exchange this", spanish: "Quiero cambiar esto", category: "shopping" },
  { id: "shop-16", english: "It doesn't fit", spanish: "No me queda", category: "shopping" },
  { id: "shop-17", english: "Where can I find...?", spanish: "¿Dónde puedo encontrar...?", category: "shopping" },
  { id: "shop-18", english: "What time do you close?", spanish: "¿A qué hora cierran?", category: "shopping" },
  { id: "shop-19", english: "Is this on sale?", spanish: "¿Está en oferta?", category: "shopping" },
  { id: "shop-20", english: "Can you wrap this as a gift?", spanish: "¿Puede envolver esto para regalo?", category: "shopping" },
  { id: "shop-21", english: "I need a bag", spanish: "Necesito una bolsa", category: "shopping" },
  { id: "shop-22", english: "Do you have anything cheaper?", spanish: "¿Tiene algo más barato?", category: "shopping" },
];

// Audio Pack 6 - Workplace (24+ phrases)
export const workplacePhrases: AudioPhrase[] = [
  { id: "work-1", english: "Good morning, colleagues", spanish: "Buenos días, colegas", category: "workplace" },
  { id: "work-2", english: "I have a meeting at...", spanish: "Tengo una reunión a las...", category: "workplace" },
  { id: "work-3", english: "Can you send me an email?", spanish: "¿Puede enviarme un correo?", category: "workplace" },
  { id: "work-4", english: "I'm calling about...", spanish: "Llamo por...", category: "workplace" },
  { id: "work-5", english: "What's the deadline?", spanish: "¿Cuál es la fecha límite?", category: "workplace" },
  { id: "work-6", english: "I'll finish this by Friday", spanish: "Terminaré esto para el viernes", category: "workplace" },
  { id: "work-7", english: "Let me check my calendar", spanish: "Déjeme revisar mi calendario", category: "workplace" },
  { id: "work-8", english: "I'll be on vacation next week", spanish: "Estaré de vacaciones la próxima semana", category: "workplace" },
  { id: "work-9", english: "Can we reschedule?", spanish: "¿Podemos reprogramar?", category: "workplace" },
  { id: "work-10", english: "I work in...", spanish: "Trabajo en...", category: "workplace" },
  { id: "work-11", english: "What do you do?", spanish: "¿A qué se dedica?", category: "workplace" },
  { id: "work-12", english: "I'm the manager", spanish: "Soy el/la gerente", category: "workplace" },
  { id: "work-13", english: "Here's my business card", spanish: "Aquí está mi tarjeta de presentación", category: "workplace" },
  { id: "work-14", english: "Can I leave early today?", spanish: "¿Puedo salir temprano hoy?", category: "workplace" },
  { id: "work-15", english: "The printer is not working", spanish: "La impresora no funciona", category: "workplace" },
  { id: "work-16", english: "Where is the conference room?", spanish: "¿Dónde está la sala de conferencias?", category: "workplace" },
  { id: "work-17", english: "I need to make copies", spanish: "Necesito hacer copias", category: "workplace" },
  { id: "work-18", english: "I'll follow up on this", spanish: "Le daré seguimiento a esto", category: "workplace" },
  { id: "work-19", english: "Do you have any questions?", spanish: "¿Tiene alguna pregunta?", category: "workplace" },
  { id: "work-20", english: "Let's take a break", spanish: "Tomemos un descanso", category: "workplace" },
  { id: "work-21", english: "I agree with you", spanish: "Estoy de acuerdo contigo", category: "workplace" },
  { id: "work-22", english: "I respectfully disagree", spanish: "Respetuosamente no estoy de acuerdo", category: "workplace" },
  { id: "work-23", english: "Could you clarify that?", spanish: "¿Podría aclarar eso?", category: "workplace" },
  { id: "work-24", english: "Let me get back to you", spanish: "Déjeme responderle después", category: "workplace" },
];

// Audio Pack 7 - Phone Calls (18+ phrases)
export const phoneCallPhrases: AudioPhrase[] = [
  { id: "phone-1", english: "Hello, who is calling?", spanish: "Hola, ¿quién habla?", category: "phone" },
  { id: "phone-2", english: "May I speak with...?", spanish: "¿Puedo hablar con...?", category: "phone" },
  { id: "phone-3", english: "Please hold", spanish: "Por favor espere", category: "phone" },
  { id: "phone-4", english: "I'll transfer your call", spanish: "Le voy a transferir la llamada", category: "phone" },
  { id: "phone-5", english: "The line is busy", spanish: "La línea está ocupada", category: "phone" },
  { id: "phone-6", english: "Can I take a message?", spanish: "¿Puedo tomar un mensaje?", category: "phone" },
  { id: "phone-7", english: "Can you call back later?", spanish: "¿Puede llamar más tarde?", category: "phone" },
  { id: "phone-8", english: "I can't hear you well", spanish: "No le escucho bien", category: "phone" },
  { id: "phone-9", english: "The connection is bad", spanish: "La conexión está mala", category: "phone" },
  { id: "phone-10", english: "I'll call you back", spanish: "Le devuelvo la llamada", category: "phone" },
  { id: "phone-11", english: "What's your phone number?", spanish: "¿Cuál es su número de teléfono?", category: "phone" },
  { id: "phone-12", english: "You have the wrong number", spanish: "Tiene el número equivocado", category: "phone" },
  { id: "phone-13", english: "He/She is not available", spanish: "No está disponible", category: "phone" },
  { id: "phone-14", english: "I'm returning your call", spanish: "Estoy devolviendo su llamada", category: "phone" },
  { id: "phone-15", english: "Thank you for calling", spanish: "Gracias por llamar", category: "phone" },
  { id: "phone-16", english: "Goodbye, take care", spanish: "Adiós, cuídese", category: "phone" },
  { id: "phone-17", english: "Is this a good time?", spanish: "¿Es buen momento?", category: "phone" },
  { id: "phone-18", english: "Let me write that down", spanish: "Déjeme anotar eso", category: "phone" },
];

// Audio Pack 8 - Meeting People (22+ phrases)
export const meetingPeoplePhrases: AudioPhrase[] = [
  { id: "meet-1", english: "Nice to meet you", spanish: "Mucho gusto", category: "meeting" },
  { id: "meet-2", english: "What's your name?", spanish: "¿Cómo te llamas?", category: "meeting" },
  { id: "meet-3", english: "My name is...", spanish: "Me llamo...", category: "meeting" },
  { id: "meet-4", english: "Where are you from?", spanish: "¿De dónde eres?", category: "meeting" },
  { id: "meet-5", english: "I'm from...", spanish: "Soy de...", category: "meeting" },
  { id: "meet-6", english: "What do you do for work?", spanish: "¿A qué te dedicas?", category: "meeting" },
  { id: "meet-7", english: "How old are you?", spanish: "¿Cuántos años tienes?", category: "meeting" },
  { id: "meet-8", english: "Do you have children?", spanish: "¿Tienes hijos?", category: "meeting" },
  { id: "meet-9", english: "Are you married?", spanish: "¿Estás casado/a?", category: "meeting" },
  { id: "meet-10", english: "This is my friend...", spanish: "Este es mi amigo/a...", category: "meeting" },
  { id: "meet-11", english: "How long have you been here?", spanish: "¿Cuánto tiempo llevas aquí?", category: "meeting" },
  { id: "meet-12", english: "What are your hobbies?", spanish: "¿Cuáles son tus pasatiempos?", category: "meeting" },
  { id: "meet-13", english: "Would you like to have coffee?", spanish: "¿Te gustaría tomar un café?", category: "meeting" },
  { id: "meet-14", english: "Let's keep in touch", spanish: "Mantengamos el contacto", category: "meeting" },
  { id: "meet-15", english: "Can I have your number?", spanish: "¿Me puedes dar tu número?", category: "meeting" },
  { id: "meet-16", english: "It was nice talking to you", spanish: "Fue un placer hablar contigo", category: "meeting" },
  { id: "meet-17", english: "See you again soon", spanish: "Nos vemos pronto", category: "meeting" },
  { id: "meet-18", english: "What brings you here?", spanish: "¿Qué te trae por aquí?", category: "meeting" },
  { id: "meet-19", english: "Have you been here before?", spanish: "¿Has estado aquí antes?", category: "meeting" },
  { id: "meet-20", english: "I like your...", spanish: "Me gusta tu...", category: "meeting" },
  { id: "meet-21", english: "That's interesting!", spanish: "¡Qué interesante!", category: "meeting" },
  { id: "meet-22", english: "Really? Tell me more", spanish: "¿En serio? Cuéntame más", category: "meeting" },
];

// Audio Pack 9 - Full Conversations (12 dialogue scenarios)
export const conversationPhrases: AudioPhrase[] = [
  // Coffee shop conversation
  { id: "conv-1", english: "Hi! A coffee, please", spanish: "¡Hola! Un café, por favor", category: "conversation" },
  { id: "conv-2", english: "With milk or black?", spanish: "¿Con leche o negro?", category: "conversation" },
  { id: "conv-3", english: "With a little milk, please", spanish: "Con un poco de leche, por favor", category: "conversation" },
  
  // Meeting someone new
  { id: "conv-4", english: "Hi, I'm Maria. And you?", spanish: "Hola, soy María. ¿Y tú?", category: "conversation" },
  { id: "conv-5", english: "I'm John. Nice to meet you", spanish: "Soy Juan. Mucho gusto", category: "conversation" },
  { id: "conv-6", english: "Are you from here?", spanish: "¿Eres de aquí?", category: "conversation" },
  
  // Making plans
  { id: "conv-7", english: "What are you doing this weekend?", spanish: "¿Qué haces este fin de semana?", category: "conversation" },
  { id: "conv-8", english: "Nothing special. Why?", spanish: "Nada especial. ¿Por qué?", category: "conversation" },
  { id: "conv-9", english: "Want to go to the movies?", spanish: "¿Quieres ir al cine?", category: "conversation" },
  { id: "conv-10", english: "Sure! What time?", spanish: "¡Claro! ¿A qué hora?", category: "conversation" },
  
  // At a party
  { id: "conv-11", english: "Great party, isn't it?", spanish: "Buena fiesta, ¿no?", category: "conversation" },
  { id: "conv-12", english: "Yes! The music is great", spanish: "¡Sí! La música está genial", category: "conversation" },
];

// Get all phrases for a category
export const getPhrasesByCategory = (categoryId: string): AudioPhrase[] => {
  switch (categoryId) {
    case "core-phrases":
      return corePhrases;
    case "restaurant-food":
      return restaurantPhrases;
    case "travel-hotels":
      return travelPhrases;
    case "emergencies":
      return emergencyPhrases;
    case "shopping":
      return shoppingPhrases;
    case "workplace":
      return workplacePhrases;
    case "phone-calls":
      return phoneCallPhrases;
    case "meeting-people":
      return meetingPeoplePhrases;
    case "full-conversations":
      return conversationPhrases;
    default:
      return corePhrases;
  }
};

// Get all phrases
export const getAllPhrases = (): AudioPhrase[] => [
  ...corePhrases,
  ...restaurantPhrases,
  ...travelPhrases,
  ...emergencyPhrases,
  ...shoppingPhrases,
  ...workplacePhrases,
  ...phoneCallPhrases,
  ...meetingPeoplePhrases,
  ...conversationPhrases,
];
