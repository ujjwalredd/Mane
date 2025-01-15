import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def load_fake_users(file_path='/Users/ujjwalreddyks/Desktop/Mane/Mane/Frontend/fake_users.json'):
    """Loads fake users from a JSON file."""
    try:
        with open(file_path, 'r') as file:
            users = json.load(file)
        return users
    except Exception as e:
        print(f"Error loading users: {e}")
        return []

def automate_signup(url, user_list):
    """
    Automates the signup process using provided fake users.
    Args:
        url: The signup page URL.
        user_list: A list of user dictionaries with 'name', 'email', and 'password'.
        driver_path: Path to the Safari WebDriver executable.
    """
    
    driver = webdriver.Safari()
    # Initialize the WebDriver for Safari

    try:
        for user in user_list:
            # Open the signup page
            driver.get(url)

            # Wait until the form is loaded
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "signupForm"))
            )

            # Fill in the form
            driver.find_element(By.ID, "name").send_keys(user["name"])
            driver.find_element(By.ID, "email").send_keys(user["email"])
            driver.find_element(By.ID, "password").send_keys(user["password"])
            driver.find_element(By.ID, "confirmPassword").send_keys(user["password"])

            # Submit the form
            driver.find_element(By.ID, "submit").click()

            # Wait to ensure form submission is processed
            time.sleep(2)

            print(f"User signed up: {user}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        # Close the browser
        driver.quit()

if __name__ == "__main__":
    # URL of your signup page
    SIGNUP_URL = "http://127.0.0.1:8080/signup.html"  # Replace with your actual signup page URL

    # Path to the Safari WebDriver (Safari supports this natively, no need to specify the path)
    # CHROMEDRIVER_PATH = webdriver.Safari()

    # Load the fake users from the JSON file
    users = load_fake_users('/Users/ujjwalreddyks/Desktop/Mane/Mane/Frontend/fake_users.json')

    if users:
        # Run the automation for each user
        automate_signup(SIGNUP_URL, user_list=users)
    else:
        print("No users found in the JSON file.")
