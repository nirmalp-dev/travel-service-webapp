import json
import requests
import re
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionRecommendTravelPlan(Action):

    def name(self):
        return "action_recommend_travel_plan"

    def run(self, dispatcher, tracker, domain):
        # Fetch user input from slots
        url = "http://127.0.0.1:8000/packages/"
        destination = tracker.get_slot("destination")  # Could be a specific city or a category (like 'beach')
        days_slot = tracker.get_slot('Nooftraveldays')
        days = int(re.search(r'\d+', days_slot).group()) if days_slot else None
        events = tracker.events
        user_ls = []
        user_messages = [e for e in events if e['event'] == 'user']
        destination_offerings = []
        print("nirmal")
        response = requests.get(url)
        if response.status_code == 200:
            travel_packages = response.json()
            destination_offerings = [pack['destination'] for pack in travel_packages]
        # Log or process previous user messages
        for msg in user_messages:
            print(f"User said: {msg['text']}")
            user_ls.append(msg['text'])
        openai_res = call_openai_api(
            f"The below is the history of user messages to a travel chatbot, you are a part of bot action. "
            f"{user_ls}. I have following destinations to offer to user,{destination_offerings} can you recommend max 2 destination , if i have destination which matches exactly give that destination only"
            f"and give reasoning as well in for following json format,  "
            f'{{"reason":"<give reasoning why you recommended these in brief>","destination1":"<destination 1, give exact name from list provided above>","destination2","<destination 2, give exact name from list provided above>"}}'
        )
        print("openai_res",openai_res)
        de1 = openai_res.get('destination1')
        de2 = openai_res.get('destination2')
        reason = openai_res.get('reason')
        possible_destinations=[de1, de2]

        print(possible_destinations)
        if response.status_code == 200:
            travel_packages = response.json()  # Parse JSON response
            # print(travel_packages)
            # Find matching travel plans based on city name or category (case-insensitive)
            matching_packages = [
                package for package in travel_packages
                if any(destination.lower() in package["destination"].lower() for destination in possible_destinations)
                   and package["tripdays"] == days
            ]

            if matching_packages:
                # Prepare a response message
                response_messages = []
                for package in matching_packages:
                    web_link = f"http://localhost:3000/package-details/{str(package['_id'])}"
                    message = (
                        f"I found a travel plan to {package['destination']} for {package['tripdays']} days. "
                        f"\n<br/>"
                        f"\n<br/>"
                        f"It costs ${package['cost']} and includes: {package['description']} "
                        f"\nActivities include: {', '.join(day['activities'] for day in package['days'])}. "
                        f"\n<br/>"
                        f"\n<br/>"
                        f'\n<a href="{web_link}" target="_blank" class="button-link">View Package</a>'
                    )
                    response_messages.append(message)

                # Send the response to the user
                dispatcher.utter_message(text="\n\n".join(response_messages))
                dispatcher.utter_message(text=f"{reason}")

            else:
                dispatcher.utter_message(text="Sorry, I couldn't find any travel packages matching your criteria.")
        else:
            # Handle case where API returns an error
            dispatcher.utter_message(text="Sorry, there was a problem fetching travel packages.")
        return []


class Action_Order_Tracker(Action):

    def name(self):
        return "action_order_tracker"

    def run(self, dispatcher, tracker, domain):

        sender_id = tracker.current_state()['sender_id']
        order_id = tracker.get_slot('order_id')
        url = "http://127.0.0.1:8000/order/list"
        headers = {"Authorization": f"Bearer {sender_id}"}
        # print("order_id",order_id)
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            order_history = response.json()  # Parse JSON response
            # print("Order History:",order_history)
            response_messages = []
            for order in order_history:
                if order_id != None and order_id != order['id']:
                    continue
                # print("order",order['items'])
                order_detail = order['items'][0]
                # print("order_details", order_detail)
                package_details = order_detail['package_details']
                # print("package_details",package_details)

                destination = package_details['destination']
                tripdays = package_details['tripdays']
                status = order['status']

                # print("Order Details:",order_detail)
                web_link = f"http://localhost:3000/order"
                message = (
                    f"I found a travel plan to {destination} for {tripdays} days. "
                    f"\n<br/>"
                    f"\n<br/>"
                    f"It's Status is {status}"
                    f"\n<br/>"
                    f"\n<br/>"
                    f'\n<a href="{web_link}" target="_blank" class="button-link">View Order</a>'
                )
                response_messages.append(message)

            # Send the response to the user
            dispatcher.utter_message(text="\n\n".join(response_messages))
        else:
            # Handle case where API returns an error
            dispatcher.utter_message(text="Sorry, there was a problem fetching travel orders.")
            
        return []

class ActionOrderCancellation(Action):
    def name(self):
        return "action_cancel_booking"
    
    def run(self, dispatcher, tracker, domain):
              
        base_url = "http://127.0.0.1:8000"
        booking_number=tracker.get_slot('booking_number')
        #order_id = "your_order_id"  # Replace with actual order ID
        new_status = "cancelled"    # Assuming "cancelled" is the status you want to set
        # Send the PUT request
        response = requests.put(
        f"{base_url}/order/update-status/{booking_number}",
        params={"status": new_status}
        )
        # Check the response
        if response.status_code == 200:
            dispatcher.utter_message(text="Your booking has been cancelled successfully.")
            #print("Order status updated successfully!")
        else:
            dispatcher.utter_message(text="Your booking has not been cancelled due to incorrect booking number.")
    
        return []
    
class ActionResetSlots(Action):
    def name(self):
        return "action_reset_slots"

    def run(self, dispatcher, tracker, domain):
        # Clearing all slots
        return [SlotSet(slot, None) for slot in tracker.slots]


def call_openai_api(prompt: str) -> dict:
    api_key = "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"  # Replace with actual key
    url = "https://api.openai.com/v1/chat/completions"

    # user_ls = [
    #     "I want to travel somewhere in South East Asia and have an adventurous trip for 7 days."
    # ]
    # destination_offerings = [
    #     'Paris, France', 'Tokyo, Japan', 'Rome, Italy', 'Bangkok, Thailand',
    #     'Singapore', 'Seoul, South Korea'
    # ]
    #
    # prompt = (
    #     f"The below is the history of user messages to a travel chatbot: {user_ls}. "
    #     f"I have the following destinations to offer to the user: {destination_offerings}. "
    #     "Can you recommend a maximum of 2 destinations and give reasoning in the following JSON format: "
    #     '{"reason":"<brief reasoning>","destination1":"<destination 1>","destination2":"<destination 2>"}'
    # )

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo",  # Use a valid model
        "messages": [
            {"role": "system", "content": "You are a travel assistant."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 200,
        "temperature": 0.7
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response.raise_for_status()  # Raise an exception for HTTP errors
        completion = response.json()
        return json.loads(completion['choices'][0]['message']['content'].strip())
    except requests.exceptions.RequestException as e:
        print(e)
        return {"error": f"Request failed: {str(e)}"}
    except KeyError:
        print("KeyError: Invalid response format")
        return {"error": "Invalid response format from OpenAI API"}