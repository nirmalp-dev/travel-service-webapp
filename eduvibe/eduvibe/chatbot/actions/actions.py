# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa-pro/concepts/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
import json
import requests
from rasa_sdk import Action
from rasa_sdk.interfaces import Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import re

class ActionRecommendTravelPlan(Action):

    def name(self):
        return "action_recommend_travel_plan"

    def run(self, dispatcher, tracker, domain):
        # Fetch user input from slots
        url = "http://127.0.0.1:8000/packages/"
        city_name = tracker.get_slot("destination")  # Assuming slot 'destination' only contains the city
        days_slot = tracker.get_slot('days')
        days = int(re.search(r'\d+', days_slot).group()) if days_slot else None

        # Load the travel packages from the JSON file
        response = requests.get(url)
        if response.status_code == 200:
            travel_packages = response.json()  # Parse JSON response
        # Find matching travel plans based on city name (case-insensitive)
            matching_packages = [
                package for package in travel_packages
                if city_name.lower() in package["destination"].lower().split(',')[0] and package["tripdays"] == days
            ]

            if matching_packages:
                # Prepare a response message
                response_messages = []
                for package in matching_packages:
                    web_link = f"http://localhost:3000/package-details/{str(package['_id'])}"
                    message = (
                        f"I found a travel plan to {package['destination']} for {package['tripdays']} days. "
                        f"It costs ${package['cost']} and includes: {package['description']} "
                        f"\nActivities include: {', '.join(day['activities'] for day in package['days'])}. "
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

# class ActionResetSlots(Action):
#     def name(self) -> str:
#         print("ActionResetSlots called --------------")
#         return "reset_slots"

#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
#         # Resetting the slots
#         destination = tracker.get_slot("destination")
#         days = tracker.get_slot("days")
#         print(f"Resetting slots: destination={destination}, days={days}")
#         return [SlotSet("destination", None), 
#                 SlotSet("days", None), 
#                 SlotSet("travel_date", None)]