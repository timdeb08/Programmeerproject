#!/usr/bin/env python
# Name: Tim de Boer
# Student number: 11202351
"""
This file converts CSV file to JSON file
"""
import csv
import pandas as pd
import json

INPUT_CSV = "scripts/inkomen.csv"
OUTPUT_JSON = "scripts/inkomen.json"


def read_file():

    # Read the csv file and convert into panda dataframa
    df = pd.read_csv(INPUT_CSV, index_col='Regios', usecols=None, sep=';')\
        .fillna(0)

    return df


def write_json(df):

    # Write to json file
    with open(OUTPUT_JSON, 'w') as f:
        f.write(df.to_json(orient='index'))


if __name__ == "__main__":

    # Read csv file and load dataframe
    dataframe = read_file()
    # Write to json
    write_json(dataframe)
