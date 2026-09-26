import os
import requests
from apify_client import ApifyClient

client = ApifyClient("apify_api_0HDFA0PfqA2PDW4ORdIQ8FGkcMusFj17IYea")
dataset_items = client.dataset("o0cjA3q69jwLsP0JW").iterate_items()

os.makedirs("images", exist_ok=True)

count = 0
for item in dataset_items:
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
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                count += 1
                with open(f"images/image_{count}.jpg", "wb") as f:
                    f.write(response.content)
        except Exception as e:
            print(f"Failed to download {url}: {e}")

print(f"Download complete. Downloaded {count} images.")
