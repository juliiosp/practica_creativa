FROM mongo:7.0.17

COPY origin_dest_distances.jsonl /origin_dest_distances.jsonl
CMD mongoimport --host mongo:27017 -d agile_data_science -c origin_dest_distances --file /origin_dest_distances.jsonl