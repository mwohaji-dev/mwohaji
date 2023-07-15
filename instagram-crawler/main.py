from os import environ
from re import findall
from instagrapi import Client

if __name__ == "__main__":
    USERNAME = environ["INSTA_USERNAME"]
    PASSWORD = environ["INSTA_PASSWORD"]

    print("Signing in...")
    cl = Client()
    cl.login(USERNAME, PASSWORD)
    print("Sign in complete. crawling...")

    medias = cl.hashtag_medias_top("급식", amount=100)
    for idx, media in enumerate(medias):
        hashtags = findall(r"#[^\s#,\\]+", media.dict()["caption_text"])

        res = {
            "post_url": f"instagram://media?id={media.dict()['pk']}",
            "thumbnail_url": media.dict()["resources"][0]["thumbnail_url"].title(),
            "hashtags": hashtags,
            # "meta": media.dict(),
        }

        print(f"[item {idx}]")
        for key in res:
            print(f"- {key}: {res[key]}")
        print()
