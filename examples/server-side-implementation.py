
# This is a conceptual example for a server-side A/B testing implementation using Python.
# In a server-side setup, the variant is determined on the server before sending
# the HTML to the client, preventing any "flicker" that can occur with client-side tests.

import hashlib
import random

# --- Configuration ---
EXPERIMENTS = {
    "landing_page_test": {
        "variants": {
            "a": {"traffic_allocation": 50},  # 50% traffic
            "b": {"traffic_allocation": 50},  # 50% traffic
        },
        "salt": "your_unique_salt_for_this_experiment",
    }
}

# --- Core Logic ---

def get_user_id(request):
    """
    Simulates getting a user identifier.
    In a real app, this might come from a session cookie, user database, etc.
    """
    # For demonstration, generate a random ID
    return hashlib.sha256(str(random.random()).encode()).hexdigest()

def assign_variant(user_id, experiment_name):
    """
    Assigns a user to a specific variant for a given experiment.
    Uses a consistent hashing approach.
    """
    experiment_config = EXPERIMENTS.get(experiment_name)
    if not experiment_config:
        print(f"Error: Experiment '{experiment_name}' not found.")
        return "control"  # Fallback

    # Concatenate user ID with a salt to ensure unique hash for this experiment
    hashed_input = f"{user_id}-{experiment_config['salt']}".encode('utf-8')
    # Use MD5 or SHA1 for performance, SHA256 for stronger distribution if needed
    hash_value = int(hashlib.md5(hashed_input).hexdigest(), 16)

    # Distribute based on modulo and traffic allocation
    bucket = hash_value % 100  # Bucket into 100 segments

    cumulative_allocation = 0
    for variant, details in experiment_config["variants"].items():
        cumulative_allocation += details["traffic_allocation"]
        if bucket < cumulative_allocation:
            print(f"User {user_id} assigned to variant {variant} for {experiment_name}.")
            return variant

    return "control"  # Fallback if no variant is assigned (e.g., misconfiguration)

# --- Example Usage (Conceptual) ---

def render_landing_page(request):
    user_id = get_user_id(request)
    assigned_variant = assign_variant(user_id, "landing_page_test")

    # In a real web framework (like Flask, Django, FastAPI), you would
    # load a template based on the assigned_variant.
    if assigned_variant == "a":
        # Load and return HTML for Version A
        return "<html><body><h1>Welcome to Version A!</h1>...</body></html>"
    elif assigned_variant == "b":
        # Load and return HTML for Version B
        return "<html><body><h1>Welcome to Version B!</h1>...</body></html>"
    else:
        # Load and return HTML for Control/Default
        return "<html><body><h1>Welcome (Default)!</h1>...</body></html>"

# This part would be part of your web application's routes
# For demonstration:
if __name__ == "__main__":
    # Simulate a few requests
    for i in range(5):
        print(f"--- Request {i+1} ---")
        # In a real server, 'request' would be an actual HTTP request object
        # We're passing a dummy object here for demonstration purposes.
        dummy_request = {"headers": {"User-Agent": "Mozilla/5.0"}}
        page_content = render_landing_page(dummy_request)
        # print(page_content) # You'd typically serve this directly
        print("-------------------\n")

