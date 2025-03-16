#!/bin/bash

# Archivo JSON original
input_file="mortys.json"
# Archivo JSON modificado
output_file="mortys_modified.json"

# Procesar el JSON con jq
jq '
.data |= map(
  if .name | test("mortys_icon_20x20_") then
    .image = "<img src=\"images/" + (.name | sub(".*mortys_icon_20x20_"; "") | sub("\".*"; "")) + ".png\">" |
    .name = (.name | sub("<a [^>]+><span [^>]+></span>"; "") | sub("</a>"; "") | sub("^\\s+|\\s+$"; ""))
  else
    .
  end
)' "$input_file" > "$output_file"

echo "JSON modificado guardado en $output_file"

"<img src='images/MortyScruffyIcon.png'>"