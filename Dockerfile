FROM oven/bun:latest

WORKDIR /app

# Copy package.json and bun.lock files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --production

# Copy source code
COPY *.ts ./
COPY tsconfig.json ./

# Copy the cli script
COPY ./cli.sh /app/cli.sh
RUN chmod +x /app/cli.sh

# Set the command line
ENTRYPOINT ["/app/cli.sh"]
