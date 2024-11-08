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
        city_name = tracker.get_slot("destination")  # Could be a specific city or a category (like 'beach')
        days_slot = tracker.get_slot('Nooftraveldays')
        days = int(re.search(r'\d+', days_slot).group()) if days_slot else None

        # Define a mapping for broad categories like beach, desert, etc.
        category_to_destination = {
            "beach": ["Bangkok"],
            "desert": ["Cairo", "Dubai"],
            "city": ["New York", "Tokyo", "Paris", "Singapore"],
            "europe": ["Paris", "Rome", "London"],
            # Add more mappings as needed
        }

        # Check if the user input matches a category
        if city_name.lower() in category_to_destination:
            possible_destinations = category_to_destination[city_name.lower()]
        else:
            # If no category match, assume it's a specific city
            possible_destinations = [city_name]

        # Fetch travel packages from the API
        response = requests.get(url)
        if response.status_code == 200:
            travel_packages = response.json()  # Parse JSON response
            print(travel_packages)
            # Find matching travel plans based on city name or category (case-insensitive)
            matching_packages = [
                package for package in travel_packages
                if any(destination.lower() in package["destination"].lower().split(',')[0] for destination in possible_destinations)
                and package["tripdays"] == days
            ]

            if matching_packages:
                # Prepare a response message
                response_messages = []
                for package in matching_packages:
                    web_link = f"http://localhost:3000/course-details/{str(package['_id'])}"
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
        print("order_id",order_id)
        response = requests.get(url, headers = headers)
        if response.status_code == 200:
            order_history = response.json()  # Parse JSON response
            # print("Order History:",order_history)
            response_messages = []
            for order in order_history:
                if order_id!=None and order_id != order['id']:
                    continue
                # print("order",order['items'])
                order_detail = order['items'][0]
                # print("order_details", order_detail)
                package_details = order_detail['package_details']
                # print("package_details",package_details)

                    

                destination = package_details['destination']
                tripdays = package_details['tripdays']
                status = order['status']
                
                print("Order Details:",order_detail)
                web_link = f"http://localhost:3000/order"
                message = (
                    f"I found a travel plan to {destination} for {tripdays} days. "
                    f"\n<br/>"
                    f"\n<br/>"
                    f"It's Status is {status}"
                    f"\n<br/>"
                    f"\n<br/>"
                    f'\n<form action="http://127.0.0.1:8000/upload" method="post" enctype="multipart/form-data" target="_blank"> <label for="file">Upload Image:</label><br><br> <input type="file" id="file" name="file"><br><br> <input type="submit" value="Submit"></form>'
                    f'\n<a href="{web_link}" target="_blank" class="button-link">View Order</a>'
                )
                response_messages.append(message)

            # Send the response to the user
            dispatcher.utter_message(text="\n\n".join(response_messages))
        else:
            # Handle case where API returns an error
            dispatcher.utter_message(text="Sorry, there was a problem fetching travel orders.")
            
        return []
    
class ActionSupportQuery(Action):
    
    def name(self):
        return "action_support_query"

    def run(self, dispatcher, tracker, domain):
        response_messages = []

        sender_id = tracker.current_state()['sender_id']
        order_id = tracker.get_slot('order_id')
        url = "http://127.0.0.1:8000/raise/ticket"
        headers = {"Authorization": f"Bearer {sender_id}"}
        print("order_id",order_id)
        message = (
            f"Please provide the description and image for your query. "
            f'\n<form action="http://127.0.0.1:8000/upload" method="post" enctype="multipart/form-data" target="_blank"> <label for="file">Upload Image:</label><br><br> <input type="file" id="file" name="file"><br><br> <input type="submit" value="Submit"></form>'
        )
        response_messages.append(message)

        # Send the response to the user
        dispatcher.utter_message(text="\n\n".join(response_messages))
        return []
    
class ActionResetSlots(Action):
    def name(self):
        return "action_reset_slots"

    def run(self, dispatcher, tracker, domain):
        # Clearing all slots
        return [SlotSet(slot, None) for slot in tracker.slots]