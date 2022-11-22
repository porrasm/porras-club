cd frontend
echo "Build frontend..."
npm install
npm run build

cd ../backend
echo "Build backend..."
npm install
npm run build

cd ..