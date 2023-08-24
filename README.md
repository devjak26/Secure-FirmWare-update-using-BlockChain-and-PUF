# Secure-FirmWare-update-using-BlockChain-and-PUF

For deploying Contract:

	cd .\thirdweb-contracts\

	npx thirdweb deploy

After deployment you get a link, similar to this one:
	Open this link to deploy your contracts: https://thirdweb.com/contracts/deploy/Qma3QW5UA2mVpNTWng7mqFzWR9mm3umti6sd4xgoz9WA3i

so just follow the link and get contract address.
now change the contract address in frontend at "context/index.jsx" file at line  number 20.

for frontend run command:
	cd .\client\
	npm run dev
