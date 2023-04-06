import json
import arsenal.credentials as credentials
import arsenal.database as database
import numpy as np
import pandas as pd
import psycopg2


def get_performance_points():
    data = database.get_data_from_query(databaseName="CryptoSwarm",
                                        username=credentials.USERNAME_FORECAST,
                                        hostname=credentials.HOSTNAME_FORECAST,
                                        password=credentials.PASSWORD_FORECAST,
                                        query="select * from public.session_scores")

    df = pd.DataFrame(data, columns=["forecaster", "score", "percentile", "payout", "session", "date", "swarmID", "payout_numeric", "rank", "performance_points", "performance_points_bonus"])

    df["forecaster"] = df["forecaster"].apply(lambda x: x.lower())
    crypto_users = df["forecaster"].unique()
    crypto_users = [i for i in crypto_users if i[:2]=="0x"]

    performance_df = pd.DataFrame(index=crypto_users, columns=["points"], data=0)
    token_df = pd.read_csv("CSAI Mint Tracker - IPFS Updates.csv")
    token_df["Performance Points"] = 0

    for user in crypto_users:
        user_df = df[df["forecaster"]==user]
        score = 0
        score += (user_df["percentile"]>50).sum()
        score += (user_df["percentile"]>75).sum()
        score += (user_df["percentile"]>90).sum()
        performance_df.loc[user, "points"] = score
        token_df.loc[token_df["Owner"]==user, "Performance Points"] = score

    return token_df

def update_database(token_df):
    conn = psycopg2.connect(dbname="CryptoSwarm", user=credentials.USERNAME_FORECAST,
                            host=credentials.HOSTNAME_FORECAST, password=credentials.PASSWORD_FORECAST)
    database.clear_table(conn, "tokens")
    simple_df = token_df[["Token ID", "Owner", "User", "Performance Points"]]
    simple_df = simple_df.rename(columns={"Token ID": "ID", "Owner": "HolderWallet", "User":"OwnerName", "Performance Points": "Performance"})
    database.upload_dataframe(conn, simple_df, "tokens")

def update_jsons(token_df):
    for i in range(len(token_df)):
        # First, update json
        with open("../build/json/%s.json"%i, "rb") as f:
            j=json.load(f)

        for attribute in j["attributes"]:
          if attribute["trait_type"]=="Performance":
            attribute["value"] = int(token_df.loc[token_df["Token ID"]==i,"Performance Points"].values[0])


        with open("../build/json/%s.json"%i, "w") as f:
            json.dump(j, f, indent=2)
        print("updated: ", j)


def update_metadata():
    token_df = get_performance_points()
    update_database(token_df)
    update_jsons(token_df)


if __name__ == "__main__":
    update_metadata()
