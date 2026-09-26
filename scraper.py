import os
import requests
from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient("apify_api_0HDFA0PfqA2PDW4ORdIQ8FGkcMusFj17IYea")

# Prepare the Actor input
run_input = {
    "directUrls": ["https://www.instagram.com/therawproject.in/"],
    "resultsType": "posts",
    "resultsLimit": 100,
}

print("Starting Apify Instagram Scraper actor...")
# Run the Actor and wait for it to finish
run = client.actor("apify/instagram-scraper").call(run_input=run_input)

print(f"Actor finished. Run ID: {run.id}")

# Fetch and print Actor results from the run's dataset (if there are any)
dataset_items = client.dataset(run.default_dataset_id).iterate_items()

os.makedirs("images", exist_ok=True)

count = 0
for item in dataset_items:
    # Instagram scraper typically returns images in 'displayUrl' or 'images' or 'carouselMedia'
    image_urls = []
    
    if item.get("displayUrl"):
        image_urls.append(item["displayUrl"])
    
    # Handle carousel
    if item.get("childPosts"):
        for child in item["childPosts"]:
            if child.get("displayUrl"):
                image_urls.append(child["displayUrl"])
                
    for url in image_urls:
        try:
            print(f"Downloading image: {url}")
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                count += 1
                with open(f"images/image_{count}.jpg", "wb") as f:
                    f.write(response.content)
        except Exception as e:
            print(f"Failed to download {url}: {e}")

print(f"Scraping complete. Downloaded {count} images.")
