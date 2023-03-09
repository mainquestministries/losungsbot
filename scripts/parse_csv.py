import csv, sys, json
from datetime import datetime

if len(sys.argv)==1:
    input_ = "losungen_{}.csv".format(datetime.now().year)
    output_ = "losungen_{}.json".format(datetime.now().year)
else:
    input_ = sys.argv[1]
    output_ = sys.argv[2]

with open(input_, "r", encoding="cp1252") as f:
    reader = csv.reader(f, delimiter="\t")
    csv_list = list(reader)

with open(output_, "w", encoding="utf-8") as f:
    data = json.dumps(csv_list)
    f.write(data.replace("/", "*"))
