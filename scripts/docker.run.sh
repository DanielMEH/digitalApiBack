echo "                   .--."
echo "                  |o_o |"
echo "                  |:_/ |"
echo "   coinpush      //     \ \\"
echo "                (|     | )"
echo "               /'\_   _/'\\"
echo "               \___)=(___/"



cd  D:\tst enterpase\coinpush
cd ..
pwd
# Detén y elimina el contenedor existente (si existe)
docker stop coinpushback 2>/dev/null || true
docker rm coinpushback 2>/dev/null || true

# Elimina la imagen existente (si existe)
docker rmi coinpushback 2>/dev/null || true

# Construye la nueva imagen a partir del Dockerfile actual
docker build -t coinpushback .

docker run  -d -p 3050:3050 coinpush

# Verifica que el contenedor esté en ejecución
docker ps