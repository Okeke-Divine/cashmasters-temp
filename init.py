import requests

url = "https://ngapi.cashmaple.com/api/user/register"

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    "Authorization": "", 
    "Content-Type": "application/x-www-form-urlencoded",
    "Nonce": "292562657",
    "Origin": "https://ng.cashmaple.com",
    "Referer": "https://ng.cashmaple.com/",
    "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "Signature": "0679f1d9533a7325431641ab940fd17f",
    "Timestamp": "1713948990431",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
}

payload = {
    "channel_code": "",
    "phone": "07064347284",
    "password": "blue",
    "rePassword": "blue",
    "invite_code": "6364567",
}

response = requests.post(url, headers=headers, data=payload)

print("Response Status Code:", response.status_code)
print("Response Body:", response.text)
