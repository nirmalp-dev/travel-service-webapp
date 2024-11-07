const action_name = "action_recommend_travel_plan";
const rasa_server_url = "http://localhost:5005/webhooks/rest/webhook";
let sender_id = uuidv4();
const token = localStorage.getItem('token');

// If no token is found, handle it appropriately (e.g., use a fallback value or throw an error)
if (token) {
    sender_id = token;  // Use the token as sender_id
    console.log('Sender ID (Token):', sender_id);
    // Now you can use sender_id in your request or further logic
}
