import csv, sys, json, os
from datetime import datetime

def write_file_for_year(year : int=datetime.now().year):
    input_ = "losungen_{}.csv".format(year)
    output_ = os.path.join(os.getcwd(), "dist/losungen_{}.json".format(year))
    rewrite_file(input_, output_)

def rewrite_file(i : str, o : str):
    with open(i, "r", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        csv_list = list(reader)

    with open(o, "w", encoding="utf-8") as f:
        data = json.dumps(csv_list)
        f.write(data.replace("/", "*"))

write_file_for_year()

next_year = datetime.now().year+1

if os.path.exists("losungen_{}.csv".format(next_year)):
    write_file_for_year(next_year)
