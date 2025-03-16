#!/bin/bash

# Archivo que contiene las URLs de las imágenes
urls_file="image_urls.txt"
# Carpeta donde se guardarán las imágenes descargadas
download_dir="images"

# Comprobamos si el archivo de URLs existe
if [[ ! -f "$urls_file" ]]; then
  echo "No se encontró el archivo $urls_file."
  exit 1
fi

# Creamos el directorio de descarga si no existe
mkdir -p "$download_dir"

# Leemos las URLs del archivo y descargamos las imágenes
while read -r url; do
  # Usamos wget para descargar cada imagen
  wget -q --show-progress -P "$download_dir" "$url"
done < "$urls_file"

echo "Imágenes descargadas en el directorio $download_dir"
