import os
import json
import random
import shutil
from PIL import Image

def generate_images():
    def day(j, size):
        if j == 0:
            return "Any Day"
        elif j == 1:
            if size == 2:
                return "Any Day"
            return "Monday"
        elif j == 2:
            return "Wednesday"
        elif j == 3:
            return "Friday"
        elif j == 4:
            return "Any Day"
        return ""

    collection = []
    for i in range(1, 17):
        collection += [("CryptoSwarm{}.jpg".format(str(i).zfill(3)), day(j, 5)) for j in range(5)]
    for i in range(17, 82):
        collection += [("CryptoSwarm{}.jpg".format(str(i).zfill(3)), day(j, 4)) for j in range(4)]
    for i in range(82, 87):
        collection += [("CryptoSwarm{}.jpg".format(str(i).zfill(3)), day(j, 2)) for j in range(2)]

    random.shuffle(collection)

    assert all([day != "" for _, day in collection])
    assert len(collection) == 350

    for i, (image, priority) in enumerate(collection):
        shutil.copy('../Artwork/{}'.format(image), '../build/images/{}.png'.format(i))

        data = {
            "name": "CryptoSwarm AI TEST {}".format(i),
            "description": "CryptoSwarm AI is a collective Super Intelligence for predicting crypto assets using "
                           "hundreds of human forecasters and the power of Swarm AI. \ Go to "
                           "https://www.cryptoswarm.ai/ for more information, and join our Discord: "
                           "https://discord.gg/4g2ccHE8cv \ The Terms of Service of this NFT can be found here: \ "
                           "https://ipfs.io/ipfs/bafkreibx363xs2jyvyrunk2rweaijr25w7qroy5auirpugco5qdl3dc3iy",

            "external_url": "https://www.cryptoswarm.ai/",
            "image": "ipfs://NewUriToReplace/{}.png".format(i),
            "terms_of_service": "https://ipfs.io/ipfs/bafkreibx363xs2jyvyrunk2rweaijr25w7qroy5auirpugco5qdl3dc3iy",
            "attributes": [
                {
                    "trait_type": "Collection",
                    "value": "Soft Launch"
                },
                {
                    "trait_type": "Priority",
                    "value": priority,
                },
                {
                    "trait_type": "Performance",
                    "value": 0,
                }
            ],
        }

        with open('../build/json/{}.json'.format(i), 'w') as outfile:
            json.dump(data, outfile, indent=2)

if __name__ == "__main__":
  generate_images()