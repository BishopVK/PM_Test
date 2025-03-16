#!/bin/bash

# Ruta al archivo JSON
json_file="mortys.json"
# Archivo de salida donde se guardarán las URLs
output_file="image_urls.txt"

# Base URL de las imágenes
base_url="https://pocketmortys.net/media/com_pocketmortys/assets/"

# Comprobamos si el archivo JSON existe
if [[ ! -f "$json_file" ]]; then
  echo "No se encontró el archivo $json_file."
  exit 1
fi

# Limpiamos el archivo de salida si existe
> "$output_file"

# Extraemos las imágenes desde el archivo JSON
grep -oP '"name":.*?mortys_icon_20x20_\K[^"]+' "$json_file" | while read -r icon_name; do
  # Quitamos cualquier barra invertida (backslash) antes de generar la URL
  icon_name=$(echo "$icon_name" | sed 's/\\//g')
  # Formamos la URL completa
  image_url="${base_url}${icon_name}.png"
  # Escribimos la URL en el archivo de salida
  echo "$image_url" >> "$output_file"
done

echo "URLs de imágenes guardadas en $output_file"
