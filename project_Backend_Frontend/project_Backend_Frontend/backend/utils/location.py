import requests


def get_location_name(latitude, longitude):

    if not latitude or not longitude:
        return "Unknown"

    try:

        url = "https://nominatim.openstreetmap.org/reverse"

        params = {
            "lat": latitude,
            "lon": longitude,
            "format": "jsonv2"
        }

        headers = {
            "User-Agent": "DamageAI/1.0"
        }

        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=10
        )

        data = response.json()

        print(data)

        address = data.get("address", {})

        print(address)

        return (
            address.get("village")
            or address.get("town")
            or address.get("city")
            or address.get("hamlet")
            or address.get("suburb")
            or address.get("municipality")
            or address.get("county")
            or address.get("state_district")
            or address.get("state")
            or "Unknown"
        )

    except Exception as e:

        print(e)

        return "Unknown"