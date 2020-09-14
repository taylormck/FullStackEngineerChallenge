This is my implementation of the PayPay Full Stack Engineer Challenge.

## Getting Started

Before you run it, you'll need to get a few things set up.

```bash
# Install the libraries
yarn install

# Next, you'll need to set up the database.
# You'll need docker already set up for this.
docker-compose up -d

# Next, you'll want to get the database migrated and add the seed data.
yarn migrate && yarn seed

# Finally, run the dev server.
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.
