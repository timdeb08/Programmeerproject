#!/usr/bin/env python
# Name: Tim de Boer
# Student number: 11202351
"""
This file converts CSV file to JSON file
"""
import csv
import pandas as pd
import json

INPUT_CSV = "verkiezing.csv"
OUTPUT_JSON = "verkiezing.json"


def read_file():

    # Read the csv file and convert into panda dataframa
    df = pd.read_csv(INPUT_CSV, index_col='RegioNaam', usecols=None, sep=';')\
        .fillna(0)

    return df


def clean_dataframe(df):

    # Drops rows which are not used
    df = df.drop(['RegioCode'], axis=1)
    df = df.drop(['AmsterdamseCode'], axis=1)
    df = df.drop(['OuderRegioCode'], axis=1)
    df = df.drop(['Kiesgerechtigden'], axis=1)
    df = df.drop(['OngeldigeStemmen'], axis=1)
    df = df.drop(['BlancoStemmen'], axis=1)
    df = df.drop(['GeldigeStemmen'], axis=1)

    return df


def write_json(df):

    # Write to json file
    with open(OUTPUT_JSON, 'w') as f:
        f.write(df.to_json(orient='index'))


if __name__ == "__main__":

    # Read csv file and load dataframe
    dataframe = read_file()
    # Get cleaned dataframe
    cleaned_dataframe = clean_dataframe(dataframe)
    # Write to json
    write_json(cleaned_dataframe)
