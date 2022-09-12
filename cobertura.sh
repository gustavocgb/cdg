test_dir="testes-crawler"
crawler_dir="aws-sgm"

cd ../$test_dir  
git pull origin main
rm -rf complete/ domain/ application/ infrastructure/ interfaces/ factories/
cd ../$crawler_dir

echo "Cobertura de toda a aplicação"
rm -rf coverage
npx jest --coverage --runInBand --passWithNoTests -c src/infra/tests/jest/jest.config.js
cp -r coverage/lcov-report ../$test_dir/complete
cp coverage/coverage-final.json ../$test_dir/complete/

echo "Cobertura de parte da aplicação"
echo "	- Domain"
rm -rf coverage
npx jest --coverage --runInBand --passWithNoTests -c src/infra/tests/jest/layers-coverage/jest-domain-config.js
cp -r coverage/lcov-report ../$test_dir/domain
cp coverage/coverage-final.json ../$test_dir/domain/

echo "  - Application"
rm -rf coverage
npx jest --coverage --runInBand --passWithNoTests -c src/infra/tests/jest/layers-coverage/jest-application-config.js
cp -r coverage/lcov-report ../$test_dir/application
cp coverage/coverage-final.json ../$test_dir/application/

echo "	- Infrastructure"
rm -rf coverage
npx jest --coverage --runInBand --passWithNoTests -c src/infra/tests/jest/layers-coverage/jest-infra-config.js
cp -r coverage/lcov-report ../$test_dir/infrastructure
cp coverage/coverage-final.json ../$test_dir/infrastructure/

echo "	- Interfaces"
rm -rf coverage
npx jest --coverage --runInBand --passWithNoTests -c src/infra/tests/jest/layers-coverage/jest-interfaces-config.js
cp -r coverage/lcov-report ../$test_dir/interfaces
cp coverage/coverage-final.json ../$test_dir/interfaces/

echo "	- Factories"
rm -rf coverage
npx jest --coverage --runInBand --passWithNoTests -c src/infra/tests/jest/layers-coverage/jest-factories-config.js
cp -r coverage/lcov-report ../$test_dir/factories
cp coverage/coverage-final.json ../$test_dir/factories/

echo "Cobertura atualizada! Verifique e faça commit!"

