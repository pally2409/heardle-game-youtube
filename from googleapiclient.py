from googleapiclient.discovery import build
import re

API_KEY = "AIzaSyBAj-rNquJeO7B-nH0vbndhoBQQBGizuYw"
youtube = build("youtube", "v3", developerKey=API_KEY)

video_ids = [
    "qjlVAsvQLM8",
    "T04FsNh7Lg0",
    "fNRXD393cfs",
    "o5iw2ifoHnw",
    "Cg6IDiTqIUs",
    "d_toKURCt10",
    "NNMUuJWRyxc",
    "v2AC41dglnM",
    "XPpTgCho5ZA", 
    "dvgZkm1xWPE",
    "4fq_MDgEzRM",
    "-sVB91NTa4A", 
    "kAJz7c97Cyo",
    "3A3hgfstCxE",
    "j8tZs6G_h7U"
]

request = youtube.videos().list(
    part="snippet",
    id=",".join(video_ids)
)
response = request.execute()

songs = []
for item in response["items"]:
    title = item["snippet"]["title"]
    video_id = item["id"]

    if " - " in title:
        artist, name = title.split(" - ", 1)
    else:
        artist, name = "", title

    songs.append({
        "artist": artist.strip(),
        "name": name.strip(),
        "youtubeId": video_id
    })

print(songs)