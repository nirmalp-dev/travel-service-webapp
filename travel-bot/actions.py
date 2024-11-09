from email import headerregistry
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
            matching_packages = [
                package for package in travel_packages
                if any(destination.lower() in package["destination"].lower().split(',')[0] for destination in possible_destinations)
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
        response = requests.get(url, headers = headers)
        if response.status_code == 200:
            order_history = response.json()  
            response_messages = []
            for order in order_history:
                if order_id!=None and order_id != order['id']:
                    continue
                order_detail = order['items'][0]
                package_details = order_detail['package_details']
                    

                destination = package_details['destination']
                tripdays = package_details['tripdays']
                status = order['status']
                
                #print("Order Details:",order_detail)
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
        new_status = "cancelled"    # Assuming "cancelled" is the status you want to set
        # Send the PUT request
        refund = "processed"
        
        response = requests.put(
        f"{base_url}/order/update-status/{booking_number}",
        params={"status": new_status}
        )
        if response.status_code == 200:
            dispatcher.utter_message(text="Your booking has been cancelled successfully.")
            dispatcher.utter_message(text="Your refund has been initiated.")
        else:
            dispatcher.utter_message(text="Your booking has not been cancelled due to incorrect booking number.")
    
        return []

class Action_Fraud_Detection(Action):
    
    def name(self):
        return "action_fraud_detection"

    def run(self, dispatcher, tracker, domain):      
        sender_id = tracker.current_state()['sender_id']
        order_id = tracker.get_slot('order_number')
        url = "http://127.0.0.1:8000/order/list"
        ticketraiseurl="http://127.0.0.1:8000/ticket/raise"
        headers = {"Authorization": f"Bearer {sender_id}"}
        events = tracker.events
        user_messages = [e for e in events if e['event'] == 'user']   
        for msg in user_messages:
            print(f"User said: {msg['text']}")
            
        response = requests.get(url, headers = headers)
        if response.status_code == 200:
            order_history = response.json()  
            response_messages = []
            for order in order_history:
                if order_id!=None and order_id != order['id']:
                    continue
                if(order['status']=='cancelled' & order['refund']== 'processed'):
                    ticket_data = {
                            "subject": "Potential Fraud: Cancelled Order",
                            "description": f"Order ID: {order['id']} was cancelled. Potential fraud case.",
                            "priority": "High"
                        }
                    ticket_response = requests.post(
                            ticketraiseurl,
                            json=ticket_data,
                            headers= headers
                        )             
                    ticketinfo= ticket_response.json()
                    dispatcher.utter_message(text="Refund has already been provided. I will need to escalate it to human agent to discuss further.")
                    dispatcher.utter_message(text=f"I have raised a ticket. Ticket number is {ticketinfo['id']}")
                elif(order['status']=='cancelled' & order['refund'] != 'processed'):
                    dispatcher.utter_message(text="Refund request has been processed. You will receive your refund in short period.")
                else:
                    dispatcher.utter_message(text="Refund can be initiated only for cancelled bookings. Please cancel order/booking before asking for refund.")                    
        else:
            dispatcher.utter_message(text="Sorry, there was a problem with refund process")
            
        return []

    
class ActionResetSlots(Action):
    def name(self):
        return "action_reset_slots"

    def run(self, dispatcher, tracker, domain):
        # Clearing all slots
        return [SlotSet(slot, None) for slot in tracker.slots]